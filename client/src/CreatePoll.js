import React, { useState } from "react";
import { getContract } from "./web3";

export default function CreatePoll() {
  const [name, setName] = useState("");
  const [candidates, setCandidates] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCreatePoll = async () => {
    try {
      setLoading(true);
      const contract = await getContract();
      // Предполагаем, что кандидаты разделены запятыми
      const candidatesArray = candidates.split(",").map(candidate => candidate.trim());
      const tx = await contract.createPoll(name, candidatesArray);
      await tx.wait();
      alert("Голосование создано!");
    } catch (error) {
      console.error(error);
      alert("Ошибка при создании голосования");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Создать голосование</h2>
      <input
        type="text"
        placeholder="Название голосования"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <br />
      <textarea
        placeholder="Кандидаты (через запятую)"
        value={candidates}
        onChange={(e) => setCandidates(e.target.value)}
      ></textarea>
      <br />
      <button onClick={handleCreatePoll} disabled={loading}>
        {loading ? "Создание..." : "Создать"}
      </button>
    </div>
  );
}
