// サーバーとのリアルタイム通信を開始
const socket = io();

// HTML内のフォーム、入力欄、メッセージリストの要素を取得
const form = document.getElementById("form");
const input = document.getElementById("input");
const messages = document.getElementById("messages");
const form2 = document.getElementById("form2");
const input2 = document.getElementById("input2");
const messages2 = document.getElementById("messages2");

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

form2.addEventListener("submit", (e) => {
  e.preventDefault(); // フォームが通常の方法で送信されるのを防ぐ
  if (input2.value) { // 入力欄にメッセージがあるかチェック
    socket.emit("chat message2", input2.value); // メッセージをサーバーに送信
    input2.value = ""; // 入力欄を空にする
  }
});

// サーバーから「chat message」イベントを受け取ったときの処理
socket.on("chat message2", (msg2) => {
  const item = document.createElement("li"); // 新しいリスト項目を作成
  item.textContent = msg2; // 受け取ったメッセージをリスト項目に設定
  messages2.appendChild(item); // リスト項目をメッセージリストに追加
  messages2.scrollTop = messages2.scrollHeight; // ページを一番下までスクロール
});