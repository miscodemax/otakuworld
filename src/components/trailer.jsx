import React, { useRef, useState } from "react"
import ReactPlayer from "react-player"

export default function Trailer({ url }) {
  const playerRef = useRef(null)
  const containerRef = useRef(null)

  const [isPlaying, setIsPlaying] = useState(true)
  const [isMuted, setIsMuted] = useState(true)
  const [volume, setVolume] = useState(0.5)

  const togglePlay = () => setIsPlaying(prev => !prev)
  const toggleMute = () => setIsMuted(prev => !prev)

  const handleFullscreen = () => {
    const container = containerRef.current
    if (container.requestFullscreen) {
      container.requestFullscreen()
    } else if (container.webkitRequestFullscreen) {
      container.webkitRequestFullscreen()
    } else if (container.msRequestFullscreen) {
      container.msRequestFullscreen()
    }
  }

  return (
    <div className="w-full flex flex-col items-center py-10 px-4 bg-gray-900">
      <div
        ref={containerRef}
        className="relative w-full max-w-4xl aspect-video rounded-2xl overflow-hidden shadow-lg border border-gray-700"
      >
        <ReactPlayer
          ref={playerRef}
          url={url}
          playing={isPlaying}
          muted={isMuted}
          volume={volume}
          controls={false}
          width="100%"
          height="100%"
        />
        <div className="absolute bottom-2 left-2 text-white text-xs bg-black/60 px-2 py-1 rounded">
          🎬 Bande-annonce personnalisée
        </div>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-4">
        <button
          onClick={togglePlay}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          {isPlaying ? "Pause" : "Lecture"}
        </button>

        <button
          onClick={toggleMute}
          className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition"
        >
          {isMuted ? "Activer le son" : "Muet"}
        </button>

        <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={volume}
          onChange={(e) => setVolume(parseFloat(e.target.value))}
          className="w-32"
        />
        <span className="text-white text-sm">Volume: {(volume * 100).toFixed(0)}%</span>

        <button
          onClick={handleFullscreen}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
        >
          Plein écran
        </button>
      </div>
    </div>
  )
}
