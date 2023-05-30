import { useContext } from "react";
import { json } from "../../util/Constants";
import ResizeContext from "../ResizeContext";
import Table from "react-bootstrap/Table";
import { LazyLoadImage } from "react-lazy-load-image-component";

const RecordsTable = ({ items, rateUp = [], type }) => {
  const { getWidth } = useContext(ResizeContext);

  const tableItem = rateUp.concat(items).map((item, index) => {
    return (
      <tr key={item + index} style={{ fontSize: getWidth(16, 12) }}>
        {index < Math.ceil(items.length / 4) ? (
          <>
            <td>
              {rateUp.includes(items[index * 4]) ? (
                <>
                  <LazyLoadImage
                    alt="Rate Up Icon"
                    effect="opacity"
                    src="../assets/details/rate-up.webp"
                    width={10}
                  />
                  {json.getName(items[index * 4])}
                </>
              ) : (
                json.getName(items[index * 4])
              )}
            </td>
            <td>
              {rateUp.includes(items[index * 4 + 1]) ? (
                <>
                  <LazyLoadImage
                    alt="Rate Up Icon"
                    effect="opacity"
                    src="../assets/details/rate-up.webp"
                    width={10}
                  />
                  {json.getName(items[index * 4 + 1])}
                </>
              ) : items[index * 2 + 1] == null ? (
                ""
              ) : (
                json.getName(items[index * 4 + 1])
              )}
            </td>
            <td>
              {rateUp.includes(items[index * 4 + 2]) ? (
                <>
                  <LazyLoadImage
                    alt="Rate Up Icon"
                    effect="opacity"
                    src="../assets/details/rate-up.webp"
                    width={10}
                  />
                  {json.getName(items[index * 4 + 2])}
                </>
              ) : items[index * 2 + 2] == null ? (
                ""
              ) : (
                json.getName(items[index * 4 + 2])
              )}
            </td>
            <td>
              {rateUp.includes(items[index * 4 + 3]) ? (
                <>
                  <LazyLoadImage
                    alt="Rate Up Icon"
                    effect="opacity"
                    src="../assets/details/rate-up.webp"
                    width={10}
                  />
                  {json.getName(items[index * 4 + 3])}
                </>
              ) : items[index * 2 + 3] == null ? (
                ""
              ) : (
                json.getName(items[index * 4 + 3])
              )}
            </td>
          </>
        ) : (
          <></>
        )}
      </tr>
    );
  });

  return (
    <section className="details-table">
      <Table bordered>
        <thead style={{ fontSize: getWidth(16, 12) }}>
          <tr>
            <th colSpan={4}>{type}</th>
          </tr>
        </thead>
        <tbody>{tableItem}</tbody>
      </Table>
    </section>
  );
};

export default RecordsTable;
