// script.js

const waterText = document.getElementById("water");
const foodText = document.getElementById("food");
const moodText = document.getElementById("mood");

const waterBtn = document.getElementById("waterBtn");
const appleBtn = document.getElementById("appleBtn");

const cheeks = document.querySelectorAll(".cheek");
const mouth = document.querySelector(".mouth");
const head = document.querySelector(".head");

let water = 100;
let food = 100;

function updatePet(){

    waterText.textContent = water;
    foodText.textContent = food;

    if(water > 60 && food > 60){

        moodText.textContent = "HAPPY";

        head.style.background = "#ffe680";
        mouth.style.height = "8px";
    }

    else if(water > 30 && food > 30){

        moodText.textContent = "OKAY";

        head.style.background = "#fff199";
    }

    else{

        moodText.textContent = "SAD";

        head.style.background = "#bdbdbd";

        mouth.style.height = "4px";
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

    // cheeks visible
    cheeks.forEach(c => {
        c.style.opacity = "1";
    });

    // hide cheeks later
    setTimeout(() => {

        cheeks.forEach(c => {
            c.style.opacity = "0";
        });

    }, 2000);

    // bounce
    head.animate([
        { transform:"translateY(0px)" },
        { transform:"translateY(-8px)" },
        { transform:"translateY(0px)" }
    ], {
        duration:250
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
