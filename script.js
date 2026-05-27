// script.js

const waterText = document.getElementById("water");
const foodText = document.getElementById("food");
const moodText = document.getElementById("mood");

const waterBtn = document.getElementById("waterBtn");
const appleBtn = document.getElementById("appleBtn");

const mouth = document.querySelector(".mouth");
const screen = document.querySelector(".screen");

const cheeks = document.querySelectorAll(".cheek");

let water = 100;
let food = 100;

function updatePet(){

    waterText.textContent = water;
    foodText.textContent = food;

    if(water > 60 && food > 60){

        moodText.textContent = "Happy";
        screen.style.background = "#c8ffd5";

        mouth.style.borderBottom = "6px solid black";
        mouth.style.borderTop = "none";
        mouth.style.borderRadius = "0 0 60px 60px";
    }

    else if(water > 30 && food > 30){

        moodText.textContent = "Okay";
        screen.style.background = "#fff3a8";
    }

    else{

        moodText.textContent = "Sad";
        screen.style.background = "#ffc7c7";

        mouth.style.borderBottom = "none";
        mouth.style.borderTop = "6px solid black";
        mouth.style.borderRadius = "60px 60px 0 0";
    }
}

waterBtn.addEventListener("click", () => {

    water += 20;

    if(water > 100){
        water = 100;
    }

    updatePet();
});

appleBtn.addEventListener("click", () => {

    food += 20;

    if(food > 100){
        food = 100;
    }

    // Pink cheeks appear
    cheeks.forEach(c => {
        c.style.opacity = "1";
    });

    // Hide cheeks after 2 sec
    setTimeout(() => {
        cheeks.forEach(c => {
            c.style.opacity = "0";
        });
    }, 2000);

    // Bounce animation
    screen.animate([
        { transform: "scale(1)" },
        { transform: "scale(1.05)" },
        { transform: "scale(1)" }
    ], {
        duration: 300
    });

    updatePet();
});

setInterval(() => {

    water--;
    food--;

    if(water < 0) water = 0;
    if(food < 0) food = 0;

    updatePet();

}, 1000);

updatePet();
