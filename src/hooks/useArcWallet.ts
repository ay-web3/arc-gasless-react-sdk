import { useArcWalletContext } from '../provider/ArcWalletProvider';

export const useArcWallet = () => {
  const { isReady, userAddress, w3sSdk } = useArcWalletContext();

  const disconnect = () => {
    // In a real implementation, you might clear session storage or call SDK logout methods
    console.log('ArcGaslessReact: Disconnected user wallet');
  };

  return {
    isReady,
    isConnected: !!userAddress,
    address: userAddress,
    sdk: w3sSdk,
    disconnect,
  };
};
