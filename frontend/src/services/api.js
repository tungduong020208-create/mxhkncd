// API service — tập trung cấu hình URL backend.
//
// Dev (mặc định):  API_URL = '/api'     → Next.js dev proxy chuyển tới http://localhost:4000
//                  SOCKET_URL = localhost → kết nối socket.io trực tiếp
//
// Production:      đặt biến môi trường NEXT_PUBLIC_API_URL = 'https://backend-cua-ban.onrender.com'
//                  trên Netlify. Nếu không đặt, frontend gọi cùng origin ('/api').
export const API_URL = process.env.NEXT_PUBLIC_API_URL || '/api';

export const SOCKET_URL =
  process.env.NEXT_PUBLIC_SOCKET_URL ||
  (API_URL.startsWith('http')
    ? new URL(API_URL).origin
    : process.env.NODE_ENV === 'development'
      ? 'http://localhost:4000'
      : undefined);
