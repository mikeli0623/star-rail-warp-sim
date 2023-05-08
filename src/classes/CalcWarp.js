import { baseWeapons, json } from "./Constants";

const randItem = (pool) => pool[Math.floor(Math.random() * pool.length)];

export const CalcWarp = (vers, banner, setHasFive) => {
  const warpChance = Math.random();
  const rateUp = Math.random() < 0.5 ? true : false;
  let warpItem;
  const bannerType = banner.type;
  if (warpChance < banner.rateFive || banner.pityFive >= banner.maxPity - 1) {
    // 5 star
    setHasFive(true);
    banner.pityFive = 0;
    banner.pityFour++;
    if (!(bannerType === "standard")) {
      // non-standard banner
      if (rateUp || banner.guaranteeFive) {
        // draw from rateUp
        banner.guaranteeFive = false;
        warpItem = randItem(json.getRateUpFive(vers, bannerType));
      } else {
        // drawing from normal 5 stars
        warpItem =
          bannerType === "weap-event"
            ? randItem(json.getPoolFiveWeap(vers, bannerType))
            : randItem(json.getPoolFiveChar(vers, bannerType));
        banner.guaranteeFive = true;
      }
    } else {
      // standard banner
      if (warpChance < banner.rateFive / 2)
        warpItem = randItem(json.getPoolFiveChar(vers, bannerType));
      else warpItem = randItem(json.getPoolFiveWeap(vers, bannerType));
    }
  } else if (warpChance < banner.rateFour || banner.pityFour >= 9) {
    // 4 star
    setHasFive(false);
    banner.pityFour = 0;
    banner.pityFive++;
    if (!(bannerType === "standard")) {
      // not standard banner
      if (rateUp || banner.guaranteeFour) {
        // draw from rateUp
        banner.guaranteeFour = false;
        warpItem = randItem(json.getRateUpFour(vers, bannerType));
      } else {
        // draw from non rate up
        banner.guaranteeFour = true;
        if (warpChance < banner.rateFour / 2)
          warpItem = randItem(json.getPoolFourChar(vers, bannerType));
        else warpItem = randItem(json.getPoolFourWeap(vers, bannerType));
      }
    } else {
      // standard banner
      if (warpChance < banner.rateFour / 2)
        warpItem = randItem(json.getPoolFourChar(vers, bannerType));
      else warpItem = randItem(json.getPoolFourWeap(vers, bannerType));
    }
  } else {
    // 3 stars
    banner.pityFive++;
    banner.pityFour++;
    warpItem = randItem(baseWeapons);
  }
  return warpItem;
};
