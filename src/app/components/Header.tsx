'use client';

import { useState } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-sm border-b border-gray-800 shadow-sm">
      <div className="max-w-6xl mx-auto px-8 py-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white">
            もうちゃん
          </h1>

          {/* PC表示用のナビゲーション */}
          <nav className="hidden md:block">
            <ul className="flex space-x-8">
              <li>
                <a
                  href="#profile"
                  className="text-gray-300 hover:text-blue-400 transition-colors"
                >
                  私について
                </a>
              </li>
              <li>
                <a
                  href="#showcase"
                  className="text-gray-300 hover:text-blue-400 transition-colors"
                >
                  実績
                </a>
              </li>
              <li>
                <a
                  href="#blog"
                  className="text-gray-300 hover:text-blue-400 transition-colors"
                >
                  ブログ
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="text-gray-300 hover:text-blue-400 transition-colors"
                >
                  お問い合わせ
                </a>
              </li>
            </ul>
          </nav>

          {/* モバイル表示用のハンバーガーボタン */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 text-gray-300 hover:text-blue-400 transition-colors"
            aria-label="メニューを開く"
          >
            {isMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* モバイル表示用のドロップダウンメニュー */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 py-2 border-t border-gray-200 dark:border-gray-700">
            <ul className="flex flex-col space-y-2">
              <li>
                <a
                  href="#profile"
                  onClick={closeMenu}
                  className="block py-2 text-gray-300 hover:text-blue-400 transition-colors"
                >
                  私について
                </a>
              </li>
              <li>
                <a
                  href="#showcase"
                  onClick={closeMenu}
                  className="block py-2 text-gray-300 hover:text-blue-400 transition-colors"
                >
                  実績
                </a>
              </li>
              <li>
                <a
                  href="#blog"
                  onClick={closeMenu}
                  className="block py-2 text-gray-300 hover:text-blue-400 transition-colors"
                >
                  ブログ
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  onClick={closeMenu}
                  className="block py-2 text-gray-300 hover:text-blue-400 transition-colors"
                >
                  お問い合わせ
                </a>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
}