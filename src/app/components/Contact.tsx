export default function Contact() {
  return (
          <section className="py-20 px-8 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Contact</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            ご興味を持っていただけましたら、こちらのフォームよりお気軽にご連絡ください。
          </p>
          <form className="space-y-6">
            <div>
              <input 
                type="text" 
                placeholder="お名前" 
                className="w-full p-3 rounded-md bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div>
              <input 
                type="email" 
                placeholder="メールアドレス" 
                className="w-full p-3 rounded-md bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div>
              <textarea 
                placeholder="メッセージ" 
                rows={5}
                className="w-full p-3 rounded-md bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
              ></textarea>
            </div>
            <button 
              type="submit"
              className="w-full py-3 px-6 bg-purple-600 text-white font-semibold rounded-md hover:bg-purple-700 transition-colors"
            >
              送信
            </button>
          </form>
        </div>
      </section>
  );
}