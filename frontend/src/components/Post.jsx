import { useEffect, useMemo, useState } from 'react';

export default function Post({
  id,
  user,
  time,
  content,
  likes,
  comments,
  shares,
  type,
  progress,
  commentsData = [],
  onLike,
  onShare,
}) {
  const [saved, setSaved] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [commentList, setCommentList] = useState([]);
  const [replyTo, setReplyTo] = useState(null);
  const [newComment, setNewComment] = useState('');
  const [shareOpen, setShareOpen] = useState(false);
  const [editingComment, setEditingComment] = useState(null);
  const [editText, setEditText] = useState('');

  const currentUser = useMemo(() => {
    try {
      const stored = JSON.parse(localStorage.getItem('mxhkncd_user') || '{}');
      return stored.name || 'Bạn';
    } catch {
      return 'Bạn';
    }
  }, []);

  useEffect(() => {
    const savedPosts = JSON.parse(localStorage.getItem('mxhkncd_saved_posts') || '[]');
    setSaved(savedPosts.some((post) => post.id === id));
  }, [id]);

  useEffect(() => {
    setCommentList(
      commentsData.length
        ? commentsData
        : [
            {
              id: `${id}-c1`,
              user: 'Nguyễn A',
              text: 'React rất thú vị.',
              replies: [
                { id: `${id}-c1-r1`, user: 'Trần B', text: 'Đúng, mình cũng đang học.' },
              ],
            },
            {
              id: `${id}-c2`,
              user: 'Đỗ C',
              text: 'Phần State hơi khó một chút.',
              replies: [],
            },
          ],
    );
  }, [commentsData, id]);

  const totalComments = commentList.reduce((sum, comment) => sum + 1 + comment.replies.length, 0);

  const savePost = () => {
    const savedPosts = JSON.parse(localStorage.getItem('mxhkncd_saved_posts') || '[]');
    const updated = saved
      ? savedPosts.filter((post) => post.id !== id)
      : [...savedPosts, { id, user, time, content, likes, comments, shares, type, progress }];
    localStorage.setItem('mxhkncd_saved_posts', JSON.stringify(updated));
    setSaved(!saved);
  };

  const addComment = () => {
    if (!newComment.trim()) return;
    if (editingComment) {
      setCommentList((prev) =>
        prev.map((comment) =>
          comment.id === editingComment
            ? { ...comment, text: editText }
            : {
                ...comment,
                replies: comment.replies.map((reply) => (reply.id === editingComment ? { ...reply, text: editText } : reply)),
              },
        ),
      );
      setEditingComment(null);
      setEditText('');
      return;
    }

    if (replyTo) {
      setCommentList((prev) =>
        prev.map((comment) =>
          comment.id === replyTo
            ? {
                ...comment,
                replies: [
                  ...comment.replies,
                  { id: `${comment.id}-r${comment.replies.length + 1}`, user: currentUser, text: newComment },
                ],
              }
            : comment,
        ),
      );
      setReplyTo(null);
      setNewComment('');
      return;
    }

    setCommentList((prev) => [
      ...prev,
      { id: `${id}-c${prev.length + 1}`, user: currentUser, text: newComment, replies: [] },
    ]);
    setNewComment('');
  };

  const deleteComment = (commentId) => {
    setCommentList((prev) => prev.filter((comment) => comment.id !== commentId));
  };

  const editComment = (commentId, text) => {
    setEditingComment(commentId);
    setEditText(text);
    setNewComment(text);
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href + `#post-${id}`);
      setShareOpen(false);
    } catch (error) {
      console.error('Không thể sao chép liên kết', error);
    }
  };

  return (
    <article id={`post-${id}`} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="h-12 w-12 rounded-3xl bg-slate-200" />
        <div>
          <p className="text-sm font-semibold text-slate-900">{user}</p>
          <p className="text-sm text-slate-500">{time}</p>
        </div>
      </div>
      <p className="mt-4 text-slate-700 whitespace-pre-wrap">{content}</p>

      {type === 'progress' && progress != null && (
        <div className="mt-4 rounded-3xl bg-slate-100 p-4">
          <div className="flex items-center justify-between text-sm text-slate-600">
            <span>Progress Status</span>
            <span className="font-semibold text-slate-900">{progress}%</span>
          </div>
          <div className="mt-3 h-2 rounded-full bg-slate-200">
            <div className="h-full rounded-full bg-indigo-600" style={{ width: `${progress}%` }} />
          </div>
        </div>
      )}

      <div className="mt-4 grid gap-3 sm:grid-cols-4">
        <button onClick={onLike} className="rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-100">
          ❤️ Hữu ích
        </button>
        <button onClick={onLike} className="rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-100">
          💡 Ý tưởng hay
        </button>
        <button onClick={onLike} className="rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-100">
          👏 Đóng góp tốt
        </button>
        <button onClick={onLike} className="rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-100">
          🔥 Nội dung nổi bật
        </button>
      </div>

      <div className="mt-4 border-t border-slate-200 pt-4">
        <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500">
          <span>❤️ {likes}</span>
          <span>💬 {totalComments}</span>
          <span>🔄 {shares}</span>
          <span>{saved ? '🔖 Đã lưu' : '🔖 Lưu'}</span>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          <button onClick={() => setShowComments((prev) => !prev)} className="rounded-3xl bg-slate-50 px-4 py-2 text-sm text-slate-700 hover:bg-slate-100">
            Bình luận
          </button>
          <button onClick={() => setShareOpen((prev) => !prev)} className="rounded-3xl bg-slate-50 px-4 py-2 text-sm text-slate-700 hover:bg-slate-100">
            Chia sẻ
          </button>
          <button onClick={savePost} className="rounded-3xl bg-slate-50 px-4 py-2 text-sm text-slate-700 hover:bg-slate-100">
            {saved ? 'Bỏ lưu' : 'Lưu'}
          </button>
        </div>
        {shareOpen ? (
          <div className="mt-3 rounded-3xl border border-slate-200 bg-slate-50 p-4 shadow-sm">
            <p className="text-sm font-semibold text-slate-900">Chia sẻ bài viết</p>
            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              <button className="rounded-3xl bg-white px-4 py-3 text-sm text-slate-700 hover:bg-slate-100">Trang cá nhân</button>
              <button className="rounded-3xl bg-white px-4 py-3 text-sm text-slate-700 hover:bg-slate-100">Cộng đồng</button>
              <button className="rounded-3xl bg-white px-4 py-3 text-sm text-slate-700 hover:bg-slate-100">Tin nhắn</button>
              <button onClick={copyLink} className="rounded-3xl bg-white px-4 py-3 text-sm text-slate-700 hover:bg-slate-100">
                Sao chép liên kết
              </button>
            </div>
          </div>
        ) : null}
      </div>

      {showComments && (
        <div className="mt-5 rounded-3xl border border-slate-200 bg-slate-50 p-4">
          <div className="mb-4 flex items-center justify-between">
            <p className="font-semibold text-slate-900">Bình luận ({totalComments})</p>
          </div>
          <div className="space-y-4">
            {commentList.map((comment) => (
              <div key={comment.id} className="rounded-3xl bg-white p-4 shadow-sm">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-medium text-slate-900">{comment.user}</p>
                    <p className="mt-2 text-slate-600">{comment.text}</p>
                  </div>
                  <div className="flex flex-col items-end gap-2 text-xs text-slate-500">
                    <button onClick={() => editComment(comment.id, comment.text)} className="rounded-full px-3 py-1 hover:bg-slate-100">Sửa</button>
                    <button onClick={() => deleteComment(comment.id)} className="rounded-full px-3 py-1 hover:bg-slate-100">Xóa</button>
                    <button onClick={() => setReplyTo(comment.id)} className="rounded-full px-3 py-1 hover:bg-slate-100">Trả lời</button>
                  </div>
                </div>
                {comment.replies.length > 0 && (
                  <div className="mt-4 space-y-3 pl-6">
                    {comment.replies.map((reply) => (
                      <div key={reply.id} className="rounded-3xl bg-slate-50 p-3">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <p className="font-medium text-slate-900">{reply.user}</p>
                            <p className="mt-2 text-slate-600">{reply.text}</p>
                          </div>
                          <button onClick={() => editComment(reply.id, reply.text)} className="rounded-full px-3 py-1 text-xs text-slate-500 hover:bg-slate-100">
                            Sửa
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="mt-4 rounded-3xl bg-white p-4 shadow-sm">
            <p className="text-sm text-slate-500">
              {replyTo ? `Trả lời bình luận #${replyTo}` : editingComment ? 'Chỉnh sửa bình luận' : 'Thêm bình luận của bạn'}
            </p>
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="mt-3 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none"
              rows={3}
              placeholder="Viết bình luận..."
            />
            <div className="mt-3 flex items-center justify-between gap-3">
              <button onClick={() => { setReplyTo(null); setEditingComment(null); setNewComment(''); }} className="rounded-3xl bg-slate-100 px-4 py-2 text-sm text-slate-700 hover:bg-slate-200">
                Hủy
              </button>
              <button onClick={addComment} className="rounded-3xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700">
                {editingComment ? 'Lưu sửa' : 'Gửi bình luận'}
              </button>
            </div>
          </div>
        </div>
      )}
    </article>
  );
}
