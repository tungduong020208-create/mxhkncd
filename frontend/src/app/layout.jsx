import './globals.css';
import { AuthProvider } from '../context/AuthContext';

export const metadata = {
  title: 'MXHKNCD',
  description: 'Mạng xã hội chia sẻ kiến thức và dự án',
};

export default function RootLayout({ children }) {
  return (
    <html lang="vi">
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
