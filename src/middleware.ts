import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // 管理者向けルート（/admin/ または /api/admin/）に対してのみ認証を適用
  if (pathname.startsWith('/admin') || pathname.startsWith('/api/admin')) {
    // Authorization ヘッダーの取得
    const authorizationHeader = request.headers.get('authorization');

    // ヘッダーが存在しない場合は認証要求を返却
    if (!authorizationHeader) {
      return new NextResponse('Authentication required', {
        status: 401,
        headers: {
          'WWW-Authenticate': 'Basic realm="Admin Area"',
        },
      });
    }

    // Basic認証のヘッダー形式をチェック
    if (!authorizationHeader.startsWith('Basic ')) {
      return new NextResponse('Invalid authentication method', {
        status: 401,
        headers: {
          'WWW-Authenticate': 'Basic realm="Admin Area"',
        },
      });
    }

    try {
      // Basic認証の認証情報をデコード
      const base64Credentials = authorizationHeader.substring(6); // 'Basic ' を除去
      const credentials = atob(base64Credentials);
      const [username, password] = credentials.split(':');

      // 環境変数から管理者認証情報を取得
      const adminUsername = process.env.ADMIN_USERNAME;
      const adminPassword = process.env.ADMIN_PASSWORD;

      // 環境変数が設定されていない場合はエラー
      if (!adminUsername || !adminPassword) {
        console.error('ADMIN_USERNAME or ADMIN_PASSWORD environment variables are not set');
        return new NextResponse('Server configuration error', {
          status: 500,
        });
      }

      // 認証情報の検証
      if (username !== adminUsername || password !== adminPassword) {
        return new NextResponse('Invalid credentials', {
          status: 401,
          headers: {
            'WWW-Authenticate': 'Basic realm="Admin Area"',
          },
        });
      }

    } catch {
      // Base64デコードエラーや不正な認証情報形式の場合
      return new NextResponse('Invalid authentication format', {
        status: 401,
        headers: {
          'WWW-Authenticate': 'Basic realm="Admin Area"',
        },
      });
    }
  }

  // 認証成功時または対象外パスの場合は通常の処理を続行
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
};