const recipeContainerLeft = document.getElementById("recipe-container-left");
const recipeContainerRight = document.getElementById("recipe-container-right");
const addRecipeBtn = document.getElementById("addRecipeBtn");
const modal = document.getElementById("modal");
const recipeForm = document.getElementById("recipeForm");
const modalTitle = document.getElementById("modalTitle");

let recipes = [];

addRecipeBtn.addEventListener("click", () => {
    openModal("Add Recipe");
});

function openModal(title, index) {
    modalTitle.innerText = title;
    modalTitle.dataset.index = index === undefined ? "" : index;
    modal.style.display = "block";

    if (title === "Edit Recipe" && index !== undefined) {
        const recipe = recipes[index];
        document.getElementById("recipeName").value = recipe.name;
        document.getElementById("ingredients").value = recipe.ingredients;
        document.getElementById("instructions").value = recipe.instructions;
    } else {
        clearForm();
    }
}


function closeModal() {
    modalTitle.innerText = "Add Recipe";
    modal.style.display = "none";
}

function saveRecipe() {
    const recipeName = document.getElementById("recipeName").value;
    const ingredients = document.getElementById("ingredients").value;
    const instructions = document.getElementById("instructions").value;

    const modalIndex = parseInt(modalTitle.dataset.index);

    if (modalTitle.innerText === "Add Recipe") {
        addRecipe(recipeName, ingredients, instructions);
    } else if (modalTitle.innerText === "Edit Recipe") {
        editRecipe(modalIndex, recipeName, ingredients, instructions);
    }

    closeModal();
    renderRecipes();
    clearForm();
}

function addRecipe(name, ingredients, instructions) {
    const newRecipe = { name, ingredients, instructions };
    recipes.push(newRecipe);
}

function editRecipe(index, name, ingredients, instructions) {
    const editedRecipe = {
        name: name,
        ingredients: ingredients,
        instructions: instructions
    };

    recipes[index] = editedRecipe;
}

function deleteRecipe(index) {
    recipes.splice(index, 1);
    renderRecipes();
}

function renderRecipes() {
    recipeContainerLeft.innerHTML = "";
    recipeContainerRight.innerHTML = "";

    recipes.forEach((recipe, index) => {
        const recipeCard = createRecipeCard(recipe, index);
        if (index % 2 === 0) {
            recipeContainerLeft.appendChild(recipeCard);
        } else {
            recipeContainerRight.appendChild(recipeCard);
        }
    });
}

function createRecipeCard(recipe, index) {
    const recipeCard = document.createElement("div");
    recipeCard.className = "recipe-card glassmorphism";
    recipeCard.innerHTML = `
        <h3>${recipe.name}</h3>
        <p><strong>Ingredients:</strong> ${recipe.ingredients}</p>
        <p><strong>Instructions:</strong> ${recipe.instructions}</p>
        <button onclick="openModal('Edit Recipe', ${index})">Edit</button>
        <button onclick="deleteRecipe(${index})">Delete</button>
    `;
    return recipeCard;
}


function clearForm() {
    document.getElementById("recipeName").value = "";
    document.getElementById("ingredients").value = "";
    document.getElementById("instructions").value = "";
}

renderRecipes();
