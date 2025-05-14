// Expressというライブラリを使うために読み込む
const express = require("express");
// HTTPサーバーを作るために読み込む
const http = require("http");
// Socket.IOというリアルタイム通信をするためのライブラリを読み込む
const socketIo = require("socket.io");

// Expressのアプリケーションを作成
const app = express();
// HTTPサーバーを作成し、Expressアプリケーションを使うように設定
const server = http.createServer(app);
// Socket.IOをHTTPサーバーに連携させる
const io = socketIo(server);

// サーバーが動くポート番号を設定。
const PORT = 3000;

// /publicフォルダの中にあるファイルをウェブページとして提供するように設定
app.use(express.static(__dirname + "/public"));

// クライアントが接続してきたときの処理
// ioが「チャットサーバー全体」を動かす係
// socketはチャットに今つながってきた人1人のこと
io.on("connection", (socket) => {
  console.log("A user connected");
  // ユーザーが接続したことをコンソールに表示
  // 本来は接続したユーザーの情報（ユーザー名やIDなど）を保存したり
  // 過去のチャット履歴を送るケースなどが多い

  // クライアントからチャットメッセージを受け取ったときの処理
  socket.on("chat message", (msg) => {
    // 受け取ったメッセージを全てのクライアントに送信する
    io.emit("chat message", msg);
  });
  socket.on("chat message2", (msg2) => {
    // 受け取ったメッセージを全てのクライアントに送信する
    io.emit("chat message2", msg2);
  });

  // クライアントが切断したときの処理
  socket.on("disconnect", () => {
    console.log("User disconnected");
    // ユーザーが切断したことをコンソールに表示
  });
});

// サーバーを指定したポート番号で動かす
server.listen(PORT, () => {
  console.log(`API running at http://localhost:${PORT}`);
});