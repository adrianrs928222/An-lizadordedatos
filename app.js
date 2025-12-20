import React, { useEffect, useState } from "react";
import MatchCard from "./MatchCard";
import Filters from "./Filters";
import './index.css';

export default function App() {
  const [matches, setMatches] = useState([]);
  const [filteredMatches, setFilteredMatches] = useState([]);
  const [filters, setFilters] = useState({liga: "Todas", fecha: "Todas"});

  useEffect(() => {
    const ws = new WebSocket("ws://127.0.0.1:8000/ws");
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setMatches(data);
    };
    return () => ws.close();
  }, []);

  useEffect(() => {
    let fMatches = matches;
    if(filters.liga !== "Todas") fMatches = fMatches.filter(m => m.liga === filters.liga);
    if(filters.fecha !== "Todas") fMatches = fMatches.filter(m => m.fecha === filters.fecha);
    setFilteredMatches(fMatches);
  }, [filters, matches]);

  return (
    <div className="bg-gray-900 min-h-screen text-white p-6">
      <h1 className="text-4xl font-bold mb-6">Mi Bet365 Web PRO Nivel Dios 😎</h1>
      <Filters filters={filters} setFilters={setFilters}/>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
        {filteredMatches.map((match, idx) => <MatchCard key={idx} match={match}/>)}
      </div>
    </div>
  );
}
