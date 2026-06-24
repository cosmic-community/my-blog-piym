// app/categories/[slug]/page.tsx
import { getCategory, getPostsByCategory, getMetafieldValue } from '@/lib/cosmic'
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
  const category = await getCategory(slug)
  if (!category) {
    return { title: 'Category Not Found' }
  }
  return {
    title: `${getMetafieldValue(category.metadata?.name) || category.title} | My Blog`,
    description: getMetafieldValue(category.metadata?.description),
  }
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const category = await getCategory(slug)

  if (!category) {
    notFound()
  }

  const posts = await getPostsByCategory(category.id)
  const name = getMetafieldValue(category.metadata?.name) || category.title

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <span className="text-sm font-semibold uppercase tracking-wide text-brand-600">
        Category
      </span>
      <h1 className="text-3xl font-extrabold text-gray-900 mt-1 mb-2">{name}</h1>
      {category.metadata?.description && (
        <p className="text-gray-600 mb-8 max-w-2xl">
          {getMetafieldValue(category.metadata?.description)}
        </p>
      )}

      {posts.length === 0 ? (
        <EmptyState title="No posts in this category yet" />
      ) : (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 mt-8">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  )
}