import { useEffect, useMemo, useRef, useState } from 'react';
import { io } from 'socket.io-client';
import { API_URL, SOCKET_URL } from '../services/api';


const chatList = [
  {
    id: 'chat1',
    title: 'Nguyễn Văn A',
    subtitle: '🟢 Đang hoạt động',
    lastMessage: 'Hay đấy 👍',
    lastTime: '19:32',
    unread: 2,
    type: 'personal',
  },
  {
    id: 'group1',
    title: 'Nhóm học Web',
    subtitle: '4 thành viên',
    lastMessage: 'Ai có sẵn tài liệu React?',
    lastTime: '18:20',
    unread: 1,
    type: 'group',
  },
  {
    id: 'chat2',
    title: 'Lan',
    subtitle: '⚪ Hoạt động 15 phút trước',
    lastMessage: 'Ok, để mình kiểm tra.',
    lastTime: '17:45',
    unread: 0,
    type: 'personal',
  },
];

const initialConversations = {
  chat1: [
    { id: 'm1', user: 'Nguyễn Văn A', text: 'Hôm nay bạn học gì?', time: '18:55', status: 'seen', isMine: false },
    { id: 'm2', user: 'Bạn', text: 'Mình đang học React.', time: '18:56', status: 'read', isMine: true },
    { id: 'm3', user: 'Nguyễn Văn A', text: 'Hay đấy 👍', time: '18:57', status: 'delivered', isMine: false },
  ],
  group1: [
    { id: 'g1', user: 'Trần B', text: 'Ai có tài liệu React không?', time: '17:30', status: 'seen', isMine: false },
    { id: 'g2', user: 'Bạn', text: 'Mình gửi trong nhóm nhé.', time: '17:31', status: 'read', isMine: true },
  ],
  chat2: [
    { id: 'l1', user: 'Lan', text: 'Mình đã xem đề cương rồi.', time: '16:40', status: 'seen', isMine: false },
  ],
};

