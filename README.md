# Next.js Blog App

Next.js の App Router を理解するために作ったシンプルなブログサービスです。
markdown を用いて記事を投稿し、共有することができます。

https://nextjs-blog-app-gamma-one.vercel.app/

## 技術スタック

このプロジェクトでは以下の技術が使用されています：

- Next.js (14.1.0)
- React (18.x)
- Prisma (5.10.1) - データモデルとデータベースの管理
- Next Auth (5.0.0-beta.11) - 認証
- Tailwind CSS - スタイリング

## プロジェクトのセットアップ

このプロジェクトは Vercel にデプロイすることを想定していますが、現時点ではローカル環境での実行はサポートしていません。
将来的にローカルでのセットアップ手順を提供するかもしれません。

### Vercel でのデプロイ

1. このリポジトリを Fork または Clone します。
2. Vercel にログインし（アカウントがなければ作成）、新しいプロジェクトを作成します。
3. プロジェクトソースとしてこのリポジトリを選択します。
4. 必要に応じて環境変数を設定し、デプロイします。

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fvercel%2Fnext.js%2Ftree%2Fcanary%2Fexamples%2Fhello-world)
