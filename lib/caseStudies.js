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
          "Running multiple instances also caused race conditions in the workflows themselves. I fixed those by redesigning the execution flow around synchronized state handling.",
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
          "The pipeline powers both CRIS Premium and CRIS Essentials. The first 20+ enterprise tenants were onboarded within three months.",
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
        h: "AI workloads kept apart from the core",
        p: [
          "The core systems are Java and the AI services are Python. I built them as separate microservices so that AI workloads are decoupled from the core. Each side is easier to maintain, and each can be deployed without waiting on the other.",
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
          "Data arrives on a fixed schedule, but it is only relevant for about three days. Everything older just piled up in the primary RDS instance, still paid for and still slowing queries down.",
          "I designed and built a pipeline that moves it out. The steps are orchestrated asynchronously across several services, and the migration is built so that no data is lost on the way.",
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
    kind: "from one Lambda per client to one for all",
    period: "2023 – 2025",
    summary:
      "CRIS 1.0 ingested each client's data through its own Lambda. I replaced that with one multi-tenant system: a single codebase, 300k+ records every 6 hours inside Lambda's limits, and onboarding that needs almost no engineering work.",
    facts: [
      { k: "Volume", v: "300k+ records / 6 hours", mono: true },
      { k: "Peak memory", v: "138 MB → 10 MB", mono: true },
      { k: "Objects in memory", v: "80k → 5k", mono: true },
      { k: "Infrastructure cost", v: "About 20% lower" },
      { k: "Scaled to", v: "10 tenants, storm and wildfire models" },
    ],
    sections: [
      {
        h: "Before: a Lambda per client",
        p: [
          "Every new client meant setting up a new Lambda that ingested that client's data. Each one had to be maintained, and onboarding took a lot of manual steps.",
          "The argument for this design was isolation: one tenant's heavy data could not slow down another's. That was only partly true. Each file was already ingested by its own Lambda instance, so most of the isolation came from Lambda and not from having separate functions.",
          "It was also inefficient and slow, even at the small volumes it handled at the time.",
        ],
      },
      {
        h: "One codebase for every tenant",
        p: [
          "The replacement is a single Lambda system. It reads the list of clients and, for each one, where its data comes from. It supports more than one kind of source, SQS and S3.",
          "Two things made it efficient. Records are processed in chunks of 1,000, which took in-memory objects from 80k to 5k and peak memory from 138 MB to 10 MB. Database writes are batched, so inserts go in groups and not one row at a time.",
          "The lower memory use removed the need for a higher Lambda memory tier, which cut infrastructure cost by about 20%.",
        ],
      },
      {
        h: "Onboarding without an engineer",
        p: [
          "Each tenant's configuration lives in ConfigCat and is created automatically when the client is onboarded. The manual steps for the engineering team went to nearly zero.",
          "That is what let CRIS 1.0 scale to 10 tenants across two models, storm and wildfire.",
        ],
      },
      {
        h: "Notifications, the same way",
        p: [
          "Notifications had the same problem. Every tenant had its own cron job with that client's settings hardcoded in it.",
          "I moved them to one cron job that runs every hour, reads the notification configuration of every client, and triggers whatever is due. After that there was one piece of infrastructure and one codebase to maintain.",
        ],
      },
      {
        h: "What it did not fix",
        p: [
          "This was a repair to a badly broken system, and it did its job. But Lambda was never going to be the long-term home for ingestion. We knew that as data volumes grew, it would have to move to a dedicated service with its own CPU.",
        ],
      },
    ],
  },
];

export const caseStudy = (id) => CASE_STUDIES.find((c) => c.id === id) || null;
