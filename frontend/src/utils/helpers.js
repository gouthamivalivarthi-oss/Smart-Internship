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
      return 'bg-[#E9E0D2] text-[#292722] border-[#B8B0A3]/50 dark:bg-[#35312B] dark:text-[#FFFDF7] font-bold';
    case 'Applied':
      return 'bg-[#E28A45]/20 text-[#B87333] border-[#E28A45]/40 dark:bg-[#E28A45]/15 dark:text-[#D6A85F] font-bold';
    case 'In Review':
      return 'bg-[#D6A85F]/25 text-[#B87333] border-[#D6A85F]/50 dark:bg-[#D6A85F]/20 dark:text-[#D6A85F] font-bold';
    case 'Interviewing':
      return 'bg-[#B87333]/20 text-[#B87333] border-[#B87333]/40 dark:bg-[#B87333]/25 dark:text-[#D6A85F] font-bold';
    case 'Offered':
      return 'bg-[#7E9278]/25 text-[#5F725A] border-[#7E9278]/50 dark:bg-[#7E9278]/20 dark:text-[#7E9278] font-bold';
    case 'Rejected':
      return 'bg-[#C96B4B]/15 text-[#C96B4B] border-[#C96B4B]/35 dark:bg-[#C96B4B]/20 dark:text-[#E28A45] font-bold';
    default:
      return 'bg-[#E9E0D2] text-[#292722] border-[#B8B0A3]/40';
  }
};

export const getPriorityBadgeStyle = (priority) => {
  switch (priority) {
    case 'High':
      return 'bg-[#C96B4B]/20 text-[#C96B4B] dark:text-[#E28A45] border border-[#C96B4B]/40 font-bold';
    case 'Medium':
      return 'bg-[#E28A45]/20 text-[#B87333] dark:text-[#D6A85F] border border-[#E28A45]/50 font-bold';
    case 'Low':
      return 'bg-[#E9E0D2] text-[#292722] dark:bg-[#35312B] dark:text-[#FFFDF7] border border-[#B8B0A3]/40 font-semibold';
    default:
      return 'bg-[#E9E0D2] text-[#292722]';
  }
};

export const getScoreColor = (score) => {
  if (score >= 80) return 'text-[#7E9278] stroke-[#7E9278]';
  if (score >= 60) return 'text-[#D6A85F] stroke-[#D6A85F]';
  return 'text-[#C96B4B] stroke-[#C96B4B]';
};
