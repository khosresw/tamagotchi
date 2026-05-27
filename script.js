// script.js

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const hungerBar = document.getElementById("hungerBar");
const happyBar = document.getElementById("happyBar");

const feedBtn = document.getElementById("feedBtn");
const cakeBtn = document.getElementById("cakeBtn");
const iceBtn = document.getElementById("iceBtn");

const pixelSize = 12;

let hunger = 80;
let happiness = 90;

let blushTimer = 0;
let bounce = 0;

/* PET SPRITE */

const petSprite = [
"................",
"................",
"................",
"......f..f......",
".....ffffff.....",
".....f....f.....",
"....ff....ff....",
"....f.f..f.f....",
"....f......ff...",
"....f..ff...f...",
"....f.......f...",
"....fffffffff...",
"................",
"................",
"................",
"................"
];

/* DRAW PIXEL */

function drawSprite(sprite, x, y){

    for(let row = 0; row < sprite.length; row++){

        for(let col = 0; col < sprite[row].length; col++){

            if(sprite[row][col] === "f"){

                ctx.fillStyle = "#000";

                ctx.fillRect(
                    x + col * pixelSize,
                    y + row * pixelSize,
                    pixelSize,
                    pixelSize
                );
            }
        }
    }
}

/* DRAW PET */

function drawPet(){

    const petX = 110;
    const petY = 60 + bounce;

    drawSprite(petSprite, petX, petY);

    /* CHEEKS */

    if(blushTimer > 0){

        ctx.fillStyle = "#ff8db3";

        ctx.fillRect(petX + 15, petY + 105, 12, 12);

        ctx.fillRect(petX + 160, petY + 105, 12, 12);

        blushTimer--;
    }
}

/* DRAW PLANT */

function drawPlant(){

    ctx.fillStyle = "#000";

    ctx.fillRect(320, 180, 10, 70);

    ctx.fillRect(300, 180, 30, 10);

    ctx.fillRect(330, 210, 30, 10);
}

/* BACKGROUND GRID */

function drawGrid(){

    ctx.strokeStyle = "#a0a58f";

    for(let x = 0; x < canvas.width; x += 16){

        ctx.beginPath();
        ctx.moveTo(x,0);
        ctx.lineTo(x,canvas.height);
        ctx.stroke();
    }

    for(let y = 0; y < canvas.height; y += 16){

        ctx.beginPath();
        ctx.moveTo(0,y);
        ctx.lineTo(canvas.width,y);
        ctx.stroke();
    }
}

/* UPDATE BARS */

function updateBars(){

    hungerBar.style.width = hunger + "%";
    happyBar.style.width = happiness + "%";
}

/* FEED */

function feedPet(type){

    hunger += 10;
    happiness += 6;

    if(type === "cake"){
        happiness += 8;
    }

    if(type === "ice"){
        happiness += 4;
    }

    if(hunger > 100) hunger = 100;
    if(happiness > 100) happiness = 100;

    blushTimer = 40;
    bounce = -15;

    updateBars();
}

/* BUTTONS */

feedBtn.addEventListener("click", () => {
    feedPet("chicken");
});

cakeBtn.addEventListener("click", () => {
    feedPet("cake");
});

iceBtn.addEventListener("click", () => {
    feedPet("ice");
});

/* LOOP */

function animate(){

    ctx.clearRect(0,0,canvas.width,canvas.height);

    drawGrid();

    drawPlant();

    drawPet();

    if(bounce < 0){
        bounce += 1;
    }

    requestAnimationFrame(animate);
}

animate();

/* DECAY */

setInterval(() => {

    hunger -= 1;
    happiness -= 0.5;

    if(hunger < 0) hunger = 0;
    if(happiness < 0) happiness = 0;

    updateBars();

},1000);

updateBars();
