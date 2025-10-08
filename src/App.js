import React, { useEffect, useState } from "react";
import getWeb3 from "./utils/getWeb3";
import VotingContract from "./contracts/Voting.json";
import CandidateList from "./components/CandidateList";
import VoteForm from "./components/VoteForm";
import AdminPanel from "./components/AdminPanel";

function App() {
  const [web3, setWeb3] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [contract, setContract] = useState(null);
  const [candidates, setCandidates] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);

  const contractAddress = VotingContract.address; // Replace with your contract address

  useEffect(() => {
    const init = async () => {
      const web3Instance = await getWeb3();
      setWeb3(web3Instance);

      const accs = await web3Instance.eth.getAccounts();
      setAccounts(accs);

      const instance = new web3Instance.eth.Contract(
        VotingContract.abi,
        contractAddress
      );
      setContract(instance);

      const candidatesData = await instance.methods.getCandidates().call();
      setCandidates(candidatesData);

      const adminAddr = await instance.methods.admin().call();
      setIsAdmin(accs[0].toLowerCase() === adminAddr.toLowerCase());
    };
    init();
  }, [contractAddress]);

  const updateCandidates = async () => {
    if (contract) {
      const candidatesData = await contract.methods.getCandidates().call();
      setCandidates(candidatesData);
    }
  };

  if (!web3) return <div>Loading Web3, accounts, and contract...</div>;

  return (
    <div>
      <h1>Blockchain Voting DApp</h1>
      {isAdmin && (
        <AdminPanel contract={contract} accounts={accounts} updateCandidates={updateCandidates} />
      )}
      <CandidateList candidates={candidates} />
      <VoteForm contract={contract} accounts={accounts} candidates={candidates} updateCandidates={updateCandidates} />
    </div>
  );
}

export default App;