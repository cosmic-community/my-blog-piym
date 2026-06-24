import { getAuthors, getMetafieldValue } from '@/lib/cosmic'
import Link from 'next/link'
import EmptyState from '@/components/EmptyState'

export const revalidate = 60

export default async function AuthorsPage() {
  const authors = await getAuthors()

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Authors</h1>
      <p className="text-gray-600 mb-8">Meet the writers behind My Blog.</p>

      {authors.length === 0 ? (
        <EmptyState title="No authors yet" />
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {authors.map((author) => (
            <Link
              key={author.id}
              href={`/authors/${author.slug}`}
              className="group bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-lg hover:border-brand-300 transition-all flex items-center gap-4"
            >
              {author.metadata?.avatar ? (
                <img
                  src={`${author.metadata.avatar.imgix_url}?w=128&h=128&fit=crop&auto=format,compress`}
                  alt={getMetafieldValue(author.metadata?.name) || author.title}
                  width={64}
                  height={64}
                  className="w-16 h-16 rounded-full object-cover flex-shrink-0"
                />
              ) : (
                <div className="w-16 h-16 rounded-full bg-brand-100 flex items-center justify-center text-2xl flex-shrink-0">
                  👤
                </div>
              )}
              <div className="min-w-0">
                <h2 className="text-lg font-bold text-gray-900 group-hover:text-brand-600 transition-colors truncate">
                  {getMetafieldValue(author.metadata?.name) || author.title}
                </h2>
                {author.metadata?.bio && (
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {getMetafieldValue(author.metadata?.bio)}
                  </p>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}