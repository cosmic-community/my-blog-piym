export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="border-t border-gray-200 bg-white mt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center text-sm text-gray-500">
        <p>© {year} My Blog. All rights reserved.</p>
      </div>
    </footer>
  )
}