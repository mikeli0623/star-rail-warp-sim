import { useContext } from "react";
import { json } from "../../util/Constants";
import ResizeContext from "../context/ResizeContext";
import Table from "react-bootstrap/Table";
import { useTranslation } from "react-i18next";
const trans = require("../../assets/data/translations.json");

const RecordsTable = ({ history, type, title }) => {
  const { getWidth } = useContext(ResizeContext);
  const { t, i18n } = useTranslation();

  const displayHistory = history.map((item, index) => {
    return (
      <tr key={item + index} style={{ fontSize: getWidth(14) }}>
        <td
          className="w-20"
          style={{
            fontSize: getWidth(22, 6),
            verticalAlign: "middle",
            color: "#767676",
          }}
        >
          {t(`table.${json.isChar(item.id) ? "char" : "weap"}`)}
        </td>
        <td
          style={{
            width: "30%",
            fontSize: getWidth(22, 6),
            verticalAlign: "middle",
            color:
              json.getRarity(item.id) === 4
                ? "#a256e0"
                : json.getRarity(item.id) === 5
                ? "#d2a96b"
                : "#767676",
          }}
        >
          {trans[item.id][i18n.resolvedLanguage]}
        </td>
        <td
          className="w-23"
          style={{
            fontSize: getWidth(22, 6),
            verticalAlign: "middle",
            color: "#767676",
          }}
        >
          {type.includes("char")
            ? t("modal.vers.event1")
            : type.includes("weap")
            ? t("modal.vers.event2")
            : title}
        </td>
        <td
          style={{
            width: "27%",
            fontSize: getWidth(22, 6),
            verticalAlign: "middle",
            color: "#767676",
          }}
        >
          {new Date(item.time).toLocaleString()}
        </td>
      </tr>
    );
  });

  return (
    <section className="w-100">
      <Table bordered>
        <thead style={{ fontSize: getWidth(14) }}>
          <tr>
            <th
              style={{
                backgroundColor: "#e7e7e7",
                color: "#9d8463",
                fontSize: getWidth(26, 12),
              }}
            >
              {t("table.entity-type")}
            </th>
            <th
              style={{
                backgroundColor: "#e7e7e7",
                color: "#9d8463",
                fontSize: getWidth(26, 12),
              }}
            >
              {t("table.entity-name")}
            </th>
            <th
              style={{
                backgroundColor: "#e7e7e7",
                color: "#9d8463",
                fontSize: getWidth(26, 12),
              }}
            >
              {t("table.warp-type")}
            </th>
            <th
              style={{
                backgroundColor: "#e7e7e7",
                color: "#9d8463",
                fontSize: getWidth(26, 12),
              }}
            >
              {t("table.warp-time")}
            </th>
          </tr>
        </thead>
        <tbody style={{ color: "#8c8c8c" }}>
          {history.length > 0 ? (
            displayHistory
          ) : (
            <tr>
              <td colSpan={4}>{t("table.none")}</td>
            </tr>
          )}
        </tbody>
      </Table>
    </section>
  );
};

export default RecordsTable;
