import React, { useState } from "react";

function VoteForm({ contract, accounts, candidates, updateCandidates }) {
  const [selected, setSelected] = useState(0);
  const [message, setMessage] = useState("");

  const handleVote = async () => {
    try {
      await contract.methods.vote(selected).send({ from: accounts[0] });
      setMessage("Vote submitted!");
      updateCandidates();
    } catch (err) {
      setMessage("Error: " + err.message);
    }
  };

  return (
    <div>
      <h2>Vote</h2>
      <select
        value={selected}
        onChange={(e) => setSelected(e.target.value)}
      >
        {candidates.map((cand, idx) => (
          <option key={idx} value={cand.id || idx}>
            {cand.name}
          </option>
        ))}
      </select>
      <button onClick={handleVote}>Vote</button>
      <p>{message}</p>
    </div>
  );
}

export default VoteForm;