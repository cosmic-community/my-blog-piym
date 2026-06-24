import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-24 text-center">
      <div className="text-6xl mb-4">🔍</div>
      <h1 className="text-3xl font-extrabold text-gray-900">Page Not Found</h1>
      <p className="mt-3 text-gray-600">
        Sorry, we couldn&apos;t find the page you were looking for.
      </p>
      <Link
        href="/"
        className="mt-8 inline-block bg-brand-600 text-white font-semibold px-6 py-3 rounded-full hover:bg-brand-700 transition-colors"
      >
        Back to Home
      </Link>
    </div>
  )
}