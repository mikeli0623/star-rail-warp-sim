import { useState, useEffect } from "react";
import Sound from "react-sound";

let fadeInterval;
const useBGM = (
  initialTrack,
  path = "/",
  initialVolume = 100,
  type = ".mp3"
) => {
  useEffect(() => {
    const script1 = document.createElement("script");
    script1.src = "/assets/soundmanager2-nodebug-jsmin.js";
    document.body.appendChild(script1);

    const script2 = document.createElement("script");
    script2.type = "text/javascript";
    script2.async = true;
    script2.innerHTML =
      "soundManager.setup({ debugMode: false, useConsole: false, });";
    document.body.appendChild(script2);

    return () => {
      document.body.removeChild(script1);
      document.body.removeChild(script2);
    };
  }, []);

  const setPath = () => {
    return path + track + type;
  };

  const [track, setTrack] = useState(initialTrack);
  const [volume, setVolume] = useState(initialVolume);
  const [status, setStatus] = useState(Sound.status.PAUSED);
  const [muted, setMuted] = useState(true);
  const [loaded, setLoaded] = useState(false);

  const playBGM = () => setStatus(Sound.status.PLAYING);

  const pauseBGM = () => setStatus(Sound.status.PAUSED);

  // triggers fade
  useEffect(() => {
    if (!muted) playBGM();
    fadeInterval = setInterval(() => {
      setVolume((prev) => prev + (!muted ? 5 : -5));
    }, 50);
    return () => {
      clearInterval(fadeInterval);
    };
  }, [muted]);

  useEffect(() => {
    if (volume <= 0) {
      clearInterval(fadeInterval);
      pauseBGM();
      setVolume(0);
    } else if (volume >= 100) {
      clearInterval(fadeInterval);
      setVolume(100);
    }
  }, [volume]);

  return {
    BGMVolume: volume,
    setBGMVolume: setVolume,
    track,
    setTrack,
    setMuted,
    loaded,
    setLoaded,
    soundComponent: (
      <Sound
        loop
        url={setPath()}
        volume={volume}
        playStatus={status}
        onLoad={() => setLoaded(true)}
      />
    ),
  };
};

export default useBGM;
