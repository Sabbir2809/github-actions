# Learn GitHub Actions

> Beginner friendly + Real-life analogy + Production mindset

---

# Table of Contents

- What is GitHub Actions
- Easy Explanation
- Why Use It
- CI/CD Concept
- How GitHub Actions Works
- Workflow Fundamentals
- Workflow Deep Dive
- Reusable Workflow
- Composite Action
- Docker / JS Actions
- Matrix Strategy
- Cache
- Artifacts
- Secrets & Security
- Self Hosted Runner
- Environment & Approval
- Real Project Examples
- Best Practices
- Debugging Tips

---

# 1) What is GitHub Actions?

**GitHub Actions** is an automation platform inside GitHub.

It automates:

- testing
- building
- deployment
- notifications
- cron jobs
- security scan
- release automation

Simple:

> **You push code → GitHub automatically works**

---

# 2) Easy Explanation

Imagine restaurant automation:

Manual:

Order আসে → Chef রান্না → Packaging → Delivery

Automated:

Order আসে → Robot রান্না → Auto QC → Auto Delivery

Software world:

Code push → Test → Build → Deploy

This robot = **GitHub Actions**

---

# 3) Why Use GitHub Actions?

Benefits:

- automatic
- fast
- repeatable
- less human error
- team consistency
- production ready
- built into GitHub

---

# 4) CI/CD Concept

## CI = Continuous Integration

Meaning:

Every push / PR:

- install deps
- lint
- test
- build

Example:

```bash
git push
```

↓

Auto:

```bash
npm install
npm run lint
npm test
npm run build
```

---

## CD = Continuous Delivery

Ready for deployment automatically.

Human approves deploy.

---

## Continuous Deployment

Fully automatic production deployment.

Push → Live

---

Visual:

Developer  
↓  
Push  
↓  
CI  
↓  
Build  
↓  
Deploy  
↓  
Production

---

# 5) How GitHub Actions Works

Flow:

Developer action  
↓  
Event trigger  
↓  
Workflow starts  
↓  
Runner machine created  
↓  
Jobs run  
↓  
Steps run  
↓  
Logs generated  
↓  
Success / Fail

---

# 6) Folder Structure

```bash
project/
 ├── src/
 ├── package.json
 └── .github/
      └── workflows/
           ├── ci.yml
           ├── deploy.yml
           └── release.yml
```

Important:

```bash
.github/workflows/
```

GitHub scans this folder.

---

# 7) Core Concepts

| Term     | Meaning            |
| -------- | ------------------ |
| Workflow | automation file    |
| Event    | trigger            |
| Job      | group of tasks     |
| Step     | single task        |
| Runner   | machine            |
| Action   | reusable block     |
| Secret   | encrypted variable |
| Artifact | generated file     |

---

# 8) Workflow Structure

Basic:

```yaml
name:

on:

jobs:
```

---

Example:

```yaml
name: Node CI

on: push

jobs:
  test:
    runs-on: ubuntu-latest

    steps:
      - run: echo "Hello"
```

---

# 9) name

Workflow name.

```yaml
name: Backend CI Pipeline
```

Readable name use.

Good:

```yaml
name: API Test Pipeline
```

Bad:

```yaml
name: workflow1
```

---

# 10) on (Event)

Trigger.

Example:

```yaml
on: push
```

---

## push

```yaml
on: push
```

---

## pull_request

```yaml
on: pull_request
```

---

## workflow_dispatch

Manual run.

```yaml
on:
  workflow_dispatch:
```

---

## schedule

Cron.

```yaml
on:
  schedule:
    - cron: "0 0 * * *"
```

Daily midnight.

---

## Branch filter

```yaml
on:
  push:
    branches:
      - main
      - develop
```

---

## Tag filter

```yaml
on:
  push:
    tags:
      - v*
```

---

## Path filter

```yaml
on:
  push:
    paths:
      - src/**
```

---

# 11) Jobs

Workflow contains jobs.

Example:

```yaml
jobs:
  test:
  build:
  deploy:
```

---

Visual:

Workflow  
├── test  
├── build  
└── deploy

---

# 12) Runner

Machine that executes workflow.

```yaml
runs-on: ubuntu-latest
```

Options:

```yaml
ubuntu-latest
windows-latest
macos-latest
```

---

# 13) Steps

Small tasks.

```yaml
steps:
```

Example:

```yaml
steps:
  - run: npm install
  - run: npm test
  - run: npm run build
```

---

# 14) run

Execute shell command.

```yaml
- run: pwd
```

```yaml
- run: ls -la
```

```yaml
- run: npm test
```

Multi-line:

```yaml
- run: |
    npm install
    npm run lint
    npm test
```

---

# 15) uses

Reusable action.

Example:

Checkout code:

```yaml
- uses: actions/checkout@v4
```

Setup Node:

```yaml
- uses: actions/setup-node@v4
```

---

# 16) with

Pass inputs.

```yaml
- uses: actions/setup-node@v4
  with:
    node-version: 20
```

---

# 17) env

Environment variable.

Workflow:

```yaml
env:
  NODE_ENV: production
```

Job:

```yaml
jobs:
  build:
    env:
      PORT: 5000
```

Step:

```yaml
- env:
    NAME: Sabbir
  run: echo $NAME
```

---

# 18) needs

Dependency.

```yaml
jobs:
  test:
  build:
    needs: test
  deploy:
    needs: build
```

Flow:

test → build → deploy

---

# 19) if condition

Conditional run.

```yaml
if: github.ref == 'refs/heads/main'
```

---

# 20) Secrets

Encrypted variables.

Examples:

