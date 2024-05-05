const $chatMessages = document.querySelector(".messages");

const getMessages = async (room_id) => {
    console.log("oi")
    const response = await fetch(`/${room_id}`);
    const html = await response.text();
    $chatMessages.innerHTML = html;
};