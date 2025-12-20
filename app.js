import React, { useEffect, useState } from "react";
import MatchCards from "./MatchCards.jsx";
import Filters from "./Filters.jsx";
import SearchBar from "./SearchBar.jsx";
import ReactDOM from "react-dom";

function App() {
  const [matches, setMatches] = useState([]);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const ws = new WebSocket("wss://analizadordedatos.onrender.com/ws");
    ws.onmessage = (event) => {
      setMatches(JSON.parse(event.data));
    };
    ws.onerror = (err) => console.error("WebSocket error:", err);
    return () => ws.close();
  }, []);

  const filteredMatches = matches
    .filter((m) => {
      if (filter === "ambos_si") return m.ambos_marcan === "Sí";
      if (filter === "mas_goles") return m.mas_menos === "Más de 2,5 goles";
      return true;
    })
    .filter((m) =>
      m.local.toLowerCase().includes(search.toLowerCase()) ||
      m.visitante.toLowerCase().includes(search.toLowerCase())
    );

  return (
    <div style={{ padding: "20px" }}>
      <h1>Análisis Deportivo IA Ultra Pro</h1>
      <SearchBar setSearch={setSearch} />
      <Filters setFilter={setFilter} />
      {filteredMatches.map((match, index) => (
        <MatchCards key={index} match={match} />
      ))}
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));