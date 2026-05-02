import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { W3SSdk } from '@circle-fin/w3s-pw-web-sdk';

interface ArcWalletContextType {
  w3sSdk: W3SSdk | null;
  appId: string;
  isReady: boolean;
  userAddress: string | null;
  setUserAddress: (address: string | null) => void;
}

const ArcWalletContext = createContext<ArcWalletContextType | undefined>(undefined);

export interface ArcWalletProviderProps {
  appId: string;
  children: ReactNode;
}

export const ArcWalletProvider: React.FC<ArcWalletProviderProps> = ({ appId, children }) => {
  const [w3sSdk, setW3sSdk] = useState<W3SSdk | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [userAddress, setUserAddress] = useState<string | null>(null);

  useEffect(() => {
    if (!appId || appId === 'PLACEHOLDER_APP_ID') {
      console.warn('ArcGaslessReact: Using placeholder App ID. Please provide a valid Circle App ID.');
    }

    try {
      const sdk = new W3SSdk({
        appSettings: {
          appId: appId !== 'PLACEHOLDER_APP_ID' ? appId : '00000000-0000-0000-0000-000000000000',
        },
      });
      setW3sSdk(sdk);
      setIsReady(true);
    } catch (error) {
      console.error('ArcGaslessReact: Failed to initialize Circle W3S SDK', error);
      setIsReady(false);
    }
  }, [appId]);

  return (
    <ArcWalletContext.Provider value={{ w3sSdk, appId, isReady, userAddress, setUserAddress }}>
      {children}
    </ArcWalletContext.Provider>
  );
};

export const useArcWalletContext = () => {
  const context = useContext(ArcWalletContext);
  if (context === undefined) {
    throw new Error('useArcWalletContext must be used within an ArcWalletProvider');
  }
  return context;
};
