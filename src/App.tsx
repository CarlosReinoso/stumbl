import { SignalForm } from "./components/SignalForm";
import { ResultsList } from "./components/ResultsList";
import { useSignalRouter } from "./hooks/useSignalRouter";

export default function App() {
  const { results, loading, routeSignal } = useSignalRouter();

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center p-6">
      <div className="w-full max-w-xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight">
            Signal Router
          </h1>
          <p className="text-gray-500 mt-2 text-sm">
            Match a need to the right organisation instantly.
          </p>
        </div>

        <SignalForm onSubmit={routeSignal} loading={loading} />

        <ResultsList results={results} loading={loading} />
      </div>
    </div>
  );
}
