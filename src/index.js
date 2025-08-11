// src/index.js
import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";

// ✅ ใส่คอมโพเนนต์ ErrorBoundary ไว้เหนือการใช้งาน
function ErrorBoundary({ children }) {
  const [err, setErr] = React.useState(null);

  React.useEffect(() => {
    const onErr = (e) => setErr(e.error || e.message || String(e));
    const onRej = (e) => setErr(e.reason || String(e));
    window.addEventListener("error", onErr);
    window.addEventListener("unhandledrejection", onRej);
    return () => {
      window.removeEventListener("error", onErr);
      window.removeEventListener("unhandledrejection", onRej);
    };
  }, []);

  if (err) {
    return (
      <pre style={{ color: "#fff", background: "#c00", padding: 16, whiteSpace: "pre-wrap" }}>
        {String(err.stack || err)}
      </pre>
    );
  }
  return children;
}

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);