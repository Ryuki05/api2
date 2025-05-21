// 必要なもの（部品）を読み込む
const express = require('express');       // サーバーを作るための道具
const path = require('path');             // ファイルの場所を調べるための道具

// サーバーを使えるようにする
const app = express();
// ポート番号を決める
const PORT = 3000;

// 「public」フォルダの中身をインターネットに見せてOKにする
app.use(express.static(path.join(__dirname, 'public')));

// カードを引くときに使う特別なルール（API）
// ブラウザから「/api/draw」にアクセスされたときに実行される
app.get('/api/draw', async (req, res) => {
  try {
    // 新しいトランプの山（シャッフル済み）を作る
    const deckRes = await fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1');
    const deckData = await deckRes.json();    // 結果をjson形式に変える
    const deckId = deckData.deck_id;          // トランプの山のIDをメモしておく

    // 山の中から2枚のカードを引く
    const drawRes = await fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=10`);
    const drawData = await drawRes.json();    // 結果をjson形式にする
    console.log(drawData)
    const [playerCard,playerCard2,playerCard3,playerCard4,playerCard5, computerCard,computerCard2,computerCard3,computerCard4,computerCard5] = drawData.cards; // プレイヤーとコンピューターのカードを取り出す


    // 絵札（J・Q・K・A）を数字に変えるための関数
    const getCardValue = (value) => {
      if (['KING'].includes(value)) return 13;
      if (['QUEEN'].includes(value)) return 12;
      if (['JACK'].includes(value)) return 11;
      if (value === 'ACE') return 1;
      return parseInt(value);
    };

    // それぞれのカードの強さを数値にする
    const playerValue = getCardValue(playerCard.value );
    const playerValue2 = getCardValue(playerCard2.value);
    const playerValue3 = getCardValue(playerCard3.value);
    const playerValue4 = getCardValue(playerCard4.value);
    const playerValue5 = getCardValue(playerCard5.value);
    const computerValue = getCardValue(computerCard.value);
    const computerValue2 = getCardValue(computerCard2.value);
    const computerValue3 = getCardValue(computerCard3.value);
    const computerValue4 = getCardValue(computerCard4.value);
    const computerValue5 = getCardValue(computerCard5.value);


    // 勝ち負けの結果を決める
    let result;
    if (plscore > coscore) {
      result = 'あなたの勝ちです！';
    } else if (plscore < coscore) {
      result = 'コンピューターの勝ちです。' ;
    } else {
      result = '引き分けです。';
    }


    // 結果（カードと勝敗）をブラウザに返す
    res.json({
      playerCard,
      playerCard2,
      playerCard3,
      playerCard4,
      playerCard5,
      computerCard,
      computerCard2,
      computerCard2,
      computerCard2,
      computerCard2,
      result
    });

  } catch (error) {
    // もし何か失敗したら、エラーを表示して「失敗した」とブラウザに伝える
    console.error('エラーが発生しました:', error);
    res.status(500).json({ error: '内部サーバーエラー' });
  }
});

// サーバーをスタートして、「このページを開いてね」と案内を表示
app.listen(PORT, () => {
  console.log(`↓ こちらをクリックしてゲームを開いてください`);
  console.log(`http://localhost:${PORT}`);
});