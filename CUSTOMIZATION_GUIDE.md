# 🎨 Customization Guide - Olive Place Forms

Learn how to customize forms, styling, and branding for your facility.

## 🎯 Adding New Forms

### Quick Example

1. Open `config/forms.js`
2. Find the `forms` array
3. Add a new form object:

```javascript
{
  id: "staff-handbook",
  name: "Staff Handbook Acknowledgment",
  category: "policies",
  description: "Acknowledgment of receipt of employee handbook",
  fileReference: "Staff Handbook PDF",
  fields: [
    { 
      name: "employeeName", 
      label: "Employee Name", 
      type: "text", 
      required: true 
    },
    { 
      name: "acknowledgeDate", 
      label: "Date Acknowledged", 
      type: "date", 
      required: true 
    },
    { 
      name: "signature", 
      label: "Digital Signature", 
      type: "textarea", 
      required: false 
    },
    { 
      name: "managerApproval", 
      label: "I acknowledge receipt", 
      type: "checkbox", 
      required: true 
    },
  ],
}
```

4. Save and restart (`npm run dev`)
5. Your form appears automatically!

---

## 🔄 Adding New Categories

1. In `config/forms.js`, add to `formCategories`:

```javascript
export const formCategories = {
  // ... existing categories
  training: "Training & Development",
  incident: "Incident Reporting",
};
```

2. Use the new category in forms:

```javascript
{
  id: "training-log",
  name: "Training Log",
  category: "training", // ← Uses new category
  // ...
}
```

---

## 🎨 Styling & Branding

### Change Colors

Edit `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      primary: {
        50: '#eff6ff',   // Light blue
        500: '#3b82f6',  // Medium blue
        600: '#2563eb',  // Dark blue
        700: '#1d4ed8',  // Darker blue
      },
      accent: '#ef4444',  // Add accent color
    },
  },
}
```

### Change Facility Name & Logo

Edit `components/Layout.js`:

```javascript
<h1 className="text-3xl font-bold">🏥 Your Facility Name</h1>
<p className="text-blue-100 mt-1">Your Tagline Here</p>
```

### Change Header Gradient

Edit `app/page.js` and `components/Layout.js`:

```javascript
// From: from-blue-500 to-blue-600
// To:   from-green-500 to-green-600
<div className="bg-gradient-to-r from-green-500 to-green-600 ...">
```

### Custom CSS

Add to `app/globals.css`:

```css
/* Custom brand colors */
:root {
  --primary-color: #2563eb;
  --secondary-color: #10b981;
  --accent-color: #ef4444;
}

/* Custom fonts */
body {
  font-family: 'Georgia', serif; /* Change font */
}

/* Custom form styling */
input, textarea, select {
  border-radius: 8px; /* Rounder corners */
  border: 2px solid #e5e7eb; /* Thicker borders */
}
```

---

## 📝 Form Field Options

### Text Input
```javascript
{ 
  name: "fieldName", 
  label: "Display Label", 
  type: "text",
  required: true,
  // optional: placeholder: "Enter text..."
}
```

### Email Input
```javascript
{ 
  name: "email", 
  label: "Email Address", 
  type: "email",
  required: true,
  // Auto-validates email format
}
```

### Select Dropdown
```javascript
{ 
  name: "department", 
  label: "Department", 
  type: "select",
  required: true,
  options: ["HR", "Medical", "Maintenance", "Admin"]
}
```

### Checkbox
```javascript
{ 
  name: "agreeToTerms", 
  label: "I agree to terms and conditions", 
  type: "checkbox",
  required: true
}
```

### Textarea (Large Text)
```javascript
{ 
  name: "comments", 
  label: "Additional Comments", 
  type: "textarea",
  required: false,
  // rows: 6  // Optional: set number of rows
}
```

### Date Picker
```javascript
{ 
  name: "birthDate", 
  label: "Date of Birth", 
  type: "date",
  required: true
}
```

### File Upload
```javascript
{ 
  name: "attachment", 
  label: "Upload Document", 
  type: "file",
  required: false,
  accept: ".pdf,.doc,.docx" // Optional: restrict file types
}
```

---

## 🔧 Advanced Customization

### Change Success Message

Edit `components/FormContainer.js`:

