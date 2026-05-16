// app/form/[id]/page.js
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import FormContainer from "../../../components/FormContainer";
import Layout from "../../../components/Layout";
import { forms } from "../../../config/forms";

export default function FormPage({ params }) {
  // ... rest of code stays the same
  const router = useRouter();
  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formId, setFormId] = useState(null);

  useEffect(() => {
    if (params && params.id) {
      setFormId(params.id);
    }
  }, [params]);

  useEffect(() => {
    if (formId) {
      const foundForm = forms.find((f) => f.id === formId);
      setForm(foundForm);
      setLoading(false);
    }
  }, [formId]);

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

  return (
    <Layout>
      <FormContainer form={form} onBack={() => router.push("/")} />
    </Layout>
  );
}