

const sendWebhook = async (payload) => {
    const {url, event, data} = payload;
    if(!url || !event || !data) {
        throw new Error(`Invalid webhook payload: ${JSON.stringify(payload)}`);
    }
    // wait a bit to simulate webhook sending
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log(`Webhook sent to ${url} for event "${event}" with data: ${JSON.stringify(data)}`);
}   

export {
    sendWebhook,
}