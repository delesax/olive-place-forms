// components/FormContainer.js
// Modern form container with enhanced styling and database integration

"use client";

import { useState, useCallback } from "react";
import FormField from "./FormField";
import { saveSubmission } from "../utils/submissionUtils";
import {
  downloadJSON,
  downloadFile,
  generateFileName,
  parseJSONFile,
  downloadPDF,
  downloadWord,
} from "../utils/formUtils";

export default function FormContainer({ form, onBack }) {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleFieldChange = useCallback((fieldName, value) => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
    if (errors[fieldName]) {
      setErrors((prev) => ({
        ...prev,
        [fieldName]: null,
      }));
    }
  }, [errors]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    // Validate form data
    const newErrors = {};
    form.fields.forEach((field) => {
      const value = formData[field.name];
      
      if (field.required && (!value || (typeof value === 'string' && value.trim() === ""))) {
        newErrors[field.name] = `${field.label} is required`;
      }
      
      if (field.type === "email" && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          newErrors[field.name] = "Please enter a valid email address";
        }
      }
      
      if (field.type === "tel" && value) {
        const phoneRegex = /^[\d\s\-\+\(\)]+$/;
        if (!phoneRegex.test(value)) {
          newErrors[field.name] = "Please enter a valid phone number";
        }
      }
      
      if (field.type === "date" && value) {
        const date = new Date(value);
        if (isNaN(date.getTime())) {
          newErrors[field.name] = "Please enter a valid date";
        }
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setLoading(false);
      return;
    }

    // Save to database
    const result = await saveSubmission(form.id, form.name, formData);

    if (!result.success) {
      setErrors({ submit: result.error });
      setLoading(false);
      return;
    }

    setSuccessMessage("Form submitted successfully! Your data has been saved.");
    setSubmitted(true);
    setLoading(false);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setSubmitted(false);
      setSuccessMessage("");
      setFormData({});
    }, 3000);
  };

  const handleDownloadJSON = () => {
    const fileName = generateFileName(form.id);
    downloadJSON(formData, fileName);
  };

  const handleDownloadCSV = () => {
    const fileName = generateFileName(form.id);
    const csv = formDataToCSV(formData, form.fields);
    downloadFile(csv, `${fileName}.csv`, "text/csv");
  };

  const handleDownloadPDF = () => {
    const fileName = generateFileName(form.id);
    downloadPDF(formData, form.fields, fileName);
  };

  const handleDownloadWord = () => {
    const fileName = generateFileName(form.id);
    downloadWord(formData, form.fields, fileName);
  };

  const handleUploadJSON = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const data = await parseJSONFile(file);
      setFormData(data);
    } catch (error) {
      alert("Error loading file: " + error.message);
    }
  };

  const handleReset = () => {
    setFormData({});
    setErrors({});
    setSubmitted(false);
    setSuccessMessage("");
  };

  const formDataToCSV = (data, fields) => {
    const headers = fields.map((f) => `"${f.label}"`).join(",");
    const values = fields
      .map((f) => {
        const value = data[f.name] || "";
        return `"${String(value).replace(/"/g, '""')}"`;
      })
      .join(",");
    return `${headers}\n${values}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-purple-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="mb-8 inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-semibold transition group"
        >
          <span className="group-hover:-translate-x-1 transition">←</span>
          <span>Back to Forms</span>
        </button>

        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold text-slate-900 mb-3">{form.name}</h1>
          <p className="text-lg text-gray-600">{form.description}</p>
        </div>

        {/* Success Message */}
        {submitted && (
          <div className="mb-8 p-5 bg-emerald-50 border-2 border-emerald-200 text-emerald-800 rounded-xl animate-fade-in flex items-start space-x-3">
            <span className="text-2xl">✓</span>
            <div>
              <p className="font-semibold">Form submitted successfully!</p>
              <p className="text-sm text-emerald-700 mt-1">{successMessage}</p>
            </div>
          </div>
        )}

        {/* Error Message */}
        {errors.submit && (
          <div className="mb-8 p-5 bg-red-50 border-2 border-red-200 text-red-800 rounded-xl animate-fade-in flex items-start space-x-3">
            <span className="text-2xl">✕</span>
            <div>
              <p className="font-semibold">Error submitting form</p>
              <p className="text-sm text-red-700 mt-1">{errors.submit}</p>
            </div>
          </div>
        )}

        {/* Toolbar */}
        <div className="mb-8 p-5 bg-white rounded-xl border border-gray-200 shadow-sm">
          <div className="flex flex-wrap gap-3">
            <button
              onClick={handleReset}
              className="px-4 py-2 bg-gray-100 text-gray-900 rounded-lg hover:bg-gray-200 font-medium text-sm transition flex items-center space-x-2"
            >
              <span>🔄</span>
              <span>Reset</span>
            </button>
            <button
              onClick={handleDownloadJSON}
              className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 font-medium text-sm transition flex items-center space-x-2"
            >
              <span>⬇</span>
              <span>JSON</span>
            </button>
            <button
              onClick={handleDownloadCSV}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium text-sm transition flex items-center space-x-2"
            >
              <span>⬇</span>
              <span>CSV</span>
            </button>
            <button
              onClick={handleDownloadPDF}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium text-sm transition flex items-center space-x-2"
            >
              <span>📄</span>
              <span>PDF</span>
            </button>
            <button
              onClick={handleDownloadWord}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium text-sm transition flex items-center space-x-2"
            >
              <span>📝</span>
              <span>Word</span>
            </button>
            <label className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-medium text-sm cursor-pointer transition flex items-center space-x-2">
              <span>⬆</span>
              <span>Upload JSON</span>
              <input
                type="file"
                accept=".json"
                onChange={handleUploadJSON}
                className="hidden"
              />
            </label>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-200 shadow-sm p-8 mb-8">
          <div className="flex justify-center">
            <div className="w-full max-w-2xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {form.fields.map((field) => (
                  <div
                    key={field.name}
                    className={field.type === "textarea" ? "md:col-span-2" : ""}
                  >
                    <FormField
                      field={field}
                      value={formData[field.name]}
                      onChange={handleFieldChange}
                      error={errors[field.name]}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-10 flex justify-center">
            <button
              type="submit"
              disabled={loading}
              className="w-full max-w-md bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 rounded-lg hover:from-blue-700 hover:to-blue-800 font-bold text-lg disabled:from-blue-400 disabled:to-blue-500 transition shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
            >
              {loading ? (
                <>
                  <span className="animate-spin">⟳</span>
                  <span>Submitting...</span>
                </>
              ) : (
                <>
                  <span>✓</span>
                  <span>Submit Form</span>
                </>
              )}
            </button>
          </div>
        </form>

        {/* Info Box */}
        <div className="p-5 bg-blue-50 border-2 border-blue-200 rounded-xl">
          <h3 className="font-semibold text-blue-900 mb-2">📋 About This Form</h3>
          <p className="text-sm text-blue-800 mb-2">
            <strong>Reference:</strong> {form.fileReference}
          </p>
          <p className="text-sm text-blue-700">
            Your completed form will be saved to your account. You can view all your submissions in the "My Submissions" section. Download your form in multiple formats (JSON, CSV, PDF, Word) for your records.
          </p>
        </div>
      </div>
    </div>
  );
}