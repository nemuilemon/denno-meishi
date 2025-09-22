import { NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';

export async function GET() {
  try {
    const posts = await prisma.post.findMany();

    return NextResponse.json({
      status: 'success',
      message: 'データベースとの接続に成功しました！',
      data: posts,
    });
  } catch (error) {
    console.error('データベース接続エラー:', error);

    return NextResponse.json(
      {
        status: 'error',
        message: 'データベースに接続できませんでした。',
      },
      { status: 500 }
    );
  }
}