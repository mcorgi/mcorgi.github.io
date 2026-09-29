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

export const suasSections: SectionLink[] = [
  { id: "overview", label: "overview" },
  { id: "role", label: "my role" },
  { id: "flightline", label: "flightline ops" },
  { id: "watching", label: "what i watched" },
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
