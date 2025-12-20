import React from "react";

export default function SearchBar({ setSearch }) {
  return (
    <div style={{ textAlign: "center", marginBottom: "20px" }}>
      <input
        type="text"
        placeholder="Buscar equipo..."
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
}