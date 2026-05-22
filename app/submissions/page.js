// app/submissions/page.js
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Layout from "../../components/Layout";
import { useAuth } from "../../context/AuthContext";
import { getSubmissions, deleteSubmission } from "../../utils/submissionUtils";

export default function SubmissionsPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleteLoading, setDeleteLoading] = useState(null);

  // Check authentication
  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/auth/login");
    }
  }, [user, authLoading, router]);

  // Load submissions
  useEffect(() => {
    if (user) {
      loadSubmissions();
    }
  }, [user]);

  const loadSubmissions = async () => {
    setLoading(true);
    setError("");
    
    const result = await getSubmissions();
    
    if (result.success) {
      setSubmissions(result.submissions);
    } else {
      setError(result.error);
    }
    
    setLoading(false);
  };

  const handleDelete = async (submissionId) => {
    if (!confirm("Are you sure you want to delete this submission?")) {
      return;
    }

    setDeleteLoading(submissionId);
    const result = await deleteSubmission(submissionId);

    if (result.success) {
      setSubmissions(submissions.filter(s => s.id !== submissionId));
    } else {
      setError(result.error);
    }

    setDeleteLoading(null);
  };

  // Check auth
  if (authLoading || !user) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <p className="mt-4 text-gray-600 font-medium">Loading...</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-purple-50 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <Link href="/" className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-semibold mb-6">
              <span>←</span>
              <span>Back to Forms</span>
            </Link>
            <h1 className="text-4xl font-bold text-slate-900 mb-3">My Submissions</h1>
            <p className="text-lg text-gray-600">View and manage all your form submissions</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border-2 border-red-200 text-red-700 rounded-xl">
              {error}
            </div>
          )}

          {/* Loading State */}
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              <p className="mt-4 text-gray-600 font-medium">Loading submissions...</p>
            </div>
          ) : submissions.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
              <p className="text-gray-600 text-lg mb-4">No submissions yet</p>
              <Link href="/" className="text-blue-600 hover:text-blue-700 font-semibold">
                Start filling out forms →
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6">
              {submissions.map((submission) => (
                <div key={submission.id} className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 mb-2">{submission.form_name}</h3>
                      <p className="text-sm text-gray-500">
                        Submitted on {new Date(submission.submitted_at).toLocaleString()}
                      </p>
                    </div>
                    <button
                      onClick={() => handleDelete(submission.id)}
                      disabled={deleteLoading === submission.id}
                      className="px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 font-medium text-sm transition disabled:opacity-50"
                    >
                      {deleteLoading === submission.id ? "Deleting..." : "Delete"}
                    </button>
                  </div>

                  {/* Form Data */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-48 overflow-y-auto">
                      {Object.entries(submission.form_data).map(([key, value]) => (
                        <div key={key}>
                          <p className="text-xs font-semibold text-gray-600 uppercase">{key}</p>
                          <p className="text-sm text-gray-900 mt-1 truncate">{String(value)}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="mt-4 flex gap-3">
                    <button
                      onClick={() => {
                        const json = JSON.stringify(submission.form_data, null, 2);
                        const blob = new Blob([json], { type: 'application/json' });
                        const url = window.URL.createObjectURL(blob);
                        const a = document.createElement('a');
                        a.href = url;
                        a.download = `${submission.form_id}_${new Date(submission.submitted_at).getTime()}.json`;
                        document.body.appendChild(a);
                        a.click();
                        document.body.removeChild(a);
                      }}
                      className="px-4 py-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 font-medium text-sm transition"
                    >
                      Download JSON
                    </button>
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