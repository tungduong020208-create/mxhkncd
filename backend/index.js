import express from 'express';
import cors from 'cors';
import http from 'http';
import { Server } from 'socket.io';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

app.use(cors());
app.use(express.json());

const users = [
  { id: 1, name: 'Admin', email: 'admin@mxhkncd.local', password: 'Admin@1234', role: 'admin' },
];
const posts = [
  { id: 1, user: 'Trần Minh Hoàng', time: '2 giờ trước', content: 'Chia sẻ với mọi người một project cá nhân mình vừa hoàn thành. Đây là giao diện Website quản lý công việc sử dụng React + Node.js + MongoDB.', likes: 128, comments: 24, shares: 15, createdAt: new Date(Date.now() - 1000 * 60 * 70), type: 'text', progress: null },
  { id: 2, user: 'Lê Thị Bích Ngọc', time: '1 giờ trước', content: 'Mình đang tìm hiểu về UI/UX design cho app mobile. Ai có gợi ý tài liệu không?', likes: 64, comments: 12, shares: 6, createdAt: new Date(Date.now() - 1000 * 60 * 40), type: 'text', progress: null },
  { id: 3, user: 'Phạm Văn Nam', time: '30 phút trước', content: 'Đang trong giai đoạn hoàn thiện bản demo UI cho dự án quản lý task. Hiện tại đã hoàn thành 62% và cần phản hồi từ team.', likes: 48, comments: 8, shares: 3, createdAt: new Date(Date.now() - 1000 * 60 * 30), type: 'progress', progress: 62 },
  { id: 4, user: 'Nguyễn Hoàng Anh', time: '15 phút trước', content: 'Ai có đề xuất API tốt cho feature search hashtag và kỹ năng? Mình muốn tích hợp nó vào dashboard.', likes: 34, comments: 5, shares: 2, createdAt: new Date(Date.now() - 1000 * 60 * 15), type: 'text', progress: null },
  { id: 5, user: 'Đỗ Thùy Linh', time: '5 phút trước', content: 'Tôi đang xây dựng chế độ Focus Mode để giảm nhiễu cho người dùng và giữ lại chỉ nội dung quan trọng.', likes: 21, comments: 3, shares: 1, createdAt: new Date(Date.now() - 1000 * 60 * 5), type: 'progress', progress: 28 },
];
const comments = [];
const communities = [
  { id: 1, title: 'AI Việt Nam', members: 32500, joined: [] },
  { id: 2, title: 'UI/UX Design', members: 18700, joined: [] },
  { id: 3, title: 'Python Developer', members: 26100, joined: [] },
  { id: 4, title: 'Marketing Online', members: 15300, joined: [] },
  { id: 5, title: 'Chụp ảnh đẹp', members: 9800, joined: [] },
];
const messages = [];

app.post('/api/register', (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Vui lòng điền đủ thông tin' });
  }
  if (users.some((user) => user.email === email)) {
    return res.status(400).json({ message: 'Email đã tồn tại' });
  }
  const newUser = { id: users.length + 1, name, email, password };
  users.push(newUser);
  res.status(201).json({ user: newUser });
});

app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find((item) => item.email === email && item.password === password);
  if (!user) {
    return res.status(401).json({ message: 'Email hoặc mật khẩu không đúng' });
  }
  res.json({ user });
});

app.get('/api/posts', (req, res) => {
  const page = Number(req.query.page || 1);
  const limit = Number(req.query.limit || 5);
  const start = (page - 1) * limit;
  const end = start + limit;
  const sortedPosts = [...posts].sort((a, b) => b.createdAt - a.createdAt);
  res.json({ posts: sortedPosts.slice(start, end), nextPage: end < sortedPosts.length ? page + 1 : null });
});

app.post('/api/posts', (req, res) => {
  const { user, content, type, progress } = req.body;
  if (!user || !content) {
    return res.status(400).json({ message: 'Nội dung hoặc người dùng không hợp lệ' });
  }
  const newPost = {
    id: posts.length + 1,
    user,
    time: 'Mới đăng',
    content,
    likes: 0,
    comments: 0,
    shares: 0,
    createdAt: new Date(),
    type: type || 'text',
    progress: type === 'progress' ? Number(progress) : null,
  };
  posts.unshift(newPost);
  res.status(201).json(newPost);
});

app.post('/api/posts/:id/like', (req, res) => {
  const post = posts.find((item) => item.id === Number(req.params.id));
  if (!post) return res.status(404).json({ message: 'Không tìm thấy bài viết' });
  post.likes += 1;
  res.json(post);
});

app.post('/api/posts/:id/share', (req, res) => {
  const post = posts.find((item) => item.id === Number(req.params.id));
  if (!post) return res.status(404).json({ message: 'Không tìm thấy bài viết' });
  post.shares += 1;
  res.json(post);
});

app.post('/api/posts/:id/comment', (req, res) => {
  const post = posts.find((item) => item.id === Number(req.params.id));
  const { user, content } = req.body;
  if (!post) return res.status(404).json({ message: 'Không tìm thấy bài viết' });
  if (!content || !user) return res.status(400).json({ message: 'Nội dung comment không hợp lệ' });
  const comment = {
    id: comments.length + 1,
    postId: post.id,
    user,
    content,
    createdAt: new Date(),
  };
  comments.push(comment);
  post.comments += 1;
  res.status(201).json(comment);
});

app.get('/api/communities', (req, res) => {
  res.json(communities.map(({ id, title, members, joined }) => ({ id, title, members, joined: joined.length })));
});

app.post('/api/communities/:id/join', (req, res) => {
  const community = communities.find((item) => item.id === Number(req.params.id));
  const { userId } = req.body;
  if (!community) return res.status(404).json({ message: 'Không tìm thấy cộng đồng' });
  if (!community.joined.includes(userId)) {
    community.joined.push(userId);
    community.members += 1;
  }
  res.json({ joined: true, community });
});

app.get('/api/messages', (req, res) => {
  res.json(messages);
});

app.post('/api/messages', (req, res) => {
  const { user, text } = req.body;
  if (!user || !text) {
    return res.status(400).json({ message: 'Tin nhắn không hợp lệ' });
  }
  const message = { id: messages.length + 1, user, text, createdAt: new Date() };
  messages.push(message);
  io.emit('message', message);
  res.status(201).json(message);
});

io.on('connection', (socket) => {
  console.log('Client connected', socket.id);
  socket.on('message', (message) => {
    messages.push(message);
    io.emit('message', message);
  });
});

const PORT = 4000;
server.listen(PORT, () => {
  console.log(`Backend chạy trên http://localhost:${PORT}`);
});
