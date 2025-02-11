import React, { useState, useEffect } from "react";
import { BrowserProvider } from "ethers";

const ConnectWallet = ({ onConnect }) => {
  const [account, setAccount] = useState(null);

  useEffect(() => {
    checkConnection();
  }, []);

  const checkConnection = async () => {
    if (window.ethereum) {
      try {
        const provider = new BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const address = await signer.getAddress();
        setAccount(address);
      } catch (error) {
        console.error("Error checking wallet connection:", error);
      }
    }
  };

  const connectWallet = async () => {
    if (!window.ethereum) {
      alert("MetaMask is not installed. Please install MetaMask.");
      return;
    }
    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setAccount(accounts[0]);
      if (onConnect) onConnect(accounts[0]);
    } catch (error) {
      console.error("Error connecting wallet:", error);
    }
  };

  return (
    <button
      onClick={connectWallet}
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    >
      {account
        ? `Connected: ${account.slice(0, 6)}...${account.slice(-4)}`
        : "Connect Wallet"}
    </button>
  );
};

export default ConnectWallet;
