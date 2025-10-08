import React from "react";

function CandidateList({ candidates }) {
  return (
    <div>
      <h2>Candidates</h2>
      <ul>
        {candidates.map((cand, idx) => (
          <li key={idx}>
            {cand.name} — Votes: {cand.voteCount}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CandidateList;