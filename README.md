# arc-gasless-react

A React SDK for zero-gas onboarding on the ARC Network using Circle Programmable Wallets. 

This SDK abstracts Circle's Developer-Controlled Wallets and Smart Contract Paymaster into a simple set of React hooks and components, allowing your users to sign in with email/socials and execute gasless transactions on the ARC L1 instantly.

## Quickstart

```bash
npm install arc-gasless-react
```

### 1. Setup the Provider
Wrap your app in the `ArcWalletProvider` and pass your Circle App ID.

```jsx
import { ArcWalletProvider } from 'arc-gasless-react';

function App() {
  return (
    <ArcWalletProvider appId="YOUR_CIRCLE_APP_ID">
      <YourApp />
    </ArcWalletProvider>
  );
}
```

### 2. Add the Connect Button
Use the pre-styled `<ArcConnectButton />` to trigger the Circle login UI.

```jsx
import { ArcConnectButton } from 'arc-gasless-react';
import 'arc-gasless-react/style.css'; // Optional: Import default styles

export default function Login() {
  return <ArcConnectButton sponsorGas={true} />;
}
```

### 3. Send Gasless Transactions
Once connected, easily route transactions through the Circle Paymaster so your users pay zero gas.

```jsx
import { useGaslessTransaction } from 'arc-gasless-react';

export default function Mint() {
  const { execute, isLoading } = useGaslessTransaction();

  const handleMint = async () => {
    await execute({
      contractAddress: "0x...",
      method: "mintNFT",
      args: ["User123"]
    });
  };

  return <button onClick={handleMint}>Mint for Free</button>;
}
```

## Playground

To test the SDK locally, a playground app is provided:

```bash
cd playground
npm install
npm run dev
```
