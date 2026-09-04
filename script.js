const favoriteButtons = document.querySelectorAll(".favorite-btn");
const favoritesMessage = document.getElementById("favorites-message");

function getFavorites() {
    return JSON.parse(localStorage.getItem("bakeryFavorites")) || [];
}

function saveFavorites(favorites) {
    localStorage.setItem("bakeryFavorites", JSON.stringify(favorites));
}

function updateFavoritesMessage() {
    if (!favoritesMessage) {
        return;
    }

    const favorites = getFavorites();

    if (favorites.length === 0) {
        favoritesMessage.textContent = "You have not saved any favorites yet.";
    } else {
        favoritesMessage.textContent =
            "Saved favorites: " + favorites.join(", ");
    }
}

function toggleFavorite(productName) {
    let favorites = getFavorites();

    if (favorites.includes(productName)) {
        favorites = favorites.filter(function(item) {
            return item !== productName;
        });
    } else {
        favorites.push(productName);
    }

    saveFavorites(favorites);
    updateFavoritesMessage();
}

favoriteButtons.forEach(function(button) {
    button.addEventListener("click", function() {
        const productName = button.dataset.product;
        toggleFavorite(productName);
    });
});

updateFavoritesMessage();

const contactForm = document.getElementById("contact-form");

if (contactForm) {
    contactForm.addEventListener("submit", function(event) {
        let isValid = true;

        const name = document.getElementById("name");
        const email = document.getElementById("email");
        const nameError = document.getElementById("name-error");
        const emailError = document.getElementById("email-error");

        nameError.textContent = "";
        emailError.textContent = "";

        if (name.value.trim().length < 2) {
            nameError.textContent =
                "Please enter at least 2 characters for your name.";
            isValid = false;
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email.value.trim())) {
            emailError.textContent =
                "Please enter a valid email address.";
            isValid = false;
        }

        if (!isValid) {
            event.preventDefault();
        }
    });
}