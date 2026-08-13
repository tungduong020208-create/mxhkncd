// API service — tập trung cấu hình URL backend.
//
// Dev (mặc định):  API_URL = '/api'        → Vite proxy chuyển tới http://localhost:4000
//                  SOCKET_URL = localhost  → kết nối socket.io trực tiếp
//
// Production:      đặt biến môi trường VITE_API_URL = 'https://backend-cua-ban.onrender.com'
//                  trên Netlify. Nếu không đặt, frontend gọi cùng origin ('/api').
export const API_URL = import.meta.env.VITE_API_URL || '/api';

export const SOCKET_URL =
  import.meta.env.VITE_SOCKET_URL ||
  (API_URL.startsWith('http') ? new URL(API_URL).origin : import.meta.env.DEV ? 'http://localhost:4000' : undefined);
