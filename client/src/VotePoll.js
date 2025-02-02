import React, { useState } from "react";
import { getContract } from "./web3";

export default function VotePoll({ pollId }) {
  const [candidate, setCandidate] = useState("");
  const [loading, setLoading] = useState(false);

  const handleVote = async () => {
    try {
      setLoading(true);
      const contract = await getContract();
      const tx = await contract.vote(pollId, candidate);
      await tx.wait();
      alert("Голос учтен!");
    } catch (error) {
      console.error(error);
      alert("Ошибка при голосовании");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Голосование</h2>
      <input
        type="text"
        placeholder="Имя кандидата"
        value={candidate}
        onChange={(e) => setCandidate(e.target.value)}
      />
      <br />
      <button onClick={handleVote} disabled={loading}>
        {loading ? "Отправка..." : "Голосовать"}
      </button>
    </div>
  );
}
