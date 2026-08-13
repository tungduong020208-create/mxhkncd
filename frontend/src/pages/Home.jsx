import { useEffect, useState, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import CreatePost from '../components/CreatePost';
import Story from '../components/Story';
import Post from '../components/Post';
import CommunityCard from '../components/CommunityCard';
import OnlineUsers from '../components/OnlineUsers';

const stories = ['Bạn', 'Minh', 'Nam', 'Lan', 'Hoàng'];
const feedFilters = ['Dành cho bạn', 'Mới nhất', 'Đang theo dõi'];

export default function Home() {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  const [newPostContent, setNewPostContent] = useState('');
  const [postType, setPostType] = useState('text');
  const [progress, setProgress] = useState(50);
  const [page, setPage] = useState(1);
  const [nextPage, setNextPage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeFilter, setActiveFilter] = useState('Dành cho bạn');
  const loaderRef = useRef(null);

  useEffect(() => {
    const fetchPosts = async (pageToLoad = 1) => {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:4000/api/posts?page=${pageToLoad}&limit=5`);
        const data = await response.json();
        if (data.posts) {
          setPosts((prev) => (pageToLoad === 1 ? data.posts : [...prev, ...data.posts]));
          setNextPage(data.nextPage);
        }
      } catch (error) {
        console.error('Không thể lấy bài viết:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts(1);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && nextPage && !loading) {
          setPage(nextPage);
        }
      },
      { rootMargin: '200px' }
    );
    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [nextPage, loading]);

  useEffect(() => {
    if (page === 1) return;
    const loadMore = async () => {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:4000/api/posts?page=${page}&limit=5`);
        const data = await response.json();
        if (data.posts) {
          setPosts((prev) => [...prev, ...data.posts]);
          setNextPage(data.nextPage);
        }
      } catch (error) {
        console.error('Không thể tải thêm bài viết:', error);
      } finally {
        setLoading(false);
      }
    };
    loadMore();
  }, [page]);

  const handleCreatePost = async () => {
    if (!newPostContent.trim()) return;

    try {
      const response = await fetch('http://localhost:4000/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user: user?.name || 'Người dùng', content: newPostContent, type: postType, progress }),
      });
      const data = await response.json();
      if (response.ok) {
        setPosts((prev) => [{ ...data, time: 'Mới đăng' }, ...prev]);
        setNewPostContent('');
        setPostType('text');
        setProgress(50);
      }
    } catch (error) {
      console.error('Không thể tạo bài viết:', error);
    }
  };

  const handleReaction = async (postId) => {
    try {
      const response = await fetch(`http://localhost:4000/api/posts/${postId}/like`, { method: 'POST' });
      const data = await response.json();
      if (response.ok) {
        setPosts((prev) => prev.map((post) => (post.id === data.id ? { ...post, likes: data.likes } : post)));
      }
    } catch (error) {
      console.error('Không thể cập nhật tương tác:', error);
    }
  };

  const handleShare = async (postId) => {
    try {
      const response = await fetch(`http://localhost:4000/api/posts/${postId}/share`, { method: 'POST' });
      const data = await response.json();
      if (response.ok) {
        setPosts((prev) => prev.map((post) => (post.id === data.id ? { ...post, shares: data.shares } : post)));
      }
    } catch (error) {
      console.error('Không thể chia sẻ bài viết:', error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-semibold text-slate-900">Bảng tin</p>
            <p className="mt-1 text-sm text-slate-500">Cập nhật từ kết nối, cộng đồng và nội dung đề xuất.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {feedFilters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`rounded-full px-4 py-2 text-sm font-medium ${
                  activeFilter === filter ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      </div>

      <CreatePost
        content={newPostContent}
        onContentChange={setNewPostContent}
        type={postType}
        onTypeChange={setPostType}
        progress={progress}
        onProgressChange={setProgress}
        onSubmit={handleCreatePost}
      />

      <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-sm font-semibold text-slate-900">Story</p>
            <p className="text-sm text-slate-500">Xem Story gần đây từ kết nối của bạn.</p>
          </div>
          <button className="rounded-2xl bg-slate-100 px-4 py-2 text-sm text-slate-600">Tạo Story</button>
        </div>
        <div className="mt-5 flex gap-4 overflow-x-auto pb-2">
          <div className="flex h-36 w-24 flex-col items-center justify-center rounded-3xl border border-dashed border-slate-300 bg-slate-50 text-slate-500">
            <span className="text-2xl">＋</span>
            <p className="mt-2 text-center text-sm font-semibold">Bạn</p>
          </div>
          {stories.map((story) => (
            <Story key={story} title={story} />
          ))}
        </div>
      </div>

      <div className="grid gap-6">
        {posts.map((post) => (
          <Post
            key={post.id}
            {...post}
            onLike={() => handleReaction(post.id)}
            onComment={() => null}
            onShare={() => handleShare(post.id)}
          />
        ))}
      </div>

      <div ref={loaderRef} className="h-10 text-center text-sm text-slate-500">
        {loading ? 'Đang tải thêm...' : nextPage ? 'Kéo xuống để tải thêm' : 'Bạn đã xem hết bài viết'}
      </div>
    </div>
  );
}