export default function Messages() {
  const [activeChatId, setActiveChatId] = useState('chat1');
  const [conversations, setConversations] = useState(initialConversations);
  const [input, setInput] = useState('');
  const [replyMode, setReplyMode] = useState(null);
  const [search, setSearch] = useState('');
  const [attachedFiles, setAttachedFiles] = useState([]);
  const endRef = useRef(null);

  const socketRef = useRef(null);

  const activeChat = useMemo(() => conversations[activeChatId] || [], [activeChatId, conversations]);
  const activeMeta = chatList.find((chat) => chat.id === activeChatId) || chatList[0];

  useEffect(() => {
    if (!socketRef.current) {
      socketRef.current = io(SOCKET_URL);
    }
    const socket = socketRef.current;

    socket.on('message', (message) => {
      setConversations((prev) => ({
        ...prev,
        [activeChatId]: [...(prev[activeChatId] || []), message],
      }));
    });

    return () => {
      socket.off('message');
    };
  }, [activeChatId]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeChat]);

  const sendMessage = async () => {
    if (!input.trim() && attachedFiles.length === 0) return;

    const newMessage = {
      id: `${activeChatId}-${Date.now()}`,
      user: 'Bạn',
      text: input || (attachedFiles.length > 0 ? 'Đã gửi tệp đính kèm' : ''),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'sent',
      isMine: true,
      attachments: attachedFiles,
    };

    setConversations((prev) => ({
      ...prev,
      [activeChatId]: [...(prev[activeChatId] || []), newMessage],
    }));
    setInput('');
    setAttachedFiles([]);

    try {
      await fetch(`${API_URL}/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user: 'Bạn', text: newMessage.text }),
      });
      socketRef.current?.emit('message', newMessage);
    } catch (error) {
      console.error('Không thể gửi tin nhắn:', error);
    }
  };

  const handleFileSelect = (event) => {
    const files = Array.from(event.target.files).slice(0, 3);
    setAttachedFiles(files.map((file) => ({ name: file.name, size: file.size })));
  };

  return (
    <div className="grid gap-6 xl:grid-cols-[320px_1fr]">
      <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold text-slate-900">Tin nhắn</h1>
            <p className="text-sm text-slate-500">Chat cá nhân và nhóm</p>
          </div>
          <button className="rounded-2xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white">Tin nhắn mới</button>
        </div>

        <div className="mt-5 rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Tìm kiếm cuộc trò chuyện..."
            className="w-full bg-transparent text-sm outline-none"
          />
        </div>

        <div className="mt-5 space-y-3">
          {chatList
            .filter((chat) => chat.title.toLowerCase().includes(search.toLowerCase()) || chat.lastMessage.toLowerCase().includes(search.toLowerCase()))
            .map((chat) => (
              <button
                key={chat.id}
                onClick={() => setActiveChatId(chat.id)}
                className={`w-full rounded-3xl p-4 text-left transition ${activeChatId === chat.id ? 'bg-indigo-50 ring-2 ring-indigo-200' : 'bg-slate-50 hover:bg-slate-100'}`}
              >
                <div className="flex items-center justify-between gap-2">
                  <div>
                    <p className="font-semibold text-slate-900">{chat.title}</p>
                    <p className="mt-1 text-sm text-slate-500">{chat.subtitle}</p>
                  </div>
                  <div className="text-xs text-slate-400">{chat.lastTime}</div>
                </div>
                <div className="mt-3 flex items-center justify-between gap-2">
                  <p className="line-clamp-1 text-sm text-slate-500">{chat.lastMessage}</p>
                  {chat.unread > 0 ? (
                    <span className="rounded-full bg-indigo-600 px-2 py-1 text-xs font-semibold text-white">{chat.unread}</span>
                  ) : null}
                </div>
              </button>
            ))}
        </div>
      </div>

      <div className="space-y-6">
        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-slate-500">{activeMeta.type === 'group' ? 'Nhóm chat' : 'Chat cá nhân'}</p>
              <h2 className="text-2xl font-semibold text-slate-900">{activeMeta.title}</h2>
              <p className="mt-1 text-sm text-slate-500">{activeMeta.subtitle}</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <button className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-700 hover:bg-slate-100">Ghim</button>
              <button className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-700 hover:bg-slate-100">Chặn</button>
              <button className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-700 hover:bg-slate-100">Báo cáo</button>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 shadow-sm">
          <div className="grid gap-4">
            {activeChat.map((message) => (
              <div
                key={message.id}
                className={`group max-w-[80%] rounded-3xl px-4 py-3 ${message.isMine ? 'ml-auto bg-indigo-600 text-white' : 'bg-white text-slate-900'} shadow-sm`}
              >
                <div className="flex items-center justify-between gap-3">
                  {!message.isMine && <span className="text-sm font-semibold">{message.user}</span>}
                  <span className={`text-xs ${message.isMine ? 'text-indigo-100' : 'text-slate-400'}`}>{message.time}</span>
                </div>
                <p className="mt-2 whitespace-pre-wrap text-sm leading-6">{message.text}</p>
                {message.attachments?.length ? (
                  <div className="mt-3 space-y-2">
                    {message.attachments.map((file) => (
                      <div key={file.name} className="rounded-2xl bg-slate-100 px-3 py-2 text-sm text-slate-700">
                        <div className="flex items-center justify-between gap-3">
                          <div>
                            <p className="font-medium">{file.name}</p>
                            <p className="text-xs text-slate-500">{Math.round(file.size / 1024)} KB</p>
                          </div>
                          <button className="text-xs text-indigo-600">Tải</button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : null}
                <div className="mt-3 flex items-center gap-2 text-[11px] text-slate-400 opacity-0 transition group-hover:opacity-100">
                  <button className="rounded-full px-2 py-1 hover:bg-slate-200">✏️ Chỉnh sửa</button>
                  <button className="rounded-full px-2 py-1 hover:bg-slate-200">📌 Ghim</button>
                  <button className="rounded-full px-2 py-1 hover:bg-slate-200">⭐ Lưu</button>
                  <button className="rounded-full px-2 py-1 hover:bg-slate-200">🗑️ Xóa</button>
                  <button className="rounded-full px-2 py-1 hover:bg-slate-200">↩️ Thu hồi</button>
                  <button className="rounded-full px-2 py-1 hover:bg-slate-200">🚨 Báo cáo</button>
                </div>
              </div>
            ))}
            <div ref={endRef} />
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <label htmlFor="file-upload" className="cursor-pointer rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 hover:bg-slate-100">
              📎
            </label>
            <input id="file-upload" type="file" multiple className="hidden" onChange={handleFileSelect} />
            <button className="rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 hover:bg-slate-100">🖼️</button>
            <button className="rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 hover:bg-slate-100">😀</button>
            <button className="rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 hover:bg-slate-100">🎤</button>
            <div className="flex-1">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Nhập tin nhắn..."
                className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none"
              />
            </div>
            <button onClick={sendMessage} className="rounded-3xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white hover:bg-indigo-700">
              ➤
            </button>
          </div>
          {attachedFiles.length > 0 ? (
            <div className="mt-4 space-y-2">
              {attachedFiles.map((file) => (
                <div key={file.name} className="rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
                  <div className="flex items-center justify-between gap-3">
                    <span>{file.name}</span>
                    <span>{Math.round(file.size / 1024)} KB</span>
                  </div>
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
