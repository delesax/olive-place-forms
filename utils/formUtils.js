// utils/formUtils.js
// Helper functions for form operations

/**
 * Convert form data to JSON
 */
export const formToJSON = (formData) => {
  const result = {};
  formData.forEach((value, key) => {
    if (result[key]) {
      if (Array.isArray(result[key])) {
        result[key].push(value);
      } else {
        result[key] = [result[key], value];
      }
    } else {
      result[key] = value;
    }
  });
  return result;
};

/**
 * Convert form data to CSV
 */
export const formToCSV = (formData, fileName = "form_data") => {
  const json = formToJSON(formData);
  const headers = Object.keys(json);
  const values = headers.map((header) => {
    const value = json[header];
    return Array.isArray(value) ? value.join("; ") : value;
  });

  const csv = [headers.join(","), values.join(",")].join("\n");
  downloadFile(csv, `${fileName}.csv`, "text/csv");
};

/**
 * Download file helper
 */
export const downloadFile = (content, fileName, mimeType = "text/plain") => {
  const blob = new Blob([content], { type: mimeType });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
};

/**
 * Download JSON file
 */
export const downloadJSON = (data, fileName = "form_data") => {
  const json = JSON.stringify(data, null, 2);
  downloadFile(json, `${fileName}.json`, "application/json");
};

/**
 * Validate form fields
 */
export const validateForm = (formData, fields) => {
  const errors = {};

  fields.forEach((field) => {
    const value = formData.get(field.name);

    if (field.required && (!value || value.trim() === "")) {
      errors[field.name] = `${field.label} is required`;
    }

    // Email validation
    if (field.type === "email" && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        errors[field.name] = "Please enter a valid email address";
      }
    }

    // Phone validation
    if (field.type === "tel" && value) {
      const phoneRegex = /^[\d\s\-\+\(\)]+$/;
      if (!phoneRegex.test(value)) {
        errors[field.name] = "Please enter a valid phone number";
      }
    }

    // Date validation
    if (field.type === "date" && value) {
      const date = new Date(value);
      if (isNaN(date.getTime())) {
        errors[field.name] = "Please enter a valid date";
      }
    }
  });

  return errors;
};

/**
 * Format date for display
 */
export const formatDate = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

/**
 * Generate filename with timestamp
 */
export const generateFileName = (baseName) => {
  const now = new Date();
  const timestamp = now.toISOString().split("T")[0];
  return `${baseName}_${timestamp}`;
};

/**
 * Format form data for display
 */
export const formatFormData = (data) => {
  const formatted = {};
  Object.entries(data).forEach(([key, value]) => {
    if (typeof value === "string" && value.match(/^\d{4}-\d{2}-\d{2}$/)) {
      formatted[key] = formatDate(value);
    } else {
      formatted[key] = value;
    }
  });
  return formatted;
};

/**
 * Get form by ID
 */
export const getFormById = (formId, formsList) => {
  return formsList.find((form) => form.id === formId);
};

/**
 * Get forms by category
 */
export const getFormsByCategory = (category, formsList) => {
  return formsList.filter((form) => form.category === category);
};

/**
 * Parse uploaded JSON file
 */
export const parseJSONFile = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const json = JSON.parse(e.target.result);
        resolve(json);
      } catch (error) {
        reject(new Error("Invalid JSON file"));
      }
    };
    reader.onerror = () => reject(new Error("Error reading file"));
    reader.readAsText(file);
  });
};

/**
 * Check file size
 */
export const checkFileSize = (file, maxSizeMB = 5) => {
  const maxBytes = maxSizeMB * 1024 * 1024;
  return file.size <= maxBytes;
};

/**
 * Download form data as PDF
 */
export const downloadPDF = async (formData, fields, fileName = "form_data") => {
  try {
    const html2pdf = (await import('html2pdf.js')).default;
    
    // Create HTML table from form data
    let html = `
      <h2>${fileName.replace(/_/g, ' ')}</h2>
      <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
        <tr style="background-color: #f0f0f0;">
          <th style="border: 1px solid #ddd; padding: 12px; text-align: left; font-weight: bold;">Field</th>
          <th style="border: 1px solid #ddd; padding: 12px; text-align: left; font-weight: bold;">Value</th>
        </tr>
    `;
    
    fields.forEach((field) => {
      const value = formData[field.name] || '(empty)';
      html += `
        <tr>
          <td style="border: 1px solid #ddd; padding: 12px;">${field.label}</td>
          <td style="border: 1px solid #ddd; padding: 12px;">${value}</td>
        </tr>
      `;
    });
    
    html += `</table>
      <p style="margin-top: 20px; color: #666; font-size: 12px;">
        Generated on ${new Date().toLocaleString()}
      </p>
    `;
    
    const element = document.createElement('div');
    element.innerHTML = html;
    
    const opt = {
      margin: 10,
      filename: `${fileName}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { orientation: 'portrait', unit: 'mm', format: 'a4' }
    };
    
    html2pdf().set(opt).from(element).save();
  } catch (error) {
    console.error('PDF generation error:', error);
    alert('Error generating PDF');
  }
};

/**
 * Download form data as Word document
 */
export const downloadWord = async (formData, fields, fileName = "form_data") => {
  try {
    const { Document, Packer, Table, TableCell, TableRow, Paragraph, TextRun, AlignmentType } = await import('docx');
    
    // Create table rows
    const rows = [
      // Header row
      new TableRow({
        children: [
          new TableCell({
            children: [new Paragraph({ text: 'Field', bold: true })],
          }),
          new TableCell({
            children: [new Paragraph({ text: 'Value', bold: true })],
          }),
        ],
      }),
      // Data rows
      ...fields.map((field) => {
        const value = formData[field.name] || '(empty)';
        return new TableRow({
          children: [
            new TableCell({
              children: [new Paragraph(field.label)],
            }),
            new TableCell({
              children: [new Paragraph(String(value))],
            }),
          ],
        });
      }),
    ];
    
    const doc = new Document({
      sections: [{
        children: [
          new Paragraph({
            text: fileName.replace(/_/g, ' '),
            heading: 'Heading1',
            bold: true,
            size: 32,
          }),
          new Paragraph({ text: '' }),
          new Table({
            width: { size: 100, type: 'pct' },
            rows: rows,
          }),
          new Paragraph({ text: '' }),
          new Paragraph({
            text: `Generated on ${new Date().toLocaleString()}`,
            size: 20,
            color: '999999',
          }),
        ],
      }],
    });
    
    const blob = await Packer.toBlob(doc);
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${fileName}.docx`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Word generation error:', error);
    alert('Error generating Word document');
  }
};
