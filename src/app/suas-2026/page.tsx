import type { Metadata } from "next";
import Suas2026 from "@/components/case-study/Suas2026";

export const metadata: Metadata = {
  title: "SUAS 2026 — Sandra Tang",
  description:
    "Intelligence operator on CUAir's flightline at SUAS 2026, running the onboard imaging pipeline during live missions.",
};

export default function Page() {
  return <Suas2026 />;
}
