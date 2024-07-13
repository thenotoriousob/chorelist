// javascript

const addBtn = document.getElementById('add-btn');
const deleteBtn = document.getElementById('delete-btn');
const choreEl = document.getElementById('chore');
const choreListEl = document.getElementById('chore-list');
const choresFromLocalStorage = JSON.parse(localStorage.getItem("chores"));
const choresCompleteEl = document.getElementById('chores-complete');
const errorEl = document.getElementById('error');
const giphyUrl = "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExamhmc2Y3ajhpdnMzYjkycGg3ZXRrajhkNGp4eXg4dm9rZHIybG02dyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3o7abldj0b3rxrZUxW/giphy.gif";

let choresBtns = [];
let chores = [];
let choresExist = false;

// If we already have data in local storage then display it
if (choresFromLocalStorage && choresFromLocalStorage.length > 0) {
    chores = choresFromLocalStorage;
    choresExist = true;
    renderChores(chores);
}

addBtn.addEventListener("click", function() {

    addNewChore(choreEl.value);

    renderChores(chores);

    /* Get input ready for another chore */
    choreEl.value = "";
    choreEl.focus();
});

deleteBtn.addEventListener("click", function() {

    // No point in continuing if there are no chores to delete
    if (chores.length === 0) {
        return;
    }
    
    localStorage.clear();
    chores = [];
    renderChores(chores);
});

function addNewChore(chore) {

    // If the entry is blank or already exists then don't add it
    if (chore === "" || chores.includes(chore)) {
        errorEl.textContent = "Chore cannot be blank or already exist";
        return;
    }
    
    chores.push(chore);
    localStorage.setItem("chores", JSON.stringify(chores));
    choresExist = true;
    errorEl.textContent = "";

}


function renderChores(choreArr) {


    let choreList = "";

    for (let i = 0; i < choreArr.length; i++) {
        choreList += `<li class="chore-btn" id="${choreArr[i]}">${choreArr[i]}</li>`
    }

    choreListEl.innerHTML = choreList;

    // If chores are complete then don't need to do anything else
    if (isChoresComplete()) {
        return;
    };

    choresBtns = document.getElementsByClassName("chore-btn");
    choresCompleteEl.style.backgroundImage = "";

    /* Because we have rerenderd the chores we need to readd the listeners */
    addChoreClickListeners();
    

};

function addChoreClickListeners() {

    // Add an click listener to every chore so we can delete it
    for (let i = 0; i < choresBtns.length; i++) {

        choresBtns[i].addEventListener("click", function() {

            // Remove the clicked chore from the list of chores
            chores.splice(chores.indexOf(choresBtns[i].id),1);
            localStorage.setItem("chores", JSON.stringify(chores));
            renderChores(chores);
            // Update the choresBtns array with the latest entries
            choresBtns = document.getElementsByClassName("chore-btn");

        })

    }

};

function isChoresComplete () {

    /* Only want to display the giphy if a chore existed and now the list is zero */
    if (choresExist && chores.length === 0) {
        choresCompleteEl.style.backgroundImage = `url(${giphyUrl})`;
        choresExist = false;
        return true;
    }

    return false;
}
