import type { Organization } from "../types";
import { ResultCard } from "./ResultCard";

interface ResultsListProps {
  results: Organization[];
  loading: boolean;
}

export const ResultsList = ({ results, loading }: ResultsListProps) => {
  if (loading) {
    return (
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="p-4 border border-gray-200 rounded-2xl animate-pulse bg-gray-100 h-20"
          />
        ))}
      </div>
    );
  }

  if (!results.length) return null;

  return (
    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
      {results.map((org) => (
        <ResultCard key={org.name} org={org} />
      ))}
    </div>
  );
};
