const twilio = require("twilio");

const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH);

const sendWhatsApp = async (to, message) => {
  try {
    await client.messages.create({
      from: `whatsapp:${process.env.TWILIO_WHATSAPP}`, // Twilio sandbox number
      to: `whatsapp:${to}`, // user/admin number
      body: message,
    });
    console.log("✅ WhatsApp sent to", to);
  } catch (err) {
    console.error("❌ WhatsApp error:", err.message);
  }
};

module.exports = sendWhatsApp;
