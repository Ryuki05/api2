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
    const  [playerCard,playerCard2,playerCard3,playerCard4,playerCard5, computerCard,computerCard2,computerCard3,computerCard4,computerCard5] = drawData.cards; // プレイヤーとコンピューターのカードを取り出す

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

    //柄
    const playersuite = getCardValue(playerCard.suit );
    const playersuit2 = getCardValue(playerCard2.suit);
    const playersuit3 = getCardValue(playerCard3.suit);
    const playersuit4 = getCardValue(playerCard4.suit);
    const playersuit5 = getCardValue(playerCard5.suit);
    const computersuit = getCardValue(computerCard.status);
    const computersuit2 = getCardValue(computerCard2.suit);
    const computersuit3 = getCardValue(computerCard3.suit);
    const computersuit4 = getCardValue(computerCard4.suit);
    const computersuit5 = getCardValue(computerCard5.suit);
console.log(computersuit);

let plresult;
let coresult;
let result;
if ((playerValue == playerValue2)||(playerValue2 == playerValue3)||(playerValue3 == playerValue4)||(playerValue4 == playerValue5)||(playerValue5 == playerValue)||(playerValue2 == playerValue4)||(playerValue2 == playerValue5)||(playerValue3 == playerValue5)||(playerValue3 == playerValue)||(playerValue4 == playerValue)){
      plresult = 1;
      if ((playerValue == playerValue2 == playerValue3)||
        (playerValue == playerValue2  == playerValue4)||
        (playerValue == playerValue2  == playerValue5)||
        (playerValue2 == playerValue3 == playerValue4)||
        (playerValue2 == playerValue4  == playerValue5)||
        (playerValue2 == playerValue4 == playerValue)||
        (playerValue3 == playerValue4 == playerValue5)||
        (playerValue3 == playerValue4 == playerValue)||
        (playerValue3 == playerValue4 == playerValue2)||
        (playerValue4 == playerValue5 == playerValue)||
        (playerValue4 == playerValue5 == playerValue2)||
        (playerValue4 == playerValue5 == playerValue3))
          {
            plresult = 2;
          }

}
else{
  plresult = 0;
}
if ((computerValue == computerValue2)||(computerValue2 == computerValue3)||(computerValue3 == computerValue4)||(computerValue4 == computerValue5)||(computerValue5 == computerValue)||(computerValue2 == computerValue4)||(computerValue2 == computerValue5)||(computerValue3 == computerValue5)||(computerValue3 == computerValue)||(computerValue4 == computerValue))
    {
      coresult = 1;
      if ((computerValue == computerValue2 == computerValue3)||
      (computerValue == computerValue2  == computerValue4)||
      (computerValue == computerValue2  == computerValue5)||
      (computerValue2 == computerValue3 == computerValue4)||
      (computerValue2 == computerValue4  == computerValue5)||
      (computerValue2 == computerValue4 == computerValue)||
      (computerValue3 == computerValue4 == computerValue5)||
      (computerValue3 == computerValue4 == computerValue)||
      (computerValue3 == computerValue4 == computerValue2)||
      (computerValue4 == computerValue5 == computerValue)||
      (computerValue4 == computerValue5 == computerValue2)||
      (computerValue4 == computerValue5 == computerValue3))
        {
          coresult = 2;
        }
}

else{
  coresult = 0;
}
//2
// else if ((playerValue == playerValue2)||
//     (playerValue2 == playerValue3)||
//     (playerValue3 == playerValue4)||
//     (playerValue4 == playerValue5)||
//     (playerValue5 == playerValue)||
//     (playerValue2 == playerValue4)||
//     (playerValue2 == playerValue5)||
//     (playerValue3 == playerValue5)||
//     (playerValue3 == playerValue)||
//     (playerValue4 == playerValue))
//     {
//       plresult = 2;
// }else{
//   plresult = 0;
// }
// if ((computerValue == computerValue2)||
//     (computerValue2 == computerValue3)||
//     (computerValue3 == computerValue4)||
//     (computerValue4 == computerValue5)||
//     (computerValue5 == computerValue)||
//     (computerValue2 == computerValue4)||
//     (computerValue2 == computerValue5)||
//     (computerValue3 == computerValue5)||
//     (computerValue3 == computerValue)||
//     (computerValue4 == computerValue))
//     {
//       coresult = 2;
// }else{
//   coresult = 0;
// }

//fl
// if(playersuite==playersuit2==playersuit3==playersuit4==playersuit5){
//   plresult = 3;
// }else{
//   plresult = 0;
// }

// if(computerCard==computersuit2==computersuit3==computersuit4==computersuit5){
//   coresult = 3;
// }else{
//   coresult = 0;
// }

console.log(plresult);
console.log(coresult);

    // 勝ち負けの結果を決める
    
    if (plresult > coresult) {
      if(plresult==1){
        result = 'ワンペアであなたの勝ちです！';
      }else if(plresult ==2){
        result = 'ツーであなたの勝ちです！';
      }
    } else if (plresult < coresult) {
      if(coresult == 1){
      result = 'ワンペアでコンピューターの勝ちです。' ;
      }else if(coresult == 2){
        result = 'ツーでコンピューターの勝ちです。' ;
      }
    } else {
      result = '役なし';
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
      computerCard3,
      computerCard4,
      computerCard5,
      playersuite,
      playersuit2,
      playersuit3,
      playersuit4,
      playersuit5,
      computersuit,
      computersuit2,
      computersuit3,
      computersuit4,
      computersuit5,
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