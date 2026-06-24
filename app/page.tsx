import { getPosts } from '@/lib/cosmic'
import PostCard from '@/components/PostCard'
import EmptyState from '@/components/EmptyState'
import { getMetafieldValue } from '@/lib/cosmic'
import Link from 'next/link'
import type { Post } from '@/types'

export const revalidate = 60

export default async function HomePage() {
  const posts = await getPosts()

  const featured = posts[0]
  const rest = posts.slice(1)

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-b from-brand-50 to-gray-50 border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight">
            Welcome to My Blog
          </h1>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Stories, ideas, and insights from our team of writers.
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {posts.length === 0 ? (
          <EmptyState
            title="No posts yet"
            message="Check back soon for new content."
          />
        ) : (
          <>
            {featured && <FeaturedPost post={featured} />}
            {rest.length > 0 && (
              <div className="mt-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Latest Posts</h2>
                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                  {rest.map((post) => (
                    <PostCard key={post.id} post={post} />
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

function FeaturedPost({ post }: { post: Post }) {
  const featuredImage = post.metadata?.featured_image
  const excerpt = getMetafieldValue(post.metadata?.excerpt)
  const title = getMetafieldValue(post.metadata?.title) || post.title
  const category = post.metadata?.category

  return (
    <Link href={`/posts/${post.slug}`}>
      <article className="group grid lg:grid-cols-2 gap-8 items-center bg-white rounded-3xl overflow-hidden border border-gray-200 hover:shadow-2xl transition-all duration-300">
        {featuredImage ? (
          <div className="aspect-[16/10] lg:aspect-auto lg:h-full overflow-hidden bg-gray-100">
            <img
              src={`${featuredImage.imgix_url}?w=1200&h=750&fit=crop&auto=format,compress`}
              alt={title}
              width={600}
              height={375}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        ) : (
          <div className="aspect-[16/10] bg-gradient-to-br from-brand-100 to-brand-50" />
        )}
        <div className="p-8">
          {category && (
            <span className="inline-block text-xs font-semibold uppercase tracking-wide text-brand-600 mb-3">
              {getMetafieldValue(category.metadata?.name) || category.title}
            </span>
          )}
          <h2 className="text-3xl font-extrabold text-gray-900 group-hover:text-brand-600 transition-colors">
            {title}
          </h2>
          {excerpt && <p className="mt-4 text-gray-600">{excerpt}</p>}
          <span className="mt-6 inline-block text-brand-600 font-semibold">
            Read article →
          </span>
        </div>
      </article>
    </Link>
  )
}