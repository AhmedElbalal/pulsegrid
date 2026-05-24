# PulseGrid — Real-Time Analytics Dashboard

A real-time analytics SaaS dashboard built with a production-grade monorepo architecture using Turborepo, Docker, and Terraform.

🔴 [Live Demo](https://eclectic-kringle-726cec.netlify.app) · [Portfolio](https://ahmedelbalal.dev)

---

## 📸 Preview

![PulseGrid Preview](/images/pulsegrid.png)

---

## 🏗️ Architecture

This project is structured as a Turborepo monorepo with the following packages:

    pulsegrid/
    ├── apps/
    │   ├── web/          # React frontend dashboard
    │   └── api/          # Backend API server
    ├── packages/
    │   └── ui/           # Shared UI components
    ├── docker-compose.yml
    ├── terraform/        # Infrastructure as code
    └── turbo.json        # Turborepo pipeline config

---

## ✨ Features

- 📊 Real-time data visualization with Chart.js
- ⚡ WebSocket live data updates
- 🏗️ Turborepo monorepo — shared packages, parallel builds
- 🐳 Docker Compose for local development
- ☁️ Terraform for infrastructure provisioning
- 🚀 GitHub Actions CI/CD pipeline
- 🚂 Deployed on Railway

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| React + TypeScript | Frontend dashboard |
| Chart.js | Data visualization |
| WebSockets | Real-time updates |
| Turborepo | Monorepo build system |
| Docker Compose | Local dev environment |
| Terraform | Infrastructure as code |
| GitHub Actions | CI/CD pipeline |
| Railway | Cloud deployment |

---

## 🚀 Getting Started

Clone the repo and install dependencies:

    git clone https://github.com/AhmedElbalal/pulsegrid.git
    cd pulsegrid
    npm install
    npm run dev

Using Docker:

    docker-compose up

---

## 👤 Author

**Ahmed Elbalal** — [ahmedelbalal.dev](https://ahmedelbalal.dev)