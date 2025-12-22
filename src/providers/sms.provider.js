

const sendSMS = async (payload) => {
    const {phoneNumber, message} = payload; 
    if(!phoneNumber || !message) {
        throw new Error(`Invalid SMS payload: ${JSON.stringify(payload)}`);
    }
    // wait a bit to simulate SMS sending
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log(`SMS sent to ${phoneNumber} with message "${message}"`);
}
export {
    sendSMS,
}