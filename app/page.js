// app/page.js
"use client";

import { useState } from "react";
import Link from "next/link";
import Layout from "../components/Layout";
import { forms, formCategories } from "../config/forms";
import { useAuth } from "../context/AuthContext";
import { signOut } from "../utils/supabase";
import { useRouter } from "next/navigation";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const { user, loading } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await signOut();
    router.push("/");
  };

  const categorizedForms = Object.entries(formCategories).reduce(
    (acc, [key, label]) => {
      const categoryForms = forms.filter((f) => f.category === key);
      return { ...acc, [label]: categoryForms };
    },
    {}
  );

  const filteredForms = searchTerm
    ? forms.filter(
        (form) =>
          form.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          form.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : null;

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-purple-50 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <div className="inline-flex items-center justify-center space-x-2 mb-6 px-4 py-2 bg-blue-100/50 rounded-full">
              <span className="text-sm font-semibold text-blue-700">✨ Welcome Back</span>
            </div>
            <h1 className="text-5xl sm:text-6xl font-bold text-slate-900 mb-4 bg-gradient-to-r from-blue-600 via-blue-800 to-purple-900 bg-clip-text text-transparent">
              Forms Made Simple
            </h1>
            <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
              Complete your facility forms online. Download data, upload previous submissions, and manage everything in one place.
            </p>

            {/* User Info Section */}
            {!loading && user && (
              <div className="mb-8 p-4 bg-emerald-50 border-2 border-emerald-200 rounded-lg inline-block">
                <p className="text-emerald-900 font-semibold">
                  Logged in as: <span className="text-emerald-600">{user.email}</span>
                </p>
              </div>
            )}

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-12">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search forms by name or category..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-6 py-4 text-lg border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition bg-white text-gray-900 placeholder-gray-500 shadow-sm"
                />
                <svg className="absolute right-6 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
              <div className="bg-white rounded-xl p-6 border border-gray-100 hover:border-blue-200 transition shadow-sm">
                <div className="text-3xl font-bold text-blue-600 mb-1">{forms.length}</div>
                <p className="text-sm text-gray-600 font-medium">Forms Available</p>
              </div>
              <div className="bg-white rounded-xl p-6 border border-gray-100 hover:border-blue-200 transition shadow-sm">
                <div className="text-3xl font-bold text-emerald-600 mb-1">{Object.keys(formCategories).length}</div>
                <p className="text-sm text-gray-600 font-medium">Categories</p>
              </div>
              <div className="bg-white rounded-xl p-6 border border-gray-100 hover:border-blue-200 transition shadow-sm">
                <div className="text-3xl font-bold text-purple-600 mb-1">100%</div>
                <p className="text-sm text-gray-600 font-medium">Digital</p>
              </div>
              <div className="bg-white rounded-xl p-6 border border-gray-100 hover:border-blue-200 transition shadow-sm">
                <div className="text-2xl font-bold text-orange-600 mb-1">⚡</div>
                <p className="text-sm text-gray-600 font-medium">Fast & Secure</p>
              </div>
            </div>

            {/* Auth Buttons */}
            {!loading && !user && (
              <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
                <Link href="/auth/login" className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold transition shadow-md hover:shadow-lg">
                  Sign In
                </Link>
                <Link href="/auth/signup" className="px-8 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 font-semibold transition shadow-md hover:shadow-lg">
                  Sign Up
                </Link>
              </div>
            )}

            {/* Logout Button */}
            {!loading && user && (
              <div className="mb-12">
                <button
                  onClick={handleLogout}
                  className="px-8 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 font-semibold transition shadow-md hover:shadow-lg"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>

          {/* Forms Display */}
          {searchTerm && filteredForms && filteredForms.length > 0 ? (
            <div className="mb-12 animate-fade-in">
              <h2 className="text-3xl font-bold text-slate-900 mb-8">
                Search Results <span className="text-blue-600">({filteredForms.length})</span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredForms.map((form) => (
                  <Link key={form.id} href={user ? `/form/${form.id}` : "/auth/login"}>
                    <div className="bg-white rounded-xl border border-gray-100 overflow-hidden hover:border-blue-300 hover:shadow-xl cursor-pointer h-full group">
                      <div className="bg-gradient-to-br from-blue-500 to-blue-600 px-6 py-4 group-hover:from-blue-600 group-hover:to-blue-700 transition">
                        <h3 className="text-lg font-bold text-white">{form.name}</h3>
                      </div>
                      <div className="p-5">
                        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                          {form.description}
                        </p>
                        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                          <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                            {form.category}
                          </span>
                          <span className="text-blue-600 text-sm font-semibold group-hover:translate-x-1 transition">
                            Open →
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ) : searchTerm ? (
            <div className="text-center py-16 animate-fade-in">
              <div className="text-5xl mb-4">🔍</div>
              <p className="text-gray-600 text-lg mb-4">
                No forms found matching "<span className="font-semibold">{searchTerm}</span>"
              </p>
              <button
                onClick={() => setSearchTerm("")}
                className="text-blue-600 hover:text-blue-700 font-semibold transition"
              >
                Clear search and browse all forms
              </button>
            </div>
          ) : (
            <div className="space-y-16">
              {Object.entries(categorizedForms).map(([category, categoryForms], idx) => (
                <div key={category} className="animate-fade-in" style={{ animationDelay: `${idx * 50}ms` }}>
                  <div className="flex items-center space-x-3 mb-8">
                    <div className="w-1 h-8 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"></div>
                    <h2 className="text-3xl font-bold text-slate-900">
                      {category}
                    </h2>
                    <span className="ml-auto text-sm font-semibold text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                      {categoryForms.length} forms
                    </span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {categoryForms.map((form) => (
                      <Link key={form.id} href={user ? `/form/${form.id}` : "/auth/login"}>
                        <div className="bg-white rounded-xl border border-gray-100 overflow-hidden hover:border-blue-300 hover:shadow-xl cursor-pointer h-full group transition-all">
                          <div className="bg-gradient-to-br from-blue-500 to-blue-600 px-6 py-4 group-hover:from-blue-600 group-hover:to-blue-700 transition">
                            <h3 className="text-lg font-bold text-white line-clamp-2">{form.name}</h3>
                          </div>
                          <div className="p-5">
                            <p className="text-gray-600 text-sm mb-4 line-clamp-2 group-hover:text-gray-700 transition">
                              {form.description}
                            </p>
                            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                              <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                                {form.category}
                              </span>
                              <span className="text-blue-600 text-sm font-semibold group-hover:translate-x-1 transition inline-flex items-center">
                                Open <span className="ml-1">→</span>
                              </span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}