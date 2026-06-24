export default function Masthead() {
  return (
    <div
      className="text-center"
      style={{
        padding: "20px 24px 16px",
        borderBottom: "0.5px solid #374151",
      }}
    >
      <p
        className="font-mono text-xs uppercase tracking-widest"
        style={{ color: "#6B7280", marginBottom: "8px" }}
      >
        The sports intelligence platform
      </p>
      <h1
        className="font-semibold text-white"
        style={{
          fontSize: "clamp(24px, 4vw, 36px)",
          letterSpacing: "-0.02em",
          lineHeight: 1.15,
          whiteSpace: "pre-line",
        }}
      >
        {"Global sports intelligence.\nAfrican in origin."}
      </h1>
      <p
        className="text-sm italic"
        style={{ color: "#9CA3AF", marginTop: "10px", lineHeight: 1.6 }}
      >
        Signal · Intel · Origin — one platform, three ways to know more than everyone else in the room.
      </p>
    </div>
  );
}