- DB_PASSWORD
- API_KEY
- SSH_KEY
- JWT_SECRET

Use:

```yaml
${{ secrets.API_KEY }}
```

Example:

```yaml
- run: echo "${{ secrets.API_KEY }}"
```

Never hardcode.

Bad:

```yaml
PASSWORD=123456
```

---

# 21) Outputs

One job passes value to another.

Example:

```yaml
outputs:
  version: v1
```

Use:

```yaml
needs.build.outputs.version
```

---

# 22) Strategy Matrix

Run multiple versions.

Example:

```yaml
strategy:
  matrix:
    node: [18, 20, 22]
```

Runs 3 jobs.

Useful:

- multi version test
- multi OS test

---

# 23) Cache

Speed up builds.

Example:

```yaml
- uses: actions/cache@v4
```

Cache:

- npm
- yarn
- pnpm
- pip
- gradle

Benefit:

Fast CI.

---

# 24) Artifacts

Save generated files.

Example:

- build zip
- test report
- coverage report

Upload:

```yaml
- uses: actions/upload-artifact@v4
```

Download later.

---

# 25) Reusable Workflow

Purpose:

One workflow reused everywhere.

Example:

```bash
.github/workflows/node-ci.yml
```

Reusable:

```yaml
on:
  workflow_call:
```

Input:

```yaml
inputs:
  node_version:
    required: true
    type: string
```

Call:

```yaml
jobs:
  call:
    uses: ./.github/workflows/node-ci.yml
    with:
      node_version: 20
```

Useful:

Organization standard pipeline.

---

# 26) Composite Action

Reusable step group.

Folder:

```bash
.github/actions/setup-app/
```

Contains:

```bash
action.yml
```

Example:

```yaml
name: Setup App
description: Install app deps

runs:
  using: composite
  steps:
    - run: npm install
      shell: bash
```

Use:

```yaml
- uses: ./.github/actions/setup-app
```

---

## Composite vs Reusable Workflow

Composite:

→ step reusable

Reusable Workflow:

→ whole workflow reusable

---

# 27) Docker Action

Container based action.

Good for:

- isolated runtime
- custom toolchain

Contains:

Dockerfile

---

# 28) JavaScript Action

Node based action.

Fast.

Reusable.

Marketplace actions mostly JS.

---

# 29) Self Hosted Runner

Own machine.

Examples:

- VPS
- EC2
- office server

Benefits:

- more CPU
- custom software
- private network

---

# 30) Service Containers

Use DB inside CI.

Example:

Postgres

Redis

MySQL

Example:

```yaml
services:
  postgres:
```

Useful for integration tests.

---

# 31) Environment

Deployment stage:

- dev
- staging
- production

Protection:

- manual approval
- secret isolation

---

# 32) Permissions

Token permission limit.

Example:

```yaml
permissions:
  contents: read
```

Security best practice.

Least privilege.

---

# 33) Concurrency

Prevent duplicate workflow.

```yaml
concurrency: production
```

Old deploy cancels.

Only latest runs.

---

# 34) Notifications

Send to:

- Slack
- Discord
- Email

Example:

Deploy failed → notify team

---

# 35) Real Project Example (Node.js CI)

```yaml
name: Node CI

on:
  pull_request:
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: 20

      - run: npm ci
      - run: npm run lint
      - run: npm test
      - run: npm run build
```

---

# 36) Docker Build Push Example

```yaml
- run: docker build -t app .
- run: docker push image
```

Production:

Build → Tag → Push → Deploy

---

# 37) AWS Deploy Example

Flow:

Push  
↓  
Test  
↓  
Docker build  
↓  
Push image  
↓  
SSH server  
↓  
Pull image  
↓  
Restart container

---

# 38) Monorepo Example

Apps:

```bash
apps/
  frontend/
  backend/
```

Only backend changed:

Run backend workflow.

Path filter.

Efficient.

---

# 39) Best Practices

## small workflows

Split:

- ci.yml
- deploy.yml
- release.yml

---

## reusable logic

Use:

- composite
- reusable workflow

---

## secure secrets

Never echo secret.

---

## cache dependencies

Fast builds.

---

## pin versions

Good:

```yaml
@v4
```

---

## use npm ci

Not:

```bash
npm install
```

Use:

```bash
npm ci
```

CI friendly.

---

## add timeout

```yaml
timeout-minutes: 10
```

---

## concurrency

Prevent duplicate deploy.

---

# 40) Debugging

Check:

Actions tab logs

Use:

```yaml
- run: pwd
```

```yaml
- run: env
```

```yaml
- run: ls -la
```

Print debug info.

---

# 41) Production Pipeline Architecture

Developer Push  
↓  
Lint  
↓  
Test  
↓  
Build  
↓  
Docker Build  
↓  
Security Scan  
↓  
Push Registry  
↓  
Deploy Staging  
↓  
Approval  
↓  
Deploy Production  
↓  
Notify Team

---

# Final Summary

GitHub Actions = automation brain of repo.

Main pillars:

- Workflow
- Event
- Job
- Step
- Action
- Runner
- Secret
- Reusable workflow
- Composite action

---

## 🔹 Best Practices

✔ Secrets use করো (never hardcode) 🔐
✔ Cache use করো ⚡
✔ Reusable workflow use করো
✔ Small & modular pipeline রাখো
✔ Environment protection ব্যবহার করো

---

## 🔹 Debugging Tips

- GitHub Actions logs check করো
- echo ব্যবহার করো
- step by step isolate করো
- failed step identify করো

---

## 🔹 Common Mistakes

❌ checkout missing
❌ wrong node version
❌ secrets missing
❌ wrong path
