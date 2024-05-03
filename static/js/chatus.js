const $chatMessages = document.querySelector(".messages");

const getMessages = async (room_id) => {
    const reponse = await fetch(`/${room_id}`);
    const html = await reponse.text();
    $chatMessages.innerHTML = html;
    setRoomActive(room_id);
};