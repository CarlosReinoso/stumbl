import { useState } from "react";
import type { Category, Organization } from "../types";
import { fetchOrganizations } from "../lib/api";

export const useSignalRouter = () => {
  const [results, setResults] = useState<Organization[]>([]);
  const [loading, setLoading] = useState(false);

  const routeSignal = async (category: Category) => {
    setLoading(true);
    const data = await fetchOrganizations(category);
    setResults(data);
    setLoading(false);
  };

  return { results, loading, routeSignal };
};
