const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");
const { ethers } = require("hardhat");


const EscrowModule = buildModule("EscrowModule", (m) => {
  
  // Provide the constructor arguments for the Escrow contract
  const arbiterAddress = "0xeb5925d4Cb344Ab27b82679CeDf3FDa8a45E2e1F"; // Replace with the actual arbiter address
  const beneficiaryAddress = "0x16C8Df447537A0a15a87d439d9d7eA8790f563a4"; // Replace with the actual beneficiary address
  
  const valueToSend = ethers.utils.parseEther("0.1");
  
  const escrow = m.contract("Escrow", [arbiterAddress, beneficiaryAddress], { value: valueToSend});

  return { escrow };
});

module.exports = EscrowModule;