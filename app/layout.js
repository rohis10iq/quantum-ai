import "./styles/globals.css";

export const metadata = {
  title: "Quantum AI",
  description: "Just another ChatBOT, but better",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="font-sans bg-gray-900 text-white">
        {children}
      </body>
    </html>
  );
}
