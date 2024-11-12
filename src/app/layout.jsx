 
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
 
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className=""
      >
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
