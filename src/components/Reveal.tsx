import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  // Left over from when everything faded in on scroll. Ignored now; the
  // terminal is the site's one big interaction.
  delay?: number;
  y?: number;
  x?: number;
  once?: boolean;
};

export default function Reveal({ children, className = "" }: Props) {
  return <div className={className}>{children}</div>;
}
