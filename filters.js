import React from "react";

export default function Filters({filters, setFilters}) {
  return (
    <div className="flex gap-4 mb-4">
      <select className="bg-gray-800 p-2 rounded" 
              value={filters.liga} 
              onChange={e => setFilters({...filters, liga:e.target.value})}>
        <option>Todas</option>
        <option>LaLiga</option>
        <option>Premier League</option>
      </select>
      <select className="bg-gray-800 p-2 rounded" 
              value={filters.fecha} 
              onChange={e => setFilters({...filters, fecha:e.target.value})}>
        <option>Todas</option>
        <option>Hoy</option>
        <option>Este fin de semana</option>
      </select>
    </div>
  )
}
