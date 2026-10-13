import React, { useState } from 'react';
import { initialBlogPosts, BlogPost } from '../data/blog';
import { Search, Calendar, Clock, ArrowLeft, Plus, Trash2, Send } from 'lucide-react';
import { siteConfig } from '../data/siteConfig';
import { Modal } from './Modal';

interface BlogViewProps {
  onBackToHome: () => void;
}

export const BlogView: React.FC<BlogViewProps> = ({ onBackToHome }) => {
  const [posts, setPosts] = useState<BlogPost[]>(() => {
    try {
      const saved = localStorage.getItem('danya_blog_posts');
      return saved ? JSON.parse(saved) : initialBlogPosts;
    } catch {
      return initialBlogPosts;
    }
  });

  const [selectedCategory, setSelectedCategory] = useState<string>('Все');
  const [searchQuery, setSearchQuery] = useState('');
  const [activePost, setActivePost] = useState<BlogPost | null>(null);
  const [showAdminModal, setShowAdminModal] = useState(false);

  // New post form state for admin preview
  const [newTitle, setNewTitle] = useState('');
  const [newExcerpt, setNewExcerpt] = useState('');
  const [newCategory, setNewCategory] = useState<"Telegram" | "Директ" | "Воронки" | "Аналитика">('Telegram');
  const [newContent, setNewContent] = useState('');

  const categories = ['Все', 'Telegram', 'Директ', 'Воронки', 'Аналитика'];

  const filteredPosts = posts.filter((p) => {
    const matchesCategory =
      selectedCategory === 'Все' || p.category === selectedCategory;
    const matchesQuery =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;

    const created: BlogPost = {
      id: `post-${Date.now()}`,
      slug: newTitle.toLowerCase().replace(/[^a-z0-9а-яё]+/gi, '-'),
      title: newTitle,
      excerpt: newExcerpt || newContent.slice(0, 140) + '...',
      content: newContent,
      category: newCategory,
      date: 'Сегодня',
      readTime: '3 мин',
    };

    const updated = [created, ...posts];
    setPosts(updated);
    try {
      localStorage.setItem('danya_blog_posts', JSON.stringify(updated));
    } catch {
      // ignore
    }

    setNewTitle('');
    setNewExcerpt('');
    setNewContent('');
    setShowAdminModal(false);
  };

  const handleDeletePost = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('Удалить эту заметку?')) {
      const updated = posts.filter((p) => p.id !== id);
      setPosts(updated);
      try {
        localStorage.setItem('danya_blog_posts', JSON.stringify(updated));
      } catch {
        // ignore
      }
    }
  };

  return (
    <div className="pt-28 pb-20 max-w-5xl mx-auto px-4 sm:px-6">
      
      {/* Top Bar with back link & November banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-ink/15">
        <button
          onClick={onBackToHome}
          className="inline-flex items-center gap-2 text-xs font-bold text-ink hover:text-ink-light px-3 py-2 rounded-xl border border-ink/20 hover:border-ink bg-white shadow-sm transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>← На главную к услугам</span>
        </button>

        {/* November status badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-risograph-yellow/20 border border-risograph-yellow text-xs font-semibold text-ink">
          <span>📅 Раздел блога: плановый релиз в ноябре 2026</span>
        </div>

        {/* Admin quick add toggle */}
        <button
          onClick={() => setShowAdminModal(true)}
          className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-2 rounded-xl bg-ink text-white shadow-crisp hover:bg-ink-light"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Добавить пост (Админка)</span>
        </button>
      </div>

      {/* Header */}
      <div className="max-w-2xl mb-10">
        <h1 className="font-display text-4xl sm:text-5xl font-bold uppercase tracking-tight text-ink mb-3">
          Блог «Резонёр»: заметки про трафик
        </h1>
        <p className="text-base text-ink-muted leading-relaxed">
          Короткие посты, разборы креативов, законы рынка и закулисье перформанс-маркетинга. Без призывов «купи» — только чистый опыт.
        </p>
      </div>

      {/* Search & Category Filter Controls */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center mb-10">
        
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-muted" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Поиск по статьям и кейсам..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border-2 border-ink/20 focus:border-ink focus:outline-none text-xs sm:text-sm bg-white"
          />
        </div>

        {/* Categories Pills */}
        <div className="flex flex-wrap items-center gap-1.5">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`text-xs font-bold px-3 py-1.5 rounded-lg border transition-all ${
                selectedCategory === cat
                  ? 'bg-ink text-white border-ink shadow-sm'
                  : 'bg-white text-ink-muted border-ink/15 hover:border-ink hover:text-ink'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

      </div>

      {/* Post Grid */}
      {filteredPosts.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-3xl border-2 border-ink p-8">
          <p className="text-sm font-semibold text-ink-muted">
            По вашему запросу ничего не найдено.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredPosts.map((post) => (
            <article
              key={post.id}
              onClick={() => setActivePost(post)}
              className="group bg-white border-2 border-ink rounded-3xl p-6 sm:p-7 flex flex-col justify-between shadow-pop hover:shadow-pop-hover hover:translate-y-[-2px] transition-all cursor-pointer relative"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-canvas border border-ink/15 text-ink">
                    {post.category}
                  </span>
                  <div className="flex items-center gap-2 text-xs text-ink-muted">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {post.readTime}
                    </span>
                    <button
                      onClick={(e) => handleDeletePost(post.id, e)}
                      className="p-1 hover:text-red-600 transition-colors"
                      title="Удалить пост"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <h2 className="font-display text-xl sm:text-2xl font-bold uppercase tracking-tight text-ink mb-3 group-hover:text-risograph-pink transition-colors leading-snug">
                  {post.title}
                </h2>

                <p className="text-xs sm:text-sm text-ink-light leading-relaxed mb-6">
                  {post.excerpt}
                </p>
              </div>

              <div className="pt-4 border-t border-ink/10 flex items-center justify-between text-xs text-ink-muted mt-auto">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  {post.date}
                </span>
                <span className="font-bold text-ink group-hover:underline">
                  Читать дальше →
                </span>
              </div>
            </article>
          ))}
        </div>
      )}

      {/* Article Reader Modal */}
      <Modal
        isOpen={!!activePost}
        onClose={() => setActivePost(null)}
        maxWidth="max-w-3xl"
      >
        {activePost && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded bg-canvas border border-ink/15">
                {activePost.category}
              </span>
              <span className="text-xs text-ink-muted">
                {activePost.date} • {activePost.readTime}
              </span>
            </div>

            <h2 className="font-display text-2xl sm:text-3xl font-bold uppercase tracking-tight text-ink mb-6 leading-tight">
              {activePost.title}
            </h2>

            <div className="text-sm text-ink-light leading-relaxed space-y-4 whitespace-pre-line pb-8 border-b border-ink/15">
              {activePost.content}
            </div>

            <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-xs text-ink-muted">
                Оригинал опубликован в канале «Резонёр»
              </span>
              <a
                href={siteConfig.telegramChannelUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 bg-ink text-white px-5 py-2.5 rounded-xl text-xs font-bold shadow-crisp hover:bg-ink-light transition-all"
              >
                <Send className="w-3.5 h-3.5 text-risograph-cyan" />
                <span>Обсудить в комментариях канала</span>
              </a>
            </div>
          </div>
        )}
      </Modal>

      {/* Minimal Admin Add Post Modal */}
      <Modal
        isOpen={showAdminModal}
        onClose={() => setShowAdminModal(false)}
        maxWidth="max-w-xl"
      >
        <h3 className="font-display text-2xl font-bold uppercase text-ink mb-1">
          Админка блога: новый пост
        </h3>
        <p className="text-xs text-ink-muted mb-6">
          Минимальный интерфейс добавления постов под ноябрьский запуск блога.
        </p>

        <form onSubmit={handleCreatePost} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-ink mb-1">
              Заголовок статьи
            </label>
            <input
              type="text"
              required
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="Например, Опыт запуска посевов в MAX..."
              className="w-full px-4 py-2.5 rounded-xl border-2 border-ink/20 text-xs sm:text-sm bg-canvas"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-ink mb-1">
              Тематическая рубрика
            </label>
            <select
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value as any)}
              className="w-full px-4 py-2.5 rounded-xl border-2 border-ink/20 text-xs sm:text-sm bg-canvas"
            >
              <option value="Telegram">Telegram</option>
              <option value="Директ">Директ</option>
              <option value="Воронки">Воронки</option>
              <option value="Аналитика">Аналитика</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-ink mb-1">
              Короткий анонс (excerpt)
            </label>
            <input
              type="text"
              value={newExcerpt}
              onChange={(e) => setNewExcerpt(e.target.value)}
              placeholder="Краткое содержание в 1–2 предложениях"
              className="w-full px-4 py-2.5 rounded-xl border-2 border-ink/20 text-xs sm:text-sm bg-canvas"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-ink mb-1">
              Текст публикации (Markdown / plain text)
            </label>
            <textarea
              required
              rows={6}
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
              placeholder="Вставьте текст заметки из Резонёра..."
              className="w-full px-4 py-2.5 rounded-xl border-2 border-ink/20 text-xs sm:text-sm bg-canvas font-mono"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3.5 px-4 rounded-xl bg-ink text-white font-bold text-xs uppercase tracking-wider shadow-crisp hover:bg-ink-light transition-all"
          >
            Сохранить и опубликовать
          </button>
        </form>
      </Modal>

    </div>
  );
};
