function teste() {
    const transitionEl = document.getElementsByClassName("transition").item(0);
    transitionEl.classList.add("effect")
}

function redirectToRegister() {
    document.startViewTransition(() => {
        location.href = "/register-user"
    });
}

