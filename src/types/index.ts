export type Category =
  | "Housing"
  | "Employment"
  | "Legal"
  | "Community"
  | "Training";

export interface Organization {
  name: string;
  description: string;
}
