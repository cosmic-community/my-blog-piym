interface TagBadgeProps {
  tag: string
}

export default function TagBadge({ tag }: TagBadgeProps) {
  return (
    <span className="inline-block bg-gray-100 text-gray-700 text-xs font-medium px-3 py-1 rounded-full">
      #{tag}
    </span>
  )
}