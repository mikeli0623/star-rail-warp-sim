import { allChars } from "../util/Constants";

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
  getPath(item, lang = "en") {
    const json = this.isChar(item) ? this.charJSON : this.weaponJSON;
    for (const key of json) if (cleanText(key.name) === item) return key.path;
  }
  getElement(name) {
    for (const key of this.charJSON)
      if (cleanText(key.name) === name) return key.element;
    return "";
  }
  getTitle(vers, type, lang = "en") {
    for (const key of this.bannerJSON) {
      if (key.vers.includes(vers) && key.type === type) return key.title[lang];
    }
  }
  getRateUpFive(vers, type) {
    for (const key of this.bannerJSON) {
      if (key.vers.includes(vers) && key.type === type) return key.rateUpFive;
    }
    return [];
  }
  getRateUpFour(vers, type) {
    for (const key of this.bannerJSON) {
      if (key.vers.includes(vers) && key.type === type) return key.rateUpFour;
    }
    return [];
  }
  getPoolFiveChar(vers, type) {
    for (const key of this.bannerJSON) {
      if (key.vers.includes(vers) && key.type === type) return key.poolFiveChar;
    }
    return [];
  }
  getPoolFiveWeap(vers, type) {
    for (const key of this.bannerJSON) {
      if (key.vers.includes(vers) && key.type === type) return key.poolFiveWeap;
    }
    return [];
  }
  getPoolFourChar(vers, type) {
    for (const key of this.bannerJSON) {
      if (key.vers.includes(vers) && key.type === type) return key.poolFourChar;
    }
    return [];
  }
  getPoolFourWeap(vers, type) {
    for (const key of this.bannerJSON) {
      if (key.vers.includes(vers) && key.type === type) return key.poolFourWeap;
    }
    return [];
  }
  getColour(vers) {
    for (const key of this.bannerJSON) {
      if (
        key.vers.includes(vers) &&
        !["standard", "beginner"].includes(key.type)
      )
        return key["colour-type"];
    }
    return null;
  }
  getRerun(vers) {
    for (const key of this.bannerJSON) {
      if (key.vers.includes(vers) && key.type.includes("rerun"))
        return key["rerun-of"];
    }
    return null;
  }
  checkRerun(vers) {
    for (const key of this.bannerJSON) {
      if (key.vers.includes(vers) && key.type.includes("rerun")) return true;
    }
    return false;
  }
}

export default ParseJSON;