```javascript
{submitted && (
  <div className="mb-6 p-4 bg-green-100 ...">
    ✓ Your custom success message here!
  </div>
)}
```

### Add Custom Validation

Edit `utils/formUtils.js` - extend `validateForm()`:

```javascript
// Add custom validation
if (field.type === "phone" && value) {
  const phoneRegex = /^\d{10}$/; // Exactly 10 digits
  if (!phoneRegex.test(value)) {
    errors[field.name] = "Phone must be 10 digits";
  }
}
```

### Add Footer Links

Edit `components/Layout.js`:

```javascript
<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
  <div>
    <a href="/privacy">Privacy Policy</a>
  </div>
  {/* Add more links */}
</div>
```

### Change Placeholder Text

Edit form fields:

```javascript
<input 
  placeholder="Start typing here..."
  // ...
/>
```

---

## 🌍 Internationalization (i18n)

### Add Multiple Languages

Create `config/translations.js`:

```javascript
export const translations = {
  en: {
    submit: "Submit Form",
    required: "This field is required",
    download: "Download",
  },
  es: {
    submit: "Enviar formulario",
    required: "Este campo es obligatorio",
    download: "Descargar",
  },
  fr: {
    submit: "Soumettre le formulaire",
    required: "Ce champ est requis",
    download: "Télécharger",
  },
};
```

Use in components:

```javascript
const [language, setLanguage] = useState("en");
const t = translations[language];

<button>{t.submit}</button>
```

---

## 📦 Form Templates

Create reusable form templates:

```javascript
// config/formTemplates.js
export const personalInfoTemplate = [
  { name: "firstName", label: "First Name", type: "text", required: true },
  { name: "lastName", label: "Last Name", type: "text", required: true },
  { name: "email", label: "Email", type: "email", required: true },
  { name: "phone", label: "Phone", type: "tel", required: false },
];

export const medicalTemplate = [
  { name: "allergies", label: "Allergies", type: "textarea", required: false },
  { name: "conditions", label: "Medical Conditions", type: "textarea", required: false },
];

// Use in forms
{
  id: "new-form",
  name: "New Form",
  fields: [...personalInfoTemplate, ...medicalTemplate],
}
```

---

## 🎯 Layout Customization

### Change Form Grid Layout

Edit `components/FormContainer.js`:

```javascript
// From: grid-cols-1 md:grid-cols-2
// To:   grid-cols-1 md:grid-cols-3 (wider)
<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
```

### Change Button Styling

Edit button classes in components:

```javascript
// Add more styles
<button className="px-6 py-3 rounded-lg shadow-lg hover:shadow-xl ...">
```

---

## 🚀 Performance Tips

### Optimize Images
```javascript
import Image from 'next/image';

<Image 
  src="/logo.png" 
  alt="Logo" 
  width={200} 
  height={200}
/>
```

### Lazy Load Components
```javascript
import dynamic from 'next/dynamic';

const HeavyComponent = dynamic(
  () => import('./HeavyComponent'),
  { loading: () => <p>Loading...</p> }
);
```

### Code Splitting
```javascript
// Next.js automatically splits code at route level
// Components in app/ folder are code-split
```

---

## 🧪 Testing Customizations

1. **Test locally first**
   ```bash
   npm run dev
   ```

2. **Check all forms still work**
   - Fill out test data
   - Download files
   - Upload files back

3. **Test on mobile**
   - Use DevTools (F12)
   - Check responsive design

4. **Browser compatibility**
   - Chrome, Firefox, Safari, Edge
   - IE not supported

---

## 📚 Resources

- [Next.js Docs](https://nextjs.org/docs)
- [React Docs](https://react.dev)
- [Tailwind CSS Docs](https://tailwindcss.com)
- [JavaScript Guide](https://javascript.info)

---

## 💡 Common Customizations

### Hide a Form
Comment it out in `config/forms.js`:
```javascript
// { id: "archived-form", ... }
```

### Disable a Field
Add `disabled` attribute:
```javascript
<input disabled defaultValue="Not Editable" />
```

### Make Field Optional
```javascript
{ name: "field", label: "Label", required: false }
```

### Add Default Value
```javascript
const [formData, setFormData] = useState({
  department: "HR", // Default
});
```

---

**Need help?** Check the main README or ask your development team! 🚀
