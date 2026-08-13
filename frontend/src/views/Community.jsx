import { useEffect, useMemo, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { API_URL } from '../services/api';
import CommunityCard from '../components/CommunityCard';

const categories = ['Tất cả', 'Công nghệ', 'Học tập', 'Gaming', 'Design', 'Thể thao', 'Kinh doanh', 'Sức khỏe'];
const hashtags = ['#React', '#UIUX', '#JavaScript', '#MachineLearning', '#Startup', '#ĐồHọa', '#GameDev'];

const sampleCommunities = [
  {
    id: 1,
    title: 'Lập trình Web Việt Nam',
    category: 'Công nghệ',
    description: 'Cộng đồng dành cho người học Web và chia sẻ tài nguyên Frontend / Backend.',
    members: 12500,
    joined: false,
    privacy: 'Công khai',
    rules: ['Không spam', 'Tôn trọng thành viên', 'Đăng đúng chủ đề', 'Không đăng nội dung vi phạm'],
    featured: true,
    growth: 'Đang phát triển',
    createdAt: '10/2025',
    membersList: [
      { id: 1, name: 'Nguyễn A', role: 'Owner' },
      { id: 2, name: 'Trần B', role: 'Admin' },
      { id: 3, name: 'Lê C', role: 'Moderator' },
      { id: 4, name: 'Phạm D', role: 'Thành viên' },
      { id: 5, name: 'Hà E', role: 'Thành viên' },
    ],
    topContributors: [
      { name: 'Nguyễn A', points: 1250 },
      { name: 'Trần B', points: 1120 },
      { name: 'Lê C', points: 980 },
    ],
    events: [
      { id: 1, title: 'Workshop React cơ bản', date: '20/08/2026', time: '19:00', location: 'Online', attendees: 128, joined: true },
      { id: 2, title: 'Chia sẻ JavaScript nâng cao', date: '27/08/2026', time: '20:00', location: 'Online', attendees: 86 },
    ],
    docs: [
      { id: 1, title: 'HTML cơ bản.pdf', type: 'pdf' },
      { id: 2, title: 'CSS cơ bản.pdf', type: 'pdf' },
      { id: 3, title: 'JavaScript Roadmap.pdf', type: 'pdf' },
      { id: 4, title: 'React cơ bản.pdf', type: 'pdf' },
    ],
    questions: [
      { id: 1, title: 'React có khó đối với người mới không?', answers: 24, views: 1250, accepted: true },
      { id: 2, title: 'Nên dùng Tailwind hay Chakra UI cho dashboard?', answers: 18, views: 980 },
    ],
    posts: [
      { id: 1, type: 'Bài viết', title: 'Cách học JavaScript hiệu quả?', likes: 120, comments: 35, shares: 12 },
      { id: 2, type: 'Thông báo', title: 'Sự kiện meetup React vào thứ Bảy', likes: 86, comments: 12, shares: 8 },
    ],
  },
  {
    id: 2,
    title: 'AI Việt Nam',
    category: 'Công nghệ',
    description: 'Chia sẻ tin tức AI, mô hình mới và hướng dẫn thực hành.',
    members: 32500,
    joined: false,
    privacy: 'Công khai',
    rules: ['Không lan truyền thông tin sai sự thật', 'Đăng đúng chuyên mục AI', 'Giữ thái độ tôn trọng'],
    featured: true,
    growth: 'Đang phát triển',
    createdAt: '02/2024',
    membersList: [
      { id: 6, name: 'Mai F', role: 'Owner' },
      { id: 7, name: 'Bảo G', role: 'Moderator' },
      { id: 8, name: 'Huy H', role: 'Thành viên' },
    ],
    topContributors: [
      { name: 'Mai F', points: 2140 },
      { name: 'Bảo G', points: 1830 },
    ],
    events: [
      { id: 3, title: 'Hội thảo AI 2026', date: '12/09/2026', time: '18:00', location: 'Online', attendees: 320 },
    ],
    docs: [
      { id: 5, title: 'Machine Learning Basics.pdf', type: 'pdf' },
    ],
    questions: [
      { id: 3, title: 'Làm sao bắt đầu bài toán nhận dạng ảnh?', answers: 20, views: 1480 },
    ],
    posts: [
      { id: 3, type: 'Khảo sát', title: 'Bạn thích học ngôn ngữ nào?', likes: 95, comments: 28, shares: 9 },
    ],
  },
  {
    id: 3,
    title: 'UI/UX Design',
    category: 'Design',
    description: 'Nơi trao đổi thiết kế giao diện, trải nghiệm người dùng và portfolio.',
    members: 18700,
    joined: false,
    privacy: 'Công khai',
    rules: ['Giữ văn hóa xây dựng', 'Không chê bai tác phẩm người khác', 'Chia sẻ nguồn gốc thiết kế'],
    featured: false,
    growth: 'Mới',
    createdAt: '06/2026',
    membersList: [
      { id: 9, name: 'Trúc J', role: 'Owner' },
      { id: 10, name: 'Ngọc K', role: 'Admin' },
      { id: 11, name: 'Duy L', role: 'Thành viên' },
    ],
    topContributors: [
      { name: 'Trúc J', points: 1430 },
      { name: 'Ngọc K', points: 1310 },
    ],
    events: [
      { id: 4, title: 'Thảo luận UX case study', date: '28/08/2026', time: '20:00', location: 'Online', attendees: 210 },
    ],
    docs: [
      { id: 6, title: 'Thiết kế Mobile UI.pdf', type: 'pdf' },
      { id: 7, title: 'Design Systems.pdf', type: 'pdf' },
    ],
    questions: [
      { id: 4, title: 'Bạn dùng Figma hay Adobe XD?', answers: 32, views: 1980 },
    ],
    posts: [
      { id: 4, type: 'Tài liệu', title: 'Bộ giao diện Figma miễn phí', likes: 74, comments: 18, shares: 14 },
    ],
  },
];

const tabs = [
  { key: 'overview', label: 'Tổng quan' },
  { key: 'posts', label: 'Bài viết' },
  { key: 'questions', label: 'Hỏi đáp' },
  { key: 'events', label: 'Sự kiện' },
  { key: 'members', label: 'Thành viên' },
  { key: 'docs', label: 'Tài liệu' },
];

export default function Community() {
  const { user } = useAuth();
  const [communities, setCommunities] = useState(sampleCommunities);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tất cả');
  const [selectedCommunityId, setSelectedCommunityId] = useState(sampleCommunities[0].id);
  const [activeTab, setActiveTab] = useState('overview');
  const [createState, setCreateState] = useState({
    title: '',
    category: 'Công nghệ',
    description: '',
    privacy: 'Công khai',
    rules: '',
  });
  const [createMessage, setCreateMessage] = useState('');
  const [memberSearch, setMemberSearch] = useState('');

  useEffect(() => {
    async function loadCommunities() {
      try {
        const response = await fetch(`${API_URL}/communities`);
        const data = await response.json();
        const merged = sampleCommunities.map((sample) => {
          const server = data.find((item) => item.id === sample.id);
          return server ? { ...sample, members: server.members, joined: server.joined > 0 } : sample;
        });
        setCommunities(merged);
      } catch (error) {
        console.error('Không tải được cộng đồng từ backend:', error);
      }
    }

    loadCommunities();
  }, []);

  const filteredCommunities = useMemo(() => {
    return communities.filter((community) => {
      const matchesSearch = [community.title, community.description, community.category].some((field) =>
        field.toLowerCase().includes(search.toLowerCase()),
      );
      const matchesCategory = selectedCategory === 'Tất cả' || community.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [communities, search, selectedCategory]);

  const selectedCommunity = useMemo(
    () => communities.find((community) => community.id === selectedCommunityId) || communities[0],
    [communities, selectedCommunityId],
  );

  const handleJoin = async (communityId) => {
    if (!user) return;
    try {
      await fetch(`${API_URL}/communities/${communityId}/join`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.id }),
      });
      setCommunities((prev) =>
        prev.map((community) =>
          community.id === communityId
            ? { ...community, joined: true, members: community.members + 1 }
            : community,
        ),
      );
    } catch (error) {
      console.error('Không thể tham gia cộng đồng:', error);
    }
  };

  const handleCreate = (event) => {
    event.preventDefault();
    if (!createState.title.trim() || !createState.description.trim()) {
      setCreateMessage('Vui lòng điền tên và mô tả cộng đồng.');
      return;
    }

    const newCommunity = {
      id: communities.length + 1,
      title: createState.title,
      category: createState.category,
      description: createState.description,
      members: 1,
      joined: true,
      privacy: createState.privacy,
      rules: createState.rules
        .split('\n')
        .map((rule) => rule.trim())
        .filter(Boolean),
      featured: false,
      growth: 'Mới',
      createdAt: 'Hôm nay',
      membersList: [{ id: 999, name: user?.name || 'Bạn', role: 'Owner' }],
      topContributors: [{ name: user?.name || 'Bạn', points: 100 }],
      events: [],
      docs: [],
      questions: [],
      posts: [],
    };

    setCommunities((prev) => [newCommunity, ...prev]);
    setSelectedCommunityId(newCommunity.id);
    setActiveTab('overview');
    setCreateState({ title: '', category: 'Công nghệ', description: '', privacy: 'Công khai', rules: '' });
    setCreateMessage('Đã tạo cộng đồng mới!');
  };

  const communityMembers = selectedCommunity.membersList.filter((member) =>
    member.name.toLowerCase().includes(memberSearch.toLowerCase()),
  );

  return (
    <div className="grid gap-6 xl:grid-cols-[320px_1fr_320px]">
      <div className="space-y-6">
        <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">Khám phá cộng đồng</h2>
          <p className="mt-2 text-sm text-slate-500">Tìm cộng đồng phù hợp với sở thích và mục tiêu của bạn.</p>
          <div className="mt-5 space-y-4">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="🔍 Tìm cộng đồng..."
              className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none"
            />
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`rounded-full px-3 py-2 text-sm font-medium transition ${
                    selectedCategory === category
                      ? 'bg-indigo-600 text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-slate-900">Chủ đề nổi bật</h3>
            <span className="text-sm text-slate-500">Hashtag</span>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {hashtags.map((tag) => (
              <button key={tag} className="rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700 hover:bg-slate-100">
                {tag}
              </button>
            ))}
          </div>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-900">Cộng đồng đề xuất</h3>
          <div className="mt-5 space-y-3">
            {filteredCommunities.slice(0, 3).map((community) => (
              <CommunityCard
                key={community.id}
                title={community.title}
                members={community.members}
                subtitle={`${community.category} · ${community.growth}`}
                actionLabel={community.joined ? 'Đã tham gia' : 'Tham gia'}
                onAction={() => handleJoin(community.id)}
              />
            ))}
          </div>
        </section>
      </div>

      <div className="space-y-6">
        <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl font-semibold text-slate-900">Tạo cộng đồng mới</h2>
              <p className="mt-2 text-sm text-slate-500">Xây dựng không gian riêng cho chủ đề bạn quan tâm.</p>
            </div>
            <div className="rounded-3xl bg-indigo-50 px-4 py-3 text-sm text-indigo-700">Quyền riêng tư: Công khai / Riêng tư</div>
          </div>
          <form className="mt-6 space-y-4" onSubmit={handleCreate}>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="space-y-2 text-sm text-slate-700">
                Tên cộng đồng
                <input
                  value={createState.title}
                  onChange={(e) => setCreateState((prev) => ({ ...prev, title: e.target.value }))}
                  placeholder="Lập trình Web Việt Nam"
                  className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none"
                />
              </label>
              <label className="space-y-2 text-sm text-slate-700">
                Danh mục
                <select
                  value={createState.category}
                  onChange={(e) => setCreateState((prev) => ({ ...prev, category: e.target.value }))}
                  className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none"
                >
                  {categories.slice(1).map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <label className="space-y-2 text-sm text-slate-700">
              Mô tả
              <textarea
                value={createState.description}
                onChange={(e) => setCreateState((prev) => ({ ...prev, description: e.target.value }))}
                placeholder="Cộng đồng dành cho người học Web"
                rows={4}
                className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none"
              />
            </label>
            <label className="space-y-2 text-sm text-slate-700">
              Quyền riêng tư
              <div className="flex flex-wrap gap-3">
                {['Công khai', 'Riêng tư'].map((privacy) => (
                  <button
                    type="button"
                    key={privacy}
                    onClick={() => setCreateState((prev) => ({ ...prev, privacy }))}
                    className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                      createState.privacy === privacy
                        ? 'bg-indigo-600 text-white'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {privacy}
                  </button>
                ))}
              </div>
            </label>
            <label className="space-y-2 text-sm text-slate-700">
              Nội quy
              <textarea
                value={createState.rules}
                onChange={(e) => setCreateState((prev) => ({ ...prev, rules: e.target.value }))}
                placeholder="1. Không spam\n2. Tôn trọng thành viên\n3. Đăng đúng chủ đề"
                rows={4}
                className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none"
              />
            </label>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              {createMessage ? <span className="text-sm text-emerald-600">{createMessage}</span> : null}
              <button className="rounded-3xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white hover:bg-indigo-700">
                Tạo cộng đồng
              </button>
            </div>
          </form>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-0 shadow-sm overflow-hidden">
          <div className="bg-gradient-to-br from-indigo-600 via-slate-900 to-slate-900 px-6 py-10 text-white">
            <div className="space-y-2">
              <p className="text-sm uppercase tracking-[0.18em] text-indigo-200">ẢNH BÌA</p>
              <h2 className="text-3xl font-semibold">{selectedCommunity.title}</h2>
              <p className="max-w-2xl text-sm text-indigo-200">{selectedCommunity.description}</p>
              <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-indigo-100">
                <span>{selectedCommunity.members.toLocaleString()} thành viên</span>
                <span>{selectedCommunity.category}</span>
                <span>{selectedCommunity.privacy}</span>
              </div>
            </div>
          </div>
          <div className="p-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => handleJoin(selectedCommunity.id)}
                  className={`rounded-3xl px-5 py-3 text-sm font-semibold transition ${
                    selectedCommunity.joined ? 'bg-slate-100 text-slate-800' : 'bg-indigo-600 text-white hover:bg-indigo-700'
                  }`}
                >
                  {selectedCommunity.joined ? 'Đã tham gia' : 'Tham gia'}
                </button>
                <button className="rounded-3xl border border-slate-200 bg-slate-50 px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-100">
                  Chia sẻ
                </button>
              </div>
              <div className="flex flex-wrap gap-2 text-xs text-slate-500">
                <span>Owner: {selectedCommunity.membersList[0]?.name}</span>
                <span>Created: {selectedCommunity.createdAt}</span>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`rounded-full px-4 py-2 text-sm transition ${
                    activeTab === tab.key ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="mt-6 space-y-6">
              {activeTab === 'overview' && (
                <div className="grid gap-6 lg:grid-cols-[1fr_280px]">
                  <div className="space-y-5 rounded-3xl border border-slate-200 bg-slate-50 p-5">
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900">Giới thiệu</h3>
                      <p className="mt-3 text-sm leading-6 text-slate-600">{selectedCommunity.description}</p>
                    </div>
                    <div className="rounded-3xl bg-white p-5 shadow-sm">
                      <h4 className="text-sm font-semibold text-slate-900">Nội quy cộng đồng</h4>
                      <ul className="mt-3 space-y-2 text-sm text-slate-600">
                        {selectedCommunity.rules.map((rule, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="mt-1 h-2 w-2 rounded-full bg-indigo-600" />
                            <span>{rule}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="rounded-3xl bg-white p-5 shadow-sm">
                      <h4 className="text-sm font-semibold text-slate-900">Điểm đóng góp</h4>
                      <div className="mt-4 space-y-3">
                        {selectedCommunity.topContributors.map((contributor, index) => (
                          <div key={index} className="flex items-center justify-between rounded-3xl border border-slate-200 px-4 py-3">
                            <div>
                              <p className="font-medium text-slate-900">{contributor.name}</p>
                              <p className="text-sm text-slate-500">Thành viên tích cực</p>
                            </div>
                            <span className="rounded-full bg-indigo-50 px-3 py-1 text-sm font-semibold text-indigo-700">
                              {contributor.points} ⭐
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="space-y-5">
                    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                      <h4 className="text-sm font-semibold text-slate-900">Quản trị cộng đồng</h4>
                      <div className="mt-4 space-y-3 text-sm text-slate-600">
                        <p>👑 Owner: {selectedCommunity.membersList[0]?.name}</p>
                        <p>🛡️ Admin / Moderator: {selectedCommunity.membersList.filter((m) => m.role !== 'Thành viên').map((m) => m.name).join(', ')}</p>
                        <p>🎯 Quyền hạn: quản lý bài viết, kiểm duyệt, ghim nội dung.</p>
                      </div>
                    </div>
                    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                      <h4 className="text-sm font-semibold text-slate-900">Bảng xếp hạng</h4>
                      <div className="mt-4 space-y-3 text-sm">
                        {selectedCommunity.topContributors.map((contributor, index) => (
                          <div key={contributor.name} className="flex items-center justify-between rounded-3xl border border-slate-100 px-4 py-3">
                            <div className="flex items-center gap-3">
                              <span className="text-lg">{['🥇', '🥈', '🥉'][index] || '🏅'}</span>
                              <div>
                                <p className="font-medium text-slate-900">{contributor.name}</p>
                                <p className="text-xs text-slate-500">Top thành viên</p>
                              </div>
                            </div>
                            <span className="text-sm font-semibold text-slate-700">{contributor.points} ⭐</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'posts' && (
                <div className="space-y-4">
                  <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                    <h4 className="text-sm font-semibold text-slate-900">Đăng bài trong cộng đồng</h4>
                    <div className="mt-4 grid gap-3 sm:grid-cols-2">
                      {['📝 Bài viết', '❓ Câu hỏi', '📊 Khảo sát', '📚 Tài liệu'].map((item) => (
                        <button key={item} className="rounded-3xl border border-slate-200 bg-white px-4 py-3 text-left text-sm text-slate-700 hover:bg-slate-100">
                          {item}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-3">
                    {selectedCommunity.posts.map((post) => (
                      <div key={post.id} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                        <div className="flex flex-wrap items-center justify-between gap-3">
                          <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700">{post.type}</span>
                          <span className="text-sm text-slate-500">{post.likes} ❤️ · {post.comments} 💬 · {post.shares} 🔄</span>
                        </div>
                        <h4 className="mt-3 text-lg font-semibold text-slate-900">{post.title}</h4>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'questions' && (
                <div className="space-y-4">
                  {selectedCommunity.questions.map((question) => (
                    <div key={question.id} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                      <div className="flex items-center justify-between gap-3 text-sm text-slate-500">
                        <span>{question.answers} câu trả lời</span>
                        <span>{question.views} lượt xem</span>
                      </div>
                      <h4 className="mt-3 text-lg font-semibold text-slate-900">{question.title}</h4>
                      {question.accepted ? <span className="mt-3 inline-flex rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">Câu trả lời tốt nhất</span> : null}
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'events' && (
                <div className="space-y-4">
                  {selectedCommunity.events.map((event) => (
                    <div key={event.id} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <div>
                          <p className="text-sm text-slate-500">{event.date} · {event.time}</p>
                          <h4 className="mt-2 text-lg font-semibold text-slate-900">{event.title}</h4>
                        </div>
                        <div className="rounded-3xl bg-indigo-50 px-4 py-2 text-sm text-indigo-700">{event.location}</div>
                      </div>
                      <div className="mt-4 flex items-center justify-between gap-3 text-sm text-slate-600">
                        <span>{event.attendees} người tham gia</span>
                        <button className="rounded-3xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700">{event.joined ? 'Hủy tham gia' : 'Tham gia'}</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'members' && (
                <div className="space-y-4">
                  <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                    <input
                      placeholder="Tìm thành viên..."
                      value={memberSearch}
                      onChange={(e) => setMemberSearch(e.target.value)}
                      className="w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none"
                    />
                  </div>
                  <div className="space-y-3">
                    {communityMembers.map((member) => (
                      <div key={member.id} className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
                        <div className="flex items-center justify-between gap-3">
                          <div>
                            <p className="font-semibold text-slate-900">{member.name}</p>
                            <p className="text-sm text-slate-500">{member.role}</p>
                          </div>
                          <button className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-700 hover:bg-slate-100">Xem</button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'docs' && (
                <div className="space-y-4">
                  {selectedCommunity.docs.map((doc) => (
                    <div key={doc.id} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <p className="font-semibold text-slate-900">{doc.title}</p>
                          <p className="text-sm text-slate-500">Tài liệu</p>
                        </div>
                        <div className="flex gap-2">
                          <button className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-700 hover:bg-slate-100">Xem</button>
                          <button className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-700 hover:bg-slate-100">Lưu</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      </div>

      <div className="space-y-6">
        <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-slate-900">Cộng đồng mới</h3>
            <span className="text-sm text-slate-500">{communities.filter((community) => community.growth === 'Mới').length} cộng đồng</span>
          </div>
          <div className="mt-5 space-y-3">
            {communities.filter((community) => community.growth === 'Mới').slice(0, 3).map((community) => (
              <CommunityCard
                key={community.id}
                title={community.title}
                members={community.members}
                subtitle={`${community.category} · ${community.privacy}`}
                actionLabel={community.joined ? 'Đã tham gia' : 'Tham gia'}
                onAction={() => handleJoin(community.id)}
              />
            ))}
          </div>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-900">Thông báo cộng đồng</h3>
          <div className="mt-4 space-y-4 text-sm text-slate-600">
            <div className="rounded-3xl border border-slate-200 bg-slate-50 px-4 py-4">
              <p className="font-medium text-slate-900">🔔 Cộng đồng {selectedCommunity.title}</p>
              <p className="mt-2">Nguyễn A đã trả lời câu hỏi của bạn.</p>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-slate-50 px-4 py-4">
              <p className="font-medium text-slate-900">🔔 Bạn nhận được huy hiệu 🏆</p>
              <p className="mt-2">Hoạt động tích cực trong cộng đồng đã được ghi nhận.</p>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-slate-50 px-4 py-4">
              <p className="font-medium text-slate-900">🔔 Workshop React bắt đầu sau 1 giờ.</p>
              <p className="mt-2">Đừng quên tham gia và đặt câu hỏi.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
