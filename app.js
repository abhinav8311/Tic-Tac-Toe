let boxes=document.querySelectorAll(".box");
let reset=document.querySelector("#rst");
let newgame=document.querySelector("#new");
let msgContainer=document.querySelector(".msgContainer");
let winMsg=document.querySelector("#msg");

let turnX=true;
let count=0;

const winPatterns= [[0,1,2],[0,3,6],[0,4,8],[1,4,7]
,[2,5,8],[2,4,6],[3,4,5],[6,7,8]];

boxes.forEach((box)=> {
    box.addEventListener("click", ()=>{

        if (turnX===true){
            box.innerText="X";
            box.style.color="red";
            turnX=false;
        }
        else{
            box.innerText="O";
            box.style.color="green";
            turnX=true;
        }
        box.disabled=true;
        count++;

        let isWinner=checkWinner();

        if (count === 9 && !isWinner) {
            gameDraw();
          }
    });
});

const resetgame = ()=>{
    turnX=true;
    enableBoxes();
    count=0;
    msgContainer.classList.add("hide");
}

const enableBoxes = () =>{
    for(let box of boxes){
        box.disabled=false;
        box.innerText="";
    }
}

const disableBoxes = () =>{
    for(let box of boxes){
        box.disabled=true;
    }
}


const gameDraw = () => {
    winMsg.innerText = `Game was a Draw`;
    msgContainer.classList.remove("hide");
    disableBoxes();
};

const displayWinner=(winner)=>{
    winMsg.innerText="Congratulation Player "+winner;
    msgContainer.classList.remove("hide");
    disableBoxes();
};

const checkWinner = () => {
    for (let pattern of winPatterns) {
        let posval1 = boxes[pattern[0]].innerText;
        let posval2 = boxes[pattern[1]].innerText;
        let posval3 = boxes[pattern[2]].innerText;

        if (posval1 !== "" && posval2 !== "" && posval3 !== "") {
            if (posval1 === posval2 && posval2 === posval3) {
                displayWinner(posval1);
                return true;  // Return true if there's a winner
            }
        }
    }
    return false;  // Return false if no winner
};


reset.addEventListener("click",resetgame);
newgame.addEventListener("click",resetgame);

