# minecraft-keeper

Minecraft アカウントを一定時間サーバーへ接続し続けるためのシンプルなクライアントです。  
`minecraft-protocol` を利用して Microsoft 認証でログインします。

## 要件

- Node.js `>=22`
- npm

## セットアップ

```bash
npm install
```

## 環境変数

`.env.template` をコピーして `.env` を作成し、値を設定してください。

```bash
cp .env.template .env
```

`.env` の項目:

- `MC_HOST`: 接続先ホスト（例: `example.com`）
- `MC_PORT`: 接続先ポート（例: `25565`）
- `MC_USERNAME`: Microsoft アカウントのユーザー名
- `TIMEOUT`: 自動切断までの時間（単位: 時間）

未設定時のデフォルト値:

- `MC_HOST`: `127.0.0.1`
- `MC_PORT`: `25565`
- `MC_USERNAME`: `Player`
- `TIMEOUT`: `1`

## 実行

```bash
npm start
```

接続後にチャット通知を送信し、`TIMEOUT` 経過後に自動切断します。

## Lint

```bash
npm run lint
npm run lint:fix
```

## ログ

- 開発時（`NODE_ENV` 未設定または `production` 以外）: コンソール出力
- 本番時（`NODE_ENV=production`）: コンソール + `logs/` 配下へ日次ローテーション保存

## ライセンス

`GPL-3.0-only`（詳細は `LICENCE` を参照）
