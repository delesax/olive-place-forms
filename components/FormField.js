// components/FormField.js
// Modern reusable form field component

export default function FormField({ field, value, onChange, error }) {
  const baseInputClass = `w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition bg-white text-gray-900 placeholder-gray-400 font-medium`;

  const errorClass = error ? "border-red-500 focus:border-red-500 focus:ring-red-100" : "";

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    onChange(name, type === "checkbox" ? checked : value);
  };

  switch (field.type) {
    case "text":
    case "email":
    case "tel":
    case "number":
      return (
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            {field.label}
            {field.required && <span className="text-red-500 ml-1">*</span>}
          </label>
          <input
            type={field.type}
            name={field.name}
            value={value || ""}
            onChange={handleChange}
            placeholder={field.label}
            className={`${baseInputClass} ${errorClass}`}
            required={field.required}
          />
          {error && <p className="text-red-600 text-sm mt-2 font-medium">⚠ {error}</p>}
        </div>
      );

    case "date":
      return (
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            {field.label}
            {field.required && <span className="text-red-500 ml-1">*</span>}
          </label>
          <input
            type="date"
            name={field.name}
            value={value || ""}
            onChange={handleChange}
            className={`${baseInputClass} ${errorClass}`}
            required={field.required}
          />
          {error && <p className="text-red-600 text-sm mt-2 font-medium">⚠ {error}</p>}
        </div>
      );

    case "time":
      return (
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            {field.label}
            {field.required && <span className="text-red-500 ml-1">*</span>}
          </label>
          <input
            type="time"
            name={field.name}
            value={value || ""}
            onChange={handleChange}
            className={`${baseInputClass} ${errorClass}`}
            required={field.required}
          />
          {error && <p className="text-red-600 text-sm mt-2 font-medium">⚠ {error}</p>}
        </div>
      );

    case "textarea":
      return (
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            {field.label}
            {field.required && <span className="text-red-500 ml-1">*</span>}
          </label>
          <textarea
            name={field.name}
            value={value || ""}
            onChange={handleChange}
            placeholder={field.label}
            rows={4}
            className={`${baseInputClass} resize-none ${errorClass}`}
            required={field.required}
          />
          {error && <p className="text-red-600 text-sm mt-2 font-medium">⚠ {error}</p>}
        </div>
      );

    case "select":
      return (
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            {field.label}
            {field.required && <span className="text-red-500 ml-1">*</span>}
          </label>
          <select
            name={field.name}
            value={value || ""}
            onChange={handleChange}
            className={`${baseInputClass} ${errorClass}`}
            required={field.required}
          >
            <option value="">-- Select an option --</option>
            {field.options &&
              field.options.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
          </select>
          {error && <p className="text-red-600 text-sm mt-2 font-medium">⚠ {error}</p>}
        </div>
      );

    case "checkbox":
      return (
        <div className="mb-6">
          <label className="flex items-center space-x-3 cursor-pointer group">
            <input
              type="checkbox"
              name={field.name}
              checked={value || false}
              onChange={handleChange}
              className="w-5 h-5 text-blue-600 rounded border-2 border-gray-300 focus:ring-2 focus:ring-blue-500 focus:ring-offset-0 transition cursor-pointer"
              required={field.required}
            />
            <span className="text-sm font-semibold text-gray-900 group-hover:text-blue-600 transition">
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </span>
          </label>
          {error && <p className="text-red-600 text-sm mt-2 font-medium">⚠ {error}</p>}
        </div>
      );

    case "file":
      return (
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            {field.label}
            {field.required && <span className="text-red-500 ml-1">*</span>}
          </label>
          <input
            type="file"
            name={field.name}
            onChange={handleChange}
            accept={field.accept || "*"}
            className="block w-full text-sm text-gray-500
              file:mr-4 file:py-3 file:px-4
              file:rounded-lg file:border-0
              file:text-sm file:font-semibold
              file:bg-blue-100 file:text-blue-700
              hover:file:bg-blue-200
              cursor-pointer border-2 border-gray-200 rounded-lg p-3"
            required={field.required}
          />
          {error && <p className="text-red-600 text-sm mt-2 font-medium">⚠ {error}</p>}
        </div>
      );

    default:
      return null;
  }
}
