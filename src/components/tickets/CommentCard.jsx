import AssigneeAvatar from './AssigneeAvatar';

// One (dummy) comment: author + timestamp on top, message below.
// Different enough from ActivityCard (which has no separate
// author/avatar row) to warrant its own component.
export default function CommentCard({ author, message, time }) {
  return (
    <div className="border-b border-gray-100 py-3 last:border-0 dark:border-gray-800">
      <div className="mb-1 flex items-center justify-between">
        <AssigneeAvatar name={author} />
        <span className="text-xs text-gray-400 dark:text-gray-500">{time}</span>
      </div>
      <p className="pl-8 text-sm text-gray-600 dark:text-gray-300">{message}</p>
    </div>
  );
}