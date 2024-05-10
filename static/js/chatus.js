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
    document.getElementById('selected-room').value = room_id;

};

const getLastRoom = () => {
    document.querySelector('.list-rooms li').click();
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

const sendMessage = async (data) => {
    const response = await fetch(`/${data.room_id}/send-message`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": data.csrfmiddlewaretoken,
        },
        body: JSON.stringify(data)
    });
    await getMessages(data.room_id)
    document.querySelector(".input-send-message").value = "";
};

const deleteRoom = async (room_id, csrf) => {
    const response = await fetch(`/${room_id}/delete-room`, {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": csrf
        },
    });
    window.location.href = '/';
};

document.querySelector(".create-room").addEventListener("submit", (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target).entries());
    createRoom(data);
});

document.querySelector(".send-message").addEventListener("submit", (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target).entries());
    sendMessage(data);
})

getLastRoom();