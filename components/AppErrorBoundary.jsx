import React from "react";

export default class AppErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.error("Travel Agency Management render error", error, info);
  }

  render() {
    if (!this.state.hasError) return this.props.children;
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center p-6">
        <div className="max-w-lg w-full bg-white border border-stone-200 rounded-2xl p-6 shadow-sm">
          <h1 className="text-xl font-bold text-stone-900">Something went wrong</h1>
          <p className="text-sm text-stone-600 mt-2">The application hit an unexpected rendering error. Your saved data has not been intentionally cleared.</p>
          <div className="flex gap-2 mt-5">
            <button type="button" onClick={() => window.location.reload()} className="px-4 py-2 rounded-lg bg-teal-800 text-white text-sm font-semibold">Reload app</button>
            <button type="button" onClick={() => this.setState({ hasError: false, error: null })} className="px-4 py-2 rounded-lg border border-stone-300 text-stone-700 text-sm font-semibold">Try again</button>
          </div>
        </div>
      </div>
    );
  }
}
