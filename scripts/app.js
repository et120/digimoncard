import { saveToLocalStorage, getLocalStorage, removeFromLocalStorage } from "./localstorage.js";

// IDs
let digimonImg = document.getElementById("digimonImg");
let digimonName = document.getElementById("digimonName");
let digimonStatus = document.getElementById("digimonStatus");
let favoriteBtn = document.getElementById("favoriteBtn");
let digimonInput = document.getElementById("digimonInput");
let getFavoritesBtn = document.getElementById("getFavoritesBtn");
let getFavoritesDiv = document.getElementById("getFavoritesDiv");

let digimon = "";

const DigimonApi = async (digimon) => {
    const promise = await fetch(`https://digimon-api.vercel.app/api/digimon/name/${digimon}`);
    const data = await promise.json();
    // console.log(data);
    return data;
}

// DigimonApi("agumon");

digimonInput.addEventListener('keydown', async (event) => {
    //On enter I want this function to run
    if (event.key === "Enter") {
        digimon = await DigimonApi(event.target.value);
        console.log(digimon);
        digimonImg.src = digimon[0].img;
        digimonName.textContent = digimon[0].name;
        digimonStatus.textContent = digimon[0].level;
    }
});

favoriteBtn.addEventListener('click', () => {
    saveToLocalStorage(digimon[0].name);
});

getFavoritesBtn.addEventListener('click', () => {
    // this retrieves our data from local storage and stores it into favorites variable
    let favorites = getLocalStorage();

    // clears div so the array displayed will not constantly repeat
    getFavoritesDiv.textContent = "";

    // map through each element in our array
    favorites.map(digiName => {
        // creating a p tag dynamically
        let p = document.createElement("p"); // for every digimon in this array, we create a p tag

        // setting text content to digiName
        p.textContent = digiName;

        // className replaces all classes with our new classes
        p.className = "text-lg font-medium text-gray-500 dark:text-white"

        // creating button dynamically
        let button = document.createElement("button");

        button.type = "button";
        button.textContent = "X";
        // classList allows us to be a little more concise, it doesnt replace all classes
        button.classList.add(
            "text-gray-400",
            "bg-transparent",
            "hover:bg-gray-200",
            "hover:text-gray-900",
            "rounded-lg",
            "text-sm",
            "w-8",
            "h-8",
            "justify-end",
            "dark:hover:bg-gray-600",
            "dark:hover:text-white"
        );
        
        // creating addeventlistener for button to remove digiName from favorites when delete is clicked
        button.addEventListener('click', () => {
            removeFromLocalStorage(digiName);
            p.remove();
        });

        // appending button to p tag
        p.append(button);
        
        // appending p tag to div
        getFavoritesDiv.append(p);
    });
});