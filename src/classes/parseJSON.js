import { allChars } from "../classes/Constants";

const cleanText = (text) => {
  return text
    .replace(/[^\w\s-]/g, "")
    .toLowerCase()
    .replace(/\s+/g, "-");
};

class ParseJSON {
  constructor() {
    this.charJSON = require(`../assets/data/char.json`);
    this.weaponJSON = require(`../assets/data/weapons.json`);
    this.bannerJSON = require(`../assets/data/banners.json`);
  }
  isChar(item) {
    if (allChars.includes(item)) return true;
    return false;
  }
  getName(item) {
    const json = this.isChar(item) ? this.charJSON : this.weaponJSON;
    for (const key of json) if (cleanText(key.name) === item) return key.name;
  }
  getRarity(item) {
    const json = this.isChar(item) ? this.charJSON : this.weaponJSON;
    for (const key of json) if (cleanText(key.name) === item) return key.rarity;
  }
  getTitle(vers, type) {
    for (const key of this.bannerJSON) {
      if (key.vers.includes(vers) && key.type === type) return key.title;
    }
  }
  getRateUpFive(vers, type) {
    for (const key of this.bannerJSON) {
      if (key.vers.includes(vers) && key.type === type) return key.rateUpFive;
    }
  }
  getRateUpFour(vers, type) {
    for (const key of this.bannerJSON) {
      if (key.vers.includes(vers) && key.type === type) return key.rateUpFour;
    }
  }
  getPoolFiveChar(vers, type) {
    for (const key of this.bannerJSON) {
      if (key.vers.includes(vers) && key.type === type) return key.poolFiveChar;
    }
  }
  getPoolFiveWeap(vers, type) {
    for (const key of this.bannerJSON) {
      if (key.vers.includes(vers) && key.type === type) return key.poolFiveWeap;
    }
  }
  getPoolFourChar(vers, type) {
    for (const key of this.bannerJSON) {
      if (key.vers.includes(vers) && key.type === type) return key.poolFourChar;
    }
  }
  getPoolFourWeap(vers, type) {
    for (const key of this.bannerJSON) {
      if (key.vers.includes(vers) && key.type === type) return key.poolFourWeap;
    }
  }
}

export default ParseJSON;
