// components/Layout.js
// Modern header and footer with navigation

"use client";

import Link from "next/link";
import { useAuth } from "../context/AuthContext";
import { signOut } from "../utils/supabase";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Layout({ children }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleLogout = async () => {
    await signOut();
    setIsDropdownOpen(false);
    router.push("/");
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            {/* Logo/Title */}
            <Link href="/" className="flex items-center space-x-2 group">
              <div className="text-3xl">🏥</div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-slate-900 group-hover:text-blue-600 transition">
                  Olive Place
                </h1>
                <p className="text-xs text-gray-500">Forms</p>
              </div>
            </Link>

            {/* Navigation & User Menu */}
            <div className="flex items-center space-x-6">
              {/* Navigation Links */}
              {!loading && user && (
                <nav className="hidden sm:flex items-center space-x-6">
                  <Link
                    href="/"
                    className="text-gray-700 hover:text-blue-600 font-medium text-sm transition"
                  >
                    Forms
                  </Link>
                  <Link
                    href="/submissions"
                    className="text-gray-700 hover:text-blue-600 font-medium text-sm transition flex items-center space-x-1"
                  >
                    <span>📋</span>
                    <span>My Submissions</span>
                  </Link>
                </nav>
              )}

              {/* User Status & Auth */}
              <div className="flex items-center space-x-4">
                {!loading && user ? (
                  <div className="relative">
                    {/* User Info Button */}
                    <button
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition"
                    >
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                        {user.email.charAt(0).toUpperCase()}
                      </div>
                      <div className="hidden sm:block text-left">
                        <p className="text-sm font-semibold text-gray-900">
                          {user.email.split("@")[0]}
                        </p>
                        <p className="text-xs text-gray-500">Logged in</p>
                      </div>
                    </button>

                    {/* Dropdown Menu */}
                    {isDropdownOpen && (
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg border border-gray-200 shadow-lg py-2 z-50">
                        <div className="px-4 py-2 border-b border-gray-100">
                          <p className="text-sm font-semibold text-gray-900">{user.email}</p>
                        </div>

                        {/* Mobile Navigation */}
                        <div className="sm:hidden">
                          <Link
                            href="/"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition"
                            onClick={() => setIsDropdownOpen(false)}
                          >
                            Forms
                          </Link>
                          <Link
                            href="/submissions"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition"
                            onClick={() => setIsDropdownOpen(false)}
                          >
                            My Submissions
                          </Link>
                          <div className="border-t border-gray-100" />
                        </div>

                        {/* Logout Button */}
                        <button
                          onClick={handleLogout}
                          className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition font-medium"
                        >
                          Sign Out
                        </button>
                      </div>
                    )}
                  </div>
                ) : !loading ? (
                  <div className="flex items-center space-x-3">
                    <Link
                      href="/auth/login"
                      className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700 transition"
                    >
                      Sign In
                    </Link>
                    <Link
                      href="/auth/signup"
                      className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition"
                    >
                      Sign Up
                    </Link>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-white mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Brand */}
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="text-2xl">🏥</div>
                <div>
                  <h3 className="font-bold text-lg">Olive Place</h3>
                  <p className="text-sm text-gray-400">Forms</p>
                </div>
              </div>
              <p className="text-sm text-gray-400">
                Digital form management system for healthcare facilities.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <Link href="/" className="hover:text-white transition">
                    Forms
                  </Link>
                </li>
                {user && (
                  <li>
                    <Link href="/submissions" className="hover:text-white transition">
                      My Submissions
                    </Link>
                  </li>
                )}
              </ul>
            </div>

            {/* Features */}
            <div>
              <h4 className="font-semibold mb-4">Features</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>Digital Forms</li>
                <li>Data Storage</li>
                <li>Export Options</li>
                <li>User Accounts</li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <p className="text-sm text-gray-400 mb-2">
                Need help? Contact our support team.
              </p>
              <p className="text-sm">
                <a href="mailto:support@oliveplace.com" className="text-blue-400 hover:text-blue-300 transition">
                  support@oliveplace.com
                </a>
              </p>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-slate-700 pt-8">
            <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 text-sm text-gray-400">
              <p>&copy; 2024 Olive Place. All rights reserved.</p>
              <div className="flex space-x-6">
                <a href="#" className="hover:text-white transition">
                  Privacy Policy
                </a>
                <a href="#" className="hover:text-white transition">
                  Terms of Service
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Close dropdown when clicking outside */}
      {isDropdownOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsDropdownOpen(false)}
        />
      )}
    </div>
  );
}