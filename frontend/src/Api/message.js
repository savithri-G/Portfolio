// sendMessage.js
export const sendMessage = async (form) => {
  try {
    const res = await fetch("http://localhost/Savi/contact.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
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
