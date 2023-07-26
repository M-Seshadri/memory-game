var error=0;
var cardList = [
    "darkness",
    "double",
    "fairy",
    "fighting",
    "fire",
    "grass",
    "lightning",
    "metal",
    "psychic",
    "water"
]

var cardSet;
//to show the outline of the board
var board=[];
var row=4;
var column=5;
var card1Selected;
var card2Selected;

window.onload=function(){
    shuffleCards();
    startGame();

}

function shuffleCards(){
    cardSet = cardList.concat(cardList);
    console.log(cardSet);
    for(let i=0; i<cardList.length; i++){
        let j = Math.floor(Math.random()*cardSet.length); //to get random index
        //swap
        let temp= cardSet[i];
        cardSet[i]=cardSet[j];
        cardSet[j]=temp;
    }
    //swapped cards
    console.log(cardSet);
}

function startGame(){
    //arrange our 4x5 
    for( let r=0;r<row;r++){
        let row=[];
        for(let c=0;c<column;c++){
            let cardImg=cardSet.pop();
            row.push(cardImg); //For our Java Script
            
            //adding "img" id in html for the class card 
            //<img id="0-0" class="card" src="fire.jpg">
            let card = document.createElement("img");
            card.id=r.toString()+ "-" + c.toString();
            card.src=cardImg +".jpg";
            card.addEventListener("click",selectCard);
            card.classList.add("card");
            document.getElementById("board").append(card);
        }
        board.push(row);
    }
    console.log(board);
    setTimeout(hideCards,2000);
}


function hideCards() {
    for (let r = 0; r < row; r++) {
        for (let c = 0; c < column; c++) {
            let card = document.getElementById(r.toString() + "-" + c.toString());
            card.src = "back.jpg";
        }
    }
}

function selectCard() {

    if (this.src.includes("back")) {
        if (!card1Selected) {
            card1Selected = this;

            let coords = card1Selected.id.split("-"); //"0-1" -> ["0", "1"]
            let r = parseInt(coords[0]);
            let c = parseInt(coords[1]);

            card1Selected.src = board[r][c] + ".jpg";
        }
        else if (!card2Selected && this != card1Selected) {
            card2Selected = this;

            let coords = card2Selected.id.split("-"); //"0-1" -> ["0", "1"]
            let r = parseInt(coords[0]);
            let c = parseInt(coords[1]);

            card2Selected.src = board[r][c] + ".jpg";
            setTimeout(update, 1000);
        }
    }

}

function update() {
    //if cards aren't the same, flip both back
    if (card1Selected.src != card2Selected.src) {
        card1Selected.src = "back.jpg";
        card2Selected.src = "back.jpg";
        error += 1;
        document.getElementById("errors").innerText = error;
    }

    card1Selected = null;
    card2Selected = null;
}