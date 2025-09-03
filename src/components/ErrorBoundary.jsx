import { Component } from "react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, lang: props.lang };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="w-full h-[60vh] flex justify-center items-center font-bold text-6xl max-sm:text-4xl text-center">
          {this.state.lang === "ID"? "Opps, Ada yang salah nih" : "Opps, something wrong occurs"}
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
