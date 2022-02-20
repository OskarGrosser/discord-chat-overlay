const template = (function createTemplate() {
  const template = document.createDocumentFragment();

  const style = document.createElement("style");
  style.textContent =
`:host {
  padding-block: .4em;
  padding-inline: .8em;
  display: block;
  background-color: var(--bg-color, #424549);
}
:host(:hover) {background-color: var(--bg-color-hover, #36393e)}

#author {
  font-size: larger;
  font-weight: bolder;
  color: var(--author-color, white);
}
#message {
  color: var(--color, white);
  line-height: 1.4;
  white-space: pre-wrap;
  line-break: anywhere;
}`;
  template.append(style);

  const header = document.createElement("div");
  header.setAttribute("id", "header");
  template.append(header);

  const author = document.createElement("span");
  author.setAttribute("id", "author");
  header.append(author);

  const body = document.createElement("div");
  body.setAttribute("id", "body");
  template.append(body);

  const message = document.createElement("span");
  message.setAttribute("id", "message");
  body.append(message);

  return template;
})();

class MessageElement extends HTMLElement {
  #shadow;

  constructor() {
    super();

    this.#shadow = this.attachShadow({ mode: "closed" });
    this.#shadow.append(template.cloneNode(true));
  }

  get author() {
    return this.#shadow.getElementById("author").textContent;
  }
  set author(value) {
    this.#shadow.getElementById("author").textContent = String(value);
  }

  get message() {
    return this.#shadow.getElementById("message").textContent;
  }
  set message(value) {
    this.#shadow.getElementById("message").textContent = String(value);
  }
}
customElements.define("message-element", MessageElement);

export default MessageElement;