# Blockchain Voting DApp

A decentralized voting application built with React and Solidity (Ethereum).  
Voters are registered by the admin, vote securely, and anyone can view results.  
Admin can start/end voting and register voters through the web interface.

---

## Features

- **Admin panel:** Register voters, start/end voting.
- **Voting:** Registered voters vote once for their chosen candidate.
- **Results:** Anyone can view live vote counts.
- **Web3/MetaMask:** Connect with MetaMask for secure blockchain interaction.

---

## Prerequisites

- Node.js & npm
- [MetaMask](https://metamask.io/) browser extension
- Access to an Ethereum testnet (e.g., Sepolia, Goerli)
- [Remix IDE](https://remix.ethereum.org/) or Hardhat for contract deployment

---

## 1. Deploy the Smart Contract

1. **Open `Voting.sol` in Remix or Hardhat.**
2. **Compile the contract.**
3. **Deploy** with candidate names (e.g. `["Alice","Bob","Charlie"]`).  
   The deployer becomes the admin account.
4. **Copy the contract address and ABI** after deployment.

---

## 2. Setup the React App

```bash
npx create-react-app voting-dapp
cd voting-dapp
npm install web3
```

Add the provided files in these locations:

```
src/
  App.js
  contracts/Voting.json      # Paste ABI and address here
  components/
    CandidateList.js
    VoteForm.js
    AdminPanel.js
  utils/
    getWeb3.js
```

---

## 3. Configure Contract ABI & Address

- Paste the ABI and contract address from your deployment into `src/contracts/Voting.json`:
  ```json
  {
    "abi": [ ... ],        // Contract ABI here
    "address": "0x..."     // Your contract address
  }
  ```

---

## 4. Run the DApp

```bash
npm start
```

- Open in your browser.
- Connect your MetaMask wallet (must be on the same network as your contract).
- If you’re the admin, the Admin Panel will appear.

---

## 5. Usage

### Admin Panel
- **Register Voter:** Enter an Ethereum address and click "Register Voter".
- **Start Voting:** Click "Start Voting" to enable voting for all registered voters.
- **End Voting:** Click "End Voting" to stop voting.

### Voting
- Select a candidate and click "Vote".
- You can only vote once per registered account.

### Live Results
- Vote counts update automatically after each vote.

---

## Customization

- To add more features, edit the React components in `/src/components/`.
- For new candidates, redeploy the contract with a new candidate list.
- For UI improvements, modify CSS or add UI libraries.

---

## Troubleshooting

- **MetaMask not detected?** Install and unlock MetaMask.
- **Wrong network?** Switch MetaMask to the same testnet as your contract.
- **Contract not found?** Double-check the address in `Voting.json`.

---

## License

MIT

---

## Credits

- Solidity & React by [Daniel Joshua Nyaga]
- Powered by Ethereum, Web3.js, and MetaMask
