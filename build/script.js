/*
document.addEventListener('DOMContentLoaded', () => {
    const dishSearchForm = document.getElementById('search-form');

    dishSearchForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const dishName = document.getElementById('search-input').value.trim();
        if (!dishName) {
            alert("Please enter a dish name.");
            return;
        }

        try {
            const SPOONACULAR_API_KEY = "1a4e98eb9222444eb59b6738b643ade7";  // Replace with your actual API key
            const response = await fetch(`https://api.spoonacular.com/recipes/complexSearch?query=${encodeURIComponent(dishName)}&number=10&apiKey=${SPOONACULAR_API_KEY}`);

            if (!response.ok) {
                throw new Error(`Search failed: ${response.statusText}`);
            }

            const data = await response.json();
            displayDishResults(data.results);
        } catch (error) {
            console.error('Search error:', error);
            alert(`Failed to find recipes: ${error.message}`);
        }
    });
});

function displayDishResults(recipes) {
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = recipes.length 
        ? recipes.map(recipe => `
            <div class="recipe-card" data-id="${recipe.id}">
                <h3>${recipe.title}</h3>
                <img src="${recipe.image}" alt="${recipe.title}">
                <button class="view-details" onclick="fetchRecipeDetails(${recipe.id})">View Details</button>
            </div>
        `).join('')
        : '<p>No recipes found with these ingredients.</p>';
}

const SPOONACULAR_API_KEY = "1a4e98eb9222444eb59b6738b643ade7";

async function fetchRecipeDetails(recipeId) {
    try {
        console.log(`Fetching details for Recipe ID: ${recipeId}`);

        const response = await fetch(`https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${SPOONACULAR_API_KEY}&includeNutrition=false`);
        if (!response.ok) {
            throw new Error("Failed to fetch recipe details.");
        }

        const data = await response.json();
        showRecipeDetails(data);
    } catch (error) {
        console.error("❌ Error fetching recipe details:", error.message);
        alert("Failed to load recipe details. Please try again.");
    }
}

function showRecipeDetails(recipe) {
    const detailsContainer = document.getElementById('recipe-details');
    detailsContainer.innerHTML = `
        <button class="close-button" onclick="document.getElementById('recipe-details').style.display='none'">&times;</button>
        <h2>${recipe.title}</h2>
        <img src="${recipe.image}" alt="${recipe.title}">
        <h3>Ingredients:</h3>
        <ul>${recipe.extendedIngredients?.map(ing => `<li>${ing.original}</li>`).join('') || "No ingredients available."}</ul>
        <h3>Instructions:</h3>
        <p>${recipe.instructions || "No instructions available."}</p>
    `;
    detailsContainer.style.display = 'block';
}
*/
document.addEventListener('DOMContentLoaded', () => {
    const dishSearchForm = document.getElementById('search-form');

    dishSearchForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const userInput = document.getElementById('search-input').value.trim();

        if (!userInput) {
            alert("Please enter a dish name.");
            return;
        }
        if (userInput.includes(',')) {
            displayMessage("Please visit the ingredient finder to search using ingredients.");
            return;
        }

        try {
            const SPOONACULAR_API_KEY = "1a4e98eb9222444eb59b6738b643ade7"; 
            const encodedDishName = encodeURIComponent(userInput);
            const apiUrl = `https://api.spoonacular.com/recipes/complexSearch?query=${encodedDishName}&number=50&apiKey=${SPOONACULAR_API_KEY}`;

            const response = await fetch(apiUrl);

            if (!response.ok) {
                throw new Error(`Search failed: ${response.statusText}`);
            }

            const data = await response.json();
            displayDishResults(data.results);
        } catch (error) {
            console.error('Search error:', error);
            alert(`Failed to find recipes: ${error.message}`);
        }
    });
});

function displayDishResults(recipes) {
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = recipes.length 
        ? recipes.map(recipe => `
            <div class="recipe-card" data-id="${recipe.id}">
                <h3>${recipe.title}</h3>
                <img src="${recipe.image}" alt="${recipe.title}">
                <button class="view-details" onclick="fetchRecipeDetails(${recipe.id})">View Details</button>
            </div>
        `).join('')
        : '<p>No recipes found with this dish name.</p>';
}

function displayMessage(msg) {
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = `
        <div style="text-align:center; padding: 20px;">
            <p style="font-size: 18px; font-weight: bold; color: white; text-align:center;">${msg}</p>
        </div>`;
}

const SPOONACULAR_API_KEY = "1a4e98eb9222444eb59b6738b643ade7";

async function fetchRecipeDetails(recipeId) {
    try {
        console.log(`Fetching details for Recipe ID: ${recipeId}`);

        const response = await fetch(`https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${SPOONACULAR_API_KEY}&includeNutrition=false`);
        if (!response.ok) {
            throw new Error("Failed to fetch recipe details.");
        }

        const data = await response.json();
        showRecipeDetails(data);
    } catch (error) {
        console.error("❌ Error fetching recipe details:", error.message);
        alert("Failed to load recipe details. Please try again.");
    }
}

function showRecipeDetails(recipe) {
    const detailsContainer = document.getElementById('recipe-details');
    detailsContainer.innerHTML = `
        <button class="close-button" onclick="document.getElementById('recipe-details').style.display='none'">&times;</button>
        <h2>${recipe.title}</h2>
        <img src="${recipe.image}" alt="${recipe.title}">
        <h3>Ingredients:</h3>
        <ul>${recipe.extendedIngredients?.map(ing => `<li>${ing.original}</li>`).join('') || "<li>No ingredients available.</li>"}</ul>
        <h3>Instructions:</h3>
        <p>${recipe.instructions || "No instructions available."}</p>
    `;
    detailsContainer.style.display = 'block';
}
