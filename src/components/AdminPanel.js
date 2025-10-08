import React, { useState } from "react";

function AdminPanel({ contract, accounts, updateCandidates }) {
  const [voterAddress, setVoterAddress] = useState("");
  const [adminMessage, setAdminMessage] = useState("");

  const registerVoter = async () => {
    try {
      await contract.methods.registerVoter(voterAddress).send({ from: accounts[0] });
      setAdminMessage("Voter registered!");
    } catch (err) {
      setAdminMessage("Error: " + err.message);
    }
  };

  const startVoting = async () => {
    try {
      await contract.methods.startVoting().send({ from: accounts[0] });
      setAdminMessage("Voting started!");
    } catch (err) {
      setAdminMessage("Error: " + err.message);
    }
  };

  const endVoting = async () => {
    try {
      await contract.methods.endVoting().send({ from: accounts[0] });
      setAdminMessage("Voting ended!");
    } catch (err) {
      setAdminMessage("Error: " + err.message);
    }
  };

  return (
    <div>
      <h2>Admin Panel</h2>
      <input
        type="text"
        placeholder="Voter address"
        value={voterAddress}
        onChange={(e) => setVoterAddress(e.target.value)}
      />
      <button onClick={registerVoter}>Register Voter</button>
      <button onClick={startVoting}>Start Voting</button>
      <button onClick={endVoting}>End Voting</button>
      <p>{adminMessage}</p>
    </div>
  );
}

export default AdminPanel;