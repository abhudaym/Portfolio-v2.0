// Production work, written up as short case studies. Rendered on the home page, /works and /works/<id>.
// `featured` ones get a diagram on the home page.

export const CASE_STUDIES = [
  {
    id: "cris-2",
    title: "CRIS 2.0",
    kind: "a climate-risk ingestion pipeline",
    period: "2025 – now",
    featured: true,
    summary:
      "The data pipeline behind AiDash's Climate Risk Intelligence System, which utilities use to predict outages and manage wildfire risk. I have worked on CRIS since its inception and owned its backend architecture as it grew from 1 to 80+ enterprise tenants.",
    steps: ["sources", "validate", "normalise", "score", "serve"],
    caption: "Records move through five stages, now as events and not as one blocking call.",
    facts: [
      { k: "Tenants", v: "1 → 80+", mono: true },
      { k: "Throughput", v: "320k+ records / hour", mono: true },
      { k: "New tenant", v: "Configuration only, no code changes" },
    ],
    sections: [
      {
        h: "The same data, ingested twice",
        p: [
          "Several scheduler pods run at once, and they could pick up the same work. The result was duplicate ingestion and data that did not agree with itself.",
          "I made processing idempotent and added coordination between the pods, so a job that runs twice has the same effect as a job that runs once.",
        ],
      },
      {
        h: "From a blocking pipeline to an event-driven one",
        p: [
          "The original pipeline was synchronous. Each stage waited on the one before it, so one slow stage held up everything behind it.",
          "I re-architected it into an event-driven, asynchronous system. Throughput went up to 320k+ records an hour.",
        ],
      },
      {
        h: "Onboarding without a deploy",
        p: [
          "Every new tenant, and every new data model, used to mean code changes. I designed a config-driven onboarding framework so that both are now configuration. Setup effort for a new tenant is close to zero.",
        ],
      },
    ],
  },
  {
    id: "wmp-copilot",
    title: "WMP Copilot",
    kind: "multi-tenant RAG on AWS Bedrock",
    period: "2025 – now",
    featured: true,
    summary:
      "A RAG pipeline that lets utility companies ask questions of their own wildfire mitigation plans. I designed and deployed it for 100+ tenants, across a Java and Python microservices architecture.",
    steps: ["documents", "chunk", "embed", "retrieve", "answer"],
    caption: "The first three stages run once per document. The last two run on every question.",
    facts: [
      { k: "Tenants", v: "100+", mono: true },
      { k: "Cost", v: "$0.019 / query", mono: true },
      { k: "Cold start", v: "< 2 s on 128 MB pods", mono: true },
      { k: "First evaluation", v: "Retrieval 3.06 / 5, generation 3.77 / 5" },
    ],
    sections: [
      {
        h: "One knowledge base, 100+ tenants",
        p: [
          "Under Bedrock's constraints, a knowledge base per tenant would have meant duplicating everything 100+ times. I kept one and isolated tenants with metadata-based filtering.",
          "The tenant identity in that filter is validated on the server. A request cannot name its own tenant.",
        ],
      },
      {
        h: "Measuring retrieval and generation separately",
        p: [
          "I built an evaluation framework around a golden test set, sorted into 7 question categories. Retrieval is scored with Precision@K, Recall@K and MRR. Generation is scored on faithfulness and hallucination rate.",
          "Scoring them apart showed where the problem was: retrieval averaged 3.06 out of 5, generation 3.77. The per-category breakdown drove two changes, a parser migration and dynamic top-k routing.",
        ],
      },
      {
        h: "Cost and latency",
        p: [
          "The AI services run in 128 MB pods, which keeps cold starts under 2 seconds. Tuning the chunking strategy, retrieval depth and model selection brought inference cost down to $0.019 a query.",
        ],
      },
      {
        h: "Knowing what it did",
        p: [
          "Every query, retrieval result, token count and guardrail trigger is logged in a structured form. That is what makes per-tenant cost attribution and anomaly detection possible.",
        ],
      },
    ],
    related: [{ href: "/blogs/rag-decisions-that-mattered", label: "Building a RAG System: The Decisions That Actually Mattered" }],
  },
  {
    id: "data-archival",
    title: "Serverless data archival",
    kind: "moving cold data out of RDS",
    period: "2023 – 2025",
    summary:
      "A serverless pipeline on AWS Fargate, SQS, Lambda, S3 and DynamoDB that moves cold data out of the primary database. It took primary RDS storage from 400 GB to 3 GB.",
    facts: [
      { k: "RDS storage", v: "400 GB → 3 GB", mono: true },
      { k: "Built on", v: "Fargate, SQS, Lambda, S3, DynamoDB" },
    ],
    sections: [
      {
        h: "What it does",
        p: [
          "Most of the data in the primary RDS instance was cold: rarely read, but still paid for and still slowing queries down. I designed and built a pipeline that offloads it.",
          "Archived records stay reachable through DynamoDB and S3, with low-latency retrieval, so nothing that reads historical data had to give it up.",
        ],
      },
      {
        h: "Result",
        p: ["Primary storage went from 400 GB to 3 GB. Queries got faster and the infrastructure bill went down."],
      },
    ],
  },
  {
    id: "lambda-ingestion",
    title: "Multi-tenant ingestion on Lambda",
    kind: "300k+ records inside a memory limit",
    period: "2023 – 2025",
    summary:
      "A multi-tenant ingestion system that processes 300k+ records every 6 hours inside AWS Lambda's limits. Chunked processing cut peak memory from 138 MB to 10 MB.",
    facts: [
      { k: "Volume", v: "300k+ records / 6 hours", mono: true },
      { k: "Peak memory", v: "138 MB → 10 MB", mono: true },
      { k: "Objects in memory", v: "80k → 5k", mono: true },
      { k: "Infrastructure cost", v: "About 20% lower" },
    ],
    sections: [
      {
        h: "The constraint",
        p: [
          "Lambda gives you a fixed amount of memory. Loading a whole run meant about 80k objects in memory at once and a peak of 138 MB, which got unstable under high concurrency.",
        ],
      },
      {
        h: "Chunking",
        p: [
          "I changed the system to process records in batches of 1,000. In-memory objects dropped from 80k to 5k and peak memory from 138 MB to 10 MB, a 93% reduction.",
          "That removed the need for a higher Lambda memory tier, which cut infrastructure cost by about 20%.",
        ],
      },
    ],
  },
];

export const caseStudy = (id) => CASE_STUDIES.find((c) => c.id === id) || null;
