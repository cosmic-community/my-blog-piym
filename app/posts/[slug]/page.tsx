// app/posts/[slug]/page.tsx
import { getPost, getPosts, getMetafieldValue } from '@/lib/cosmic'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import TagBadge from '@/components/TagBadge'
import type { Metadata } from 'next'

export const revalidate = 60

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = await getPost(slug)
  if (!post) {
    return { title: 'Post Not Found' }
  }
  return {
    title: `${getMetafieldValue(post.metadata?.title) || post.title} | My Blog`,
    description: getMetafieldValue(post.metadata?.excerpt),
  }
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = await getPost(slug)

  if (!post) {
    notFound()
  }

  const featuredImage = post.metadata?.featured_image
  const content = getMetafieldValue(post.metadata?.content)
  const title = getMetafieldValue(post.metadata?.title) || post.title
  const author = post.metadata?.author
  const category = post.metadata?.category
  const tags = post.metadata?.tags

  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {category && (
        <Link
          href={`/categories/${category.slug}`}
          className="inline-block text-sm font-semibold uppercase tracking-wide text-brand-600 mb-4 hover:underline"
        >
          {getMetafieldValue(category.metadata?.name) || category.title}
        </Link>
      )}

      <h1 className="text-4xl font-extrabold text-gray-900 leading-tight">
        {title}
      </h1>

      {author && (
        <Link
          href={`/authors/${author.slug}`}
          className="mt-6 flex items-center gap-3 group"
        >
          {author.metadata?.avatar && (
            <img
              src={`${author.metadata.avatar.imgix_url}?w=96&h=96&fit=crop&auto=format,compress`}
              alt={getMetafieldValue(author.metadata?.name) || author.title}
              width={48}
              height={48}
              className="w-12 h-12 rounded-full object-cover"
            />
          )}
          <div>
            <p className="font-semibold text-gray-900 group-hover:text-brand-600 transition-colors">
              {getMetafieldValue(author.metadata?.name) || author.title}
            </p>
            <p className="text-sm text-gray-500">
              {new Date(post.created_at).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
          </div>
        </Link>
      )}

      {featuredImage && (
        <div className="mt-8 rounded-2xl overflow-hidden bg-gray-100">
          <img
            src={`${featuredImage.imgix_url}?w=1600&h=900&fit=crop&auto=format,compress`}
            alt={title}
            width={800}
            height={450}
            className="w-full h-auto object-cover"
          />
        </div>
      )}

      {content && (
        <div
          className="prose prose-lg max-w-none mt-10 prose-headings:text-gray-900 prose-a:text-brand-600"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      )}

      {tags && tags.length > 0 && (
        <div className="mt-10 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <TagBadge key={tag} tag={tag} />
          ))}
        </div>
      )}

      <div className="mt-12 pt-8 border-t border-gray-200">
        <Link href="/" className="text-brand-600 font-semibold hover:underline">
          ← Back to all posts
        </Link>
      </div>
    </article>
  )
}