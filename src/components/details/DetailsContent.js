import { json } from "../../util/Constants";
import useSound from "use-sound";
import SoundContext from "../SoundContext";
import ResizeContext from "../ResizeContext";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { LazyLoadImage } from "react-lazy-load-image-component";
import DetailsTable from "./DetailsTable";
import React from "react";
import RateCard from "./RateCard";

export default function DetailsContent({ vers, bannerType }) {
  const { t, i18n } = useTranslation();
  const rateFiveChar =
    bannerType === "char" ? json.getRateUpFive(vers, bannerType) : [];
  const rateFiveWeap =
    bannerType === "weap" ? json.getRateUpFive(vers, bannerType) : [];
  const rateFourChar =
    bannerType === "char" ? json.getRateUpFour(vers, bannerType) : [];
  const rateFourWeap =
    bannerType === "weap" ? json.getRateUpFour(vers, bannerType) : [];
  const poolFiveChar = json.getPoolFiveChar(vers, bannerType);
  const poolFiveWeap = json.getPoolFiveWeap(vers, bannerType);
  const poolFourChar = json.getPoolFourChar(vers, bannerType);
  const poolFourWeap = json.getPoolFourWeap(vers, bannerType);
  return (
    <div className="d-flex flex-column align-items-start">
      <p className="px-5" style={{ fontWeight: "bold" }}>
        {json.getTitle(vers, bannerType, i18n.resolvedLanguage)}
      </p>
      <div className="px-5 w-100">
        {(rateFiveChar || rateFiveWeap) && (
          <div>
            <div className="d-flex">
              {rateFiveChar.map((item) => {
                return <RateCard item={item} rarity={5} type="char" />;
              })}
            </div>
            <div className="d-flex">
              {rateFiveWeap.map((item) => {
                return <RateCard item={item} rarity={5} type="weap" />;
              })}
            </div>
            <div className="d-flex">
              {rateFourChar.map((item) => {
                return <RateCard item={item} rarity={4} type="char" />;
              })}
            </div>
            <div className="d-flex">
              {rateFourWeap.map((item) => {
                return <RateCard item={item} rarity={4} type="weap" />;
              })}
            </div>
          </div>
        )}
        {poolFiveChar && (
          <DetailsTable
            items={rateFiveChar.concat(poolFiveChar)}
            rateUp={rateFiveChar}
            type={t("db.type2")}
          />
        )}
        <DetailsTable
          items={rateFourChar.concat(poolFourChar)}
          rateUp={rateFourChar}
          type={t("db.type2")}
        />
        {poolFiveWeap && (
          <DetailsTable
            items={rateFiveWeap.concat(poolFiveWeap)}
            rateUp={rateFiveWeap}
            type={t("db.type1")}
          />
        )}
        <DetailsTable
          items={rateFourWeap.concat(poolFourWeap)}
          rateUp={rateFourWeap}
          type={t("db.type1")}
        />
      </div>
    </div>
  );
}
