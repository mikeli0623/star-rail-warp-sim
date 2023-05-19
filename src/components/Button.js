export default function Button({
  style,
  text,
  onClick,
  size = "md",
  cancel = false,
  disabled = false,
  resize = true,
}) {
  return (
    <div
      className={`custom-button ${disabled && "disabled"}`}
      onClick={onClick}
    >
      <div className="button-outline">
        <div className="button-text">{text}</div>
      </div>
    </div>
  );
}
