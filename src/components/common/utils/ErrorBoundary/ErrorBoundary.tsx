import { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children?: ReactNode;
  renderErrorFallback: (error?: Error) => React.JSX.Element;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: undefined,
  };

  public static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return this.props.renderErrorFallback(this.state.error);
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
