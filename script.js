const words=["MARCEL","RIGBY","WISKEY","MRBOOM"];
let answer=words[Math.floor(Math.random()*words.length)];

let currentRow=0;
let currentCol=0;
const maxRows=6;
const maxCols=answer.length;

const grid=document.getElementById("grid");
grid.style.gridTemplateColumns=`repeat(${maxCols},60px)`;

/* Build tiles */
for(let r=0;r<maxRows;r++){
    for(let c=0;c<maxCols;c++){
        let tile=document.createElement("div");
        tile.classList.add("tile");
        tile.id=`tile-${r}-${c}`;
        grid.appendChild(tile);
    }
}

/* Set Cat Pic */
const catPic=document.getElementById("catPic");
const pics={
 "MARCEL":"https://i.imgur.com/2zN5AHo.png",
 "RIGBY":"https://i.imgur.com/rUm7nrm.jpeg",
 "WISKEY":"https://i.imgur.com/GbbQwye.jpeg",
 "MRBOOM":"https://i.imgur.com/G17TNiJ.jpeg"
};
catPic.src=pics[answer];

/* Keyboard */
const keys=["Q","W","E","R","T","Y","U","I","O","P",
            "A","S","D","F","G","H","J","K","L",
            "ENTER","Z","X","C","V","B","N","M","⌫"];

const keyboard=document.getElementById("keyboard");
keys.forEach(k=>{
    let key=document.createElement("button");
    key.textContent=k;
    if(k==="ENTER"||k==="⌫") key.classList.add("wide");
    key.onclick=()=>handleKey(k);
    keyboard.appendChild(key);
});

/* Physical typing */
document.addEventListener("keydown",(e)=>{
    let k=e.key.toUpperCase();
    if(k==="BACKSPACE") k="⌫";
    if(k==="ENTER"||/^[A-Z]$/.test(k)) handleKey(k);
});

/* Logic */
function handleKey(k){
    if(k==="ENTER") return submit();
    if(k==="⌫") return backspace();

    if(currentCol < maxCols){
        let tile=document.getElementById(`tile-${currentRow}-${currentCol}`);
        tile.textContent=k;
        currentCol++;
    }
}

function backspace(){
    if(currentCol>0){
        currentCol--;
        document.getElementById(`tile-${currentRow}-${currentCol}`).textContent="";
    }
}

function submit(){
    if(currentCol < maxCols) return;

    let guess="";
    for(let i=0;i<maxCols;i++){
        guess+=document.getElementById(`tile-${currentRow}-${i}`).textContent;
    }

    guess.split("").forEach((ch,i)=>{
        let tile=document.getElementById(`tile-${currentRow}-${i}`);
        setTimeout(()=>{
            if(ch===answer[i]) tile.classList.add("correct");
            else if(answer.includes(ch)) tile.classList.add("exist");
            else tile.classList.add("wrong");

            tile.classList.add("flip");
        }, i*250);
    });

    if(guess===answer){
        setTimeout(()=>alert("BRAVO! Ai ghicit pisica! 😸"), 1600);
        return;
    }

    currentRow++;
    currentCol=0;

    if(currentRow>=maxRows){
        setTimeout(()=>alert("Ai pierdut! Pisica era: "+answer),1600);
    }
}
