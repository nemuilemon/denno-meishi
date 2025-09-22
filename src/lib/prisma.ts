// src/lib/prisma.ts

import { PrismaClient } from '../generated/prisma';

// PrismaClientのインスタンスを生成
const prisma = new PrismaClient();

// 生成したインスタンスをデフォルトエクスポート
export default prisma;