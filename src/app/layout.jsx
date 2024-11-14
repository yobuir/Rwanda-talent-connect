import "./globals.css";
// import { AuthProvider } from "@/context/AuthContext";
import { ConfigProvider, Button } from 'antd';
import { Toaster } from "@/components/ui/toaster" 
import SessionProviderWrapper from "@/components/SessionProviderWrapper"; 
import 'react-loading-skeleton/dist/skeleton.css'
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link  rel="icon" href="/images/logo/icon_rtc.png" sizes="any" />
        </head>
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
            <SessionProviderWrapper>
              {children} 
          </SessionProviderWrapper> 
          <Toaster />
        </ConfigProvider>
      </body>
    </html>
  );
}
