import { waterConsumptionData } from '../data/mockData';

const blocks = ['Block A', 'Block B', 'Block C'];

export default function AdminDashboard() {
  const totalConsumption = waterConsumptionData.reduce((sum, item) => sum + item.litersConsumed, 0);
  const activeTickets = 12;
  const averageDailyDemand = Math.round(totalConsumption / blocks.length);

  return (
    <div className="page-shell">
      <section className="header-panel">
        <div>
          <p className="eyebrow">Admin Portal</p>
          <h1>Operations Overview</h1>
        </div>
        <div className="identity-pill alt">
          <span>Estate Office</span>
          <small>Water Management Dashboard</small>
        </div>
      </section>

      <section className="stats-grid admin-grid">
        <div className="stat-card blue">
          <p>Total Tickets</p>
          <h3>42</h3>
          <span>Across campus</span>
        </div>
        <div className="stat-card yellow">
          <p>Open Tickets</p>
          <h3>{activeTickets}</h3>
          <span>Needs action</span>
        </div>
        <div className="stat-card orange">
          <p>Water Consumed</p>
          <h3>{totalConsumption}L</h3>
          <span>Current period</span>
        </div>
        <div className="stat-card green">
          <p>Avg. Demand</p>
          <h3>{averageDailyDemand}L</h3>
          <span>Per block</span>
        </div>
      </section>

      <section className="panel">
        <div className="panel-header">
          <h2>Consumption by Hostel Block</h2>
        </div>

        <div className="admin-table">
          <table>
            <thead>
              <tr>
                <th>Block</th>
                <th>Latest Reading</th>
                <th>Liters</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {blocks.map((block, index) => {
                const blockUsage = waterConsumptionData
                  .filter((item) => item.hostelBlock === block)
                  .reduce((sum, item) => sum + item.litersConsumed, 0);

                return (
                  <tr key={block}>
                    <td>{block}</td>
                    <td>{new Date(2026, 8, 18 + index).toLocaleDateString()}</td>
                    <td>{blockUsage}L</td>
                    <td>
                      <span className={`status-badge ${index % 2 === 0 ? 'status-progress' : 'status-open'}`}>
                        {index % 2 === 0 ? 'Stable' : 'Monitor'}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
