import "/socket.io/socket.io.js";
import MessageElement from "/scripts/message-element.js";

const socket = io("/message");
const messages = document.querySelector("output");

socket.on("messageCreate", message => {
  const elMessage = new MessageElement();
  elMessage.id = `id-${message.id}`;
  elMessage.author = message.author.username;
  elMessage.message = message.cleanContent;
  if (message.member.displayHexColor) {
    elMessage.style.cssText = `--color:${message.member.displayHexColor};`;
  }

  messages.append(elMessage);
  elMessage.animate(
    [
      { transform: "translateX(2em)", opacity: "0%" },
      { transform: "translateX(0em)", opacity: "100%" }
    ],
    { duration: 200, easing: "ease-out" }
  );
});
socket.on("messageUpdate", (oldMessage, newMessage) => {
  const elMessage = findMessage(newMessage.id);
  if (elMessage) {
    elMessage.author = newMessage.member.displayName;
    elMessage.message = newMessage.cleanContent;
    elMessage.animate(
      [
        { backgroundColor: "rgb(245, 221, 114)" },
        { backgroundColor: "inherit" }
      ],
      { duration: 400, easing: "ease-out" }
    );
  }
});
socket.on("messageDelete", message => {
  const elMessage = findMessage(message.id);
  if (elMessage) {
    elMessage.animate([], { duration: 0 }).finished.then(() => elMessage.replaceWith());
  }
});

function findMessage(id) {
  return Array.from(messages.children).find(el => el.id === `id-${id}`);
}