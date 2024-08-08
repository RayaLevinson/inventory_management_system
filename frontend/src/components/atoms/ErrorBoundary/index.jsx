import { config } from "config";
import { Component } from "react";

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ error: error, errorInfo: errorInfo });
  }

  render() {
    const { children } = this.props;
    const { error, errorInfo } = this.state;

    return (
      <>
        {errorInfo ? (
          <div style={{ textAlign: "center", padding: "20px" }}>
            <h2>Something went wrong.</h2>
            <p>{error && error.toString()}</p>
            <button onClick={() => window.location.reload()}>Retry</button>
            {/* {config.NODE_ENV === "development" && ( */}
              <details
                style={{
                  cursor: "pointer",
                  textAlign: "initial",
                  whiteSpace: "pre-wrap",
                }}
              >
                <div style={{ padding: "20px", wordWrap: "break-word" }}>
                  {error && error.toString()}
                  <br />
                  {errorInfo.componentStack}
                </div>
              </details>
            {/* )} */}
          </div>
        ) : (
          children
        )}
      </>
    );
  }
}
