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
      "CRIS shows power utilities where wildfire and weather risk is highest on their network. This is the service that feeds it. I have worked on CRIS since its inception and owned its backend architecture as it grew from 1 to 50+ enterprise tenants.",
    steps: ["schedule", "detect", "plan", "ingest", "summarise", "complete"],
    caption: "Each stage hands off to the next through a queue, so no stage waits on another.",
    facts: [
      { k: "Tenants", v: "1 → 50+", mono: true },
      { k: "Throughput", v: "320k+ records / hour", mono: true },
      { k: "New tenant", v: "Configuration only, no code changes" },
      { k: "Built with", v: "Java 21, Spring Boot, RabbitMQ, PostgreSQL" },
    ],
    diagram: {
      alt: "A scheduler runs every 10 minutes and hands off to a detect stage, which checks for new data. A plan stage removes duplicates and decides where to resume. An ingest stage fetches the data page by page and writes it to the tenant's PostgreSQL database. A summarise stage builds roll-ups, and a complete stage marks the run as done.",
      caption: "The pipeline, simplified. Every arrow between two stages is a RabbitMQ queue.",
      nodes: [
        { id: "schedule", label: "Schedule", sub: "every 10 minutes", col: 0, row: 0 },
        { id: "detect", label: "Detect", sub: "anything new?", col: 1, row: 0 },
        { id: "plan", label: "Plan", sub: "dedupe, resume", col: 2, row: 0 },
        { id: "complete", label: "Complete", sub: "all parts done?", col: 0, row: 1 },
        { id: "summarise", label: "Summarise", sub: "roll-ups, forecasts", col: 1, row: 1 },
        { id: "ingest", label: "Ingest", sub: "page by page", col: 2, row: 1 },
        { id: "db", label: "Tenant database", sub: "PostgreSQL", col: 2, row: 2 },
      ],
      edges: [
        { from: "schedule", to: "detect" },
        { from: "detect", to: "plan" },
        { from: "plan", to: "ingest" },
        { from: "ingest", to: "summarise" },
        { from: "summarise", to: "complete" },
        { from: "ingest", to: "db", label: "batched upserts", side: "left" },
      ],
    },
    sections: [
      {
        h: "What the service has to do",
        p: [
          "Upstream models keep publishing fresh risk data for every tenant: fire risk, weather, active fires. The service has to notice when something new is available, pull it in, summarise it, and only then let the product show it.",
          "One run, for one tenant and one kind of data, is thousands to tens of thousands of rows, fetched from an API a page at a time. Several copies of the service run at once, and any of them can fail halfway through.",
        ],
      },
      {
        h: "From one blocking flow to stages and queues",
        p: [
          "The first version did all of this as one blocking, synchronous flow. Each step waited on the one before it, so one slow step held up everything behind it.",
          "I re-architected it as a chain of small stages joined by RabbitMQ queues. Each stage does one job, hands off through a queue, and can be scaled separately. Different kinds of data get their own queues, each with its own number of workers.",
          "Throughput went up to 320k+ records an hour.",
        ],
      },
      {
        h: "The decisions that made it safe",
        p: ["Splitting work across queues and pods makes it fast. It also makes it easy to do the same work twice, or to do it in the wrong order. Most of the design is about preventing that."],
        table: {
          head: ["Decision", "Why"],
          rows: [
            ["Only one pod may run the scheduler at a time, enforced with a distributed lock (ShedLock)", "Several pods are deployed. Without the lock, each would start the same run."],
            ["Before starting, check whether this tenant, data type and timestamp was already handled", "A repeated trigger becomes a no-op and not a duplicate ingestion."],
            ["Publish the next message only after the database transaction commits", "Otherwise the next stage can start before the data it depends on is visible."],
            ["Take a PostgreSQL advisory lock while deciding whether a run is complete", "Two workers finishing at the same moment cannot both make that decision."],
            ["Record progress page by page, as checkpoints", "A failure resumes from the last page. Finished work is never redone."],
            ["Start only one kind of data per scheduler cycle", "Starting several at once would spike the CPU."],
            ["Call the upstream API outside the database transaction", "The call can take 5 to 30 seconds, too long to hold a database connection."],
            ["One strategy class per kind of data", "A new data model is a new class. Existing code does not change."],
          ],
        },
      },
      {
        h: "When something fails",
        p: ["Failures are expected, so there are several layers, from cheapest to last resort."],
        list: [
          "A failed message is retried three times with exponential backoff, then moved to a dead-letter queue.",
          "A failed run resumes from its checkpoint. Completed parts are skipped and failed ones restart from the last page they finished.",
          "A watchdog looks for runs that have been stuck for too long and marks them failed, so the next cycle picks them up.",
          "A message that is replayed after newer data has arrived is recognised as stale and dropped.",
        ],
      },
      {
        h: "Many tenants, one service",
        p: [
          "Each tenant has its own PostgreSQL database. Every message carries its tenant, and the service routes its queries to that tenant's database, then clears the context so nothing leaks into the next message.",
          "What a tenant gets is configuration: which kinds of data are enabled, and how they are summarised. Onboarding a tenant, or adding a data model, used to mean code changes and now does not. The pipeline powers both CRIS Premium and CRIS Essentials, and the first 20+ enterprise tenants were onboarded within three months.",
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
      "Two tables were taking in about 750K records every 6 hours, and the data stopped mattering after three days. A scheduled, per-client pipeline on Lambda, SQS and Fargate now moves everything older than 14 days to S3 as Parquet. Primary RDS storage went from 400 GB to 3 GB.",
    facts: [
      { k: "RDS storage", v: "400 GB → 3 GB", mono: true },
      { k: "Inflow", v: "~750K records / 6 hours", mono: true },
      { k: "Kept in RDS", v: "14 days", mono: true },
      { k: "Runs", v: "Every 14 days, one task per client" },
      { k: "Estimated compute", v: "$0.74 / month at 10 clients", mono: true },
    ],
    diagram: {
      alt: "EventBridge triggers a Lambda every 14 days. The Lambda reads per-client configuration from DynamoDB and sends one SQS message per client. Each message starts a Fargate task that reads rows older than 14 days from RDS and writes them to S3 as compressed Parquet. A lifecycle policy later moves the archives to S3 Glacier.",
      caption: "One run of the archival job. The Fargate task deletes rows from RDS only after their upload to S3 has finished.",
      nodes: [
        { id: "rds", label: "RDS", sub: "primary database", col: 3, row: 0 },
        { id: "eb", label: "EventBridge", sub: "every 14 days", col: 0, row: 1 },
        { id: "fn", label: "Lambda", sub: "plans the run", col: 1, row: 1 },
        { id: "sqs", label: "SQS", sub: "one message per client", col: 2, row: 1 },
        { id: "task", label: "Fargate task", sub: "one per client", col: 3, row: 1 },
        { id: "ddb", label: "DynamoDB", sub: "per-client config", col: 1, row: 2 },
        { id: "s3", label: "S3", sub: "Standard", col: 3, row: 2 },
        { id: "glacier", label: "S3 Glacier", col: 3, row: 3 },
      ],
      edges: [
        { from: "eb", to: "fn" },
        { from: "fn", to: "sqs" },
        { from: "sqs", to: "task" },
        { from: "ddb", to: "fn", label: "tables and cutoffs" },
        { from: "rds", to: "task", label: "rows older than 14 days", side: "left" },
        { from: "task", to: "s3", label: "compressed Parquet", side: "left" },
        { from: "s3", to: "glacier", label: "after 3 to 6 months", side: "left" },
      ],
    },
    sections: [
      {
        h: "The problem",
        p: [
          "Two issuance tables did most of the damage. One received about 500K records every 6 hours, the other about 250K. The data is only relevant for about three days, but nothing ever removed it.",
          "The database had grown to about 97 GB when I wrote the design, and primary storage reached 400 GB before archival took over. Queries were getting slower and RDS was running out of room.",
        ],
      },
      {
        h: "How it works",
        p: [
          "EventBridge triggers a Lambda every 14 days. The Lambda reads each client's archival configuration from DynamoDB: which tables to archive, how many days to keep, and a flag to suspend a table. It then sends one SQS message per client, so clients are processed independently and in parallel.",
          "Each message starts a Fargate task. The task extracts the rows that are past the cutoff, converts them to Parquet, compresses and encrypts the file, and uploads it to S3 under a path for that client, table and date. Only then does it delete those rows from RDS.",
          "The cutoff is 14 days by default and can be set per table. The data stops being useful after three days, but we keep two weeks in the database anyway.",
          "An S3 lifecycle policy moves archives to Glacier after three to six months. Nobody has to run anything by hand.",
        ],
      },
      {
        h: "Choosing where the job runs",
        p: ["I compared three options for a job that runs for about 45 minutes per client, on 1 vCPU and 2 GB of memory, across 10 clients."],
        table: {
          head: ["", "Fargate", "Fargate Spot", "EKS with EC2"],
          rows: [
            ["Price per hour", "~$0.05", "~$0.02", "~$0.04"],
            ["Monthly cost", "$0.74", "$0.26", "$0.31"],
            ["Retry logic needed", "No", "Yes", "No"],
            ["DevOps effort", "None", "None", "High"],
            ["Scaling", "Automatic", "Automatic", "Needs setup"],
          ],
        },
        after: [
          "I went with Fargate. Spot was about a third of the price, but its tasks can be interrupted, so the job would have needed retry logic. EKS meant ongoing DevOps work. At well under a dollar a month, neither saving was worth what it cost.",
        ],
      },
      {
        h: "Why Parquet",
        p: [
          "Parquet is columnar, so it compresses far better than CSV or JSON and is fast to read when you only need some columns. It works with Athena, Spark and Redshift, and it handles schema changes without rewriting old files.",
          "The costs are real but small here. The files are not human-readable, and writing them takes more CPU than writing a plain format.",
        ],
      },
      {
        h: "Why Glacier",
        p: ["Restores are rare, so storage price mattered more than retrieval speed. These were the per-GB prices when I wrote the design."],
        table: {
          head: ["Storage class", "Per GB / month", "Retrieval"],
          rows: [
            ["S3 Standard", "$0.023", "Instant"],
            ["S3 Infrequent Access", "$0.0125", "Instant"],
            ["S3 Glacier", "$0.004", "1 minute to 12 hours"],
            ["S3 Glacier Deep Archive", "$0.00099", "12 to 48 hours"],
          ],
        },
        after: [
          "Glacier is about 83% cheaper than Standard. The price is paid at restore time: a retrieval has to be requested, it can take hours, and a fast one costs extra. Deep Archive stays open as a later step if the bill ever matters more than the wait.",
        ],
      },
      {
        h: "Getting data back",
        p: [
          "Archived records stay reachable through DynamoDB and S3, with low-latency retrieval for historical lookups.",
          "For a full restore, the Parquet file is retrieved, decrypted and reinserted into the database.",
        ],
      },
      {
        h: "Result",
        p: ["Primary RDS storage went from 400 GB to 3 GB. Queries got faster and the infrastructure bill went down."],
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
