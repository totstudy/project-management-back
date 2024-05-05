# Node.js ベースの Docker イメージを使用する
FROM node:20

# アプリケーションをコンテナ内の /app ディレクトリにコピーする
COPY . /apps/back

# コンテナ内で作業ディレクトリを設定する
WORKDIR /apps/back

# 依存関係をインストールする
RUN npm install

# アプリケーションの起動コマンドを定義する
CMD ["npm", "start"]
