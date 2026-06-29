# nodejs-demo-app · CI/CD with GitHub Actions & Docker

A production-ready Node.js/Express app that demonstrates a full CI/CD pipeline
using **GitHub Actions** and **DockerHub**.

---

## 📁 Project Structure

```
nodejs-demo-app/
├── .github/
│   └── workflows/
│       └── main.yml          # ← CI/CD pipeline definition
├── src/
│   ├── app.js                # Express app (routes + logic)
│   └── server.js             # HTTP server entry point
├── tests/
│   └── app.test.js           # Jest + Supertest test suite
├── Dockerfile                # Multi-stage production image
├── Dockerfile.test           # Image used only for running tests
├── docker-compose.yml        # Local dev / test orchestration
├── .dockerignore
├── .gitignore
└── package.json
```

---

## 🔄 CI/CD Pipeline Overview

```
Push to main
     │
     ▼
┌─────────┐    ┌─────────┐    ┌──────────────┐    ┌──────────┐
│  Lint   │───▶│  Test   │───▶│ Build & Push │───▶│  Deploy  │
│(npm audit│   │(Jest +  │   │(Docker image │   │(SSH /    │
│+ ESLint) │   │coverage)│   │→ DockerHub)  │   │ ECS etc.)│
└─────────┘    └─────────┘    └──────────────┘    └──────────┘
```

| Job | What it does |
|-----|-------------|
| **Lint** | Audits npm packages for high-severity vulnerabilities |
| **Test** | Runs Jest tests, uploads coverage artifact |
| **Build** | Builds multi-arch Docker image (amd64 + arm64), pushes to DockerHub |
| **Deploy** | Pulls latest image and deploys to production target |
| **Notify** | Posts failure summary on broken main-branch builds |

---

## 🚀 Quick Start (Local)

```bash
# 1. Install dependencies
npm install

# 2. Run the server
npm start
# → http://localhost:3000

# 3. Run tests
npm test
```

### With Docker

```bash
# Build and run production image
docker build -t nodejs-demo-app .
docker run -p 3000:3000 nodejs-demo-app

# Or with Docker Compose
docker-compose up --build
```

---

## 🔑 GitHub Secrets Required

Add these in **Settings → Secrets → Actions**:

| Secret | Description |
|--------|-------------|
| `DOCKERHUB_USERNAME` | Your DockerHub username |
| `DOCKERHUB_TOKEN` | DockerHub access token (not password) |
| `SSH_HOST` | (Optional) Server IP for SSH deploy |
| `SSH_USER` | (Optional) SSH username |
| `SSH_KEY` | (Optional) Private SSH key |

---

## 🌐 API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/` | Welcome message + version info |
| GET | `/health` | Health check (used by Docker HEALTHCHECK) |
| GET | `/api/items` | Sample data endpoint |

---

## 🐳 DockerHub Image

```bash
docker pull <your-username>/nodejs-demo-app:latest
```

Tags pushed on every merge to `main`:
- `latest`
- `main`
- `sha-<short-commit-sha>`

---

## 🛠 Extending the Pipeline

### Add a real deployment target

In `.github/workflows/main.yml`, find the **Deploy** job and replace the
"Simulate deployment" step with one of:

- **SSH / VPS** — uncomment the `appleboy/ssh-action` block
- **AWS ECS** — use `aws-actions/amazon-ecs-deploy-task-definition`
- **Fly.io** — use `superfly/flyctl-actions`
- **Render / Railway** — trigger their deploy webhook via `curl`

### Add ESLint

```bash
npm install --save-dev eslint
npx eslint --init
```
Then uncomment the ESLint step in `main.yml`.

---

## 📜 License

MIT
