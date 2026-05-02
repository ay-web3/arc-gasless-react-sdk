import React, { useState } from 'react';
import { ArcConnectButton, useArcWallet, useGaslessTransaction } from 'arc-gasless-react';
import 'arc-gasless-react/style.css';

function App() {
  const { isConnected, address } = useArcWallet();
  const { execute, isLoading, error } = useGaslessTransaction();
  const [txHash, setTxHash] = useState<string | null>(null);

  const handleMint = async () => {
    try {
      const hash = await execute({
        contractAddress: '0x1234567890abcdef1234567890abcdef12345678',
        method: 'mintNFT',
        args: [address],
      });
      setTxHash(hash);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container">
      <div className="header">
        <h1>Arc Gasless React</h1>
        <p>Zero-gas onboarding for the ARC Network</p>
      </div>

      <div className="card">
        <h2>1. Connect Wallet</h2>
        <p style={{ color: '#64748b', marginBottom: '1.5rem' }}>
          Test the seamless email/social login flow powered by Circle Programmable Wallets.
        </p>
        
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <ArcConnectButton />
        </div>

        {isConnected && (
          <div className="success-box">
            <strong>Connected Successfully!</strong><br />
            Address: {address}
          </div>
        )}
      </div>

      {isConnected && (
        <div className="card" style={{ opacity: isConnected ? 1 : 0.5 }}>
          <h2>2. Sponsor a Transaction</h2>
          <p style={{ color: '#64748b', marginBottom: '1.5rem' }}>
            Click below to execute a gasless transaction. The Circle Paymaster will pay the ARC Network fees.
          </p>

          <button 
            className="action-btn"
            onClick={handleMint}
            disabled={isLoading}
          >
            {isLoading ? 'Processing via Paymaster...' : 'Mint Free NFT'}
          </button>

          {error && (
            <div style={{ color: '#dc2626', marginTop: '1rem' }}>
              Error: {error.message}
            </div>
          )}

          {txHash && (
            <div className="success-box">
              <strong>Transaction Sponsored!</strong><br />
              Tx Hash: {txHash}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
