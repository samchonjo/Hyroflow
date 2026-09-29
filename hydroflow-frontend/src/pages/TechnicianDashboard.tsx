import { useMemo, useState } from 'react';

import StatusBadge from '../components/StatusBadge';
import { mockTickets, waterConsumptionData } from '../data/mockData';
import type { Ticket, TicketStatus } from '../types';

const statusFilterOptions: Array<'all' | TicketStatus> = ['all', 'open', 'in_progress', 'closed'];

export default function TechnicianDashboard() {
  const [filter, setFilter] = useState<'all' | TicketStatus>('all');
  const [tickets, setTickets] = useState<Ticket[]>(mockTickets);

  const filteredTickets = useMemo(
    () => (filter === 'all' ? tickets : tickets.filter((ticket) => ticket.status === filter)),
    [tickets, filter],
  );

  const totalConsumption = waterConsumptionData.reduce((sum, item) => sum + item.litersConsumed, 0);

  const updateTicketStatus = (ticketId: string, nextStatus: TicketStatus) => {
    setTickets((current) =>
      current.map((ticket) =>
        ticket.id === ticketId
          ? { ...ticket, status: nextStatus, updatedAt: new Date().toISOString() }
          : ticket,
      ),
    );
  };

  return (
    <div className="page-shell">
      <section className="header-panel">
        <div>
          <p className="eyebrow">Technician Portal</p>
          <h1>Work Orders</h1>
        </div>
        <div className="identity-pill alt">
          <span>James Maina</span>
          <small>North Zone Maintenance</small>
        </div>
      </section>

      <section className="stats-grid">
        <div className="stat-card blue">
          <p>Open Tickets</p>
          <h3>{tickets.filter((ticket) => ticket.status === 'open').length}</h3>
          <span>New requests</span>
        </div>
        <div className="stat-card orange">
          <p>In Progress</p>
          <h3>{tickets.filter((ticket) => ticket.status === 'in_progress').length}</h3>
          <span>Active repairs</span>
        </div>
        <div className="stat-card green">
          <p>Resolved</p>
          <h3>{tickets.filter((ticket) => ticket.status === 'closed').length}</h3>
          <span>Completed</span>
        </div>
        <div className="stat-card purple">
          <p>Water Usage</p>
          <h3>{totalConsumption}L</h3>
          <span>Across blocks</span>
        </div>
      </section>

      <section className="panel">
        <div className="panel-header row">
          <h2>Ticket Queue</h2>
          <select value={filter} onChange={(event) => setFilter(event.target.value as 'all' | TicketStatus)}>
            {statusFilterOptions.map((option) => (
              <option key={option} value={option}>
                {option === 'all' ? 'All Tickets' : option.replace('_', ' ')}
              </option>
            ))}
          </select>
        </div>

        <div className="ticket-list technician-list">
          {filteredTickets.map((ticket) => (
            <article key={ticket.id} className="ticket-card">
              <div className="ticket-top-row">
                <div>
                  <p className="issue-title">{ticket.issueType}</p>
                  <small>
                    {ticket.hostelBlock} • Room {ticket.roomNumber} • {ticket.studentName}
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
                  <strong>Reg:</strong> {ticket.regNumber}
                </span>
              </div>

              <div className="action-row">
                <button type="button" className="secondary-button" onClick={() => updateTicketStatus(ticket.id, 'in_progress')}>
                  Mark In Progress
                </button>
                <button type="button" className="primary-button" onClick={() => updateTicketStatus(ticket.id, 'closed')}>
                  Close Ticket
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
