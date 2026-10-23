// Fallback content. Everything here is overridden by Sanity when the matching field exists.

export const SITE = {
  name: "Abhuday Mishra",
  kicker: "SDE-2 · AiDash",
  tagline:
    "I build data pipelines and RAG systems that have to keep working for 100+ tenants, long after the demo is over.",
  now: "building multi-tenant RAG and climate-risk pipelines at AiDash",
  email: "abhuday.mishra@hotmail.com",
  typingChallenge:
    "A good pipeline fails loudly, retries quietly, and never loses a record.",
  bestWpm: 130,
  heroRate: 88.9, // records per second shown by the hero counter
  heroLines: ["at 320k+ / hour", "100+ tenants"],
};

export const ABOUT = [
  "Abhuday Mishra (yes, he's referring to himself in the third person, and yes, he knows it's weird) is a Software Engineer at AiDash, where he builds distributed systems that help utility companies predict outages and manage wildfire risk before the storm hits. His work sits between backend engineering and AI infrastructure.",
  "When he's not wrangling Java, Spring Boot, and the occasional Python microservice, he's either chasing a shuttlecock on the badminton court, shooting hoops, or plucking away on his guitar. Music and sport are his two reliable escapes from a day of thinking about throughput and token costs.",
  "He also writes about building AI systems in production: evaluation, failure modes, and the decisions that actually move outcomes.",
];

export const EXPERIENCE = [
  { _id: "e1", period: "04/2025 - Present", role: "Software Engineer 2", company: "AiDash", companyUrl: "https://www.aidash.com/climate-risk-intelligence-system/", current: true, startDate: "2025-04-01" },
  { _id: "e2", period: "07/2023 - 03/2025", role: "Software Engineer 1", company: "AiDash", companyUrl: "https://www.aidash.com/climate-risk-intelligence-system/", startDate: "2023-07-01" },
  { _id: "e3", period: "11/2022 - 06/2023", role: "Software Engineer Intern", company: "AiDash", companyUrl: "https://www.aidash.com/climate-risk-intelligence-system/", startDate: "2022-11-01" },
  { _id: "e4", period: "01/2022 - 10/2022", role: "Software Engineer Intern", company: "Rivi", companyUrl: "https://rivi.co", startDate: "2022-01-01" },
  { _id: "e5", period: "07/2021 - 11/2021", role: "Software Engineer Intern", company: "Kreator3D", companyUrl: "https://cloud.kreator3d.com/", startDate: "2021-07-01" },
];

export const VOLUNTEER = [
  { _id: "v1", period: "09/2020 - 07/2021", role: "Associate Technical Lead", org: "DSC SRM" },
  { _id: "v2", period: "03/2020 - 03/2021", role: "Web Developer", org: "Webarch Club" },
  { _id: "v3", period: "08/2019 - 03/2022", role: "Web Developer", org: "Aakash Research Labs" },
];

export const SKILLS = [
  "Java", "Python", "C/C++", "JavaScript/TypeScript", "ReactJS", "NextJS", "Spring Boot",
  "NodeJS/Express", "MongoDB", "PostgreSQL", "AWS", "RabbitMQ", "HTML/CSS", "Git",
].map((name, i) => ({ _id: "s" + i, name, order: i }));

export const INTERESTS = [
  { label: "Music" }, { label: "Singing" }, { label: "Badminton" }, { label: "Basketball" },
  { label: "Coding" }, { label: "Speed typing", note: "best 130 WPM" },
];

export const SOCIALS = [
  { kind: "code", label: "GitHub", handle: "@abhudaym", href: "https://github.com/abhudaym" },
  { kind: "network", label: "LinkedIn", handle: "@abhudaym", href: "https://www.linkedin.com/in/abhudaym/" },
  { kind: "photos", label: "Instagram", handle: "@abhuday.m", href: "https://www.instagram.com/abhuday.m/" },
  { kind: "posts", label: "X / Twitter", handle: "@MishraAbhuday", href: "https://twitter.com/MishraAbhuday" },
];

export const NAV = [
  { href: "/", label: "Home" },
  { href: "/works", label: "Works" },
  { href: "/blogs", label: "Blogs" },
  { href: "/resume", label: "Resume" },
];
