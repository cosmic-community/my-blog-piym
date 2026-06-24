// app/authors/[slug]/page.tsx
import { getAuthor, getPostsByAuthor, getMetafieldValue } from '@/lib/cosmic'
import { notFound } from 'next/navigation'
import PostCard from '@/components/PostCard'
import EmptyState from '@/components/EmptyState'
import type { Metadata } from 'next'

export const revalidate = 60

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const author = await getAuthor(slug)
  if (!author) {
    return { title: 'Author Not Found' }
  }
  return {
    title: `${getMetafieldValue(author.metadata?.name) || author.title} | My Blog`,
    description: getMetafieldValue(author.metadata?.bio),
  }
}

export default async function AuthorPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const author = await getAuthor(slug)

  if (!author) {
    notFound()
  }

  const posts = await getPostsByAuthor(author.id)
  const name = getMetafieldValue(author.metadata?.name) || author.title
  const bio = getMetafieldValue(author.metadata?.bio)
  const website = getMetafieldValue(author.metadata?.website)

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white rounded-3xl border border-gray-200 p-8 flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
        {author.metadata?.avatar ? (
          <img
            src={`${author.metadata.avatar.imgix_url}?w=240&h=240&fit=crop&auto=format,compress`}
            alt={name}
            width={120}
            height={120}
            className="w-28 h-28 rounded-full object-cover flex-shrink-0"
          />
        ) : (
          <div className="w-28 h-28 rounded-full bg-brand-100 flex items-center justify-center text-4xl flex-shrink-0">
            👤
          </div>
        )}
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900">{name}</h1>
          {bio && <p className="mt-3 text-gray-600 max-w-2xl">{bio}</p>}
          {website && (
            <a
              href={website}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block text-brand-600 font-semibold hover:underline"
            >
              Visit website →
            </a>
          )}
        </div>
      </div>

      <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6">
        Posts by {name}
      </h2>

      {posts.length === 0 ? (
        <EmptyState title="No posts by this author yet" />
      ) : (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  )
}