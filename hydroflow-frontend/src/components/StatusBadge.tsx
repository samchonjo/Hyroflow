import type { TicketStatus } from '../types';

export default function StatusBadge({ status }: { status: TicketStatus }) {
  const styles: Record<TicketStatus, string> = {
    open: 'status-open',
    in_progress: 'status-progress',
    closed: 'status-closed',
  };

  const labels: Record<TicketStatus, string> = {
    open: 'Open',
    in_progress: 'In Progress',
    closed: 'Closed',
  };

  return <span className={`status-badge ${styles[status]}`}>{labels[status]}</span>;
}
