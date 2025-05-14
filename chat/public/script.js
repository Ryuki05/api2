// サーバーとのリアルタイム通信を開始
const socket = io();

// HTML内のフォーム、入力欄、メッセージリストの要素を取得
const form = document.getElementById("form");
const input = document.getElementById("input");
const messages = document.getElementById("messages");

// フォームが送信されたときの処理を設定
form.addEventListener("submit", (e) => {
  e.preventDefault(); // フォームが通常の方法で送信されるのを防ぐ
  if (input.value) { // 入力欄にメッセージがあるかチェック
    socket.emit("chat message", input.value); // メッセージをサーバーに送信
    input.value = ""; // 入力欄を空にする
  }
});

// サーバーから「chat message」イベントを受け取ったときの処理
socket.on("chat message", (msg) => {
  const item = document.createElement("li"); // 新しいリスト項目を作成
  item.textContent = msg; // 受け取ったメッセージをリスト項目に設定
  messages.appendChild(item); // リスト項目をメッセージリストに追加
  messages.scrollTop = messages.scrollHeight; // ページを一番下までスクロール
});