// take an email payload amd attempt to send it 

const sendEmail = async (payload) => {
    const {to, subject, body} = payload;
    if(!to || !subject || !body) {
        throw new Error(`Invalid email payload: ${JSON.stringify(payload)}`);
    }
    // wait a bit to simulate email sending
    await new Promise(resolve => setTimeout(resolve, 1000)); // simulate delay
    console.log(`Email sent to ${to} with subject "${subject}"`);

}

export {
    sendEmail,
}