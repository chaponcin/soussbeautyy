import React, { useRef, useState } from 'react';
import videoFile from '../assets/video.mp4';
import Logovid from '../assets/logovideo.png';

function Home() {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  const togglePlay = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  return (
<div className="flex items-center justify-center min-h-screen bg-transparent text-white space-x-6 px-4">
  {/* Left Text */}
  <div className="flex items-center justify-center w-60">
    <img src={Logovid} alt="Logo" className="w-40 object-contain" />
  </div>

  {/* Video Container */}
  <div className="relative w-full max-w-[600px] overflow-hidden">
    <video
      ref={videoRef}
      src={videoFile}
      autoPlay
      loop
      muted={isMuted}
      playsInline
      controls={false}
      className="w-full"
      onContextMenu={(e) => e.preventDefault()}
    />

    {/* Transparent Controls */}
    <div className="absolute bottom-3 left-3 flex space-x-3">
      {/* Play / Pause */}
      <button
        onClick={togglePlay}
        className="text-white hover:text-green-400 transition"
        aria-label="Toggle Play"
      >
        {isPlaying ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-6.518-3.755A1 1 0 007 8.236v7.528a1 1 0 001.234.97l6.518-1.755A1 1 0 0016 13.06V10.94a1 1 0 00-1.248-.772z" />
          </svg>
        )}
      </button>

      {/* Mute / Unmute */}
      <button
        onClick={toggleMute}
        className="text-white hover:text-yellow-400 transition"
        aria-label="Toggle Mute"
      >
        {isMuted ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 9L5 13H2v-2h3l4-4v8l4-4m0 0L19 19m-6-6l6 6" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5L6 9H2v6h4l5 4V5zM19.07 4.93a10 10 0 010 14.14M16.95 7.05a6 6 0 010 8.48" />
          </svg>
        )}
      </button>
    </div>
  </div>

  {/* Right Text */}
  <div className="flex items-center justify-center w-60">
    <img src={Logovid} alt="Logo" className="w-40 object-contain" />
  </div>
</div>



  );
}

export default Home;
