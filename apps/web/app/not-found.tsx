import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center px-4">
        <h1 className="text-9xl font-extrabold text-gray-900 mb-4">Oops!</h1>
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          Page Not Found
        </h2>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-block bg-black text-white px-8 py-4 rounded-none font-semibold hover:bg-gray-800 transition-colors duration-200"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}
