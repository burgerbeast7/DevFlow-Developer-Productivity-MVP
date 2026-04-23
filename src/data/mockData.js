// Data for the Developer Productivity MVP
// This mimics the tables described in the assignment workbook

export const mockData = {
  developer: {
    id: "dev_1",
    name: "Kunal Chauhan",
    team: "Core Platform",
    role: "Senior Full Stack Engineer",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Kunal"
  },
  
  // Jira-like Issue Data
  issues: [
    { id: "PROJ-101", dev_id: "dev_1", in_progress_at: "2026-04-01T09:00:00Z", done_at: "2026-04-03T17:00:00Z", status: "Done", title: "Implement Auth Flow" },
    { id: "PROJ-102", dev_id: "dev_1", in_progress_at: "2026-04-04T10:00:00Z", done_at: "2026-04-05T14:30:00Z", status: "Done", title: "Database Schema Migration" },
    { id: "PROJ-103", dev_id: "dev_1", in_progress_at: "2026-04-06T11:00:00Z", done_at: "2026-04-08T16:00:00Z", status: "Done", title: "API Endpoint Optimization" },
    { id: "PROJ-104", dev_id: "dev_1", in_progress_at: "2026-04-10T09:30:00Z", done_at: "2026-04-12T11:00:00Z", status: "Done", title: "Fix Caching Layer" },
    { id: "PROJ-105", dev_id: "dev_1", in_progress_at: "2026-04-14T10:00:00Z", done_at: "2026-04-16T15:00:00Z", status: "Done", title: "Dashboard UI Components" },
    { id: "PROJ-106", dev_id: "dev_1", in_progress_at: "2026-04-18T09:00:00Z", done_at: "2026-04-20T17:30:00Z", status: "Done", title: "Metrics Calculation Engine" },
    { id: "PROJ-107", dev_id: "dev_1", in_progress_at: "2026-04-21T11:00:00Z", done_at: "2026-04-22T14:00:00Z", status: "Done", title: "Documentation Update" },
    { id: "PROJ-108", dev_id: "dev_1", in_progress_at: "2026-04-23T10:00:00Z", done_at: null, status: "In Progress", title: "Final Review & Fixes" }
  ],

  // Pull Request Data
  pullRequests: [
    { id: "PR-501", dev_id: "dev_1", opened_at: "2026-04-02T12:00:00Z", merged_at: "2026-04-04T09:00:00Z", status: "Merged", deployment_id: "D-101" },
    { id: "PR-502", dev_id: "dev_1", opened_at: "2026-04-05T15:00:00Z", merged_at: "2026-04-05T17:30:00Z", status: "Merged", deployment_id: "D-102" },
    { id: "PR-503", dev_id: "dev_1", opened_at: "2026-04-08T16:30:00Z", merged_at: "2026-04-09T10:00:00Z", status: "Merged", deployment_id: "D-103" },
    { id: "PR-504", dev_id: "dev_1", opened_at: "2026-04-12T12:00:00Z", merged_at: "2026-04-13T14:00:00Z", status: "Merged", deployment_id: "D-104" },
    { id: "PR-505", dev_id: "dev_1", opened_at: "2026-04-16T16:00:00Z", merged_at: "2026-04-18T11:00:00Z", status: "Merged", deployment_id: "D-105" },
    { id: "PR-506", dev_id: "dev_1", opened_at: "2026-04-20T18:00:00Z", merged_at: "2026-04-21T09:30:00Z", status: "Merged", deployment_id: "D-106" }
  ],

  // CI/CD Deployment Data
  deployments: [
    { id: "D-101", status: "Success", timestamp: "2026-04-05T08:00:00Z" },
    { id: "D-102", status: "Success", timestamp: "2026-04-06T09:00:00Z" },
    { id: "D-103", status: "Success", timestamp: "2026-04-10T08:30:00Z" },
    { id: "D-104", status: "Success", timestamp: "2026-04-14T10:00:00Z" },
    { id: "D-105", status: "Success", timestamp: "2026-04-19T09:00:00Z" },
    { id: "D-106", status: "Success", timestamp: "2026-04-22T08:00:00Z" }
  ],

  // Post-release Bug Data
  bugs: [
    { id: "B-201", related_issue_id: "PROJ-102", found_at: "2026-04-15T10:00:00Z" }
  ]
};
