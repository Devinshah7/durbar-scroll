import { Component, type ReactNode } from "react";

type State = { error: Error | null };

export class LoaderErrorBoundary extends Component<
  { children: ReactNode },
  State
> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error, info: { componentStack?: string | null }) {
    console.error("[Loader] error:", error);
    if (info?.componentStack) console.error(info.componentStack);
  }

  render() {
    if (this.state.error) {
      const e = this.state.error;
      return (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 99999,
            background: "#0a0510",
            color: "#ffd27a",
            fontFamily: "ui-monospace, monospace",
            padding: "2rem",
            overflow: "auto",
            fontSize: "13px",
            lineHeight: 1.5,
          }}
        >
          <div style={{ color: "#ff6b6b", fontWeight: 700, fontSize: "16px", marginBottom: "1rem" }}>
            Loader crashed: {e.name}
          </div>
          <div style={{ marginBottom: "1rem", whiteSpace: "pre-wrap" }}>{e.message}</div>
          <pre style={{ whiteSpace: "pre-wrap", opacity: 0.75 }}>{e.stack}</pre>
        </div>
      );
    }
    return this.props.children;
  }
}
