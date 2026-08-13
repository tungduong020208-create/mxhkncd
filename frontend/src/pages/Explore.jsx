import { useEffect, useMemo, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { API_URL } from '../services/api';

const categories = ['Tất cả', 'Công nghệ', 'Học tập', 'Gaming', 'Design', 'Âm nhạc', 'Thể thao', 'Du lịch', 'Nhiếp ảnh', 'Phim'];
const searchTypes = ['Người dùng', 'Bài viết', 'Cộng đồng', 'Câu hỏi', 'Sự kiện', 'Tài liệu'];
const trendingTags = ['#AI', '#JavaScript', '#React', '#Gaming', '#UIUX', '#Startup', '#Design', '#HọcTập'];

const sampleUsers = [
  { id: 1, name: 'Nguyễn Văn A', skills: ['Web Development', 'AI'], shared: 5 },
  { id: 2, name: 'Trần B', skills: ['React', 'UI/UX'], shared: 4 },
  { id: 3, name: 'Lê C', skills: ['JavaScript', 'Node.js'], shared: 3 },
];

const sampleEvents = [
  { id: 1, title: 'Workshop React cơ bản', date: '20/08/2026', time: '19:00', category: 'Công nghệ', location: 'Online' },
  { id: 2, title: 'AI Talk', date: '25/08/2026', time: '14:00', category: 'Công nghệ', location: 'Online' },
  { id: 3, title: 'Gaming Talk', date: '28/08/2026', time: '17:00', category: 'Gaming', location: 'Offline' },
];

const sampleDocs = [
  { id: 1, title: 'JavaScript Roadmap', rating: 4.8, downloads: 2500 },
  { id: 2, title: 'React cơ bản', rating: 4.7, downloads: 2200 },
  { id: 3, title: 'HTML & CSS', rating: 4.6, downloads: 3200 },
];

const sampleQuestions = [
  { id: 1, title: 'React có khó đối với người mới không?', views: 1250, answers: 48 },
  { id: 2, title: 'Làm sao học JavaScript hiệu quả?', views: 980, answers: 35 },
];

const sampleCommunities = [
  { id: 1, title: 'Lập trình Web', members: 12500, category: 'Công nghệ' },
  { id: 2, title: 'AI Việt Nam', members: 32000, category: 'Công nghệ' },
  { id: 3, title: 'UI/UX Design', members: 8200, category: 'Design' },
];

const featuredPosts = [
  { id: 1, title: 'Cách học JavaScript cho người mới', likes: 1200, comments: 245, category: 'Học tập' },
  { id: 2, title: 'AI đang thay đổi ngành CNTT', likes: 980, comments: 180, category: 'Công nghệ' },
];

export default function Explore() {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSearchType, setActiveSearchType] = useState('Người dùng');
  const [activeCategory, setActiveCategory] = useState('Tất cả');
  const [selectedTag, setSelectedTag] = useState('');
  const [eventsFilter, setEventsFilter] = useState('Tất cả');
  const [allCommunities, setAllCommunities] = useState(sampleCommunities);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await fetch(`${API_URL}/posts`);
        const data = await response.json();
        setPosts(data.posts || []);
      } catch (error) {
        console.error('Không thể tải bài viết nổi bật:', error);
      }
    }
    fetchPosts();
  }, []);

  const filteredCommunities = useMemo(() => {
    return allCommunities.filter((community) => {
      const matchesCategory = activeCategory === 'Tất cả' || community.category === activeCategory;
      const matchesSearch = community.title.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, allCommunities, searchQuery]);

  const filteredEvents = useMemo(() => {
    return sampleEvents.filter((event) => eventsFilter === 'Tất cả' || event.category === eventsFilter);
  }, [eventsFilter]);

  const filteredUsers = useMemo(() => {
    return sampleUsers.filter((userItem) => userItem.name.toLowerCase().includes(searchQuery.toLowerCase()));
  }, [searchQuery]);

  const featuredHashtags = useMemo(() => {
    if (!searchQuery) return trendingTags;
    return trendingTags.filter((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
  }, [searchQuery]);

  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-slate-900">Khám phá MXHKNCD</h1>
            <p className="mt-2 text-sm text-slate-500">Tìm kiếm toàn bộ nội dung: người dùng, cộng đồng, bài viết, câu hỏi, sự kiện, tài liệu và hashtag.</p>
          </div>
          <div className="rounded-3xl bg-indigo-50 px-4 py-3 text-sm font-semibold text-indigo-700">Dành cho: {user?.name || 'Bạn'}</div>
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none"
              placeholder="🔍 Tìm kiếm MXHKNCD..."
            />
            <div className="mt-4 flex flex-wrap gap-2">
              {searchTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => setActiveSearchType(type)}
                  className={`rounded-full px-4 py-2 text-sm transition ${
                    activeSearchType === type ? 'bg-indigo-600 text-white' : 'bg-white text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
            <h2 className="text-sm font-semibold text-slate-900">Khám phá theo chủ đề</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`rounded-2xl px-3 py-2 text-sm transition ${
                    activeCategory === category ? 'bg-indigo-600 text-white' : 'bg-white text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="grid gap-6 xl:grid-cols-[420px_1fr]">
        <div className="space-y-6">
          <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">🔥 Nội dung nổi bật</h2>
            <p className="mt-2 text-sm text-slate-500">Những bài viết đang được nhiều người quan tâm.</p>
            <div className="mt-5 space-y-4">
              {(posts.length ? posts : featuredPosts)
                .sort((a, b) => (b.likes + b.comments) - (a.likes + a.comments))
                .slice(0, 3)
                .map((post) => (
                  <div key={post.id} className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                    <p className="text-base font-semibold text-slate-900">📝 {post.title}</p>
                    <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-slate-500">
                      <span>❤️ {post.likes.toLocaleString()}</span>
                      <span>💬 {post.comments}</span>
                      {post.category ? <span>⋅ {post.category}</span> : null}
                    </div>
                  </div>
                ))}
            </div>
          </section>

          <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-slate-900">📈 Xu hướng</h2>
              <span className="text-sm text-slate-500">Trending</span>
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              {featuredHashtags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSearchQuery(tag)}
                  className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-700 hover:bg-slate-100"
                >
                  {tag}
                </button>
              ))}
            </div>
          </section>

          <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-slate-900">🏘️ Cộng đồng đề xuất</h2>
              <span className="text-sm text-slate-500">Dựa trên sở thích</span>
            </div>
            <div className="mt-5 space-y-3">
              {filteredCommunities.map((community) => (
                <div key={community.id} className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-sm text-slate-500">{community.category}</p>
                      <p className="mt-2 font-semibold text-slate-900">{community.title}</p>
                    </div>
                    <button className="rounded-2xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700">Tham gia</button>
                  </div>
                  <p className="mt-3 text-sm text-slate-500">{community.members.toLocaleString()} thành viên</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="space-y-6">
          <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">👤 Người dùng đề xuất</h2>
            <p className="mt-2 text-sm text-slate-500">Kết nối với những người có sở thích giống bạn.</p>
            <div className="mt-5 space-y-3">
              {filteredUsers.map((userItem) => (
                <div key={userItem.id} className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="font-semibold text-slate-900">{userItem.name}</p>
                      <p className="mt-1 text-sm text-slate-500">{userItem.skills.join(' · ')}</p>
                    </div>
                    <button className="rounded-2xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800">Kết nối</button>
                  </div>
                  <p className="mt-3 text-sm text-slate-500">{userItem.shared} sở thích chung</p>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-slate-900">❓ Câu hỏi nổi bật</h2>
              <span className="text-sm text-slate-500">Chủ đề hấp dẫn</span>
            </div>
            <div className="mt-5 space-y-3">
              {sampleQuestions.map((question) => (
                <div key={question.id} className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                  <p className="font-semibold text-slate-900">{question.title}</p>
                  <div className="mt-3 flex items-center gap-3 text-sm text-slate-500">
                    <span>👁 {question.views.toLocaleString()} lượt xem</span>
                    <span>💬 {question.answers} câu trả lời</span>
                  </div>
                  <button className="mt-4 rounded-3xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700">Xem câu hỏi</button>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-slate-900">📅 Sự kiện đề xuất</h2>
              <select
                value={eventsFilter}
                onChange={(e) => setEventsFilter(e.target.value)}
                className="rounded-3xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none"
              >
                {['Tất cả', 'Công nghệ', 'Học tập', 'Gaming', 'Design', 'Thể thao'].map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>
            <div className="mt-5 space-y-3">
              {filteredEvents.map((event) => (
                <div key={event.id} className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-sm text-slate-500">{event.category}</p>
                  <p className="mt-2 font-semibold text-slate-900">{event.title}</p>
                  <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-slate-500">
                    <span>{event.date} · {event.time}</span>
                    <span>{event.location}</span>
                  </div>
                  <button className="mt-4 rounded-3xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700">Xem</button>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">📚 Tài liệu nổi bật</h2>
            <div className="mt-5 space-y-3">
              {sampleDocs.map((doc) => (
                <div key={doc.id} className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="font-semibold text-slate-900">{doc.title}</p>
                      <p className="mt-1 text-sm text-slate-500">⭐ {doc.rating} · ⬇ {doc.downloads.toLocaleString()}</p>
                    </div>
                    <button className="rounded-2xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800">Xem</button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-3xl border border-slate-200 bg-slate-50 p-5 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">🎯 Dành cho bạn</h2>
            <p className="mt-2 text-sm text-slate-500">Ưu tiên nội dung theo sở thích và lịch sử tương tác.</p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {['🏘️ Cộng đồng React', '📝 Bài viết về AI', '❓ Câu hỏi JavaScript', '📚 React Roadmap', '👤 Người cùng sở thích'].map((item) => (
                <div key={item} className="rounded-3xl border border-slate-200 bg-white px-4 py-4 text-sm text-slate-700 shadow-sm">
                  {item}
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
