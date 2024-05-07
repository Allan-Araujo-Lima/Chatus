

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

const createRoom = async (data) => {
    const reponse = await fetch(`/crete-room`, {
        method: "POST",
    });
};

function mouseOver(room_id) {
    document.getElementById(room_id).style.border = '15px solid green';
    console.log('oi');
};

function mouseOut(room_id) {
    document.querySelectorAll(".list-rooms li")
    document.getElementById(room_id).style.border = '5px solid black';
    console.log('oi');
};

document.querySelector(".create-room").addEventListener("submit", (event) => {
    event.stopPropagation();
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.target).entries());
    console.log(data);
});