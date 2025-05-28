import React, { useRef, useState, useEffect, useLayoutEffect, useState as useReactState } from 'react';
import videoFile from '../assets/video.mp4';
import Logovid from '../assets/logoo.png';

function Home() {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [videoHeight, setVideoHeight] = useReactState(0);

  // Try autoplay with sound, fallback to muted
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = false;
      videoRef.current.play()
        .then(() => {
          setIsPlaying(true);
          setIsMuted(false);
        })
        .catch((err) => {
          console.warn('Autoplay with sound blocked, muting video:', err);
          videoRef.current.muted = true;
          videoRef.current.play()
            .then(() => {
              setIsPlaying(true);
              setIsMuted(true);
            })
            .catch((err2) => {
              console.error('Muted autoplay also failed:', err2);
            });
        });
    }
  }, []);

  // Update height to match video
  useLayoutEffect(() => {
    const updateHeight = () => {
      if (videoRef.current && containerRef.current) {
        setVideoHeight(videoRef.current.clientHeight);
      }
    };
    updateHeight();

    window.addEventListener('resize', updateHeight);
    return () => window.removeEventListener('resize', updateHeight);
  }, []);

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
    <div
      ref={containerRef}
      style={{ backgroundColor: 'black', height: videoHeight }}
      className="flex items-center justify-center w-full px-4 space-x-6 text-white overflow-hidden"
    >
      {/* Left Logo */}
      <div className="flex items-center justify-center w-60">
        <img src={Logovid} alt="Logo" className="w-40 object-contain" />
      </div>

      {/* Video Container */}
      <div className="relative w-full max-w-[400px] bg-black overflow-hidden">
        <video
          ref={videoRef}
          src={videoFile}
          autoPlay
          loop
          playsInline
          controls={false}
          className="w-full h-auto block"
          onContextMenu={(e) => e.preventDefault()}
          onLoadedMetadata={() => {
            if (videoRef.current) {
              setVideoHeight(videoRef.current.clientHeight);
            }
          }}
        />

        {/* Custom Controls */}
        <div className="absolute bottom-3 left-3 flex space-x-4">
          {/* Play / Pause */}
          <button
            onClick={togglePlay}
            className="text-white hover:text-green-400 transition"
            aria-label="Toggle Play"
          >
            {isPlaying ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path d="M6 4h2v12H6V4zm6 0h2v12h-2V4z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path d="M4.5 3.5v13l11-6.5-11-6.5z" />
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
              // Muted Icon (speaker with X)
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M4 9v6h4l5 5V4l-5 5H4zm15.707-2.707a1 1 0 10-1.414-1.414L16 7.586l-2.293-2.293a1 1 0 00-1.414 1.414L14.586 9l-2.293 2.293a1 1 0 101.414 1.414L16 10.414l2.293 2.293a1 1 0 101.414-1.414L17.414 9l2.293-2.293z" />
              </svg>
            ) : (
              // Unmuted Icon (speaker with waves)
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M5 9v6h4l5 5V4l-5 5H5zm10.54 2.46a5 5 0 000-7.07 1 1 0 011.41-1.41 7 7 0 010 9.89 1 1 0 01-1.41-1.41zm2.83 2.83a9 9 0 000-12.73 1 1 0 111.41-1.41 11 11 0 010 15.55 1 1 0 11-1.41-1.41z"/>
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Right Logo */}
      <div className="flex items-center justify-center w-60">
        <img src={Logovid} alt="Logo" className="w-40 object-contain" />
      </div>
    </div>
  );
}

export default Home;
