import type { SelectHTMLAttributes } from "react";

export const Select = ({
  children,
  ...props
}: SelectHTMLAttributes<HTMLSelectElement>) => (
  <select
    className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-black bg-white"
    {...props}
  >
    {children}
  </select>
);
