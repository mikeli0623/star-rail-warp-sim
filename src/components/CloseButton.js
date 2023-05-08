const CloseButton = ({ getWidth, getHeight, onClose, style }) => {
  return (
    <div
      className="close-button"
      style={{
        ...style,
        width: getWidth(70),
        height: getWidth(70),
        paddingLeft: getWidth(12),
      }}
      onClick={onClose}
    >
      <div style={{ marginRight: getWidth(16) }}>
        <div
          className="button-leg top-left"
          style={{
            width: getWidth(6),
            height: getHeight(38, 6),
            marginBottom: getWidth(10),
          }}
        />
        <div
          className="button-leg bottom-right"
          style={{
            width: getWidth(6),
            height: getHeight(38, 6),
          }}
        />
      </div>
      <div>
        <div
          id="button-dot"
          style={{
            width: getWidth(10),
            height: getWidth(10),
          }}
        />
      </div>
      <div style={{ marginLeft: getWidth(16) }}>
        <div
          className="button-leg top-right"
          style={{
            width: getWidth(6),
            height: getHeight(38, 6),
            marginBottom: getWidth(10),
          }}
        />
        <div
          className="button-leg bottom-left"
          style={{
            width: getWidth(6),
            height: getHeight(38, 6),
          }}
        />
      </div>
    </div>
  );
};

export default CloseButton;
