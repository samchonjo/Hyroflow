import { useMemo, useState } from 'react';

import StatusBadge from '../components/StatusBadge';
import { mockStudentUsage, mockTickets } from '../data/mockData';
import type { Ticket, User } from '../types';

const issueOptions = ['No Water', 'Low Pressure', 'Pipe Leak', 'Dirty Water'];
const priorityOptions = ['low', 'medium', 'high'] as const;

export default function StudentDashboard({ student }: { student: User }) {
  const [selectedIssue, setSelectedIssue] = useState(issueOptions[0]);
  const [priority, setPriority] = useState<(typeof priorityOptions)[number]>('medium');
  const [description, setDescription] = useState('');
  const [tickets, setTickets] = useState<Ticket[]>(mockTickets.filter((ticket) => ticket.studentId === student.id));

  const ticketCounts = useMemo(
    () => ({
      open: tickets.filter((ticket) => ticket.status === 'open').length,
      in_progress: tickets.filter((ticket) => ticket.status === 'in_progress').length,
      closed: tickets.filter((ticket) => ticket.status === 'closed').length,
    }),
    [tickets],
  );

  const totalUsage = mockStudentUsage.reduce((sum, item) => sum + item.liters, 0);

  const handleTicketSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!description.trim()) {
      return;
    }

    const newTicket: Ticket = {
      id: `T-${Date.now()}`,
      studentId: student.id,
      studentName: student.name,
      regNumber: student.regNumber ?? 'N/A',
      hostelBlock: student.hostelBlock ?? 'Unknown Block',
      roomNumber: student.roomNumber ?? 'N/A',
      issueType: selectedIssue,
      description: description.trim(),
      status: 'open',
      priority,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setTickets((current) => [newTicket, ...current]);
    setDescription('');
    setPriority('medium');
    setSelectedIssue(issueOptions[0]);
  };

  return (
    <div className="page-shell">
      <section className="header-panel">
        <div>
          <p className="eyebrow">Student Portal</p>
          <h1>Water Issue Dashboard</h1>
        </div>
        <div className="identity-pill">
          <span>{student.name}</span>
          <small>
            {student.hostelBlock} • {student.roomNumber}
          </small>
        </div>
      </section>

      <section className="stats-grid">
        <div className="stat-card blue">
          <p>Total Tickets</p>
          <h3>{tickets.length}</h3>
          <span>All records</span>
        </div>
        <div className="stat-card yellow">
          <p>Open</p>
          <h3>{ticketCounts.open}</h3>
          <span>Pending action</span>
        </div>
        <div className="stat-card orange">
          <p>In Progress</p>
          <h3>{ticketCounts.in_progress}</h3>
          <span>Assigned</span>
        </div>
        <div className="stat-card green">
          <p>Closed</p>
          <h3>{ticketCounts.closed}</h3>
          <span>Resolved</span>
        </div>
      </section>

      <section className="content-grid">
        <div className="panel form-panel">
          <div className="panel-header">
            <h2>Report Water Shortage</h2>
          </div>

          <form onSubmit={handleTicketSubmit} className="ticket-form">
            <label>
              <span>Issue Type</span>
              <select value={selectedIssue} onChange={(event) => setSelectedIssue(event.target.value)}>
                {issueOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>

            <label>
              <span>Priority</span>
              <select
                value={priority}
                onChange={(event) => setPriority(event.target.value as (typeof priorityOptions)[number])}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </label>

            <label>
              <span>Location</span>
              <input value={`${student.hostelBlock ?? 'Unknown'} / ${student.roomNumber ?? 'N/A'}`} readOnly />
            </label>

            <label>
              <span>Description</span>
              <textarea
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                rows={5}
                placeholder="Describe the water issue, where it is occurring, and any details that may help the technician..."
              />
            </label>

            <button type="submit" className="primary-button">
              Submit Ticket
            </button>
          </form>
        </div>

        <div className="panel usage-panel">
          <div className="panel-header">
            <h2>Water Consumption</h2>
            <span className="pill">7-Day View</span>
          </div>

          <div className="usage-total">
            <strong>{totalUsage}L</strong>
            <span>This week</span>
          </div>

          <div className="chart-bars">
            {mockStudentUsage.map((entry) => (
              <div key={entry.day} className="bar-group">
                <div className="bar-track">
                  <div className="bar-fill" style={{ height: `${(entry.liters / 360) * 100}%` }} />
                </div>
                <label>{entry.day}</label>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="panel ticket-panel">
        <div className="panel-header">
          <h2>Ticket History</h2>
          <span className="pill muted">{tickets.length} total</span>
        </div>

        <div className="ticket-list">
          {tickets.map((ticket) => (
            <article key={ticket.id} className="ticket-card">
              <div className="ticket-top-row">
                <div>
                  <p className="issue-title">{ticket.issueType}</p>
                  <small>
                    Ticket #{ticket.id} • {new Date(ticket.createdAt).toLocaleDateString()}
                  </small>
                </div>
                <StatusBadge status={ticket.status} />
              </div>

              <p className="ticket-description">{ticket.description}</p>

              <div className="ticket-meta">
                <span>
                  <strong>Priority:</strong> {ticket.priority}
                </span>
                <span>
                  <strong>Technician:</strong> {ticket.technicianName ?? 'Awaiting assignment'}
                </span>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
