import { useContext } from "react";
import { json } from "../../util/Constants";
import ResizeContext from "../ResizeContext";
import Table from "react-bootstrap/Table";
import { useTranslation } from "react-i18next";
const trans = require("../../assets/data/translations.json");

const RecordsTable = ({ history, type, title }) => {
  const { getWidth } = useContext(ResizeContext);
  const { t, i18n } = useTranslation();
  const displayHistory = history.map((item, index) => {
    return (
      <tr key={item + index} style={{ fontSize: getWidth(16) }}>
        <td
          className="w-20"
          style={{
            fontSize: getWidth(24, 8),
            verticalAlign: "middle",
          }}
        >
          {t(`table.${json.isChar(item.id) ? "char" : "weap"}`)}
        </td>
        <td
          style={{
            width: "30%",
            fontSize: getWidth(24, 8),
            verticalAlign: "middle",
            color:
              json.getRarity(item.id) === 4
                ? "#a256e0"
                : json.getRarity(item.id) === 5
                ? "#d2a96b"
                : undefined,
          }}
        >
          {trans[item.id][i18n.resolvedLanguage]}
        </td>
        <td
          className="w-23"
          style={{
            fontSize: getWidth(24, 8),
            verticalAlign: "middle",
          }}
        >
          {type === "char"
            ? t("modal.vers.event1")
            : type === "weap"
            ? t("modal.vers.event2")
            : title}
        </td>
        <td
          style={{
            width: "27%",
            fontSize: getWidth(24, 8),
            verticalAlign: "middle",
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
        <thead style={{ fontSize: getWidth(16) }}>
          <tr
            style={{
              backgroundColor: "#e7e7e7",
              color: "#9d8463",
              fontSize: getWidth(28, 14),
            }}
          >
            <th>{t("table.entity-type")}</th>
            <th>{t("table.entity-name")}</th>
            <th>{t("table.warp-type")}</th>
            <th>{t("table.warp-time")}</th>
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
