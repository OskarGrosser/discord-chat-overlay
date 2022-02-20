import "/socket.io/socket.io.js";
import MessageElement from "/scripts/message-element.js";

const socket = io("/message");
const messages = document.querySelector("output");

socket.on("new", data => {
  const message = new MessageElement();
  message.id = `id-${data.id}`;
  message.author = data.author;
  message.message = data.message;

  messages.append(message);
  message.animate(
    [
      { transform: "translateX(2em)", opacity: "0%" },
      { transform: "translateX(0em)", opacity: "100%" }
    ],
    { duration: 200, easing: "ease-out" }
  );
});
socket.on("edit", data => {
  const message = findMessage(data.id);
  if (message) {
    message.author = data.author;
    message.message = data.message;
    message.animate(
      [
        { backgroundColor: "rgb(245, 221, 114)" },
        { backgroundColor: "inherit" }
      ],
      { duration: 400, easing: "ease-out" }
    );
  }
});
socket.on("delete", data => {
  const message = findMessage(data.id);
  if (message) {
    message.animate([], { duration: 0 }).finished.then(() => message.replaceWith());
  }
});

function findMessage(id) {
  return Array.from(messages.children).find(el => el.id === `id-${id}`);
}