// Section anchors for the long-form pages. The pages render their jump
// links from these, and the interactive terminal exposes them as
// directories (e.g. `cd ~/projects/mini-plane-system/hardware`).
export type SectionLink = { id: string; label: string };

export const mpsSections: SectionLink[] = [
  { id: "what", label: "01 what it is" },
  { id: "hardware", label: "02 hardware" },
  { id: "software", label: "03 software" },
  { id: "photo", label: "04 one photo" },
  { id: "time", label: "05 the time problem" },
  { id: "concurrency", label: "06 concurrency" },
  { id: "distance-mode", label: "07 distance mode" },
  { id: "failures", label: "08 when things break" },
  { id: "testing", label: "09 testing" },
  { id: "timeline", label: "10 timeline" },
  { id: "learned", label: "11 what i learned" },
];

export const camelSections: SectionLink[] = [
  { id: "overview", label: "overview" },
  { id: "role", label: "my role" },
  { id: "architecture", label: "architecture" },
  { id: "verbal", label: "state machine" },
  { id: "play", label: "play it" },
  { id: "challenges", label: "challenges" },
  { id: "timeline", label: "timeline" },
  { id: "team", label: "team + stack" },
];

export const birdsongSections: SectionLink[] = [
  { id: "overview", label: "overview" },
  { id: "play", label: "play it" },
  { id: "hardware", label: "hardware" },
  { id: "software", label: "software" },
  { id: "realtime", label: "the 5 µs budget" },
  { id: "input", label: "debouncing" },
  { id: "results", label: "results" },
  { id: "problems", label: "what went wrong" },
];

export const analyticsSections: SectionLink[] = [
  { id: "overview", label: "overview" },
  { id: "skills", label: "what i learned" },
  { id: "design", label: "the core design choice" },
  { id: "example", label: "an example" },
  { id: "lifecycle", label: "how a script runs" },
  { id: "impact", label: "impact" },
  { id: "takeaways", label: "takeaways" },
];

export const suasSections: SectionLink[] = [
  { id: "mission", label: "the mission" },
  { id: "role", label: "my role" },
  { id: "flightline", label: "a mission, start to finish" },
  { id: "week", label: "the week" },
  { id: "results", label: "results" },
  { id: "next", label: "what's next" },
  { id: "photos", label: "photos" },
];

export const contact = {
  email: "st2232@cornell.edu",
  phone: "(781) 808-8248",
  phoneHref: "tel:+17818088248",
  linkedin: "https://www.linkedin.com/in/sandra-tang-651ab1333/",
  linkedinLabel: "linkedin.com/in/sandra-tang",
  github: "https://github.com/mcorgi",
};
