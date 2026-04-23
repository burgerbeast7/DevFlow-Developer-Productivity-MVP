import React, { useState, useEffect } from 'react';
import { 
  Activity, 
  GitPullRequest, 
  Zap, 
  Bug, 
  Clock, 
  ChevronRight,
  LayoutDashboard,
  Users,
  Settings,
  HelpCircle,
  TrendingUp,
  TrendingDown
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip 
} from 'recharts';
import { mockData } from './data/mockData';
import { calculateMetrics, getInterpretation } from './utils/metrics';
import actualData from './data/actualData.json';

const chartData = [
  { name: 'Week 1', prs: 2, bugs: 0 },
  { name: 'Week 2', prs: 5, bugs: 1 },
  { name: 'Week 3', prs: 3, bugs: 0 },
  { name: 'Week 4', prs: 4, bugs: 0 },
];

const MetricCard = ({ label, value, unit, trend, icon: Icon }) => (
  <div className="metric-card fade-in">
    <div className="metric-label">{label}</div>
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <div className="metric-value">
        {value} <span style={{ fontSize: '1rem', color: 'var(--text-muted)', fontWeight: 400 }}>{unit}</span>
      </div>
      <div style={{ padding: '0.75rem', background: 'var(--primary-glow)', borderRadius: '12px', color: 'var(--primary)' }}>
        <Icon size={24} />
      </div>
    </div>
    <div className={`metric-trend ${trend > 0 ? 'trend-up' : 'trend-down'}`}>
      {trend > 0 ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
      {Math.abs(trend)}% vs last month
    </div>
  </div>
);

function App() {
  const [data, setData] = useState(null);
  const [metrics, setMetrics] = useState(null);
  const [insight, setInsight] = useState(null);
  const [view, setView] = useState('ic'); // 'ic' or 'manager'
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Try local bundled data first for the static demo
        const result = actualData;
        setData(result);
        const calculated = calculateMetrics(result, "DEV-001");
        setMetrics(calculated);
        setInsight(getInterpretation(calculated));
        
        // Attempt to sync with live API if available
        const response = await fetch('http://localhost:3001/api/metrics');
        if (response.ok) {
          const liveData = await response.json();
          setData(liveData);
          const liveCalculated = calculateMetrics(liveData, "DEV-001");
          setMetrics(liveCalculated);
          setInsight(getInterpretation(liveCalculated));
        }
      } catch (error) {
        console.log("Static mode: Using bundled data.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading || !metrics) return (
    <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#050507', color: 'white' }}>
      <div className="logo" style={{ fontSize: '2rem' }}>Loading Insights...</div>
    </div>
  );

  const currentUser = data.developers.find(d => d.developer_id === "DEV-001");

  return (
    <div className="app-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="logo">
          <Zap fill="currentColor" />
          <span>DevFlow</span>
        </div>
        
        <nav className="nav-links">
          <div className={`nav-item ${view === 'ic' ? 'active' : ''}`} onClick={() => setView('ic')}>
            <LayoutDashboard size={20} />
            Dashboard
          </div>
          <div className={`nav-item ${view === 'manager' ? 'active' : ''}`} onClick={() => setView('manager')}>
            <Users size={20} />
            Manager View
          </div>
          <div className={`nav-item ${view === 'project-health' ? 'active' : ''}`} onClick={() => setView('project-health')}>
            <Activity size={20} />
            Project Health
          </div>
          <div className={`nav-item ${view === 'settings' ? 'active' : ''}`} onClick={() => setView('settings')}>
            <Settings size={20} />
            Settings
          </div>
        </nav>

        <div style={{ marginTop: 'auto' }}>
          <div className="nav-item" style={{ fontSize: '0.8rem', opacity: 0.8, cursor: 'default' }}>
            <span>Made with ❤️ by</span>
            <strong style={{ display: 'block', color: 'var(--primary)' }}>Kunal Chauhan</strong>
          </div>
          <div className="nav-item">
            <HelpCircle size={20} />
            Support
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <header className="header">
          <h1>
            {view === 'ic' && 'Productivity Dashboard'}
            {view === 'manager' && 'Team Overview'}
            {view === 'project-health' && 'Project Health'}
            {view === 'settings' && 'User Settings'}
          </h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <p>
              {view === 'ic' && `Welcome back, ${currentUser.developer_name}.`}
              {view === 'manager' && `Performance summary for ${currentUser.team_name}.`}
              {view === 'project-health' && `System stability & release health for ${currentUser.team_name}.`}
              {view === 'settings' && `Manage your profile and dashboard preferences.`}
            </p>
            <span style={{ padding: '0.25rem 0.75rem', background: 'var(--primary-glow)', borderRadius: '20px', fontSize: '0.75rem', color: 'var(--primary)', border: '1px solid rgba(99,102,241,0.2)' }}>
              {currentUser.level} | {currentUser.team_name}
            </span>
          </div>
        </header>

        {view === 'ic' && (
          <>
            {/* Metrics Grid */}
            <div className="metrics-grid">
              <MetricCard 
                label="Cycle Time" 
                value={metrics.cycleTime.value} 
                unit={metrics.cycleTime.unit} 
                trend={metrics.cycleTime.trend} 
                icon={Clock} 
              />
              <MetricCard 
                label="Lead Time" 
                value={metrics.leadTime.value} 
                unit={metrics.leadTime.unit} 
                trend={metrics.leadTime.trend} 
                icon={Zap} 
              />
              <MetricCard 
                label="PR Throughput" 
                value={metrics.prThroughput.value} 
                unit={metrics.prThroughput.unit} 
                trend={metrics.prThroughput.trend} 
                icon={GitPullRequest} 
              />
              <MetricCard 
                label="Bug Rate" 
                value={metrics.bugRate.value} 
                unit={metrics.bugRate.unit} 
                trend={metrics.bugRate.trend} 
                icon={Bug} 
              />
            </div>

            {/* Insight Section */}
            <div className="insight-container">
              <section className="card fade-in" style={{ animationDelay: '0.2s' }}>
                <h3>
                  <Activity size={20} style={{ color: 'var(--primary)' }} />
                  The Likely Story
                </h3>
                <div className="insight-story">
                  {insight.story}
                </div>
                
                <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem' }}>
                  <div style={{ background: 'rgba(255,255,255,0.05)', padding: '1rem', borderRadius: '12px', flex: 1 }}>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>DEPLOY FREQ</div>
                    <div style={{ fontSize: '1.25rem', fontWeight: 700 }}>{metrics.deploymentFrequency.value} <span style={{ fontSize: '0.8rem' }}>times</span></div>
                  </div>
                  <div style={{ background: 'rgba(255,255,255,0.05)', padding: '1rem', borderRadius: '12px', flex: 1 }}>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>COMPLETED</div>
                    <div style={{ fontSize: '1.25rem', fontWeight: 700 }}>{data.issues.filter(i => i.developer_id === "DEV-001" && i.status === 'Done').length} <span style={{ fontSize: '0.8rem' }}>issues</span></div>
                  </div>
                </div>

                <div style={{ marginTop: '2rem', height: '180px', width: '100%' }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData}>
                      <defs>
                        <linearGradient id="colorPrs" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="var(--primary)" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                      <XAxis dataKey="name" hide />
                      <YAxis hide />
                      <Tooltip 
                        contentStyle={{ background: '#111', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                        itemStyle={{ color: 'var(--primary)' }}
                      />
                      <Area type="monotone" dataKey="prs" stroke="var(--primary)" fillOpacity={1} fill="url(#colorPrs)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </section>

              <section className="card fade-in" style={{ animationDelay: '0.4s' }}>
                <h3>
                  <ChevronRight size={20} style={{ color: 'var(--success)' }} />
                  Practical Next Steps
                </h3>
                {insight.steps.map((step, index) => (
                  <div key={index} className="next-step-item">
                    <h4>{step.title}</h4>
                    <p>{step.desc}</p>
                  </div>
                ))}
              </section>
            </div>
          </>
        )}

        {view === 'manager' && (
          <div className="card fade-in">
            <h3>Manager Summary</h3>
            <p style={{ color: 'var(--text-muted)', lineHeight: '1.6' }}>
              The total team PR Throughput for <strong>{currentUser.team_name}</strong> is up 15%. Average Cycle Time across the team is <strong>4.2 days</strong>. 
              <br/><br/>
              Bottleneck Alert: Lead Time for Changes is trending upwards due to increased manual regression testing in the Staging environment.
            </p>
            <div style={{ marginTop: '2rem', padding: '2rem', background: 'rgba(255,255,255,0.02)', borderRadius: '12px', border: '1px dashed var(--card-border)' }}>
              <h4>Team Performance Trend</h4>
              <div style={{ height: '200px', display: 'flex', alignItems: 'flex-end', gap: '1rem', marginTop: '1rem' }}>
                {[40, 70, 45, 90, 65, 80].map((h, i) => (
                  <div key={i} style={{ flex: 1, height: `${h}%`, background: 'var(--primary)', borderRadius: '4px 4px 0 0', opacity: 0.3 + (i * 0.1) }}></div>
                ))}
              </div>
            </div>
          </div>
        )}

        {view === 'project-health' && (
          <div className="insight-container">
            <section className="card fade-in">
              <h3>System Stability</h3>
              <div className="next-step-item">
                <h4 style={{ color: 'var(--success)' }}>Build Status: Healthy</h4>
                <p>94.2% of builds in the last 7 days passed on the first attempt.</p>
              </div>
              <div className="next-step-item">
                <h4 style={{ color: 'var(--warning)' }}>Test Coverage: 76%</h4>
                <p>Trending down 2% after the latest Payments API migration. Recommended: Add tests for PROJ-108.</p>
              </div>
            </section>
            
            <section className="card fade-in" style={{ animationDelay: '0.2s' }}>
              <h3>Incident Log</h3>
              <div className="next-step-item" style={{ borderLeftColor: 'var(--danger)' }}>
                <h4>Hotfix DEP-003</h4>
                <p>Resolved production latency issue in the checkout flow. Impact: 45 users.</p>
              </div>
            </section>
          </div>
        )}

        {view === 'settings' && (
          <div className="card fade-in" style={{ maxWidth: '600px' }}>
            <h3>Profile Settings</h3>
            <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', marginBottom: '2rem' }}>
              <div style={{ width: '80px', height: '80px', background: 'var(--primary-glow)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)', fontSize: '2rem', fontWeight: 700 }}>
                {currentUser.developer_name[0]}
              </div>
              <div>
                <h4>{currentUser.developer_name}</h4>
                <p style={{ color: 'var(--text-muted)' }}>{currentUser.developer_id} | {currentUser.level}</p>
              </div>
            </div>
            
            <div className="next-step-item">
              <h4>Notifications</h4>
              <p>Receive weekly productivity summaries via Slack.</p>
            </div>
            <div className="next-step-item">
              <h4>API Integration</h4>
              <p>Connected to: Jira, GitHub, Jenkins.</p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
