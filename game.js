// Lista pisici
const cats = [
  { name: "MARCEL", img: "https://i.imgur.com/2zN5AHo.png" },
  { name: "RIGBY", img: "https://i.imgur.com/rUm7nrm.jpeg" },
  { name: "WISKEY", img: "https://i.imgur.com/GbbQwye.jpeg" },
  { name: "MRBOOM", img: "https://i.imgur.com/G17TNiJ.jpeg" }
];

let currentCat = cats[Math.floor(Math.random() * cats.length)];
document.getElementById("catImg").src = currentCat.img;
const word = currentCat.name;

let rows = 6, cols = word.length;
const grid = document.getElementById("grid");

// GENERARE GRID
for(let i=0;i<rows*cols;i++){
  let t=document.createElement("div");
  t.classList.add("tile");
  grid.appendChild(t);
}

let currentRow = 0, currentCol = 0;

// TASTARE
function typeLetter(l){
  if(currentCol<cols){
    const tile=grid.children[currentRow*cols+currentCol];
    tile.textContent=l;
    currentCol++;
  }
}
function deleteLetter(){
  if(currentCol>0){
    currentCol--;
    grid.children[currentRow*cols+currentCol].textContent="";
  }
}

function shakeRow(){
  for(let i=0;i<cols;i++){
    let t=grid.children[currentRow*cols+i];
    t.classList.add("shake");
    setTimeout(()=>t.classList.remove("shake"),400);
  }
}

// VALIDARE
function submitWord(){
  if(currentCol!==cols){ shakeRow(); return; }

  let guess="";
  for(let i=0;i<cols;i++)
    guess += grid.children[currentRow*cols+i].textContent;

  if(guess!==word){
    for(let i=0;i<cols;i++){
      let tile=grid.children[currentRow*cols+i];
      let letter=guess[i];

      setTimeout(()=>{
        tile.classList.add("flip");
        if(letter===word[i]) tile.classList.add("correct");
        else if(word.includes(letter)) tile.classList.add("exist");
        else tile.classList.add("wrong");
      },i*250);
    }
    setTimeout(()=>{
      currentRow++; currentCol=0;
    },cols*250);

  } else {
    // WIN ANIMATION + popup
    for(let i=0;i<cols;i++){
      let tile=grid.children[currentRow*cols+i];
      setTimeout(()=>tile.classList.add("flip","correct"),i*250);
    }
    setTimeout(()=>{
      document.getElementById("winText").innerHTML=
      `BRAVO! Ai ghicit <b>${word}</b> 😺`;
      document.getElementById("endPopup").classList.remove("hidden");
    },cols*250+300);
  }
}

// KEYBOARD
document.addEventListener("keydown",e=>{
  if(e.key==="Enter") submitWord();
  else if(e.key==="Backspace") deleteLetter();
  else if(/^[a-zA-Z]$/.test(e.key)) typeLetter(e.key.toUpperCase());
});
const keyboard = document.getElementById("keyboard");
"QWERTYUIOPASDFGHJKLZXCVBNM".split("").forEach(l=>{
  let btn=document.createElement("button");
  btn.textContent=l;
  btn.onclick=()=>typeLetter(l);
  keyboard.appendChild(btn);
});
let enter=document.createElement("button");
enter.textContent="ENTER";
enter.classList.add("wide");
enter.onclick=submitWord;
keyboard.appendChild(enter);
let del=document.createElement("button");
del.textContent="⌫";
del.classList.add("wide");
del.onclick=deleteLetter;
keyboard.appendChild(del);

// CLOSE TUTORIAL
document.getElementById("closeHow").onclick=
document.getElementById("closePlay").onclick=
()=>document.getElementById("howTo").classList.add("hidden");
