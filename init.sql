-- init.sql

-- ブログ記事を保存するテーブル
CREATE TABLE posts (
    id SERIAL PRIMARY KEY,                          -- 記事のユニークなID (自動で増える)
    title TEXT NOT NULL,                            -- 記事のタイトル
    content TEXT NOT NULL,                          -- 記事の本文
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP -- 作成日時 (自動で記録される)
);

-- 問い合わせフォームの内容を保存するテーブル
CREATE TABLE contacts (
    id SERIAL PRIMARY KEY,                          -- 問い合わせのユニークなID (自動で増える)
    name VARCHAR(255) NOT NULL,                     -- 送信者の名前
    email VARCHAR(255) NOT NULL,                    -- 送信者のメールアドレス
    message TEXT NOT NULL,                          -- 問い合わせ内容
    received_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP -- 受信日時 (自動で記録される)
);

-- ブログ記事のテストデータを追加
INSERT INTO posts (title, content) VALUES ('最初の投稿', 'これはテスト投稿です。');

-- 問い合わせフォームのテストデータを追加
INSERT INTO contacts (name, email, message) VALUES 
('山田 太郎', 'taro.yamada@example.com', 'ポートフォリオサイト拝見しました。一度お話をお伺いしたいです。'),
('佐藤 花子', 'hanako.sato@example.com', '素晴らしい経歴ですね！応援しています。'),
('鈴木 一郎', 'ichiro.suzuki@example.com', 'Webサイト制作の件でご相談があります。');