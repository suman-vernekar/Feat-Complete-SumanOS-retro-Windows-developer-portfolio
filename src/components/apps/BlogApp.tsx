import React, { useState } from 'react';
import { BLOG_POSTS } from '../../data/portfolioData';
import type { BlogPost } from '../../data/portfolioData';
import { BookOpen, Calendar, Clock } from 'lucide-react';
import { sound } from '../../utils/audio';

export const BlogApp: React.FC = () => {
  const [selectedPost, setSelectedPost] = useState<BlogPost>(BLOG_POSTS[0]);

  return (
    <div className="flex flex-col md:flex-row h-full font-sans text-xs select-text bg-white dark:bg-[#1e1e1e] text-black dark:text-white">
      <div className="w-full md:w-64 win-inset bg-gray-100 dark:bg-[#181818] p-3 border-r overflow-y-auto space-y-3">
        <div className="font-bold text-sm text-gray-800 dark:text-gray-200 flex items-center gap-2 border-b pb-2">
          <BookOpen className="w-4 h-4 text-blue-600" /> Articles & Insights
        </div>
        <div className="space-y-2">
          {BLOG_POSTS.map((post) => (
            <div
              key={post.id}
              onClick={() => { sound.playClick(); setSelectedPost(post); }}
              className={`p-2.5 rounded cursor-pointer transition-all border ${
                selectedPost.id === post.id ? 'bg-blue-600 text-white border-blue-700 shadow font-bold' : 'bg-white dark:bg-[#252525] hover:border-blue-400'
              }`}
            >
              <div className="text-xs line-clamp-2">{post.title}</div>
              <div className="text-[10px] opacity-80 mt-1 font-mono">{post.date} • {post.readTime}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1 p-4 md:p-6 overflow-y-auto space-y-4">
        <div className="border-b pb-3 space-y-2">
          <h1 className="text-lg md:text-xl font-bold text-blue-900 dark:text-blue-400 leading-snug">
            {selectedPost.title}
          </h1>
          <div className="flex items-center gap-4 text-xs text-gray-500 font-mono">
            <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {selectedPost.date}</span>
            <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {selectedPost.readTime}</span>
          </div>
          <div className="flex gap-1 flex-wrap pt-1">
            {selectedPost.tags.map(t => (
              <span key={t} className="px-2 py-0.5 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 font-mono text-[10px] rounded">
                #{t}
              </span>
            ))}
          </div>
        </div>

        <div className="win-inset p-4 bg-gray-50 dark:bg-[#252525] font-serif text-sm leading-relaxed space-y-3">
          <p className="font-sans font-semibold text-xs text-gray-700 dark:text-gray-300 border-l-4 border-blue-600 pl-3">
            {selectedPost.summary}
          </p>
          <div className="pt-2 text-xs md:text-sm font-sans space-y-2">
            <p>{selectedPost.content}</p>
            <p>Full technical breakdown covers REST API architecture, pipeline optimization, and code snippets in the project repository.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
