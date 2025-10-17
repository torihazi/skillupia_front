# Skillupia Frontend

## 概要

Skillupia Frontendは、学習履歴管理システムのフロントエンドアプリケーションです。Next.js 14のApp Routerを使用して構築され、モダンなUI/UXで学習記録の管理と可視化を提供します。

## 技術スタック

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **HTTP Client**: Axios
- **Authentication**: AWS Cognito (Amplify)
- **Package Manager**: pnpm
- **Deployment**: Vercel

## 主要機能

### ダッシュボード
- 学習進捗の可視化
- 学習時間の統計表示
- 継続日数の表示
- 獲得バッジの一覧

### 学習記録管理
- 学習記録の作成・編集・削除
- タグ付け機能
- 学習時間の記録
- 検索・フィルタリング

### プロフィール
- ユーザー情報の管理
- 学習統計の表示
- バッジコレクション

### AI連携機能
- 学習記録からの自動タグ生成
- 学習内容の振り返り表示
- 日報の作成支援

## 環境構築

### 前提条件

- Node.js 18.17+
- pnpm
- AWS Cognito設定済み

### セットアップ手順

1. **依存関係のインストール**
   ```bash
   pnpm install
   ```

2. **環境変数の設定**
   ```bash
   cp .env.example .env.local
   # .env.localファイルを編集して必要な環境変数を設定
   ```

3. **開発サーバーの起動**
   ```bash
   pnpm dev
   ```

4. **ブラウザでアクセス**
   ```
   http://localhost:3000
   ```

### 必要な環境変数

```env
# API Base URL
NEXT_PUBLIC_API_BASE_URL=http://localhost:3001

# AWS Cognito
NEXT_PUBLIC_AWS_REGION=ap-northeast-1
NEXT_PUBLIC_USER_POOL_ID=your_user_pool_id
NEXT_PUBLIC_USER_POOL_WEB_CLIENT_ID=your_client_id

# App URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## プロジェクト構成

```
skillupia_front/
├── src/
│   ├── app/              # App Router pages
│   │   ├── (auth)/      # 認証関連ページ
│   │   ├── dashboard/   # ダッシュボード
│   │   ├── study-records/ # 学習記録管理
│   │   ├── profile/     # プロフィール
│   │   └── layout.tsx   # ルートレイアウト
│   ├── components/      # 再利用可能なコンポーネント
│   │   ├── ui/         # 基本UIコンポーネント
│   │   ├── forms/      # フォームコンポーネント
│   │   └── charts/     # チャートコンポーネント
│   ├── lib/            # ユーティリティ・設定
│   │   ├── api/        # API呼び出し
│   │   ├── auth/       # 認証関連
│   │   └── utils/      # ヘルパー関数
│   ├── store/          # Zustand state管理
│   └── types/          # TypeScript型定義
├── public/             # 静的ファイル
└── styles/             # グローバルスタイル
```

## 開発

### コマンド

```bash
# 開発サーバー起動
pnpm dev

# 本番ビルド
pnpm build

# 本番サーバー起動
pnpm start

# 型チェック
pnpm type-check

# ESLint実行
pnpm lint

# ESLint自動修正
pnpm lint:fix

# テスト実行
pnpm test

# テストウォッチ
pnpm test:watch
```

### コード品質

- **ESLint**: コード品質チェック
- **Prettier**: コードフォーマット
- **TypeScript**: 型安全性
- **Husky**: Git hooks
- **lint-staged**: ステージング時のlint実行

## UI/UX設計

### デザインシステム

- **カラーパレット**: 学習・成長をイメージしたブルー・グリーン系
- **タイポグラフィ**: 読みやすいフォントサイズ・行間
- **レスポンシブ**: モバイルファーストデザイン
- **アクセシビリティ**: WCAG 2.1準拠

### 主要コンポーネント

- **Navigation**: サイドバーナビゲーション
- **Dashboard**: 進捗チャート・統計表示
- **StudyRecordForm**: 学習記録入力フォーム
- **BadgeList**: バッジ一覧表示
- **TagInput**: タグ入力コンポーネント

## デプロイ

### Vercel デプロイ

1. **Vercel CLI インストール**
   ```bash
   pnpm add -g vercel
   ```

2. **プロジェクト接続**
   ```bash
   vercel
   ```

3. **環境変数設定**
   - Vercelダッシュボードで環境変数を設定

4. **自動デプロイ**
   - mainブランチへのプッシュで自動デプロイ

### ビルド最適化

- **Image Optimization**: Next.js Image最適化
- **Code Splitting**: 自動コード分割
- **Bundle Analysis**: `@next/bundle-analyzer`でバンドルサイズ監視

## 関連リポジトリ

- [skillupia_api](../skillupia_api/) - Rails API バックエンド
- [skillupia_docs](../skillupia_docs/) - プロジェクトドキュメント
