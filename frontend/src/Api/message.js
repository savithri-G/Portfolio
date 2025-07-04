// sendMessage.js
// frontend/src/Api/message.js

export const sendMessage = async (form) => {
  try {
    const res = await fetch("https://portfolio-fqog.onrender.com/contact.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    const result = await res.json();
    return result;
  } catch (error) {
    return { success: false, error: "Connection failed" };
  }
};

// Usage example
// import { sendMessage } from './path/to/sendMessage';
