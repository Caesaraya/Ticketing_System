import { MessageSquare } from 'lucide-react';

export default function CommentCard({
  comment,
  authorName,
  isOwnComment,
  content,
  timestamp,
}) {
  return (
    <div className="rounded-lg border border-gray-200 p-4 dark:border-gray-800">
      <div className="flex items-start gap-3">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
          <MessageSquare
            size={15}
            className="text-gray-500 dark:text-gray-400"
          />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
              {isOwnComment
                ? 'You'
                : authorName}
            </p>

            <p className="text-xs text-gray-400 dark:text-gray-500">
              {timestamp}
            </p>
          </div>

          <p className="mt-2 whitespace-pre-wrap text-sm text-gray-600 dark:text-gray-300">
            {content}
          </p>
        </div>
      </div>
    </div>
  );
}