// components/Layout.js
// Modern layout wrapper with enhanced header and footer

export default function Layout({ children }) {
  const currentYear = new Date().getFullYear();

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-blue-100/50 bg-white/95 backdrop-blur-md shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center text-white text-xl font-bold">
                🏥
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                  Olive Place Forms
                </h1>
                <p className="text-xs text-gray-500 font-medium">Digital Form Management</p>
              </div>
            </div>
            <div className="hidden sm:flex items-center space-x-2 text-sm text-gray-600 bg-gray-50 px-3 py-1 rounded-full">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
              <span>System Online</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow">{children}</main>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-slate-300 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            {/* About Section */}
            <div>
              <h3 className="font-semibold text-white mb-4 flex items-center space-x-2">
                <span className="text-2xl">🏥</span>
                <span>Olive Place</span>
              </h3>
              <p className="text-sm leading-relaxed text-slate-400">
                Modern digital form management system designed for healthcare facilities and care organizations.
              </p>
            </div>

            {/* Features Section */}
            <div>
              <h3 className="font-semibold text-white mb-4">Features</h3>
              <ul className="text-sm space-y-2">
                <li className="flex items-center space-x-2 text-slate-400 hover:text-blue-400 transition">
                  <span className="text-emerald-400">✓</span>
                  <span>26+ Forms</span>
                </li>
                <li className="flex items-center space-x-2 text-slate-400 hover:text-blue-400 transition">
                  <span className="text-emerald-400">✓</span>
                  <span>Download/Upload</span>
                </li>
                <li className="flex items-center space-x-2 text-slate-400 hover:text-blue-400 transition">
                  <span className="text-emerald-400">✓</span>
                  <span>Validation</span>
                </li>
                <li className="flex items-center space-x-2 text-slate-400 hover:text-blue-400 transition">
                  <span className="text-emerald-400">✓</span>
                  <span>Mobile Ready</span>
                </li>
              </ul>
            </div>

            {/* Technology Section */}
            <div>
              <h3 className="font-semibold text-white mb-4">Technology</h3>
              <ul className="text-sm space-y-2 text-slate-400">
                <li>• Next.js 16</li>
                <li>• React 18</li>
                <li>• Tailwind CSS</li>
                <li>• Vercel Hosted</li>
              </ul>
            </div>

            {/* Support Section */}
            <div>
              <h3 className="font-semibold text-white mb-4">Support</h3>
              <p className="text-sm text-slate-400 mb-4">
                For technical support or feature requests, contact your system administrator.
              </p>
              <div className="flex space-x-3">
                <div className="w-8 h-8 bg-slate-700 rounded-lg flex items-center justify-center hover:bg-blue-600 transition cursor-pointer">
                  📧
                </div>
                <div className="w-8 h-8 bg-slate-700 rounded-lg flex items-center justify-center hover:bg-blue-600 transition cursor-pointer">
                  💬
                </div>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-slate-700 pt-8">
            <div className="flex flex-col sm:flex-row items-center justify-between">
              <p className="text-sm text-slate-400">
                © {currentYear} Olive Place. All rights reserved.
              </p>
              <p className="text-sm text-slate-500 mt-4 sm:mt-0">
                v1.0.0 • Production Ready ✓
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
