import { useState } from 'react';

const tabs = [
  { id: 'account', label: 'Tài khoản' },
  { id: 'security', label: 'Bảo mật' },
  { id: 'privacy', label: 'Quyền riêng tư' },
  { id: 'notifications', label: 'Thông báo' },
  { id: 'appearance', label: 'Giao diện' },
  { id: 'language', label: 'Ngôn ngữ' },
  { id: 'feed', label: 'Bảng tin' },
  { id: 'messages', label: 'Tin nhắn' },
  { id: 'connections', label: 'Kết nối' },
  { id: 'communities', label: 'Cộng đồng' },
  { id: 'data', label: 'Dữ liệu' },
  { id: 'accessibility', label: 'Trợ năng' },
  { id: 'help', label: 'Trợ giúp' },
  { id: 'reports', label: 'Chặn/Báo cáo' },
  { id: 'logout', label: 'Đăng xuất' },
];

export default function Settings() {
  const [activeTab, setActiveTab] = useState('account');
  const [accountInfo, setAccountInfo] = useState({
    name: 'Nguyễn Văn A',
    username: '@nguyenvana',
    email: 'example@gmail.com',
    phone: '********89',
  });
  const [securityState, setSecurityState] = useState({
    twoFactor: false,
    rememberDevices: true,
    emailAlerts: true,
    soundAlerts: true,
  });
  const [privacyState, setPrivacyState] = useState({
    postVisibility: 'connections',
    showEmail: false,
    showDob: false,
    showPhone: false,
    showConnections: true,
    showPosts: true,
    connectionRequests: 'friends',
  });
  const [notificationState, setNotificationState] = useState({
    likes: true,
    comments: true,
    connections: true,
    messages: true,
    communities: true,
    events: false,
    badges: true,
    email: true,
    sound: false,
  });
  const [appearanceState, setAppearanceState] = useState({
    theme: 'system',
    accent: 'indigo',
    fontSize: 'medium',
  });
  const [language, setLanguage] = useState('vi');
  const [feedState, setFeedState] = useState({
    priority: 'latest',
    categories: {
      tech: true,
      learning: true,
      gaming: true,
      sports: false,
      design: true,
    },
    hideActions: {
      hidePosts: false,
      hideUsers: false,
      unfollow: false,
      notInterested: false,
    },
  });
  const [messageState, setMessageState] = useState({
    whoCanMessage: 'connections',
    allowStrangers: false,
    showOnlineStatus: true,
    showReadReceipts: true,
    allowAttachments: true,
  });
  const [connectionsState, setConnectionsState] = useState({
    total: 248,
    following: 82,
    followers: 91,
    blocked: 5,
  });
  const [communityState, setCommunityState] = useState({
    receiveCommunityNotifications: true,
    postUpdates: true,
    adminNotifications: true,
    eventNotifications: true,
    qnaNotifications: true,
  });
  const [dataExportState, setDataExportState] = useState({
    posts: true,
    photos: true,
    videos: true,
    messages: true,
    profile: true,
  });
  const [storageUsage] = useState({ photos: '1.2 GB', videos: '3.5 GB', files: '250 MB' });
  const [accessibilityState, setAccessibilityState] = useState({
    textSize: 'medium',
    reduceMotion: false,
    highContrast: false,
    keyboardSupport: true,
    screenReader: false,
  });

  const renderSection = () => {
    switch (activeTab) {
      case 'account':
        return (
          <div className="space-y-6">
            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex items-center gap-4">
                  <div className="h-24 w-24 rounded-3xl bg-slate-100" />
                  <div>
                    <p className="text-sm text-slate-500">Ảnh đại diện</p>
                    <button className="mt-3 rounded-2xl bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-200">
                      Thay đổi
                    </button>
                  </div>
                </div>
                <button className="rounded-2xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white">
                  Chỉnh sửa thông tin
                </button>
              </div>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-sm text-slate-500">Họ tên</p>
                  <p className="mt-2 font-semibold text-slate-900">{accountInfo.name}</p>
                </div>
                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-sm text-slate-500">Username</p>
                  <p className="mt-2 font-semibold text-slate-900">{accountInfo.username}</p>
                </div>
                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-sm text-slate-500">Email</p>
                  <p className="mt-2 font-semibold text-slate-900">{accountInfo.email}</p>
                </div>
                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-sm text-slate-500">Số điện thoại</p>
                  <p className="mt-2 font-semibold text-slate-900">{accountInfo.phone}</p>
                </div>
              </div>
            </section>

            <section className="rounded-3xl border border-rose-200 bg-rose-50 p-6 shadow-sm">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-rose-800">Xóa tài khoản</h2>
                  <p className="mt-2 text-sm text-rose-700">Vô hiệu hóa hoặc xóa vĩnh viễn tài khoản. Bạn sẽ được yêu cầu xác nhận trước khi thực hiện.</p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <button className="rounded-2xl border border-rose-300 bg-white px-4 py-2 text-sm font-medium text-rose-700 hover:bg-rose-50">
                    Vô hiệu hóa tài khoản
                  </button>
                  <button className="rounded-2xl bg-rose-600 px-4 py-2 text-sm font-semibold text-white hover:bg-rose-700">
                    Xóa tài khoản vĩnh viễn
                  </button>
                </div>
              </div>
            </section>
          </div>
        );
      case 'security':
        return (
          <div className="space-y-6">
            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-slate-900">Mật khẩu</h2>
                  <p className="mt-1 text-sm text-slate-500">Thay đổi mật khẩu định kỳ để bảo mật tài khoản.</p>
                </div>
                <button className="rounded-2xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white">
                  Đổi mật khẩu
                </button>
              </div>
            </section>

            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-slate-900">Xác thực 2 bước</h2>
                  <p className="mt-1 text-sm text-slate-500">Tăng cường bảo mật với mã OTP hoặc ứng dụng xác thực.</p>
                </div>
                <button
                  onClick={() => setSecurityState((prev) => ({ ...prev, twoFactor: !prev.twoFactor }))}
                  className={`rounded-2xl px-5 py-3 text-sm font-semibold ${securityState.twoFactor ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-700'}`}
                >
                  {securityState.twoFactor ? 'Đã bật' : 'Chưa bật'}
                </button>
              </div>
            </section>

            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-slate-900">Thiết bị đăng nhập</h2>
              <p className="mt-2 text-sm text-slate-500">Quản lý các thiết bị hiện đang đăng nhập vào tài khoản.</p>
              <div className="mt-5 space-y-4">
                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-sm text-slate-500">Windows</p>
                  <p className="mt-1 font-semibold text-slate-900">Chrome · Đang hoạt động</p>
                </div>
                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-sm text-slate-500">Android</p>
                  <p className="mt-1 font-semibold text-slate-900">2 giờ trước</p>
                </div>
              </div>
              <button className="mt-6 rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800">
                Đăng xuất tất cả thiết bị
              </button>
            </section>

            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-slate-900">Cảnh báo bảo mật</h2>
              <p className="mt-2 text-sm text-slate-500">Nhận cảnh báo khi có đăng nhập bất thường hoặc thay đổi cài đặt.</p>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <label className="flex items-center justify-between rounded-3xl border border-slate-200 bg-slate-50 px-4 py-4">
                  <span>Lịch sử đăng nhập</span>
                  <span className="rounded-full bg-emerald-100 px-3 py-1 text-sm text-emerald-700">Bật</span>
                </label>
                <label className="flex items-center justify-between rounded-3xl border border-slate-200 bg-slate-50 px-4 py-4">
                  <span>Cảnh báo đăng nhập bất thường</span>
                  <span className="rounded-full bg-emerald-100 px-3 py-1 text-sm text-emerald-700">Bật</span>
                </label>
              </div>
            </section>
          </div>
        );
      case 'privacy':
        return (
          <div className="space-y-6">
            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-slate-900">Ai có thể xem bài viết?</h2>
              <div className="mt-4 space-y-3">
                {[
                  { value: 'everyone', label: 'Mọi người' },
                  { value: 'connections', label: 'Người kết nối' },
                  { value: 'onlyme', label: 'Chỉ mình tôi' },
                ].map((option) => (
                  <label key={option.value} className="flex items-center gap-3 rounded-3xl border border-slate-200 px-4 py-3">
                    <input
                      type="radio"
                      name="postVisibility"
                      checked={privacyState.postVisibility === option.value}
                      onChange={() => setPrivacyState((prev) => ({ ...prev, postVisibility: option.value }))}
                      className="h-4 w-4 text-indigo-600"
                    />
                    <span>{option.label}</span>
                  </label>
                ))}
              </div>
            </section>

            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-slate-900">Ai được xem hồ sơ của bạn?</h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {[
                  { key: 'showEmail', label: 'Email' },
                  { key: 'showDob', label: 'Ngày sinh' },
                  { key: 'showPhone', label: 'Số điện thoại' },
                  { key: 'showConnections', label: 'Danh sách kết nối' },
                  { key: 'showPosts', label: 'Bài viết' },
                ].map((item) => (
                  <label key={item.key} className="flex items-center justify-between rounded-3xl border border-slate-200 bg-slate-50 px-4 py-4">
                    <span>{item.label}</span>
                    <input
                      type="checkbox"
                      checked={privacyState[item.key]}
                      onChange={() => setPrivacyState((prev) => ({ ...prev, [item.key]: !prev[item.key] }))}
                      className="h-4 w-4 text-indigo-600"
                    />
                  </label>
                ))}
              </div>
            </section>

            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-slate-900">Ai có thể gửi lời mời kết nối?</h2>
              <div className="mt-4 space-y-3">
                {[
                  { value: 'everyone', label: 'Mọi người' },
                  { value: 'friends', label: 'Bạn của bạn bè' },
                  { value: 'none', label: 'Không ai' },
                ].map((option) => (
                  <label key={option.value} className="flex items-center gap-3 rounded-3xl border border-slate-200 px-4 py-3">
                    <input
                      type="radio"
                      name="connectionRequests"
                      checked={privacyState.connectionRequests === option.value}
                      onChange={() => setPrivacyState((prev) => ({ ...prev, connectionRequests: option.value }))}
                      className="h-4 w-4 text-indigo-600"
                    />
                    <span>{option.label}</span>
                  </label>
                ))}
              </div>
            </section>
          </div>
        );
      case 'notifications':
        return (
          <div className="space-y-6">
            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-slate-900">Thông báo</h2>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                {[
                  { key: 'likes', label: 'Lượt thích' },
                  { key: 'comments', label: 'Bình luận' },
                  { key: 'connections', label: 'Kết nối' },
                  { key: 'messages', label: 'Tin nhắn' },
                  { key: 'communities', label: 'Cộng đồng' },
                  { key: 'events', label: 'Sự kiện' },
                  { key: 'badges', label: 'Huy hiệu' },
                ].map((item) => (
                  <label key={item.key} className="flex items-center justify-between rounded-3xl border border-slate-200 bg-slate-50 px-4 py-4">
                    <span>{item.label}</span>
                    <input
                      type="checkbox"
                      checked={notificationState[item.key]}
                      onChange={() => setNotificationState((prev) => ({ ...prev, [item.key]: !prev[item.key] }))}
                      className="h-4 w-4 text-indigo-600"
                    />
                  </label>
                ))}
              </div>
            </section>

            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-slate-900">Kênh thông báo</h2>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <label className="flex items-center justify-between rounded-3xl border border-slate-200 bg-slate-50 px-4 py-4">
                  <span>Nhận thông báo qua email</span>
                  <input
                    type="checkbox"
                    checked={notificationState.email}
                    onChange={() => setNotificationState((prev) => ({ ...prev, email: !prev.email }))}
                    className="h-4 w-4 text-indigo-600"
                  />
                </label>
                <label className="flex items-center justify-between rounded-3xl border border-slate-200 bg-slate-50 px-4 py-4">
                  <span>Âm thanh thông báo</span>
                  <input
                    type="checkbox"
                    checked={notificationState.sound}
                    onChange={() => setNotificationState((prev) => ({ ...prev, sound: !prev.sound }))}
                    className="h-4 w-4 text-indigo-600"
                  />
                </label>
              </div>
            </section>
          </div>
        );
      case 'appearance':
        return (
          <div className="space-y-6">
            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-slate-900">Giao diện</h2>
              <div className="mt-4 space-y-3">
                {[
                  { value: 'light', label: 'Sáng' },
                  { value: 'dark', label: 'Tối' },
                  { value: 'system', label: 'Theo hệ thống' },
                ].map((item) => (
                  <label key={item.value} className="flex items-center gap-3 rounded-3xl border border-slate-200 px-4 py-3">
                    <input
                      type="radio"
                      name="theme"
                      checked={appearanceState.theme === item.value}
                      onChange={() => setAppearanceState((prev) => ({ ...prev, theme: item.value }))}
                      className="h-4 w-4 text-indigo-600"
                    />
                    <span>{item.label}</span>
                  </label>
                ))}
              </div>
              <div className="mt-6">
                <p className="text-sm text-slate-500">Màu chủ đạo</p>
                <div className="mt-3 flex flex-wrap gap-3">
                  {['indigo', 'emerald', 'sky', 'orange'].map((color) => (
                    <button
                      key={color}
                      onClick={() => setAppearanceState((prev) => ({ ...prev, accent: color }))}
                      className={`h-10 w-10 rounded-full ${color === 'indigo' ? 'bg-indigo-600' : color === 'emerald' ? 'bg-emerald-600' : color === 'sky' ? 'bg-sky-600' : 'bg-orange-500'} ${appearanceState.accent === color ? 'ring-4 ring-slate-300' : ''}`}
                    />
                  ))}
                </div>
              </div>
              <div className="mt-6">
                <p className="text-sm text-slate-500">Kích thước chữ</p>
                <div className="mt-3 flex flex-wrap gap-3">
                  {[
                    { value: 'small', label: 'Nhỏ' },
                    { value: 'medium', label: 'Vừa' },
                    { value: 'large', label: 'Lớn' },
                  ].map((item) => (
                    <button
                      key={item.value}
                      onClick={() => setAppearanceState((prev) => ({ ...prev, fontSize: item.value }))}
                      className={`rounded-2xl px-4 py-2 text-sm ${appearanceState.fontSize === item.value ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-700'}`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
            </section>
          </div>
        );
      case 'language':
        return (
          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">Ngôn ngữ</h2>
            <p className="mt-2 text-sm text-slate-500">Thay đổi ngôn ngữ giao diện.</p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {[
                { value: 'vi', label: '🇻🇳 Tiếng Việt' },
                { value: 'en', label: '🇬🇧 English' },
                { value: 'jp', label: '🇯🇵 日本語' },
                { value: 'kr', label: '🇰🇷 한국어' },
              ].map((item) => (
                <button
                  key={item.value}
                  onClick={() => setLanguage(item.value)}
                  className={`rounded-3xl border px-4 py-4 text-left text-sm font-medium ${language === item.value ? 'border-indigo-500 bg-indigo-50 text-slate-900' : 'border-slate-200 bg-slate-50 text-slate-700'}`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </section>
        );
      case 'feed':
        return (
          <div className="space-y-6">
            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-slate-900">Ưu tiên bài viết</h2>
              <div className="mt-4 space-y-3">
                {[
                  { value: 'latest', label: 'Mới nhất' },
                  { value: 'personal', label: 'Phù hợp với tôi' },
                  { value: 'communities', label: 'Cộng đồng đang tham gia' },
                ].map((option) => (
                  <label key={option.value} className="flex items-center gap-3 rounded-3xl border border-slate-200 px-4 py-3">
                    <input
                      type="radio"
                      name="feedPriority"
                      checked={feedState.priority === option.value}
                      onChange={() => setFeedState((prev) => ({ ...prev, priority: option.value }))}
                      className="h-4 w-4 text-indigo-600"
                    />
                    <span>{option.label}</span>
                  </label>
                ))}
              </div>
            </section>

            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-slate-900">Hiển thị nội dung</h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {Object.entries(feedState.categories).map(([key, value]) => (
                  <label key={key} className="flex items-center justify-between rounded-3xl border border-slate-200 bg-slate-50 px-4 py-4">
                    <span>{key === 'tech' ? 'Công nghệ' : key === 'learning' ? 'Học tập' : key === 'gaming' ? 'Gaming' : key === 'sports' ? 'Thể thao' : 'Design'}</span>
                    <input
                      type="checkbox"
                      checked={value}
                      onChange={() => setFeedState((prev) => ({
                        ...prev,
                        categories: { ...prev.categories, [key]: !value },
                      }))}
                      className="h-4 w-4 text-indigo-600"
                    />
                  </label>
                ))}
              </div>
            </section>

            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-slate-900">Quản lý nội dung</h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {[
                  { key: 'hidePosts', label: 'Ẩn bài viết' },
                  { key: 'hideUsers', label: 'Ẩn người dùng' },
                  { key: 'unfollow', label: 'Bỏ theo dõi' },
                  { key: 'notInterested', label: 'Không quan tâm' },
                ].map((item) => (
                  <label key={item.key} className="flex items-center justify-between rounded-3xl border border-slate-200 bg-slate-50 px-4 py-4">
                    <span>{item.label}</span>
                    <input
                      type="checkbox"
                      checked={feedState.hideActions[item.key]}
                      onChange={() => setFeedState((prev) => ({
                        ...prev,
                        hideActions: { ...prev.hideActions, [item.key]: !prev.hideActions[item.key] },
                      }))}
                      className="h-4 w-4 text-indigo-600"
                    />
                  </label>
                ))}
              </div>
            </section>
          </div>
        );
      case 'messages':
        return (
          <div className="space-y-6">
            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-slate-900">Ai có thể nhắn tin?</h2>
              <div className="mt-4 space-y-3">
                {[
                  { value: 'everyone', label: 'Mọi người' },
                  { value: 'connections', label: 'Người kết nối' },
                  { value: 'none', label: 'Không ai' },
                ].map((option) => (
                  <label key={option.value} className="flex items-center gap-3 rounded-3xl border border-slate-200 px-4 py-3">
                    <input
                      type="radio"
                      name="whoCanMessage"
                      checked={messageState.whoCanMessage === option.value}
                      onChange={() => setMessageState((prev) => ({ ...prev, whoCanMessage: option.value }))}
                      className="h-4 w-4 text-indigo-600"
                    />
                    <span>{option.label}</span>
                  </label>
                ))}
              </div>
            </section>

            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-slate-900">Quyền nhắn tin</h2>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                {[
                  { key: 'allowStrangers', label: 'Cho phép người lạ nhắn tin' },
                  { key: 'showOnlineStatus', label: 'Hiển thị trạng thái Online' },
                  { key: 'showReadReceipts', label: 'Hiển thị "Đã xem"' },
                  { key: 'allowAttachments', label: 'Cho phép gửi ảnh/file' },
                ].map((item) => (
                  <label key={item.key} className="flex items-center justify-between rounded-3xl border border-slate-200 bg-slate-50 px-4 py-4">
                    <span>{item.label}</span>
                    <input
                      type="checkbox"
                      checked={messageState[item.key]}
                      onChange={() => setMessageState((prev) => ({ ...prev, [item.key]: !prev[item.key] }))}
                      className="h-4 w-4 text-indigo-600"
                    />
                  </label>
                ))}
              </div>
            </section>
          </div>
        );
      case 'connections':
        return (
          <div className="space-y-6">
            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4 text-center">
                  <p className="text-sm text-slate-500">Kết nối của tôi</p>
                  <p className="mt-2 text-3xl font-semibold text-slate-900">{connectionsState.total}</p>
                </div>
                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4 text-center">
                  <p className="text-sm text-slate-500">Đang theo dõi</p>
                  <p className="mt-2 text-3xl font-semibold text-slate-900">{connectionsState.following}</p>
                </div>
                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4 text-center">
                  <p className="text-sm text-slate-500">Người theo dõi</p>
                  <p className="mt-2 text-3xl font-semibold text-slate-900">{connectionsState.followers}</p>
                </div>
              </div>
            </section>

            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-slate-900">Danh sách chặn</h2>
                  <p className="mt-1 text-sm text-slate-500">Quản lý những người bạn đã chặn.</p>
                </div>
                <div className="rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-900">
                  {connectionsState.blocked} người dùng
                </div>
              </div>
              <button className="mt-6 rounded-2xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white hover:bg-indigo-700">
                Quản lý kết nối
              </button>
            </section>
          </div>
        );
      case 'communities':
        return (
          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">Cộng đồng</h2>
            <p className="mt-2 text-sm text-slate-500">Quản lý thông báo và tương tác với cộng đồng.</p>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {[
                { key: 'postUpdates', label: 'Bài viết mới' },
                { key: 'adminNotifications', label: 'Thông báo quản trị' },
                { key: 'eventNotifications', label: 'Sự kiện' },
                { key: 'qnaNotifications', label: 'Hỏi đáp' },
              ].map((item) => (
                <label key={item.key} className="flex items-center justify-between rounded-3xl border border-slate-200 bg-slate-50 px-4 py-4">
                  <span>{item.label}</span>
                  <input
                    type="checkbox"
                    checked={communityState[item.key]}
                    onChange={() => setCommunityState((prev) => ({ ...prev, [item.key]: !prev[item.key] }))}
                    className="h-4 w-4 text-indigo-600"
                  />
                </label>
              ))}
            </div>
          </section>
        );
      case 'data':
        return (
          <div className="space-y-6">
            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-slate-900">Tải dữ liệu</h2>
              <p className="mt-2 text-sm text-slate-500">Yêu cầu bản sao dữ liệu cá nhân của bạn.</p>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                {[
                  { key: 'posts', label: 'Bài viết' },
                  { key: 'photos', label: 'Ảnh' },
                  { key: 'videos', label: 'Video' },
                  { key: 'messages', label: 'Tin nhắn' },
                  { key: 'profile', label: 'Thông tin tài khoản' },
                ].map((item) => (
                  <label key={item.key} className="flex items-center justify-between rounded-3xl border border-slate-200 bg-slate-50 px-4 py-4">
                    <span>{item.label}</span>
                    <input
                      type="checkbox"
                      checked={dataExportState[item.key]}
                      onChange={() => setDataExportState((prev) => ({ ...prev, [item.key]: !prev[item.key] }))}
                      className="h-4 w-4 text-indigo-600"
                    />
                  </label>
                ))}
              </div>
              <button className="mt-6 rounded-2xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white hover:bg-indigo-700">
                Yêu cầu tải dữ liệu
              </button>
            </section>

            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-slate-900">Bộ nhớ</h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-3">
                {Object.entries(storageUsage).map(([label, value]) => (
                  <div key={label} className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                    <p className="text-sm text-slate-500">{label === 'photos' ? 'Ảnh' : label === 'videos' ? 'Video' : 'Tệp'}</p>
                    <p className="mt-2 text-xl font-semibold text-slate-900">{value}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        );
      case 'accessibility':
        return (
          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">Trợ năng</h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <label className="flex items-center justify-between rounded-3xl border border-slate-200 bg-slate-50 px-4 py-4">
                <span>Kích thước chữ</span>
                <select
                  value={accessibilityState.textSize}
                  onChange={(e) => setAccessibilityState((prev) => ({ ...prev, textSize: e.target.value }))}
                  className="rounded-2xl border border-slate-300 bg-white px-3 py-2 text-sm outline-none"
                >
                  <option value="small">Nhỏ</option>
                  <option value="medium">Vừa</option>
                  <option value="large">Lớn</option>
                </select>
              </label>
              {[
                { key: 'reduceMotion', label: 'Giảm chuyển động' },
                { key: 'highContrast', label: 'Tăng độ tương phản' },
                { key: 'keyboardSupport', label: 'Hỗ trợ bàn phím' },
                { key: 'screenReader', label: 'Hỗ trợ trình đọc màn hình' },
              ].map((item) => (
                <label key={item.key} className="flex items-center justify-between rounded-3xl border border-slate-200 bg-slate-50 px-4 py-4">
                  <span>{item.label}</span>
                  <input
                    type="checkbox"
                    checked={accessibilityState[item.key]}
                    onChange={() => setAccessibilityState((prev) => ({ ...prev, [item.key]: !prev[item.key] }))}
                    className="h-4 w-4 text-indigo-600"
                  />
                </label>
              ))}
            </div>
          </section>
        );
      case 'help':
        return (
          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">Trợ giúp</h2>
            <p className="mt-2 text-sm text-slate-500">Xem hướng dẫn, câu hỏi thường gặp, hoặc gửi báo cáo hỗ trợ.</p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {['Không đăng nhập được', 'Không đăng được bài', 'Tài khoản bị khóa', 'Báo cáo vấn đề'].map((label) => (
                <button key={label} className="rounded-3xl border border-slate-200 bg-slate-50 px-4 py-4 text-left text-sm font-medium text-slate-700 hover:bg-slate-100">
                  {label}
                </button>
              ))}
            </div>
          </section>
        );
      case 'reports':
        return (
          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">Chặn và báo cáo</h2>
            <div className="mt-5 space-y-4">
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                <h3 className="font-semibold text-slate-900">Chặn người dùng</h3>
                <p className="mt-1 text-sm text-slate-500">Người dùng bị chặn sẽ không thể xem profile, nhắn tin hoặc tương tác với bạn.</p>
              </div>
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                <h3 className="font-semibold text-slate-900">Báo cáo nội dung</h3>
                <p className="mt-1 text-sm text-slate-500">Báo cáo spam, lừa đảo, quấy rối hoặc nội dung vi phạm.</p>
              </div>
            </div>
          </section>
        );
      case 'logout':
        return (
          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">Đăng xuất</h2>
            <p className="mt-2 text-sm text-slate-500">Bấm để đăng xuất khỏi tài khoản hiện tại. Bạn sẽ được hỏi lại trước khi xác nhận.</p>
            <button className="mt-6 rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800">
              Đăng xuất
            </button>
          </section>
        );
      default:
        return null;
    }
  };

  return (
    <div className="mx-auto max-w-[1400px] px-4 py-6">
      <div className="grid gap-6 xl:grid-cols-[280px_1fr]">
        <aside className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="mb-6 px-2">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Cài đặt</p>
            <h1 className="mt-3 text-2xl font-semibold text-slate-900">Quản lý tài khoản</h1>
            <p className="mt-2 text-sm text-slate-500">Chọn phần bạn muốn xem và điều chỉnh.</p>
          </div>
          <div className="space-y-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full rounded-3xl px-4 py-3 text-left text-sm font-medium transition ${
                  activeTab === tab.id ? 'bg-indigo-50 text-indigo-700 shadow-sm' : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </aside>

        <main className="space-y-6">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-xl font-semibold text-slate-900">{tabs.find((tab) => tab.id === activeTab)?.label}</h2>
                <p className="mt-1 text-sm text-slate-500">Cập nhật cài đặt riêng cho mục này.</p>
              </div>
              <div className="rounded-3xl bg-slate-50 px-4 py-2 text-sm text-slate-600">
                {tabs.findIndex((tab) => tab.id === activeTab) + 1} / {tabs.length}
              </div>
            </div>
          </div>

          {renderSection()}
        </main>
      </div>
    </div>
  );
}
