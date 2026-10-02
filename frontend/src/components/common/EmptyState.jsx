import React from 'react';
import { FiInbox } from 'react-icons/fi';
import ThreeButton from '../3d/ThreeButton';

export const EmptyState = ({
  icon: Icon = FiInbox,
  title = 'No items found',
  description = 'Get started by creating or adding a new record.',
  actionLabel,
  onAction
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center rounded-3xl border-2 border-dashed border-peach/40 bg-white/60 backdrop-blur-md shadow-inner">
      <div className="w-16 h-16 rounded-2xl bg-coral/10 border border-coral/20 flex items-center justify-center text-coral mb-4 shadow-sm">
        <Icon className="w-8 h-8" />
      </div>
      <h4 className="text-lg font-bold text-brown mb-1">{title}</h4>
      <p className="text-xs text-brown/65 max-w-sm mb-6 font-medium leading-relaxed">{description}</p>
      {actionLabel && onAction && (
        <ThreeButton
          onClick={onAction}
          variant="primary"
          size="sm"
        >
          {actionLabel}
        </ThreeButton>
      )}
    </div>
  );
};

export default EmptyState;
