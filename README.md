# ⚡ Arc Gasless React SDK

**The "Stripe Checkout" for Web3 Onboarding on the ARC Network.**

[![npm version](https://badge.fury.io/js/arc-gasless-react.svg)](https://badge.fury.io/js/arc-gasless-react)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## 📖 What is this?

The biggest hurdle for decentralized applications (dApps) is **User Onboarding**. Traditional Web3 requires users to download browser extensions (like MetaMask), safely store 12-word seed phrases, and purchase native tokens just to pay for network transaction fees ("gas"). **This causes 95% of mainstream users to abandon the app.**

The **Arc Gasless React SDK** solves this entirely. It provides a simple, plug-and-play React library that allows developers building on the **ARC Network** to offer a Web2-like experience.

### 🪄 The Magic Under the Hood:
1. **Seedless Login:** Powered by **Circle Programmable Wallets**, users can sign into your dApp using just their Email or a Social Login (Google/Apple). No seed phrases required.
2. **Zero-Gas Transactions:** Powered by **Circle's Smart Contract Platform (Paymaster)**, this SDK automatically intercepts user transactions on the ARC Network and routes them through a Paymaster. This allows *you* (the developer) to sponsor the micro-pennies of gas in the background. The user never pays a fee.

---

## 🚀 Quickstart

Install the SDK via npm or yarn:

```bash
npm install arc-gasless-react @circle-fin/w3s-pw-web-sdk viem
```

---

## 🛠️ How to Use It

### 1. Wrap your app in the Provider
To initialize the Circle Web SDK securely, wrap your application in the `ArcWalletProvider` and pass your Circle App ID.

```tsx
import { ArcWalletProvider } from 'arc-gasless-react';

function App() {
  return (
    // Replace with your actual Circle App ID
    <ArcWalletProvider appId="YOUR_CIRCLE_APP_ID">
      <YourMainApplication />
    </ArcWalletProvider>
  );
}
```

### 2. Add the Connect Button
We provide a highly-aesthetic, pre-styled `<ArcConnectButton />` that triggers the Circle authentication challenge. It handles the loading states and secure wallet generation in the background.

```tsx
import { ArcConnectButton, useArcWallet } from 'arc-gasless-react';
import 'arc-gasless-react/style.css'; // Import default styles for the button

export default function LoginScreen() {
  const { isConnected, address } = useArcWallet();

  if (isConnected) {
    return <p>Welcome! Your invisible wallet address is: {address}</p>;
  }

  return (
    <div>
      <h2>Sign in to play</h2>
      {/* sponsorGas=true tells the SDK to prepare routing via Paymaster */}
      <ArcConnectButton sponsorGas={true} />
    </div>
  );
}
```

### 3. Send Gasless Transactions
Once connected, you can use the `useGaslessTransaction` hook. Instead of using standard `window.ethereum` or `viem` to broadcast transactions (which would prompt the user to pay gas), this hook packages the transaction and routes it to the Circle Paymaster.

```tsx
import { useGaslessTransaction } from 'arc-gasless-react';

export default function MintItem() {
  const { execute, isLoading, error } = useGaslessTransaction();

  const handleMint = async () => {
    try {
      const txHash = await execute({
        contractAddress: "0xYourArcContractAddress...",
        method: "mintNFT",
        args: ["User123"]
      });
      console.log("Success! Transaction sponsored. Hash:", txHash);
    } catch (err) {
      console.error("Failed to sponsor transaction:", err);
    }
  };

  return (
    <div>
      <button onClick={handleMint} disabled={isLoading}>
        {isLoading ? "Minting..." : "Mint Free Sword!"}
      </button>
      {error && <p style={{ color: 'red' }}>{error.message}</p>}
    </div>
  );
}
```

---

## 🎮 Local Playground

We have included a full React application inside the repository so you can test the SDK visually before using it in production.

To run the playground:
```bash
git clone https://github.com/ay-web3/arc-gasless-react-sdk.git
cd arc-gasless-react-sdk/playground
npm install
npm run dev
```
Open `http://localhost:3000` to see the seamless login and simulated Paymaster sponsorship in action.

---

## 🏗️ Architecture Note

Currently, `useGaslessTransaction` assumes a standard architecture where it simulates formatting a transaction and routing it to your developer server, which in turn calls the Circle Paymaster API securely. This ensures your private Circle API keys are never exposed to the frontend.

## 🤝 Contributing
Pull requests are welcome! We are always looking to expand the SDK's capabilities on the ARC Network.
