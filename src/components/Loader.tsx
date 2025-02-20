export default function FullSpinner() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh", // Full viewport height
        width: "100%", // Full width
      }}
    >
      <div className="spinner-border" role="status"></div>
    </div>
  );
}
