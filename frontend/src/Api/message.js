// sendMessage.js
// frontend/src/Api/message.js

export const sendMessage = async (form) => {
  try {
    const res = await fetch("https://portfolio-fqog.onrender.com/contact.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams(form).toString(),
    });

    const result = await res.json();
    return result;
  } catch (error) {
    return { success: false, error: "Connection failed" };
  }
};

// Usage example
// import { sendMessage } from './path/to/sendMessage';
