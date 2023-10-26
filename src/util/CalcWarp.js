import { baseWeapons, json } from "./Constants";

const randItem = (pool) => pool[Math.floor(Math.random() * pool.length)];

const chanceFive = (currentPity, maxPity, softPity, baseRate) => {
  if (currentPity < softPity - 1) return baseRate;
  else {
    const maxVal = 1;
    const steps = maxPity - softPity - 1;
    const currentStep = currentPity - softPity;
    const maxValueReached =
      currentStep >= steps
        ? maxVal
        : baseRate + (maxVal - baseRate) * (currentStep / steps);
    return maxValueReached;
  }
};

const chanceFour = (currentPity, baseRate) => {
  return currentPity < 9 ? baseRate : 1;
};

export const CalcWarp = (vers, type, banner, setHasFive, setHasFour) => {
  const warpChance = Math.random();
  const rateUpChance = type.includes("char") ? 0.5 : 0.75;
  const rateUp = Math.random() < rateUpChance ? true : false;
  const char = Math.random() < 0.5;
  let warpItem;
  if (
    warpChance <
    chanceFive(
      banner.pityFive,
      banner.maxPity,
      banner.softPity,
      banner.rateFive
    )
  ) {
    // 5 star
    setHasFive(true);
    banner.pityFive = 0;
    banner.pityFour++;
    if (!(type === "standard" || type === "beginner")) {
      // non-standard banner
      if (rateUp || banner.guaranteeFive) {
        // draw from rateUp
        banner.guaranteeFive = false;
        warpItem = randItem(json.getRateUpFive(vers, type));
      } else {
        // drawing from normal 5 stars
        warpItem = type.includes("weap")
          ? randItem(json.getPoolFiveWeap(vers, type))
          : randItem(json.getPoolFiveChar(vers, type));
        banner.guaranteeFive = true;
      }
    } else {
      if (type === "standard") {
        if (char) warpItem = randItem(json.getPoolFiveChar(vers, type));
        else warpItem = randItem(json.getPoolFiveWeap(vers, type));
      } else warpItem = randItem(json.getPoolFiveChar(vers, type));
    }
  } else if (warpChance < chanceFour(banner.pityFour, banner.rateFour)) {
    // 4 star
    banner.pityFour = 0;
    banner.pityFive++;
    setHasFour(true);
    if (!(type === "standard" || type === "beginner")) {
      // not standard banner
      if (rateUp || banner.guaranteeFour) {
        // draw from rateUp
        banner.guaranteeFour = false;
        warpItem = randItem(json.getRateUpFour(vers, type));
      } else {
        // draw from non rate up
        banner.guaranteeFour = true;
        if (char) warpItem = randItem(json.getPoolFourChar(vers, type));
        else warpItem = randItem(json.getPoolFourWeap(vers, type));
      }
    } else {
      // standard banner
      if (char) warpItem = randItem(json.getPoolFourChar(vers, type));
      else warpItem = randItem(json.getPoolFourWeap(vers, type));
    }
  } else {
    // 3 stars
    banner.pityFive++;
    banner.pityFour++;
    warpItem = randItem(baseWeapons);
  }

  return warpItem;
};
