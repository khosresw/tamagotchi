// Replace food button logic in script.js with this

const foodItems = document.querySelectorAll(".food-item");

foodItems.forEach(item => {

    item.addEventListener("click", () => {

        const foodType = item.dataset.food;

        food += 15;

        if(food > 100){
            food = 100;
        }

        // blush cheeks
        cheeks.forEach(c => {
            c.style.opacity = "1";
        });

        setTimeout(() => {

            cheeks.forEach(c => {
                c.style.opacity = "0";
            });

        }, 2000);

        // bounce animation
        pet.animate([
            { transform:"translateY(0px)" },
            { transform:"translateY(-10px)" },
            { transform:"translateY(0px)" }
        ], {
            duration:250
        });

        // mood text
        if(foodType === "chicken"){
            moodText.textContent = "PROTEIN BOOST";
        }

        if(foodType === "cake"){
            moodText.textContent = "SUGAR RUSH";
        }

        if(foodType === "icecream"){
            moodText.textContent = "VERY HAPPY";
        }

        updatePet();
    });

});
