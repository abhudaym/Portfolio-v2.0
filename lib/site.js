// Site copy that does not live in Sanity. Blogs, side projects, experience and the resume PDF still come from Sanity.

export const SITE = {
  name: "Abhuday Mishra",
  url: "https://abhudaym.in",
  tagline:
    "I build the data pipelines and RAG systems behind climate-risk tools for power utilities. The kind that have to keep working for 100+ tenants, long after the demo is over.",
  intro:
    "I'm a backend engineer at AiDash in Gurgaon, working between distributed systems and AI infrastructure. I also write about what breaks when AI systems meet production.",
  description:
    "Backend engineer at AiDash. Multi-tenant data pipelines, RAG infrastructure and the evaluation that keeps them honest.",
  now: "Software Engineer 2 at AiDash since April 2025. Joined as an intern in November 2022.",
  tools:
    "Day to day: Java and Spring Boot, Python and FastAPI, on AWS (Lambda, SQS, S3, EKS, Fargate, Bedrock). PostgreSQL, Cassandra, Redis and DynamoDB underneath.",
  offClock: "Off the clock: badminton, basketball, guitar, singing.",
  email: "abhuday.mishra@hotmail.com",
  typingChallenge: "A good pipeline fails loudly, retries quietly, and never loses a record.",
  bestWpm: 130,
};

// Fallback when Sanity has no experience documents.
export const EXPERIENCE = [
  { _id: "e1", period: "04/2025 - Present", role: "Software Engineer 2", company: "AiDash", companyUrl: "https://www.aidash.com/" },
  { _id: "e2", period: "07/2023 - 03/2025", role: "Software Engineer", company: "AiDash", companyUrl: "https://www.aidash.com/" },
  { _id: "e3", period: "11/2022 - 06/2023", role: "Software Engineer Intern", company: "AiDash", companyUrl: "https://www.aidash.com/" },
  { _id: "e4", period: "01/2022 - 10/2022", role: "Software Engineer Intern", company: "Rivi", companyUrl: "https://rivi.co" },
  { _id: "e5", period: "07/2021 - 11/2021", role: "Software Engineer Intern", company: "Kreator3D", companyUrl: "https://cloud.kreator3d.com/" },
];

export const EDUCATION = {
  period: "06/2019 - 05/2023",
  what: "B.Tech, Computer Science and Engineering",
  where: "SRM Institute of Science and Technology, Chennai",
  note: "GPA 9.17",
};

export const SOCIALS = [
  { label: "GitHub", href: "https://github.com/abhudaym" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/abhudaym/" },
];

export const NAV = [
  { href: "/works", label: "Work" },
  { href: "/blogs", label: "Writing" },
  { href: "/resume", label: "Résumé" },
];

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
// "04/2025 - Present" -> "Apr 2025 – now"
export const prettyPeriod = (p = "") =>
  String(p)
    .replace(/(\d{2})\/(\d{4})/g, (_, m, y) => (MONTHS[+m - 1] || m) + " " + y)
    .replace(/\s*-\s*/, " – ")
    .replace(/present/i, "now");

export const fmtDate = (d) =>
  d ? new Date(d).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric", timeZone: "UTC" }) : "";
