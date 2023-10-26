import { useContext } from "react";
import { json } from "../../util/Constants";
import ResizeContext from "../context/ResizeContext";
import { baseWeapons } from "../../util/Constants";
import { useTranslation } from "react-i18next";
import DetailsTable from "./DetailsTable";
import React from "react";
import RateCard from "./RateCard";
import DetailHeader from "./DetailHeader";
import DetailInfo from "./DetailInfo";

export default function DetailsContent({ vers, bannerType, title }) {
  const { t } = useTranslation();
  const { getWidth } = useContext(ResizeContext);
  const rateFiveChar = bannerType.includes("char")
    ? json.getRateUpFive(vers, bannerType)
    : [];
  const rateFiveWeap = bannerType.includes("weap")
    ? json.getRateUpFive(vers, bannerType)
    : [];
  const rateFourChar = bannerType.includes("char")
    ? json.getRateUpFour(vers, bannerType)
    : [];
  const rateFourWeap = bannerType.includes("weap")
    ? json.getRateUpFour(vers, bannerType)
    : [];
  const poolFiveChar = json.getPoolFiveChar(vers, bannerType);
  const poolFiveWeap = json.getPoolFiveWeap(vers, bannerType);
  const poolFourChar = json.getPoolFourChar(vers, bannerType);
  const poolFourWeap = json.getPoolFourWeap(vers, bannerType);
  return (
    <div className="d-flex flex-column align-items-start">
      <p
        className="mt-2 mb-0"
        style={{
          fontWeight: "bold",
          fontSize: getWidth(40, 22),
          padding: `0 ${getWidth(50)}px`,
        }}
      >
        {title}
      </p>
      {(rateFiveChar.length > 0 || rateFiveWeap.length > 0) && (
        <DetailHeader title={t("table.tag1")} />
      )}
      <div className="w-100" style={{ padding: `0 ${getWidth(50)}px` }}>
        {(rateFiveChar.length > 0 || rateFiveWeap.length > 0) && (
          <div>
            <DetailInfo
              text={t("table.drop1")}
              rarity={5}
              chance={bannerType.includes("weap") ? " 75%" : " 50%"}
            />
            <div className="d-flex flex-wrap">
              {rateFiveChar.map((item) => {
                return (
                  <RateCard
                    key={item}
                    item={item}
                    rarity={5}
                    path={json.getPath(item).toLowerCase().replace(/ /g, "-")}
                    elem={json
                      .getElement(item)
                      .toLowerCase()
                      .replace(/ /g, "-")}
                    type="char"
                  />
                );
              })}
            </div>
            <div className="d-flex flex-wrap">
              {rateFiveWeap.map((item) => {
                return (
                  <RateCard
                    key={item}
                    item={item}
                    rarity={5}
                    path={json.getPath(item).toLowerCase().replace(/ /g, "-")}
                    type="weap"
                  />
                );
              })}
            </div>
            <DetailInfo text={t("table.drop2")} rarity={4} chance={" 50%"} />
            <div className="d-flex flex-wrap">
              {rateFourChar.map((item) => {
                return (
                  <RateCard
                    key={item}
                    item={item}
                    rarity={4}
                    elem={json
                      .getElement(item)
                      .toLowerCase()
                      .replace(/ /g, "-")}
                    path={json.getPath(item).toLowerCase().replace(/ /g, "-")}
                    type="char"
                  />
                );
              })}
            </div>
            <div className="d-flex flex-wrap">
              {rateFourWeap.map((item) => {
                return (
                  <RateCard
                    key={item}
                    item={item}
                    rarity={4}
                    path={json.getPath(item).toLowerCase().replace(/ /g, "-")}
                    type="weap"
                  />
                );
              })}
            </div>
          </div>
        )}
      </div>
      <DetailHeader title={t("table.tag2")} />
      <div className="w-100" style={{ padding: `0 ${getWidth(50)}px` }}>
        <DetailInfo
          text={[t("table.list1"), t("table.guarantee")]}
          rarity={5}
          chance={[
            bannerType.includes("char") ? "0.600" : "0.800",
            bannerType.includes("char") ? "1.600" : "1.870",
          ]}
        />
        {poolFiveChar && (
          <DetailsTable
            items={rateFiveChar.concat(poolFiveChar)}
            rateUp={rateFiveChar}
            type={t("db.type2")}
          />
        )}

        {poolFiveWeap && (
          <DetailsTable
            items={rateFiveWeap.concat(poolFiveWeap)}
            rateUp={rateFiveWeap}
            type={t("db.type1")}
          />
        )}
        <DetailInfo
          text={[t("table.list2"), t("table.guarantee")]}
          rarity={4}
          chance={[
            bannerType.includes("char") ? "5.100" : "6.600",
            bannerType.includes("char") ? "13.000" : "14.800",
          ]}
        />
        <DetailsTable
          items={rateFourChar.concat(poolFourChar)}
          rateUp={rateFourChar}
          type={t("db.type2")}
        />
        <DetailsTable
          items={rateFourWeap.concat(poolFourWeap)}
          rateUp={rateFourWeap}
          type={t("db.type1")}
        />
        <DetailInfo
          text={[t("table.list3"), t("table.guarantee")]}
          rarity={3}
          chance={[
            bannerType.includes("char") ? "94.300" : "92.600",
            bannerType.includes("char") ? "85.400" : "83.330",
          ]}
        />
        <DetailsTable items={baseWeapons} rateUp={[]} type={t("db.type1")} />
      </div>
    </div>
  );
}
