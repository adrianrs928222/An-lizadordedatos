import React, { useState } from "react";

export default function MatchCard({ match }) {
  const [hover, setHover] = useState(false);

  const bestCuota = Math.max(match.cuota_local, match.cuota_empate, match.cuota_visitante);

  return (
    <div className="bg-gray-800 rounded-lg p-4 shadow-lg relative hover:scale-105 transition-transform duration-200"
         onMouseEnter={()=>setHover(true)} onMouseLeave={()=>setHover(false)}>
      <h2 className="text-xl font-bold mb-2">{match.local} vs {match.visitante}</h2>
      <p className={`mb-1 ${match.cuota_local===bestCuota?'text-success':''}`}>
        Victoria local: {match.cuota_local}
      </p>
      <p className={`mb-1 ${match.cuota_empate===bestCuota?'text-success':''}`}>
        Empate: {match.cuota_empate}
      </p>
      <p className={`mb-1 ${match.cuota_visitante===bestCuota?'text-success':''}`}>
        Victoria visitante: {match.cuota_visitante}
      </p>

      <p className="text-green-400 mb-1">
        Prob IA: Local {match.prob_IA_local}% | Empate {match.prob_IA_empate}% | Visitante {match.prob_IA_visitante}%
      </p>
      <p className="mb-1">{match.mas_menos}</p>
      <p className="mb-1">Ambos marcan: {match.ambos_marcan}</p>

      {hover && (
        <div className="absolute top-0 left-0 bg-gray-700 p-2 rounded-lg text-sm mt-24 shadow-lg z-10">
          <h3 className="font-semibold mb-1">Mejores cuotas por casa:</h3>
          {Object.entries(match.mejores_cuotas).map(([casa, cuotas], idx)=>(
            <p key={idx}>{casa}: {cuotas.join(' | ')}</p>
          ))}
        </div>
      )}
    </div>
  )
}