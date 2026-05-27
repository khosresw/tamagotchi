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

    /* EYES */

    ctx.fillStyle = "#000";

    if(!sleeping){

        ctx.fillRect(petX + 105, petY + 70, 12, 12);
        ctx.fillRect(petX + 175, petY + 70, 12, 12);

    }else{

        ctx.fillRect(petX + 100, petY + 75, 25, 4);
        ctx.fillRect(petX + 170, petY + 75, 25, 4);

        ctx.font = "24px monospace";

        ctx.fillText("Z", petX + 250, petY + 40);
        ctx.fillText("Z", petX + 270, petY + 70);
    }

    /* MOUTH */

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
        ctx.lineTo(petX + 138, petY + 163);
        ctx.lineTo(petX + 151, petY + 145);

        ctx.fill();
    }

    // right tooth
    if(rightTooth){

        ctx.beginPath();

        ctx.moveTo(petX + 155, petY + 145);
        ctx.lineTo(petX + 168, petY + 163);
        ctx.lineTo(petX + 181, petY + 145);

        ctx.fill();
    }
}

/* DRAW FAIRY */

function drawFairy(){

    if(showFairy){

        const fx = 255;
        const fy = 35;

        // 2x smaller
        const scale = 0.5;

        /* WINGS */

        ctx.fillStyle = "#dff5f2";

        ctx.fillRect(
            fx - 45 * scale,
            fy + 30 * scale,
            35 * scale,
            55 * scale
        );

        ctx.fillRect(
            fx - 60 * scale,
            fy + 45 * scale,
            20 * scale,
            35 * scale
        );

        ctx.fillRect(
            fx + 55 * scale,
            fy + 30 * scale,
            35 * scale,
            55 * scale
        );

        ctx.fillRect(
            fx + 90 * scale,
            fy + 45 * scale,
            20 * scale,
            35 * scale
        );

        /* HAIR */

        ctx.fillStyle = "#d85d83";

        ctx.fillRect(
            fx,
            fy,
            70 * scale,
            40 * scale
        );

        ctx.fillRect(
            fx - 10 * scale,
            fy + 10 * scale,
            20 * scale,
            35 * scale
        );

        ctx.fillRect(
            fx + 60 * scale,
            fy + 10 * scale,
            20 * scale,
            35 * scale
        );

        /* FACE */

        ctx.fillStyle = "#f7c38b";

        ctx.fillRect(
            fx + 15 * scale,
            fy + 35 * scale,
            40 * scale,
            35 * scale
        );

        /* EYES */

        ctx.fillStyle = "#000";

        ctx.fillRect(
            fx + 22 * scale,
            fy + 45 * scale,
            6 * scale,
            10 * scale
        );

        ctx.fillRect(
            fx + 42 * scale,
            fy + 45 * scale,
            6 * scale,
            10 * scale
        );

        /* BODY */

        ctx.fillStyle = "#36a890";

        ctx.fillRect(
            fx + 12 * scale,
            fy + 70 * scale,
            46 * scale,
            55 * scale
        );

        /* ARMS */

        ctx.fillStyle = "#f7c38b";

        ctx.fillRect(
            fx - 10 * scale,
            fy + 70 * scale,
            22 * scale,
            10 * scale
        );

        ctx.fillRect(
            fx + 58 * scale,
            fy + 70 * scale,
            22 * scale,
            10 * scale
        );

        /* LEGS */

        ctx.fillRect(
            fx + 20 * scale,
            fy + 125 * scale,
            10 * scale,
            30 * scale
        );

        ctx.fillRect(
            fx + 42 * scale,
            fy + 125 * scale,
            10 * scale,
            30 * scale
        );

        /* SHOES */

        ctx.fillStyle = "#36a890";

        ctx.fillRect(
            fx + 16 * scale,
            fy + 150 * scale,
            16 * scale,
            10 * scale
        );

        ctx.fillRect(
            fx + 38 * scale,
            fy + 150 * scale,
            16 * scale,
            10 * scale
        );

        /* SPARKLES */

        ctx.fillStyle = "#fff";

        ctx.fillRect(
            fx + 95 * scale,
            fy + 20 * scale,
            8 * scale,
            8 * scale
        );

        ctx.fillRect(
            fx + 105 * scale,
            fy + 30 * scale,
            6 * scale,
            6 * scale
        );

        ctx.fillRect(
            fx + 92 * scale,
            fy + 38 * scale,
            5 * scale,
            5 * scale
        );

        ctx.font = "12px monospace";

        ctx.fillText(
            "✨",
            fx + 90 * scale,
            fy + 15 * scale
        );
    }
}

/* DRAW CAR */

function drawCar(){

    if(hasCar){

        ctx.fillStyle = "#000";

        ctx.fillRect(250, 245, 90, 30);

        ctx.fillRect(275, 220, 40, 25);

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

    ctx.fillRect(340, 200, 10, 80);

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

    if(type === "cake") happiness += 10;
    if(type === "ice") happiness += 5;
    if(type === "chicken") hunger += 8;

    if(hunger > 100) hunger = 100;
    if(happiness > 100) happiness = 100;

    bounce = -18;

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
