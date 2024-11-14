import "./globals.css";
// import { AuthProvider } from "@/context/AuthContext";
import { ConfigProvider, Button } from 'antd';
import { Toaster } from "@/components/ui/toaster"
import ClientHydrate from "./components/ClientHydrate";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className="bg-white mb-12 dark:bg-gray-900"
      >
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: '#fa8c16',
            },
          }}
        >
              <ClientHydrate /> 
        {children} 
          <Toaster />
        </ConfigProvider>
      </body>
    </html>
  );
}
