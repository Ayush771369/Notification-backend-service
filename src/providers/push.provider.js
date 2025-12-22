

const sendPush = async (payload) => {
    const {devicetoken, title, message} = payload;
    if(!devicetoken || !title || !message) {
        throw new Error(`Invalid push payload: ${JSON.stringify(payload)}`);
    }   
    // wait a bit to simulate push notification sending
    await new Promise(resolve => setTimeout(resolve, 1000)); // simulate delay
    console.log(`Push notification sent to device ${devicetoken} with title "${title}" and message "${message}"`);
}

export {
    sendPush,
}