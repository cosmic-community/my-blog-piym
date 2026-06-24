import Link from 'next/link'
import type { Post } from '@/types'
import { getMetafieldValue } from '@/lib/cosmic'

interface PostCardProps {
  post: Post
}

export default function PostCard({ post }: PostCardProps) {
  const featuredImage = post.metadata?.featured_image
  const excerpt = getMetafieldValue(post.metadata?.excerpt)
  const author = post.metadata?.author
  const category = post.metadata?.category
  const title = getMetafieldValue(post.metadata?.title) || post.title

  return (
    <article className="group bg-white rounded-2xl overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-300">
      <Link href={`/posts/${post.slug}`}>
        {featuredImage ? (
          <div className="aspect-[16/9] overflow-hidden bg-gray-100">
            <img
              src={`${featuredImage.imgix_url}?w=800&h=450&fit=crop&auto=format,compress`}
              alt={title}
              width={400}
              height={225}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        ) : (
          <div className="aspect-[16/9] bg-gradient-to-br from-brand-100 to-brand-50" />
        )}
      </Link>
      <div className="p-6">
        {category && (
          <Link
            href={`/categories/${category.slug}`}
            className="inline-block text-xs font-semibold uppercase tracking-wide text-brand-600 mb-2 hover:underline"
          >
            {getMetafieldValue(category.metadata?.name) || category.title}
          </Link>
        )}
        <Link href={`/posts/${post.slug}`}>
          <h2 className="text-xl font-bold text-gray-900 group-hover:text-brand-600 transition-colors line-clamp-2">
            {title}
          </h2>
        </Link>
        {excerpt && (
          <p className="mt-2 text-gray-600 text-sm line-clamp-3">{excerpt}</p>
        )}
        {author && (
          <div className="mt-4 flex items-center gap-3">
            {author.metadata?.avatar && (
              <img
                src={`${author.metadata.avatar.imgix_url}?w=64&h=64&fit=crop&auto=format,compress`}
                alt={getMetafieldValue(author.metadata?.name) || author.title}
                width={32}
                height={32}
                className="w-8 h-8 rounded-full object-cover"
              />
            )}
            <span className="text-sm text-gray-700 font-medium">
              {getMetafieldValue(author.metadata?.name) || author.title}
            </span>
          </div>
        )}
      </div>
    </article>
  )
}