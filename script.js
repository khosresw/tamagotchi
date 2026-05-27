// script.js

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const hungerBar = document.getElementById("hungerBar");
const happyBar = document.getElementById("happyBar");

const feedBtn = document.getElementById("feedBtn");
const cakeBtn = document.getElementById("cakeBtn");
const iceBtn = document.getElementById("iceBtn");

/* ADD THIS BUTTON IN HTML
<button id="sleepBtn">😴 Sleep</button>
*/

const sleepBtn = document.getElementById("sleepBtn");

const pixelSize = 10;

let hunger = 80;
let happiness = 90;

let bounce = 0;

let sleeping = false;

/* TOOTH SYSTEM */

let leftTooth = true;
let rightTooth = true;

/* TOOTH FAIRY */

let showFairy = false;
let hasCar = false;

/* BIGGER PET SPRITE */

const petSprite = [
"................................",
"................................",
"................................",
"...........ff....ff............",
".........ffffffffffff..........",
"........ffffffffffffff.........",
"........fff........fff.........",
".......ffff........ffff........",
".......fff..........fff........",
".......fff..ff..ff..fff........",
".......fff..........fff........",
".......fff..........fff........",
".......ffff........ffff........",
"........ffffffffffffff.........",
".........ffffffffffff..........",
"...........ffffffff............",
".........ffff..ffff............",
"........fff......fff...........",
"................................",
"................................"
];

/* DRAW PIXELS */

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

    const petX = 40;
    const petY = 20 + bounce;

    drawSprite(petSprite, petX, petY);

    /* SLEEP EYES */

    if(sleeping){

        ctx.fillRect(petX + 110, petY + 70, 20, 4);
        ctx.fillRect(petX + 170, petY + 70, 20, 4);

        ctx.font = "24px monospace";
        ctx.fillText("Z", petX + 240, petY + 20);
        ctx.fillText("Z", petX + 260, petY + 45);
    }

    /* TRIANGLE TEETH */

    ctx.fillStyle = "#000";

    if(leftTooth){

        ctx.beginPath();

        ctx.moveTo(petX + 115, petY + 168);
        ctx.lineTo(petX + 125, petY + 188);
        ctx.lineTo(petX + 135, petY + 168);

        ctx.fill();
    }

    if(rightTooth){

        ctx.beginPath();

        ctx.moveTo(petX + 165, petY + 168);
        ctx.lineTo(petX + 175, petY + 188);
        ctx.lineTo(petX + 185, petY + 168);

        ctx.fill();
    }
}

/* DRAW TOOTH FAIRY */

function drawFairy(){

    if(showFairy){

        ctx.fillStyle = "#000";

        // wings
        ctx.fillRect(280, 40, 20, 20);
        ctx.fillRect(320, 40, 20, 20);

        // body
        ctx.fillRect(300, 50, 20, 30);

        // wand
        ctx.fillRect(340, 50, 30, 4);

        ctx.beginPath();
        ctx.arc(375, 52, 6, 0, Math.PI * 2);
        ctx.fill();

        ctx.font = "18px monospace";
        ctx.fillText("✨", 280, 30);
    }
}

/* DRAW CAR */

function drawCar(){

    if(hasCar){

        ctx.fillStyle = "#000";

        // car body
        ctx.fillRect(250, 240, 80, 30);

        // roof
        ctx.fillRect(270, 220, 40, 20);

        // wheels
        ctx.beginPath();
        ctx.arc(265, 275, 10, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.arc(315, 275, 10, 0, Math.PI * 2);
        ctx.fill();
    }
}

/* DRAW PLANT */

function drawPlant(){

    ctx.fillStyle = "#000";

    ctx.fillRect(340, 200, 10, 80);

    ctx.fillRect(315, 200, 30, 10);

    ctx.fillRect(350, 225, 30, 10);

    ctx.fillRect(315, 250, 30, 10);

    ctx.fillRect(350, 270, 30, 10);
}

/* GRID */

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

/* LOSE TOOTH */

function loseTooth(){

    if(leftTooth){

        leftTooth = false;

    }else if(rightTooth){

        rightTooth = false;
    }
}

/* FEED PET */

function feedPet(type){

    hunger += 10;
    happiness += 6;

    if(type === "cake") happiness += 10;

    if(type === "ice") happiness += 5;

    if(type === "chicken") hunger += 8;

    if(hunger > 100) hunger = 100;
    if(happiness > 100) happiness = 100;

    bounce = -18;

    loseTooth();

    updateBars();
}

/* BUTTONS */

feedBtn.addEventListener("click", () => {

    sleeping = false;
    feedPet("chicken");

});

cakeBtn.addEventListener("click", () => {

    sleeping = false;
    feedPet("cake");

});

iceBtn.addEventListener("click", () => {

    sleeping = false;
    feedPet("ice");

});

/* SLEEP */

sleepBtn.addEventListener("click", () => {

    sleeping = true;

    // fairy appears if tooth missing

    if(!leftTooth || !rightTooth){

        showFairy = true;

        setTimeout(() => {

            hasCar = true;
            showFairy = false;

        }, 3000);
    }
});

/* LOOP */

function animate(){

    ctx.clearRect(0,0,canvas.width,canvas.height);

    drawGrid();

    drawPlant();

    drawPet();

    drawFairy();

    drawCar();

    if(bounce < 0){

        bounce += 1.2;
    }

    requestAnimationFrame(animate);
}

animate();

/* DECAY */

setInterval(() => {

    if(!sleeping){

        hunger -= 1;
        happiness -= 0.6;
    }

    if(hunger < 0) hunger = 0;
    if(happiness < 0) happiness = 0;

    updateBars();

},1000);

updateBars();
