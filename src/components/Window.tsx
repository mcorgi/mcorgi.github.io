import { ReactNode } from "react";

type Props = {
  title?: string;
  className?: string;
  bodyClassName?: string;
  children: ReactNode;
  soft?: boolean;
  scanlines?: boolean;
};

export default function Window({
  title = "untitled",
  className = "",
  bodyClassName = "",
  children,
  soft = false,
  scanlines = false,
}: Props) {
  return (
    <div className={`${soft ? "window-soft" : "window"} ${className}`}>
      <div className="window-title">
        <span className="window-dots" aria-hidden>
          <span />
          <span />
          <span />
        </span>
        <span className="ml-2 truncate">{title}</span>
      </div>
      <div className={`${scanlines ? "scanlines" : ""} ${bodyClassName}`}>
        {children}
      </div>
    </div>
  );
}
