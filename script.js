// script.js

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const hungerBar = document.getElementById("hungerBar");
const happyBar = document.getElementById("happyBar");

const feedBtn = document.getElementById("feedBtn");
const cakeBtn = document.getElementById("cakeBtn");
const iceBtn = document.getElementById("iceBtn");

const pixelSize = 10;

let hunger = 80;
let happiness = 90;

let bounce = 0;

/* TOOTH SYSTEM */

let leftTooth = true;
let rightTooth = true;

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

    /* TRIANGLE TEETH */

    ctx.fillStyle = "#000";

    // left tooth
    if(leftTooth){

        ctx.beginPath();

        ctx.moveTo(petX + 115, petY + 168);
        ctx.lineTo(petX + 125, petY + 188);
        ctx.lineTo(petX + 135, petY + 168);

        ctx.fill();
    }

    // right tooth
    if(rightTooth){

        ctx.beginPath();

        ctx.moveTo(petX + 165, petY + 168);
        ctx.lineTo(petX + 175, petY + 188);
        ctx.lineTo(petX + 185, petY + 168);

        ctx.fill();
    }
}

/* DRAW PLANT */

function drawPlant(){

    ctx.fillStyle = "#000";

    // stem
    ctx.fillRect(340, 200, 10, 80);

    // leaves
    ctx.fillRect(315, 200, 30, 10);

    ctx.fillRect(350, 225, 30, 10);

    ctx.fillRect(315, 250, 30, 10);

    ctx.fillRect(350, 270, 30, 10);
}

/* RETRO GRID */

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

    // low stats darken screen

    if(hunger < 30 || happiness < 30){

        ctx.filter = "brightness(0.8)";

    }else{

        ctx.filter = "brightness(1)";
    }
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

    if(type === "cake"){

        happiness += 10;
    }

    if(type === "ice"){

        happiness += 5;
    }

    if(type === "chicken"){

        hunger += 8;
    }

    if(hunger > 100) hunger = 100;
    if(happiness > 100) happiness = 100;

    // bounce animation
    bounce = -18;

    // lose tooth after eating
    loseTooth();

    updateBars();
}

/* BUTTON EVENTS */

feedBtn.addEventListener("click", () => {

    feedPet("chicken");

});

cakeBtn.addEventListener("click", () => {

    feedPet("cake");

});

iceBtn.addEventListener("click", () => {

    feedPet("ice");

});

/* ANIMATION LOOP */

function animate(){

    ctx.clearRect(0,0,canvas.width,canvas.height);

    drawGrid();

    drawPlant();

    drawPet();

    // bounce easing

    if(bounce < 0){

        bounce += 1.2;
    }

    requestAnimationFrame(animate);
}

animate();

/* DECAY */

setInterval(() => {

    hunger -= 1;
    happiness -= 0.6;

    if(hunger < 0) hunger = 0;
    if(happiness < 0) happiness = 0;

    updateBars();

},1000);

updateBars();
