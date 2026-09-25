export const formatCurrency = (amount, currency = 'USD') => {
  if (amount === undefined || amount === null) return 'N/A';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0
  }).format(amount);
};

export const formatDate = (dateString) => {
  if (!dateString) return 'Not set';
  const d = new Date(dateString);
  return d.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
};

export const formatRelativeTime = (dateString) => {
  if (!dateString) return '';
  const now = new Date();
  const date = new Date(dateString);
  const diffInDays = Math.round((date - now) / (1000 * 60 * 60 * 24));

  if (diffInDays === 0) return 'Today';
  if (diffInDays === 1) return 'Tomorrow';
  if (diffInDays === -1) return 'Yesterday';
  if (diffInDays > 1) return `In ${diffInDays} days`;
  return `${Math.abs(diffInDays)} days ago`;
};

export const getStatusBadgeStyle = (status) => {
  switch (status) {
    case 'Wishlist':
      return 'bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700';
    case 'Applied':
      return 'bg-sky-50 text-sky-700 border-sky-200 dark:bg-sky-950/40 dark:text-sky-300 dark:border-sky-800';
    case 'In Review':
      return 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800';
    case 'Interviewing':
      return 'bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-950/40 dark:text-indigo-300 dark:border-indigo-800';
    case 'Offered':
      return 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800';
    case 'Rejected':
      return 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/40 dark:text-rose-300 dark:border-rose-800';
    default:
      return 'bg-slate-100 text-slate-700 border-slate-200';
  }
};

export const getPriorityBadgeStyle = (priority) => {
  switch (priority) {
    case 'High':
      return 'bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-300';
    case 'Medium':
      return 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300';
    case 'Low':
      return 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300';
    default:
      return 'bg-slate-100 text-slate-700';
  }
};

export const getScoreColor = (score) => {
  if (score >= 80) return 'text-emerald-500 stroke-emerald-500';
  if (score >= 60) return 'text-amber-500 stroke-amber-500';
  return 'text-rose-500 stroke-rose-500';
};
