// components/CategoryCard.js
// Display a category with its forms

export default function CategoryCard({ category, forms, onSelectForm }) {
  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition">
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-4">
        <h2 className="text-xl font-bold text-white">{category}</h2>
      </div>
      <div className="p-6">
        <div className="space-y-2">
          {forms.map((form) => (
            <button
              key={form.id}
              onClick={() => onSelectForm(form.id)}
              className="w-full text-left p-3 rounded-lg hover:bg-blue-50 border border-transparent hover:border-blue-300 transition group"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition">
                    {form.name}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">{form.description}</p>
                </div>
                <span className="ml-2 text-blue-600 group-hover:translate-x-1 transition">
                  →
                </span>
              </div>
            </button>
          ))}
        </div>
        <p className="text-xs text-gray-500 mt-4">
          {forms.length} form{forms.length !== 1 ? "s" : ""}
        </p>
      </div>
    </div>
  );
}
