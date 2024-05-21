async function registerUser(data) {
    if (!(data['password'] === data['password-confirmation'])) {
        alert('Sua senha não confere, digite novamente.')
    }
    await fetch(`/create-user`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    });
    alert("Sussusususucesso");
    document.startViewTransition(() => {
        location.href = "/"
    });
}
document.querySelector(".container-register").addEventListener("submit", (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target).entries());
    registerUser(data);
})