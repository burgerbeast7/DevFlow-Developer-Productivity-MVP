import { differenceInHours, parseISO, format } from 'date-fns';

export const calculateMetrics = (data, devId = "DEV-001") => {
  const { issues, pullRequests, deployments, bugs } = data;

  // Filter for the specific IC
  const icIssues = issues.filter(i => i.developer_id === devId);
  const icPRs = pullRequests.filter(pr => pr.developer_id === devId);
  const icDeploys = deployments.filter(d => d.developer_id === devId);
  const icBugs = bugs.filter(b => b.developer_id === devId);

  // 1. Cycle Time: Avg time from issue In Progress to Done
  const completedIssues = icIssues.filter(i => i.status === 'Done' && i.in_progress_at && i.done_at);
  const totalCycleTimeHours = completedIssues.reduce((acc, issue) => {
    return acc + differenceInHours(parseISO(issue.done_at), parseISO(issue.in_progress_at));
  }, 0);
  const avgCycleTimeDays = completedIssues.length > 0 
    ? (totalCycleTimeHours / completedIssues.length / 24).toFixed(1) 
    : 0;

  // 2. Lead Time for Changes: Avg time from PR opened to successful production deployment
  // Linking via Fact_CI_Deployments which has both pr_id and completed_at
  const successDeploys = icDeploys.filter(d => d.status.toLowerCase() === 'success' && d.environment === 'prod');
  const totalLeadTimeHours = successDeploys.reduce((acc, deploy) => {
    const pr = pullRequests.find(p => p.pr_id === deploy.pr_id);
    if (pr) {
      return acc + differenceInHours(parseISO(deploy.completed_at), parseISO(pr.opened_at));
    }
    return acc;
  }, 0);
  const avgLeadTimeDays = successDeploys.length > 0 
    ? (totalLeadTimeHours / successDeploys.length / 24).toFixed(1) 
    : 0;

  // 3. PR Throughput: Count of merged pull requests in the month (April 2026)
  const prThroughput = icPRs.filter(pr => pr.status === 'merged' && pr.month_merged === '2026-04').length;

  // 4. Deployment Frequency: Count of successful production deployments
  const deploymentFrequency = successDeploys.filter(d => d.month_deployed === '2026-04').length;

  // 5. Bug Rate: Escaped production bugs / issues completed
  const icCompletedInMonth = completedIssues.filter(i => i.month_done === '2026-04').length;
  const icBugsInMonth = icBugs.filter(b => b.month_found === '2026-04' && b.escaped_to_prod === 'Yes').length;
  
  const bugRate = icCompletedInMonth > 0 
    ? ((icBugsInMonth / icCompletedInMonth) * 100).toFixed(1) 
    : 0;

  return {
    cycleTime: { value: avgCycleTimeDays, unit: 'days', label: 'Cycle Time', trend: -12 },
    leadTime: { value: avgLeadTimeDays, unit: 'days', label: 'Lead Time for Changes', trend: -5 },
    prThroughput: { value: prThroughput, unit: 'PRs', label: 'PR Throughput', trend: 15 },
    deploymentFrequency: { value: deploymentFrequency, unit: 'deploys', label: 'Deployment Freq', trend: 8 },
    bugRate: { value: `${bugRate}%`, unit: '', label: 'Bug Rate', trend: -2 }
  };
};

export const getInterpretation = (metrics) => {
  const { cycleTime, leadTime, bugRate, deploymentFrequency } = metrics;
  
  let story = "";
  let steps = [];

  const ct = parseFloat(cycleTime.value);
  const lt = parseFloat(leadTime.value);

  if (ct < 4 && lt > 3) {
    story = `Your median Cycle Time (${ct}d) is healthy, meaning you execute tasks quickly once started. However, the Lead Time (${lt}d) shows a delay after your work is code-complete. This is likely due to the bottleneck identified in the Payments API release pipeline.`;
    steps = [
      { title: "Reduce PR Review Latency", desc: "Your PRs currently wait 10+ hours for first review. Try tagging specific reviewers earlier." },
      { title: "Standardize Hotfixes", desc: "Standard releases take 1.5 days longer than hotfixes. Investigate if standard verification can be streamlined." }
    ];
  } else if (parseFloat(bugRate.value.replace('%','')) > 10) {
    story = "Throughput is high, but the escaped bug rate is rising. Speed is currently coming at the cost of production stability for the Mobile Growth team.";
    steps = [
      { title: "Enforce Unit Test Coverage", desc: "Ensure new features have at least 80% coverage before PR approval." },
      { title: "Automated Smoke Tests", desc: "Add a smoke test step to the mobile CI pipeline to catch regression before release." }
    ];
  } else {
    story = "Your engineering velocity and quality are in balance. You maintain a consistent delivery cadence with minimal production regressions.";
    steps = [
      { title: "Knowledge Sharing", desc: "Document your optimization techniques for the Core Platform team." },
      { title: "Proactive Refactoring", desc: "Use the current stable period to address low-severity technical debt in the Checkout Service." }
    ];
  }

  return { story, steps };
};
