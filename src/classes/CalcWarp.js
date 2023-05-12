import { baseWeapons, json } from "./Constants";

const randItem = (pool) => pool[Math.floor(Math.random() * pool.length)];

export const CalcWarp = (vers, type, banner, setHasFive, setHasFour) => {
  const warpChance = Math.random();
  const rateUpChance = type === "char" ? 0.5 : 0.75;
  const rateUp = Math.random() < rateUpChance ? true : false;
  let warpItem;
  if (warpChance < banner.rateFive || banner.pityFive >= banner.maxPity - 1) {
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
        warpItem =
          type === "weap"
            ? randItem(json.getPoolFiveWeap(vers, type))
            : randItem(json.getPoolFiveChar(vers, type));
        banner.guaranteeFive = true;
      }
    } else {
      if (type === "standard") {
        if (warpChance < banner.rateFive / 2)
          warpItem = randItem(json.getPoolFiveChar(vers, type));
        else warpItem = randItem(json.getPoolFiveWeap(vers, type));
      } else warpItem = randItem(json.getPoolFiveChar(vers, type));
    }
  } else if (warpChance < banner.rateFour || banner.pityFour >= 9) {
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
        if (warpChance < banner.rateFour / 2)
          warpItem = randItem(json.getPoolFourChar(vers, type));
        else warpItem = randItem(json.getPoolFourWeap(vers, type));
      }
    } else {
      // standard banner
      if (warpChance < banner.rateFour / 2)
        warpItem = randItem(json.getPoolFourChar(vers, type));
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
