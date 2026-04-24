import { useState } from "react";
import type { Category } from "../types";
import { Button } from "./ui/Button";
import { Input } from "./ui/Input";
import { Select } from "./ui/Select";

const CATEGORIES: Category[] = [
  "Housing",
  "Employment",
  "Legal",
  "Community",
  "Training",
];

interface SignalFormProps {
  onSubmit: (category: Category) => void;
  loading: boolean;
}

export const SignalForm = ({ onSubmit, loading }: SignalFormProps) => {
  const [message, setMessage] = useState("");
  const [category, setCategory] = useState<Category | "">("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || !category) return;
    onSubmit(category as Category);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-md p-6 rounded-2xl space-y-4"
    >
      <h2 className="text-xl font-semibold">Submit Signal</h2>

      <Input
        placeholder="Describe the need or situation…"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <Select
        value={category}
        onChange={(e) => setCategory(e.target.value as Category | "")}
      >
        <option value="">Select category</option>
        {CATEGORIES.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </Select>

      <Button type="submit" disabled={!message.trim() || !category || loading}>
        {loading ? "Routing…" : "Submit"}
      </Button>
    </form>
  );
};
