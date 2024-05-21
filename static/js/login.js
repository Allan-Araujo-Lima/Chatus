function teste() {
    const transitionEl = document.getElementsByClassName("transition").item(0);
    transitionEl.classList.add("effect")
}

function redirectToRegister() {
    document.startViewTransition(() => {
        location.href = "/register-user"
    });
}

async function logIn(data) {
    await fetch('/login', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": data.csrfmiddlewaretoken,
        },
        body: JSON.stringify(data)
    });
    document.startViewTransition(() => {
        location.href = "/home";
    });
}

document.querySelector(".container-login").addEventListener("submit", (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target).entries());
    logIn(data);
})
