import {
  Bug,
  Sparkles,
} from 'lucide-react';

import clsx from 'clsx';

const TYPE_CONFIG = {
  BUG: {
    icon: Bug,
    label: 'Bug',
    style: 'text-red-500',
  },

  FEATURE_REQUEST: {
    icon: Sparkles,
    label: 'Feature Request',
    style: 'text-blue-500',
  },
};

export default function TicketTypeBadge({
  type,
}) {
  const config =
    TYPE_CONFIG[type] ??
    TYPE_CONFIG.BUG;

  const Icon = config.icon;

  return (
    <span
      className={clsx(
        'inline-flex items-center gap-1.5 text-xs font-medium text-gray-600 dark:text-gray-300'
      )}
    >
      <Icon
        size={14}
        className={config.style}
      />

      {config.label}
    </span>
  );
}