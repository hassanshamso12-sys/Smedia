import { AlertCircle } from "lucide-react";
import { Link } from "wouter";

export default function NotFound() {
  return (
    <div style={{
      minHeight: "100vh",
      width: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "var(--bg-deep)",
    }}>
      <div style={{
        background: "var(--bg-card)",
        border: "1px solid var(--border-subtle)",
        borderRadius: "var(--radius-xl)",
        boxShadow: "var(--shadow-glass)",
        padding: "2.5rem",
        maxWidth: "28rem",
        width: "100%",
        margin: "0 1rem",
        textAlign: "center",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem", justifyContent: "center" }}>
          <AlertCircle size={32} style={{ color: "var(--accent-primary)" }} />
          <h1 style={{ fontSize: "1.5rem", fontWeight: 700, color: "var(--text-primary)", margin: 0 }}>
            404 — Page Not Found
          </h1>
        </div>
        <p style={{ color: "var(--text-secondary)", marginBottom: "1.5rem", fontSize: "0.9375rem" }}>
          The page you're looking for doesn't exist.
        </p>
        <Link href="/">
          <a style={{
            display: "inline-block",
            background: "var(--gradient-primary)",
            color: "#fff",
            fontWeight: 600,
            padding: "0.625rem 1.5rem",
            borderRadius: "var(--radius-full)",
            textDecoration: "none",
            fontSize: "0.9375rem",
          }}>
            Go Home
          </a>
        </Link>
      </div>
    </div>
  );
}
