'use client';

import { useState } from 'react';

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export default function ContactForm() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    message: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setIsSuccess(false);

    try {
      const response = await fetch('/api/contacts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'フォームの送信に失敗しました');
      }

      setIsSuccess(true);
      setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      setError(err instanceof Error ? err.message : '予期しないエラーが発生しました');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="contact" className="py-20 px-8 bg-gray-800">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">お問い合わせ</h2>

        <div className="max-w-2xl mx-auto">
          {isSuccess ? (
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-8 text-center">
              <h3 className="text-green-800 dark:text-green-400 font-semibold mb-4 text-xl">ありがとうございます！</h3>
              <p className="text-green-700 dark:text-green-300 mb-6 leading-relaxed">
                メッセージを正常に送信いたしました。<br />
                お返事まで今しばらくお待ちください。
              </p>
              <button
                onClick={() => setIsSuccess(false)}
                className="text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-200 underline transition-colors"
              >
                別のメッセージを送信する
              </button>
            </div>
          ) : (
            <div className="bg-gray-900 p-8 rounded-lg shadow-md">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                    お名前 *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    disabled={isLoading}
                    className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-700 bg-gray-800 text-gray-100 transition-colors"
                    placeholder="山田 太郎"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                    メールアドレス *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    disabled={isLoading}
                    className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-700 bg-gray-800 text-gray-100 transition-colors"
                    placeholder="taro.yamada@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                    メッセージ *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    disabled={isLoading}
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-700 bg-gray-800 text-gray-100 resize-vertical transition-colors"
                    placeholder="お問い合わせ内容をご記入ください..."
                  />
                </div>

                {error && (
                  <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                    <p className="text-red-700 dark:text-red-300 text-sm">{error}</p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-3 px-6 rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 disabled:cursor-not-allowed transition-colors"
                >
                  {isLoading ? '送信中...' : 'メッセージを送信'}
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}