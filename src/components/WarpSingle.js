import React, { useState, useEffect, useContext } from "react";
import SoundContext from "./context/SoundContext";
import { allChars, json, asianLang } from "../util/Constants";
import { LazyLoadImage } from "react-lazy-load-image-component";
import ResizeContext from "./context/ResizeContext";
import { useTranslation } from "react-i18next";
import { AnimatePresence, motion } from "framer-motion";
const trans = require("../assets/data/translations.json");

const baseDelay = 200;
const addDelay = 100;
const WarpSingle = ({
  currentWarp,
  newItems,
  hasFive,
  setNewItems,
  setContent,
}) => {
  const cleanText = (text) => {
    return text
      .replace(/[^\w\s-]/g, "")
      .toLowerCase()
      .replace(/\s+/g, "-");
  };

  const { getWidth, getHeight } = useContext(ResizeContext);
  const { sound, useSound } = useContext(SoundContext);

  const [warpIndex, setWarpIndex] = useState(0);

  const [animateInfo, setAnimateInfo] = useState(false);
  const [animateFancy, setAnimateFancy] = useState(false);
  const [animateFive, setAnimateFive] = useState(false);
  const [firstAnimation, setFirstAnimation] = useState(true);

  const [playThree] = useSound("./assets/audio/sfx/three.mp3", {
    interrupt: true,
  });
  const [playFour] = useSound("./assets/audio/sfx/four.mp3", {
    interrupt: true,
  });
  const [playFive, playFiveData] = useSound("./assets/audio/sfx/five.mp3", {
    interrupt: true,
  });

  const [item, setItem] = useState({
    name: json.getName(currentWarp[0]),
    path: json.getPath(currentWarp[0]),
    element: json.getElement(currentWarp[0]),
    rarity: json.getRarity(currentWarp[0]),
    isChar: allChars.includes(currentWarp[0]),
  });

  useEffect(() => {
    setItem({
      name: json.getName(currentWarp[warpIndex]),
      path: json.getPath(currentWarp[warpIndex]),
      element: json.getElement(currentWarp[warpIndex]),
      rarity: json.getRarity(currentWarp[warpIndex]),
      isChar: allChars.includes(currentWarp[warpIndex]),
    });
    if (json.getRarity(currentWarp[warpIndex]) === 5) setAnimateFive(true);
  }, [currentWarp, warpIndex]);

  useEffect(() => {
    const length = currentWarp.length;
    if (warpIndex === length) {
      if (length === 10) setContent("results");
      else setContent("main");
    }
  }, [warpIndex, currentWarp, setContent]);

  useEffect(() => {
    if (!sound) return;
    if (item.rarity === 3) playThree();
    else if (item.rarity === 4) playFour();
    else playFive();
  }, [item, playFour, playThree, playFive, sound]);

  const nextSingle = () => {
    if (animateInfo) {
      setWarpIndex(warpIndex + 1);
      setAnimateInfo(false);
      setAnimateFancy(false);
      setAnimateFive(false);
      setFirstAnimation(true);
      if (sound) playFiveData.stop();
    }
  };

  const starPrinter = (i) => {
    return (
      <LazyLoadImage
        effect="opacity"
        className="single-stars"
        key={i}
        src="./assets/star.webp"
        alt="star"
        width={`${getWidth(22, 11)}`}
        height={`${getWidth(28, 14)}`}
        star={i + 1}
        draggable="false"
      />
    );
  };

  const textWidth = (text, fontSize = [26, 12]) => {
    const multi = asianLang.includes(i18n.resolvedLanguage)
      ? fontSize[0]
      : fontSize[1];
    return trans[text][i18n.resolvedLanguage].length * multi;
  };

  const { i18n } = useTranslation();

  return (
    <motion.section
      key="single"
      initial={{ filter: "brightness(0)" }}
      animate={{ filter: "brightness(1)" }}
      exit={currentWarp.length === 10 ? { opacity: 0.5 } : {}}
      className="overlay"
      onClick={nextSingle}
      style={{
        backgroundImage: "url(../assets/warp-result.webp)",
      }}
    >
      <div
        className="skip-button"
        onClick={() => {
          if (currentWarp.length === 10) {
            if (sound && hasFive) playFiveData.stop();
            setContent("results");
          } else {
            setContent("main");
            setNewItems([]);
          }
        }}
      >
        <LazyLoadImage
          className="skip-icon"
          effect="opacity"
          draggable="false"
          src="assets/skip.webp"
        />
      </div>
      {animateInfo && (
        <div
          id="single-info"
          style={{
            height: getHeight(115, 550, 55, 240),
            width: getWidth(550, 240),
            animationName: "animate-info",
            animationDuration: "1s",
            animationFillMode: "both",
            animationTimingFunction: "cubic-bezier(.74,.04,.4,.87)",
          }}
        >
          <div
            className="single-info-shadow"
            style={{
              height: getHeight(
                100,
                150 + textWidth(cleanText(item.name)),
                40,
                200
              ),
              width: getWidth(
                150 + textWidth(cleanText(item.name)),
                100 + textWidth(cleanText(item.name), [22, 10])
              ),
            }}
          >
            {item.isChar ? (
              <LazyLoadImage
                effect="opacity"
                className="single-type"
                src={`./assets/elem-${cleanText(item.element)}.webp`}
                alt={item.element}
                height={`${getWidth(90, 50)}`}
                width={`${getWidth(90, 50)}`}
                draggable="false"
              />
            ) : (
              <LazyLoadImage
                effect="opacity"
                className="single-type"
                src={`./assets/path-${cleanText(item.path)}.webp`}
                alt={item.path}
                width={`${getWidth(115, 65)}`}
                draggable="false"
              />
            )}
            <div id="info-pair">
              <div
                className="single-name"
                style={{
                  fontSize: `${getWidth(32, 14)}px`,
                  color: "white",
                  marginTop: 8,
                }}
              >
                {trans[cleanText(item.name)][i18n.resolvedLanguage]}
              </div>
              <div>
                {Array(item.rarity)
                  .fill()
                  .map((e, i) => {
                    return starPrinter(i);
                  })}
              </div>
            </div>
            {newItems.indexOf(cleanText(item.name)) !== -1 && (
              <LazyLoadImage
                effect="opacity"
                alt="new tag"
                src="/assets/new.webp"
                width={getWidth(70, 35)}
                style={{
                  marginLeft: 10,
                  marginBottom: 20,
                }}
              />
            )}
          </div>
          {item.isChar && (
            <div
              className="path-shadow"
              style={{
                width: getWidth(
                  80 + textWidth(cleanText(item.path)),
                  80 + textWidth(cleanText(item.path), [12, 6])
                ),
                height: getHeight(40, 120, 18, 120),
                fontSize: getWidth(26, 10),
              }}
            >
              <LazyLoadImage
                effect="opacity"
                alt={item.path}
                src={`./assets/path-${cleanText(item.path)}.webp`}
                width={getWidth(50, 24)}
              />
              {trans[cleanText(item.path)][i18n.resolvedLanguage]}
            </div>
          )}
        </div>
      )}
      {animateFive && (
        <div className="five-special-container">
          <LazyLoadImage
            className="reveal-path"
            draggable="false"
            effect="opacity"
            src={`./assets/path-${cleanText(item.path)}-lg.webp`}
            alt={item.path}
            onAnimationEnd={() => {
              if (firstAnimation) setFirstAnimation(!firstAnimation);
              else {
                setAnimateFive(false);
                setAnimateFancy(true);
              }
            }}
            style={{
              animation:
                "animate-reveal-path 400ms cubic-bezier(.77,.07,.57,.81) 0s 1 both, animate-out-path 200ms cubic-bezier(.77,.07,.57,.81) 600ms 1 both",
            }}
          />
          <div
            className="reveal-star-group"
            style={{
              animation:
                "animate-reveal-first-group 400ms ease-in-out 0s 1 both",
            }}
          >
            <div
              className="reveal-star-back"
              style={{
                animation: `animate-reveal-back 100ms cubic-bezier(.22,.96,.6,.99) ${baseDelay}ms 1 both`,
              }}
            />
            <LazyLoadImage
              className="reveal-star"
              draggable="false"
              effect="opacity"
              src="./assets/reveal-star.webp"
              alt="Star"
              style={{
                animation:
                  "animate-reveal-star 400ms ease-in-out 0s 1 both, animate-out-small-star 200ms cubic-bezier(.77,.07,.57,.81) 600ms 1 both",
              }}
            />
          </div>
          <div
            className="reveal-star-group"
            style={{
              animation:
                "animate-reveal-second-group 400ms ease-in-out 50ms 1 both",
            }}
          >
            <div
              className="reveal-star-back"
              style={{
                animation: `animate-reveal-back 100ms cubic-bezier(.22,.96,.6,.99) ${
                  baseDelay + addDelay
                }ms 1 both`,
              }}
            />
            <LazyLoadImage
              className="reveal-star"
              draggable="false"
              effect="opacity"
              src="./assets/reveal-star.webp"
              alt="Star"
              style={{
                animation: `animate-reveal-star 400ms ease-in-out ${addDelay}ms 1 both, animate-out-small-star 200ms cubic-bezier(.77,.07,.57,.81) 600ms 1 both`,
              }}
            />
          </div>
          <div
            className="reveal-star-group"
            style={{
              animation:
                "animate-reveal-third-group 400ms ease-in-out 100ms 1 both",
            }}
          >
            <div
              className="reveal-star-back main"
              style={{
                animation: `animate-reveal-back 100ms cubic-bezier(.22,.96,.6,.99) ${
                  baseDelay + 2 * addDelay
                }ms 1 both`,
              }}
            />
            <LazyLoadImage
              className="reveal-star main"
              draggable="false"
              effect="opacity"
              src="./assets/reveal-star.webp"
              alt="Star"
              style={{
                animation: `animate-reveal-star 400ms ease-in-out ${
                  2 * addDelay
                }ms 1 both, animate-out-star 200ms cubic-bezier(.77,.07,.57,.81) 600ms 1 both`,
              }}
            />
          </div>
          <div
            className="reveal-star-group"
            style={{
              animation:
                "animate-reveal-fourth-group 400ms ease-in-out 50ms 1 both",
            }}
          >
            <div
              className="reveal-star-back"
              style={{
                animation: `animate-reveal-back 100ms cubic-bezier(.22,.96,.6,.99) ${
                  baseDelay + addDelay
                }ms 1 both`,
              }}
            />
            <LazyLoadImage
              className="reveal-star"
              effect="opacity"
              draggable="false"
              src="./assets/reveal-star.webp"
              alt="Star"
              style={{
                animation: `animate-reveal-star 400ms ease-in-out ${addDelay}ms 1 both, animate-out-small-star 200ms cubic-bezier(.77,.07,.57,.81) 600ms 1 both`,
              }}
            />
          </div>
          <div
            className="reveal-star-group"
            style={{
              animation:
                "animate-reveal-fifth-group 400ms ease-in-out 0ms 1 both",
            }}
          >
            <div
              className="reveal-star-back"
              style={{
                animation: `animate-reveal-back 100ms cubic-bezier(.22,.96,.6,.99) ${baseDelay}ms 1 both`,
              }}
            />
            <LazyLoadImage
              draggable="false"
              className="reveal-star"
              effect="opacity"
              src="./assets/reveal-star.webp"
              alt="Star"
              style={{
                animation:
                  "animate-reveal-star 400ms ease-in-out 0ms 1 both, animate-out-small-star 200ms cubic-bezier(.77,.07,.57,.81) 600ms 1 both",
              }}
            />
          </div>
        </div>
      )}
      <AnimatePresence initial={false}>
        {currentWarp.map((warp, i) => {
          return item.isChar
            ? i === warpIndex && (!animateFive || item.rarity !== 5) && (
                <motion.div key={warp + i}>
                  <LazyLoadImage
                    effect="opacity"
                    className={`single-item char`}
                    src={`/assets/splash/${cleanText(
                      json.getName(currentWarp[i])
                    )}.webp`}
                    alt={item.name}
                    onAnimationStart={() => {
                      if (item.rarity !== 5) setAnimateFancy(true);
                    }}
                    onAnimationEnd={() => setAnimateInfo(true)}
                    width={getWidth(1800, 900)}
                    draggable="false"
                  />
                </motion.div>
              )
            : i === warpIndex && (!animateFive || item.rarity !== 5) && (
                <motion.div key={warp + i}>
                  <LazyLoadImage
                    effect="opacity"
                    className={`glass back`}
                    src="./assets/glass-back.webp"
                    alt="glass back"
                    width={getWidth(400, 200)}
                    draggable="false"
                  />
                  <LazyLoadImage
                    effect="opacity"
                    className={`single-item weap`}
                    onAnimationStart={() => {
                      if (item.rarity !== 5) setAnimateFancy(true);
                    }}
                    onAnimationEnd={() => setAnimateInfo(true)}
                    alt={currentWarp[i]}
                    src={`/assets/splash/${cleanText(
                      json.getName(currentWarp[i])
                    )}.webp`}
                    // height={getHeight(558.75, 400)}
                    width={getWidth(400, 200)}
                    draggable="false"
                  />
                  <LazyLoadImage
                    effect="opacity"
                    className={`glass front`}
                    src="./assets/glass-front.webp"
                    alt="glass front"
                    width={getWidth(400, 200)}
                    draggable="false"
                  />
                </motion.div>
              );
        })}
      </AnimatePresence>
      <LazyLoadImage
        className={`${animateFancy ? "animation-ring" : "transparent"}`}
        onAnimationEnd={() => setAnimateFancy(false)}
        width={700}
        effect="opacity"
        alt="animation-ring"
        src="assets/animation-ring.webp"
        draggable="false"
        rarity={item.rarity}
      />
      <div
        className={`${animateFancy ? "donut" : "transparent"}`}
        rarity={item.rarity}
      />
      {/* <LazyLoadImage
        className={`${animateFancy ? "light-ray" : "transparent"}`}
        effect="opacity"
        alt="Rays of Light"
        src="assets/test.webp"
        draggable="false"
        rarity={item.rarity}
      /> */}
    </motion.section>
  );
};

export default WarpSingle;
