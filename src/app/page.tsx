//import Image from "next/image";
"use client";

import { ethers } from "ethers";
import { useState } from "react";

declare global {
  interface Window {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ethereum: any;
  }
}

export default function Home() {
  const [isConnected, setIsConnected] = useState(false);
  const [signer, setSigner] = useState<ethers.JsonRpcSigner | undefined>(undefined);
  async function connect() {
    if (typeof window.ethereum !== "undefined") {
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        setIsConnected(true);
        const connectedProvider = new ethers.BrowserProvider(window.ethereum);
        const signer = await connectedProvider.getSigner();
        setSigner(signer);
      } catch(err) {
        console.log(err);
      }
    }
  }

  async function execute() {
    const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
    const abi= [
        {
          "inputs": [
            {
              "internalType": "string",
              "name": "_name",
              "type": "string"
            },
            {
              "internalType": "uint256",
              "name": "_favoriteNumber",
              "type": "uint256"
            }
          ],
          "name": "addPerson",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "string",
              "name": "",
              "type": "string"
            }
          ],
          "name": "nameToFavoriteNumber",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "name": "people",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "favoriteNumber",
              "type": "uint256"
            },
            {
              "internalType": "string",
              "name": "name",
              "type": "string"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "retrieve",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "_favoriteNumber",
              "type": "uint256"
            }
          ],
          "name": "store",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        }
      ];
      const contract = new ethers.Contract(contractAddress, abi, signer);
      await contract.store(42);
  }

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <button onClick={() => connect()}>
        {isConnected ? 
          <button onClick={() => execute()}>
          <div className="p-2 rounded-full px-4 bg-blue-600 text-white">
            Execute
          </div>
            </button>
         : <div className="p-2 rounded-full px-4 bg-black text-white">
          Connect!
        </div>}
      </button>
    </div>
  );
}
