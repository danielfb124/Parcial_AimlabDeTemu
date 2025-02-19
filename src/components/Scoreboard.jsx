import React, { useState, useEffect } from 'react'
import './Scoreboard.css'

function Scoreboard({ score, onBackToMenu }) {
  const [playerName, setPlayerName] = useState('')
  const [scores, setScores] = useState(() => {
    const saved = localStorage.getItem('highScores')
    return saved ? JSON.parse(saved) : []
  })
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('highScores')
    if (saved) {
      const parsedScores = JSON.parse(saved)
      setScores(parsedScores.sort((a, b) => b.score - a.score).slice(0, 10))
    }
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (playerName.trim() && score > 0) {
      const newScore = { name: playerName.trim(), score, date: new Date().toISOString() }
      const newScores = [...scores, newScore]
        .sort((a, b) => b.score - a.score)
        .slice(0, 10)
      setScores(newScores)
      localStorage.setItem('highScores', JSON.stringify(newScores))
      setSubmitted(true)
    }
  }

  return (
    <div className="scoreboard">
      <h2>TOP</h2>
      {!submitted && score > 0 && (
        <form onSubmit={handleSubmit} className="name-form">
          <input
            type="text"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            placeholder="INGRESE SU NOMBRE"
            maxLength={10}
            required
          />
          <button type="submit">GUARDAR PUNTAJE</button>
        </form>
      )}
      <div className="scores-table">
        <div className="score-header">
          <span>POSICION</span>
          <span>NOMBRE</span>
          <span>PUNTAJE</span>
        </div>
        {scores.map((entry, index) => (
          <div key={index} className="score-row">
            <span>{index + 1}</span>
            <span>{entry.name}</span>
            <span>{entry.score}</span>
          </div>
        ))}
      </div>
      <button onClick={onBackToMenu} className="menu-button">
        VOLVER AL MENU
      </button>
    </div>
  )
}

export default Scoreboard