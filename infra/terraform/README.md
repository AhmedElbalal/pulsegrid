# PulseGrid Infra (Concept Only)

High-level AWS sketch:
- **Lambda (Ingestion)** → accepts `/api/events` via API Gateway; pushes to **SQS**.
- **Worker (Fargate or Lambda)** → drains SQS, batches inserts into **RDS Postgres**.
- **Socket service** (Fargate) summarises 5m windows; publishes via **Socket.IO** over ALB.
- **Fanout**: Optional stream to **Kinesis Firehose** → S3 data lake / Athena.

This folder contains only module stubs and variable declarations; no deploy is performed.
