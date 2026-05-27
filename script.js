// script.js

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const hungerBar = document.getElementById("hungerBar");
const happyBar = document.getElementById("happyBar");

const feedBtn = document.getElementById("feedBtn");
const cakeBtn = document.getElementById("cakeBtn");
const iceBtn = document.getElementById("iceBtn");
const sleepBtn = document.getElementById("sleepBtn");

const pixelSize = 10;

let hunger = 80;
let happiness = 90;

let bounce = 0;

let sleeping = false;

/* TOOTH SYSTEM */

let leftTooth = true;
let rightTooth = true;

/* TOOTH FAIRY + CAR */

let showFairy = false;
let hasCar = false;

/* BIG PET SPRITE */

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

    /* SLEEP MODE */

    if(sleeping){

        ctx.fillStyle = "#000";

        // closed eyes
        ctx.fillRect(petX + 105, petY + 70, 25, 4);

        ctx.fillRect(petX + 165, petY + 70, 25, 4);

        // ZZZ
        ctx.font = "24px monospace";

        ctx.fillText("Z", petX + 250, petY + 40);

        ctx.fillText("Z", petX + 270, petY + 70);
    }



/* MOUTH */

ctx.fillStyle = "#000";

// rectangular mouth
ctx.fillRect(
    petX + 110,
    petY + 145,
    80,
    30
);

/* TEETH */

ctx.fillStyle = "#bcc0aa";

// left tooth
if(leftTooth){

    ctx.beginPath();

    ctx.moveTo(petX + 125, petY + 145);
    ctx.lineTo(petX + 138, petY + 175);
    ctx.lineTo(petX + 151, petY + 145);

    ctx.fill();
}

// right tooth
if(rightTooth){

    ctx.beginPath();

    ctx.moveTo(petX + 155, petY + 145);
    ctx.lineTo(petX + 168, petY + 175);
    ctx.lineTo(petX + 181, petY + 145);

    ctx.fill();
}

/* DRAW TOOTH FAIRY */

function drawFairy(){

    if(showFairy){

        ctx.fillStyle = "#000";

        // wings
        ctx.fillRect(290, 50, 18, 18);
        ctx.fillRect(330, 50, 18, 18);

        // body
        ctx.fillRect(308, 55, 22, 30);

        // wand
        ctx.fillRect(340, 65, 28, 4);

        // magic orb
        ctx.beginPath();
        ctx.arc(373, 67, 6, 0, Math.PI * 2);
        ctx.fill();

        ctx.font = "20px monospace";

        ctx.fillText("✨", 285, 35);
    }
}

/* DRAW CAR */

function drawCar(){

    if(hasCar){

        ctx.fillStyle = "#000";

        // car body
        ctx.fillRect(250, 245, 90, 30);

        // roof
        ctx.fillRect(275, 220, 40, 25);

        // wheels
        ctx.beginPath();
        ctx.arc(270, 280, 10, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.arc(320, 280, 10, 0, Math.PI * 2);
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

    sleeping = false;

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

    // bounce
    bounce = -18;

    // lose tooth
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

/* SLEEP BUTTON */

sleepBtn.addEventListener("click", () => {

    sleeping = true;

    // tooth fairy appears if tooth missing

    if(!leftTooth || !rightTooth){

        showFairy = true;

        setTimeout(() => {

            showFairy = false;

            hasCar = true;

        }, 3000);
    }
});

/* ANIMATION LOOP */

function animate(){

    ctx.clearRect(0,0,canvas.width,canvas.height);

    drawGrid();

    drawPlant();

    drawPet();

    drawFairy();

    drawCar();

    // bounce easing

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
