// Photos for the SUAS 2026 page (/suas-2026).
// Originals live in public/images/suas-2026/ (not committed); the site uses the
// resized copies in public/images/suas-2026/web/. To add a photo, resize it into
// web/ and add an entry below.
export type Photo = { src: string; alt: string; caption?: string };

const p = (name: string, alt: string, caption?: string): Photo => ({
  src: `/images/suas-2026/web/${name}.jpg`,
  alt,
  caption,
});

export const photos = {
  hero: p("dsc04015", "CUAir team members in safety vests preparing Hermes on the runway at Skyway Range."),
  nanostation: p(
    "dsc03868",
    "Sandra at the ground station table holding the NanoStation up toward the aircraft, with laptops running the ground software.",
    "Me aiming the NanoStation at the plane to bring up the air-to-ground link, with our ground software running on the table.",
  ),
  groundTable: p("dsc03996", "Teammates at the ground station table with laptops, cables and a pelican case.", "The ground station: laptops, the radio link, and a lot of cables."),
  groundSetup: p("dsc03779", "Two team members setting up electronics and cables on a table under a tent.", "Getting the ground electronics ready under the tent."),
  antenna: p("dsc03983", "A team member setting up equipment next to the flightline tent.", "Setting up at the flightline."),
  laptop: p("dsc03864", "A team member focused on a laptop screen at the ground station.", "Eyes on the pipeline."),
  takeoff: p("dsc03816", "Hermes flying low over the runway at Skyway Range.", "Hermes over the runway on flight day one."),
  airborne: p("dsc03861", "Hermes in flight against a clear blue sky.", "Four autonomous laps, climbing to almost 950 ft."),
  prepGrass: p("dsc03684", "Two team members working on the aircraft's electronics bay on the grass.", "Last-minute work on the electronics bay."),
  prepFuselage: p("img_0082", "Two team members leaning over the open fuselage of Hermes on the grass.", "Inside the fuselage before flight."),
  tent1: p("img_0125", "Team members working under the pit tent around the aircraft.", "The pit tent."),
  tent2: p("img_0132", "Team members unpacking equipment under the pit tent.", "Unpacking in the pit area."),
  flightlineTent: p("dsc03803", "An empty flightline table under a yellow canopy, next to the runway.", "Our spot on the flightline."),
  flightlineVests: p("dsc03809", "Two team members in CUAir vests at the flightline table.", "Setting up at the flightline table."),
  runway1: p("dsc04002", "Team members assembling Hermes on the runway next to a traffic cone.", "Assembling Hermes on the runway."),
  runway2: p("dsc04004", "Team members holding Hermes' wing and booms on the runway.", undefined),
  runway3: p("dsc04010", "Team members connecting Hermes on the runway.", undefined),
  carry: p("dsc04011", "Four team members carrying Hermes across the runway.", "Carrying Hermes out to the runway."),
  booms: p("dsc03956", "Team members lifting Hermes with its VTOL booms attached.", "Hermes with its VTOL booms on."),
  circle: p("dsc03949", "Team members in CUAir vests sitting in a circle on the grass.", "Regrouping between flights."),
  focus: p("dsc03865", "A team member concentrating on a laptop at the ground station.", undefined),
  team: p("dsc03932", "The full CUAir team posing behind Hermes on the grass at Skyway Range.", "The team with Hermes at Skyway Range."),
};

// The rest go in the gallery at the bottom of the page.
export const gallery: Photo[] = [
  photos.prepFuselage,
  photos.tent1,
  photos.flightlineVests,
  photos.runway2,
  photos.runway3,
  photos.booms,
  photos.circle,
  photos.focus,
  photos.flightlineTent,
  photos.tent2,
];
