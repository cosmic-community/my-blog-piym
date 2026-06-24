interface EmptyStateProps {
  title: string
  message?: string
}

export default function EmptyState({ title, message }: EmptyStateProps) {
  return (
    <div className="text-center py-20">
      <div className="text-5xl mb-4">📭</div>
      <h2 className="text-xl font-bold text-gray-900">{title}</h2>
      {message && <p className="mt-2 text-gray-500">{message}</p>}
    </div>
  )
}