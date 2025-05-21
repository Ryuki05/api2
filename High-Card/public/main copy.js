document.getElementById("drawButton").addEventListener("click", async () => {
    const response = await fetch("/api/draw");
    const data = await response.json();
  
    document.getElementById("playerCard").src = data.playerCard.image;
    document.getElementById("playerCard2").src = data.playerCard2.image;
    document.getElementById("playerCard3").src = data.playerCard3.image;
    document.getElementById("playerCard4").src = data.playerCard4.image;
    document.getElementById("playerCard5").src = data.playerCard5.image;
    document.getElementById("computerCard").src = data.computerCard.image;
    document.getElementById("computerCard2").src = data.computerCard2.image;
    document.getElementById("computerCard3").src = data.computerCard3.image;
    document.getElementById("computerCard4").src = data.computerCard4.image;
    document.getElementById("computerCard5").src = data.computerCard5.image;
    document.getElementById("result").textContent = data.result;
  });