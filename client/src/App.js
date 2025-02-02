import React from "react";
import { BrowserRouter as Router, Routes, Route, Link, useParams } from "react-router-dom";
import CreatePoll from "./CreatePoll";
import VotePoll from "./VotePoll";

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Создать голосование</Link>
            </li>
            <li>
              <Link to="/vote/0">Голосовать</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<CreatePoll />} />
          {/* Здесь для простоты голосование всегда идёт по pollId = 0 */}
          <Route path="/vote/:pollId" element={<VotePollWrapper />} />
        </Routes>
      </div>
    </Router>
  );
}

// Обёртка для получения параметра pollId
function VotePollWrapper() {
  const { pollId } = useParams();
  return <VotePoll pollId={pollId} />;
}

export default App;
