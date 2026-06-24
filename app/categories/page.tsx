import { getCategories, getMetafieldValue } from '@/lib/cosmic'
import Link from 'next/link'
import EmptyState from '@/components/EmptyState'

export const revalidate = 60

export default async function CategoriesPage() {
  const categories = await getCategories()

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Categories</h1>
      <p className="text-gray-600 mb-8">Browse posts by topic.</p>

      {categories.length === 0 ? (
        <EmptyState title="No categories yet" />
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/categories/${category.slug}`}
              className="group bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-lg hover:border-brand-300 transition-all"
            >
              <h2 className="text-xl font-bold text-gray-900 group-hover:text-brand-600 transition-colors">
                {getMetafieldValue(category.metadata?.name) || category.title}
              </h2>
              {category.metadata?.description && (
                <p className="mt-2 text-gray-600 text-sm line-clamp-3">
                  {getMetafieldValue(category.metadata?.description)}
                </p>
              )}
              <span className="mt-4 inline-block text-brand-600 text-sm font-semibold">
                View posts →
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}