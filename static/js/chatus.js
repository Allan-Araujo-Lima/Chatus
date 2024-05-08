const $chatMessages = document.querySelector(".messages");

const setRoomActive = (room_id) => {
    document
        .querySelectorAll(".list-rooms li")
        .forEach((el) => el.classList.remove("active"));

    document.querySelector(`#room-${room_id}`).classList.add("active");
};

const getMessages = async (room_id) => {
    const response = await fetch(`/${room_id}`);
    const html = await response.text();
    $chatMessages.innerHTML = html;
    setRoomActive(room_id);
};

const getLastRoom = () => {
    document.querySelector(".list-rooms l1").click();
};

const createRoom = async (data) => {
    const response = await fetch('/create-room', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": data.csrfmiddlewaretoken,
        },
        body: JSON.stringify(data),
    });
    const html = await response.text();
    const $listRooms = document.querySelector(".list-rooms");
    $listRooms.insertAdjacentHTML("afterbegin", html);
    const modal = bootstrap.Modal.getInstance(document.querySelector(".modal"));
    modal.hide();
    document.querySelector(".create-room").reset();
    getLastRoom();
};

document.querySelector(".create-room").addEventListener("submit", (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target).entries());
    createRoom(data);
});
getLastRoom();

const sendMessage = async (data) => {

};

document.querySelector(".send-message").addEventListener("submit", (e) => {
    e.preventDefault();
    e.stopPropagation();
    const data = Object.fromEntries(new FormData(e.target).entries());
    console.log(data);
});