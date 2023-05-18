import { useContext, useState, useEffect } from "react";
import SoundContext from "./SoundContext";
import CloseButton from "./CloseButton";
import { AdvancedVideo } from "@cloudinary/react";
import { CloudinaryVideo } from "@cloudinary/url-gen";

const WarpVideo = ({ onEnded, event, mainBGM, warpBGM, rarity }) => {
  const { sound } = useContext(SoundContext);
  const [loaded, setLoaded] = useState(false);

  const video = new CloudinaryVideo(`${event ? "event" : "normal"}-${rarity}`, {
    cloudName: "hbhhi",
  });

  useEffect(() => {
    if (!loaded || !sound) return;
    mainBGM.mainData.sound.fade(1, 0, 500);
    let mainTimeout = setTimeout(() => {
      mainBGM.mainData.pause();
    }, 500);
    let warpTimeout = setTimeout(
      () => {
        warpBGM.playWarpBGM();
        warpBGM.warpData.sound.fade(0, 1, 1500);
      },
      rarity === "five" ? 15500 : 14000
    );
    return () => {
      clearTimeout(mainTimeout);
      clearTimeout(warpTimeout);
    };
  }, [loaded, sound, mainBGM, warpBGM, rarity]);

  return (
    <section id="video-container">
      <CloseButton onClose={onEnded} />
      <AdvancedVideo
        cldVid={video}
        autoPlay
        onEnded={onEnded}
        muted={!sound}
        onCanPlayThrough={(e) => {
          if (sound) {
            e.target.volume = 0.5;
            setLoaded(true);
          }
        }}
      />
    </section>
  );
};

export default WarpVideo;
