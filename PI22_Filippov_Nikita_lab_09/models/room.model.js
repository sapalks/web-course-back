class Room {
  roomName;
  subscribers;
  constructor(name) {
    this.roomName = name;
    this.subscribers = [];
  }
  addSubscriber(nickname) {
    this.subscribers.push(nickname)
  }
  deleteSubscriber(nickname) {
    let user = this.findSubscribers(nickname);
    if (user !== undefined) {
      this.subscribers.splice(this.subscribers.indexOf(user), 1);
    }
  }
  findSubscribers(nickname) {
    return this.subscribers.length > 0 ? this.subscribers.find(x => x === nickname) : undefined;
  }
  getRoomName() {
    return this.roomName;
  }
  getSubscribers() {
    return this.subscribers
  }
}

module.exports = Room