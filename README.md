# DevFlow: Developer Productivity MVP
### Created by Kunal Chauhan

DevFlow is a specialized full-stack platform designed to bridge the gap between raw engineering metrics and actionable developer growth. This MVP focuses on the Individual Contributor (IC) journey, transforming SDLC data into meaningful narratives that help developers understand their bottlenecks and take practical next steps.

---

## 🌟 Key Features
- **Intelligent Insight Engine**: Moves beyond cold charts to tell the "likely story" (e.g., distinguishing between execution speed and release bottlenecks).
- **Metric Contextualization**: Implements the 5 core assignment metrics (Lead Time, Cycle Time, PR Throughput, Deployment Frequency, and Bug Rate) using specialized linking logic between Jira, GitHub, and CI/CD data.
- **Premium User Experience**: Modern glassmorphism UI designed for high-focus environments, featuring real-time data from a Node.js/Express backend.
- **Actionable Advice**: Dynamically generates tailored next steps based on current performance trends.

## 📊 The 5 Assignment Metrics
1. **Lead Time for Changes**: Measured from PR opening to the completion of a successful production deployment.
2. **Cycle Time**: Measured from the moment an issue moves to 'In Progress' until it is marked 'Done'.
3. **PR Throughput**: Total count of merged pull requests within the current reporting month (April 2026).
4. **Deployment Frequency**: Total successful production deployments in the month.
5. **Bug Rate**: Escaped production bugs divided by the total number of issues completed in the month.

## 🛠️ Technical Stack
- **Frontend**: React.js 18, Vite, Vanilla CSS 3 (Custom Variable System), Lucide Icons, Recharts.
- **Backend**: Node.js, Express, File System (Data persistence).
- **Data Engineering**: Python 3.12 (Pandas) used for extracting and cleaning specialized source data from Excel workbooks.

## 🧠 Responsible AI Implementation
This project exemplifies a balanced partnership between human design and AI acceleration:
- **Architecture**: AI was used to brainstorm the most efficient data-linking strategy between PR and Deployment tables.
- **Logic Verification**: AI helped verify the mathematical edge cases of "Lead Time" to ensure absolute adherence to the assignment brief.
- **Aesthetic Refinement**: AI assisted in drafting the CSS Glassmorphism tokens to ensure a premium, modern feel.
- **Ownership**: All interpretation logic and product thinking were defined by Kunal Chauhan to ensure a "Product-First" approach.

---

## 🚀 Getting Started

### 1. Prerequisites
- Node.js (v16 or higher)
- NPM

### 2. Installation
```bash
npm install
```

### 3. Running the App
```bash
npm run dev
```
- **Port 5173**: React Frontend (Dev Server)
- **Port 3001**: Express API Server

---
*Submitted for the Developer Productivity Intern Assignment.*
*By Kunal Chauhan*
