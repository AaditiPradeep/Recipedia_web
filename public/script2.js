/*document.addEventListener('DOMContentLoaded', () => {
    const recipeSearchForm = document.getElementById('search-form');
    const ingredientSearchForm = document.getElementById('ingredient-search-form');

    if (recipeSearchForm) {
        recipeSearchForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            const query = document.getElementById('search-input').value.trim();
            if (!query) return;

            console.log("🔍 Searching for recipes:", query);

            try {
                const response = await fetch(`/search?query=${query}`);
                const recipes = await response.json();
                console.log("📥 API Response:", recipes);
                displayRecipes(recipes);
            } catch (error) {
                console.error('❌ Error fetching recipes:', error);
            }
        });
    }

    if (ingredientSearchForm) {
        ingredientSearchForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            const ingredients = document.getElementById('ingredient-input').value.trim();
            if (!ingredients) return;

            console.log("🛠️ Searching for recipes with ingredients:", ingredients);

            try {
                const response = await fetch('https://api.spoonacular.com/recipes/findByIngredients',{
                    params: {
                        ingredients: ingredients,
                        number: 10,
                        ranking: 1// Ensuring only recipes that use the ingredients are shown
                    }
                });
                const recipes = await response.json();
                console.log("📥 API Response:", recipes);

                if (!Array.isArray(recipes)) {
                    console.error("❌ Unexpected API response:", recipes);
                    return;
                }

                displayRecipes(recipes);
            } catch (error) {
                console.error('❌ Error fetching recipes by ingredients:', error);
            }
        });
    }

    document.getElementById('results').addEventListener('click', async (event) => {
        const recipeCard = event.target.closest('.recipe-card');
        if (!recipeCard) return;

        const recipeId = recipeCard.dataset.id;
        if (!recipeId) return;

        try {
            const response = await fetch(`/recipe/${recipeId}`);
            const recipe = await response.json();
            showRecipeDetails(recipe);
        } catch (error) {
            console.error('❌ Error fetching recipe details:', error);
        }
    });
});

function displayRecipes(recipes) {
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = '';

    if (!recipes.length) {
        resultsContainer.innerHTML = '<p>No recipes found.</p>';
        return;
    }

    recipes.forEach(recipe => {
        const recipeCard = document.createElement('div');
        recipeCard.classList.add('recipe-card');
        recipeCard.dataset.id = recipe.id;
        recipeCard.innerHTML = `
            <h3>${recipe.title}</h3>
            <img src="${recipe.image}" alt="${recipe.title}">
            <button onclick="fetchRecipeDetails(${recipe.id})">View Details</button>
        `;
        resultsContainer.appendChild(recipeCard);
    });
}

function showRecipeDetails(recipe) {
    const detailsContainer = document.getElementById('recipe-details');
    detailsContainer.innerHTML = `
        <button class="close-button" onclick="document.getElementById('recipe-details').style.display='none'">&times;</button>
        <h2>${recipe.title}</h2>
        <img src="${recipe.image}" alt="${recipe.title}">
        <h3>Ingredients:</h3>
        <ul>${recipe.extendedIngredients.map(ing => `<li>${ing.original}</li>`).join('')}</ul>
        <h3>Instructions:</h3>
        <p>${recipe.instructions}</p>
    `;
    detailsContainer.style.display = 'block';
}
*/  
document.addEventListener('DOMContentLoaded', () => {
    const ingredientSearchForm = document.getElementById('ingredient-search-form');

    ingredientSearchForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const ingredients = document.getElementById('ingredient-input').value.trim();
        if (!ingredients) {
            alert("Please enter ingredients.");
            return;
        }

        try {
            const SPOONACULAR_API_KEY = "1a4e98eb9222444eb59b6738b643ade7";
            const response = await fetch(`https://api.spoonacular.com/recipes/findByIngredients?ingredients=${encodeURIComponent(ingredients)}&number=10&apiKey=${SPOONACULAR_API_KEY}`);

            if (!response.ok) {
                throw new Error(`Search failed: ${response.statusText}`);
            }

            const recipes = await response.json();
            displayRecipes(recipes);
        } catch (error) {
            console.error('Search error:', error);
            alert(`Failed to find recipes: ${error.message}`);
        }
    });
});

function displayRecipes(recipes) {
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = recipes.length 
        ? recipes.map(recipe => `
            <div class="recipe-card" data-id="${recipe.id}">
                <h3>${recipe.title}</h3>
                <img src="${recipe.image}" alt="${recipe.title}">
                <button onclick="fetchRecipeDetails(${recipe.id})">View Details</button>
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
