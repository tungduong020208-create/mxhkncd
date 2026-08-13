import { useEffect, useState } from 'react';
import Post from '../components/Post';

export default function Saved() {
  const [savedPosts, setSavedPosts] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('mxhkncd_saved_posts') || '[]');
    setSavedPosts(stored);
  }, []);

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-semibold text-slate-900">Đã lưu</h1>
        <p className="mt-2 text-sm text-slate-500">Các bài viết bạn đã lưu để xem lại sau.</p>
      </div>

      {savedPosts.length === 0 ? (
        <div className="rounded-3xl border border-slate-200 bg-white p-6 text-center shadow-sm">
          <p className="text-base font-semibold text-slate-900">Bạn chưa lưu bài viết nào.</p>
          <p className="mt-2 text-sm text-slate-500">Lưu bài viết để dễ dàng truy cập lại sau.</p>
        </div>
      ) : (
        <div className="grid gap-6">
          {savedPosts.map((post) => (
            <Post
              key={post.id}
              {...post}
              onLike={() => null}
              onShare={() => null}
            />
          ))}
        </div>
      )}
    </div>
  );
}
