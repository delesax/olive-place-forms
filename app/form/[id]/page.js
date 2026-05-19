// app/form/[id]/page.js
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import FormContainer from "../../../components/FormContainer";
import Layout from "../../../components/Layout";
import { forms } from "../../../config/forms";
import { useAuth } from "../../../context/AuthContext";

export default function FormPage({ params }) {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formId, setFormId] = useState(null);

  // Check authentication
  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/auth/login");
    }
  }, [user, authLoading, router]);

  // Get form ID from params
  useEffect(() => {
    if (params && params.id) {
      setFormId(params.id);
    }
  }, [params]);

  // Find and set form
  useEffect(() => {
    if (formId) {
      const foundForm = forms.find((f) => f.id === formId);
      setForm(foundForm);
      setLoading(false);
    }
  }, [formId]);

  // Show loading while checking auth
  if (authLoading || !user) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <p className="mt-4 text-gray-600 font-medium">Checking authentication...</p>
          </div>
        </div>
      </Layout>
    );
  }

  // Show loading while fetching form
  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <p className="mt-4 text-gray-600 font-medium">Loading form...</p>
          </div>
        </div>
      </Layout>
    );
  }

  // Form not found
  if (!form) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <p className="text-gray-600 text-lg mb-4">Form not found</p>
            <button
              onClick={() => router.push("/")}
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              ← Return to forms
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  // Display form
  return (
    <Layout>
      <FormContainer form={form} onBack={() => router.push("/")} />
    </Layout>
  );
}