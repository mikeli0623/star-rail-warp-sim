import ResourceTotal from "./ResourceTotal";

export default function StatTotals() {
  const begTotal = parseInt(localStorage.getItem("beginnerTotal")) || 0;
  const charTotal = parseInt(localStorage.getItem("charTotal")) || 0;
  const weapTotal = parseInt(localStorage.getItem("weapTotal")) || 0;
  const standardTotal = parseInt(localStorage.getItem("standardTotal")) || 0;

  return (
    <div className="stat-totals d-flex align-content-center justify-content-evenly">
      <ResourceTotal type="sr-pass" amount={begTotal * 0.8 + standardTotal} />
      <ResourceTotal type="srs-pass" amount={charTotal + weapTotal} />
      <ResourceTotal
        type="stellar-jade"
        amount={(begTotal * 0.8 + standardTotal + charTotal + weapTotal) * 160}
      />
    </div>
  );
}
