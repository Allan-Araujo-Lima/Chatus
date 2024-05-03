const getMessages = async (room_id) => {
    const reponse = await fetch(`/${room_id}`);
    const html = await reponse.text();

    console.log(html)
};

getMessages(8);