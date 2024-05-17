import React, { useState, useEffect } from 'react';
import './App.css';
import { ethers } from 'ethers';

const escrowABI = [{"inputs":[{"internalType":"address","name":"_arbiter","type":"address"},{"internalType":"address","name":"_beneficiary","type":"address"}],"stateMutability":"payable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"","type":"uint256"}],"name":"Approved","type":"event"},{"inputs":[],"name":"approve","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"arbiter","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"beneficiary","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"contractBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"depositor","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"isApproved","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"}];
const escrowAddress = "0x0693B05E5C8aeF4DA37c2Bc0E7B507e602404348";


function App() {
  const [balance, setBalance] = useState(null);
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [account, setAccount] = useState(null);
  const [contract, setContract] = useState(null);

  useEffect(() => {
    const init = async () => {
      if (window.ethereum == null) {
        console.log("MetaMask not installed; using read-only defaults");
        setProvider(ethers.getDefaultProvider());
      } else {
        const newProvider = new ethers.BrowserProvider(window.ethereum);
        setProvider(newProvider);
        const newSigner = await newProvider.getSigner();
        setSigner(newSigner);
        const newAccount = await newSigner.getAddress();
        setAccount(newAccount);
        const escrowContract = new ethers.Contract(escrowAddress, escrowABI, newSigner);
        setContract(escrowContract);
      }
    };
    init();
  }, []);

  const fetchBalance = async () => {
    if (provider && account) {
      const bal = await provider.getBalance(escrowAddress);
      setBalance(ethers.formatEther(bal));
    }
  };

  const approve = async () => {
    if (contract & account) {
      try {
        const tx = await contract.approve();
        await tx.wait();
      } catch (error) {
        console.error("error approving tx", error);
      }
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        {account && <p>Account: {escrowAddress}</p>}
        <button onClick={fetchBalance}>Get Balance</button>
        {balance !== null && <p>Balance: {balance} ETH</p>}
        <button onClick={approve}>Approve execution of payment to the beneficiary</button>
      </header>
    </div>
  );
}

export default App;


