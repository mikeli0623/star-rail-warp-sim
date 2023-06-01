export default function DetailInfo({ text, rarity, chance }) {
  if (chance.length === 2)
    return (
      <div>
        {text[0] + " " + chance[0] + "% " + text[1] + " " + chance[1] + "%)"}
      </div>
    );
  return <div>{text + chance}</div>;
}
