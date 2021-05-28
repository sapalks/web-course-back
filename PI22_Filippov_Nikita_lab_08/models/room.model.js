class Room {
    roomName;
    subscribers;
    constructor(name) {
      this.roomName = name;
      this.subscribers = [];
    }
    addSubscriber(res, nickname) {
      this.subscribers.push({ res, nickname })
    }
    clearSubscribers() {
      this.subscribers = []
    }
    deleteSubscriber(nickname) {
      let user = this.findSubscribers(nickname);
      this.subscribers.splice(this.subscribers.indexOf(user), 1);
    }
    findSubscribers(nickname) {
      return this.subscribers.length > 0 ? this.subscribers.find(x => x.nickname === nickname) : undefined;
    }
    getRoomName() {
      return this.roomName;
    }
    getSubscribers() {
      return this.subscribers
    }
  }

  module.exports = Room