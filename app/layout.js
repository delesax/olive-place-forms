// app/layout.js
import "./globals.css";
import { AuthProvider } from "../context/AuthContext";

export const metadata = {
  title: "Olive Place Forms - Digital Form Management",
  description: "Complete your facility forms online. Download and upload data with ease.",
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🏥</text></svg>",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50">
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}