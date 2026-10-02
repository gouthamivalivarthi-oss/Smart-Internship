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
      return 'bg-[#F6EBDD] text-[#3D2B24] border-[#F5B895]/40 dark:bg-[#3D2B24] dark:text-[#FFF8ED] dark:border-[#553B30] font-semibold';
    case 'Applied':
      return 'bg-[#F5B895]/20 text-[#C85C45] border-[#F5B895]/50 dark:bg-[#F5B895]/15 dark:text-[#F5B895] font-bold';
    case 'In Review':
      return 'bg-[#F5B895]/30 text-[#A84532] border-[#F5B895]/60 dark:bg-[#F5B895]/20 dark:text-[#F5B895] font-bold';
    case 'Interviewing':
      return 'bg-[#B9A7E8]/25 text-[#6C54A7] border-[#B9A7E8]/40 dark:bg-[#B9A7E8]/20 dark:text-[#B9A7E8] font-bold';
    case 'Offered':
      return 'bg-[#9DB79B]/25 text-[#5C7D5A] border-[#9DB79B]/50 dark:bg-[#9DB79B]/20 dark:text-[#9DB79B] font-bold';
    case 'Rejected':
      return 'bg-[#C85C45]/15 text-[#A84532] border-[#C85C45]/30 dark:bg-[#C85C45]/20 dark:text-[#F5B895] font-semibold';
    default:
      return 'bg-[#F6EBDD] text-[#3D2B24] border-[#F5B895]/30';
  }
};

export const getPriorityBadgeStyle = (priority) => {
  switch (priority) {
    case 'High':
      return 'bg-[#C85C45]/20 text-[#A84532] dark:text-[#F5B895] border border-[#C85C45]/40 font-bold';
    case 'Medium':
      return 'bg-[#F5B895]/30 text-[#C85C45] dark:text-[#F5B895] border border-[#F5B895]/50 font-bold';
    case 'Low':
      return 'bg-[#F6EBDD] text-[#3D2B24] dark:bg-[#3D2B24] dark:text-[#FFF8ED] border border-[#F5B895]/30';
    default:
      return 'bg-[#F6EBDD] text-[#3D2B24]';
  }
};

export const getScoreColor = (score) => {
  if (score >= 80) return 'text-[#5C7D5A] stroke-[#5C7D5A]';
  if (score >= 60) return 'text-[#E9785B] stroke-[#E9785B]';
  return 'text-[#C85C45] stroke-[#C85C45]';
};
