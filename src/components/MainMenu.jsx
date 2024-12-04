import React from 'react'
import './MainMenu.css'

function MainMenu({ onStartGame, onViewScores }) {
  return (
    <div className="main-menu">
      <h1>AimLab De Temu</h1>
      <div className="menu-buttons">
        <button onClick={onStartGame}>INICIAR JUEGO</button>
        <button onClick={onViewScores}>VER PUNTAJES</button>
      </div>
    </div>
  )
}

export default MainMenu