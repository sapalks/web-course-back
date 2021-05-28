
class Room {
  
    roomId
    users

    constructor(roomId) {
        this.roomId = roomId
        this.users = []
    }

    getRoomId() {
        return this.roomId
    }

    createUser(res, username) {
        const user = { res, username }
        this.users.push(user)
    }

    deleteUser(username) {
        const index = this.users.indexOf(this.getUser(username))
        if (index !== -1) {
            this.users.splice(index, 1)
        }
    }

    getUser(username) {
        return this.users.find(user => user.username === username)
    }

    getUsers() {
        return this.users
    }
}

module.exports = Room