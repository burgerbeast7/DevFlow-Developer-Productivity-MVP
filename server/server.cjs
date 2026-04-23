const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// Load Actual Data from the extracted JSON
let actualData = {};
try {
  const dataPath = path.join(__dirname, '../actual_data.json');
  const rawData = fs.readFileSync(dataPath, 'utf8');
  const parsed = JSON.parse(rawData);
  
  // Map sheets to our app structure
  actualData = {
    developers: parsed.Dim_Developers,
    issues: parsed.Fact_Jira_Issues,
    pullRequests: parsed.Fact_Pull_Requests,
    deployments: parsed.Fact_CI_Deployments,
    bugs: parsed.Fact_Bug_Reports
  };
} catch (error) {
  console.error("Error loading actual_data.json:", error);
}

app.get('/api/metrics', (req, res) => {
  res.json(actualData);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
