import React, { useState } from 'react';
import { useArcWalletContext } from '../provider/ArcWalletProvider';
import './ArcConnectButton.css';

export interface ArcConnectButtonProps {
  label?: string;
  sponsorGas?: boolean;
  onSuccess?: (address: string) => void;
  onError?: (error: Error) => void;
}

export const ArcConnectButton: React.FC<ArcConnectButtonProps> = ({
  label = 'Connect Arc Wallet',
  sponsorGas = true,
  onSuccess,
  onError,
}) => {
  const { isReady, w3sSdk, userAddress, setUserAddress } = useArcWalletContext();
  const isConnected = !!userAddress;
  const [isLoading, setIsLoading] = useState(false);

  const handleConnect = async () => {
    if (!isReady || !w3sSdk) {
      onError?.(new Error('ArcWalletProvider is not ready or Circle SDK failed to initialize.'));
      return;
    }

    setIsLoading(true);
    try {
      // In a real implementation, this would trigger the Circle UI challenge for login/signup
      // Since we are mocking the UI flow for the developer's side, we will simulate a successful login
      console.log('ArcGaslessReact: Initiating Circle authentication...');
      
      // Simulating network request and Circle challenge completion
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      const mockAddress = '0x' + Math.random().toString(16).substr(2, 40).padStart(40, '0');
      setUserAddress(mockAddress);
      
      console.log(`ArcGaslessReact: Successfully connected wallet: ${mockAddress}`);
      if (sponsorGas) {
        console.log('ArcGaslessReact: Gas sponsorship enabled for this session.');
      }
      
      onSuccess?.(mockAddress);
    } catch (error) {
      console.error('ArcGaslessReact: Connection failed', error);
      onError?.(error instanceof Error ? error : new Error('Unknown connection error'));
    } finally {
      setIsLoading(false);
    }
  };

  if (isConnected) {
    return (
      <button className="arc-connect-btn" disabled>
        Connected: {userAddress?.slice(0, 6)}...{userAddress?.slice(-4)}
      </button>
    );
  }

  return (
    <button
      className="arc-connect-btn"
      onClick={handleConnect}
      disabled={!isReady || isLoading}
    >
      {isLoading ? (
        'Connecting...'
      ) : (
        <>
          <svg className="arc-connect-btn-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 16V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 8H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          {label}
        </>
      )}
    </button>
  );
};
