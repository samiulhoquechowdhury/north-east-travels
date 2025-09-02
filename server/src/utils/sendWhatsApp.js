const axios = require("axios");

const sendWhatsApp = async (message) => {
  try {
    await axios.post(
      "https://graph.facebook.com/v18.0/YOUR_PHONE_NUMBER_ID/messages",
      {
        messaging_product: "whatsapp",
        to: process.env.ADMIN_PHONE, // admin number
        type: "text",
        text: { body: message },
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.WHATSAPP_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );
    console.log("✅ WhatsApp message sent!");
  } catch (err) {
    console.error(
      "❌ WhatsApp send failed:",
      err.response?.data || err.message
    );
  }
};

module.exports = sendWhatsApp;
