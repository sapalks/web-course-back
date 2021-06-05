const Message = require("./message");
const formatDate = require("./utils");

module.exports = Chat;

class Chat {
  chatName;
  subscribers;
  messages;
  admin;
  dateCreation;
  constructor(chatName, userName) {
    this.chatName = chatName;
    this.admin = userName;
    this.subscribers = [];
    this.date = new Date();
    this.messages = [
      new Message(
        "",
        `This channel was created by ${admin} at ${formatDate(date)}`
      ),
    ];
  }
  addSubscriber(userName) {
    this.subscribers.push({ userName });
  }
  deleteSubscriber(userName) {
    let user = this.findSubscribers(userName);
    this.subscribers.splice(this.subscribers.indexOf(user), 1);
  }
  findSubscribers(userName) {
    return this.subscribers.length > 0
      ? this.subscribers.find((x) => x.userName === userName)
      : undefined;
  }
  getChatName() {
    return this.chatName;
  }
  getSubscribers() {
    return this.subscribers;
  }
  getMessages() {
    return this.messages;
  }
}
