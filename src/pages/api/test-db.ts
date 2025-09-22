// src/pages/api/test-db.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../lib/prisma'; // さっき作った専用受付をインポート

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // データベースに接続して、全てのブログ投稿を取得してみる
    const posts = await prisma.post.findMany();

    // 成功したら、取得したデータをJSON形式で返す
    res.status(200).json({
      status: 'success',
      message: 'データベースとの接続に成功しました！',
      data: posts,
    });
  } catch (error) {
    // もしエラーが起きたら、コンソールにエラー内容を表示
    console.error('データベース接続エラー:', error);

    // エラーが起きたことを知らせる
    res.status(500).json({
      status: 'error',
      message: 'データベースに接続できませんでした。',
    });
  }
}