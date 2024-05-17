import React, { useState, useEffect } from 'react';
import './App.css';
import { ethers } from 'ethers';

function App() {
  
  const [balance, setBalance] = useState(null);
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [account, setAccount] = useState(null);

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
        //const newAccount = await newSigner.getAddress();
        const newAccount = "0x0693B05E5C8aeF4DA37c2Bc0E7B507e602404348";
        setAccount(newAccount);
      }
    };
    init();
  }, []);

  const fetchBalance = async () => {
    if (signer && account) {
      //***********
      const balance = await provider.getBalance(account);
      setBalance(ethers.formatEther(balance));
      //*******
    }
  };  

  return (
    <div className="App">
      <header className="App-header">        
        {account && <p>Account: {account}</p>}
        <button onClick={fetchBalance}>Get Balance</button>
        {balance !== null && <p>Balance: {balance} ETH</p>}
      </header>
    </div>
  );
}

export default App;
