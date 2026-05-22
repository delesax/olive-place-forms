// utils/submissionUtils.js
import { supabase } from "./supabase";

// Save submission to database
export const saveSubmission = async (formId, formName, formData) => {
  try {
    const { data: { session } } = await supabase.auth.getSession();

    if (!session) {
      throw new Error("User not authenticated");
    }

    const response = await fetch("/api/submissions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${session.access_token}`,
      },
      body: JSON.stringify({
        formId,
        formName,
        formData,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Failed to save submission");
    }

    return { success: true, submission: data.submission };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// Get user's submissions
export const getSubmissions = async () => {
  try {
    const { data: { session } } = await supabase.auth.getSession();

    if (!session) {
      throw new Error("User not authenticated");
    }

    const response = await fetch("/api/submissions", {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${session.access_token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Failed to fetch submissions");
    }

    return { success: true, submissions: data.submissions };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// Delete a submission
export const deleteSubmission = async (submissionId) => {
  try {
    const { data: { session } } = await supabase.auth.getSession();

    if (!session) {
      throw new Error("User not authenticated");
    }

    const response = await fetch(`/api/submissions?id=${submissionId}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${session.access_token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Failed to delete submission");
    }

    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};