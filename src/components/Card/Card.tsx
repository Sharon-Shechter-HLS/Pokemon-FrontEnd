
type CardProps = {
  header: React.ReactNode;
  content: React.ReactNode;
  footer?: React.ReactNode;
};

function Card({ header, content, footer }: CardProps) {
  return (
    <div
      className="border border-gray-200 shadow-lg rounded-[4px] bg-white flex flex-col justify-between"
      style={{ width: "502px", minHeight: "200px" }}
    >
      {/* Header */}
      <div
        style={{
          width: "502px",
          height: "86px",
          padding: "12px 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {header}
      </div>

      {/* Content */}
      <div
        style={{
          padding: "24px",
          minHeight: "150px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {content}
      </div>

      {/* Footer */}
      {footer && (
        <div
          className="border-t"
          style={{
            width: "502px",
            height: "72px",
            padding: "16px",
            gap: "16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderTopWidth: "1px",
          }}
        >
          {footer}
        </div>
      )}
    </div>
  );
}

export default Card; 