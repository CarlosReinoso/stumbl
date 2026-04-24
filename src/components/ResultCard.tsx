import type { Organization } from "../types";

interface ResultCardProps {
  org: Organization;
}

export const ResultCard = ({ org }: ResultCardProps) => (
  <div className="p-4 border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition bg-white">
    <h3 className="font-bold text-lg">{org.name}</h3>
    <p className="text-sm text-gray-600 mt-1">{org.description}</p>
  </div>
);
