const users = []

class User {
    createUser(id, username, room) {
        const user = { id, username, room }
        users.push(user)
        return user
    }
    
    deleteUser(id) {
        const index = users.findIndex(user => user.id === id)
        if (index !== -1) {
            const user = users[index]
            users.splice(index, 1)
            return user
        }
    }
    
    getUser(id) {
        return users.find(user => user.id === id)
    }
    
    getUsers() {
        return users
    }
    
    getRoomUsers(room) {
        return users.filter(user => user.room === room)
    }
}

module.exports = new User();