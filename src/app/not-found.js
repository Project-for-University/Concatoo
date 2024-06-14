export default function Pages() {
    return (
        <div className="text-center pt-52">
            <h1 className="text-8xl font-extrabold gradient-text mb-8">Oops!</h1>
            <p className="text-2xl font-semibold mb-4">404 - PAGE NOT FOUND</p>
            <p className="text-gray-600 mb-8">The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.</p>
            <a href="/" className="inline-block bg-gradient-to-t from-amber-500 to-orange-300 text-white px-6 py-3 rounded-full text-lg hover:bg-green-500 transition-colors">Go to Homepage</a>
        </div>
    );
}
