import type { ButtonHTMLAttributes } from "react";

export const Button = ({
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button
    className="bg-black text-white px-4 py-2 rounded-xl hover:opacity-80 transition disabled:opacity-40"
    {...props}
  >
    {children}
  </button>
);
