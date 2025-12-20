import React, { useEffect, useState } from "react";
import MatchCard from "./MatchCard";
import './index.css';

export default function App() {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/matches")
      .then(res => res.json())
      .then(data => setMatches(data));
  }, []);

  return (
    <div className="bg-gray-900 min-h-screen text-white p-6">
      <h1 className="text-4xl font-bold mb-6">Mi Bet365 Web Ultra Profesional</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {matches.map((match, idx) => (
          <MatchCard key={idx} match={match} />
        ))}
      </div>
    </div>
  );
}