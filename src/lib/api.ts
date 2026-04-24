import type { Category, Organization } from "../types";

const SIGNAL_ROUTER: Record<Category, Organization[]> = {
  Housing: [
    { name: "Shelter UK", description: "Provides housing advice and support." },
    { name: "St Mungo's", description: "Supports people facing homelessness." },
    { name: "Local Council Housing", description: "Local authority housing services." },
  ],
  Employment: [
    { name: "Catch22", description: "Helps people into employment." },
    { name: "Reed in Partnership", description: "Delivers employment programs." },
    { name: "Working Chance", description: "Supports women into jobs." },
  ],
  Legal: [
    { name: "LawWorks", description: "Free legal help." },
    { name: "Advocate", description: "Pro bono legal services." },
    { name: "Citizens Advice", description: "Legal and financial guidance." },
  ],
  Community: [
    { name: "NACRO", description: "Crime reduction support." },
    { name: "St Giles Trust", description: "Rebuilds lives." },
    { name: "Turning Point", description: "Social care services." },
  ],
  Training: [
    { name: "Milton Keynes College", description: "Training programs." },
    { name: "Novus", description: "Education services." },
    { name: "Shannon Trust", description: "Literacy support." },
  ],
};

export const fetchOrganizations = async (
  category: Category
): Promise<Organization[]> => {
  await new Promise((res) => setTimeout(res, 400));
  return SIGNAL_ROUTER[category] ?? [];
};
