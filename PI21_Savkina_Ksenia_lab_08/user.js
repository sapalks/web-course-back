const users = []

class User {

    create(id, name, room) {
        const user = { id, name, room }
        users.push(user)
        return user
    }
    
    delete(id) {
        const index = users.findIndex(user => user.id === id)
        if (index !== -1) {
            const del_user = users[index]
            users.splice(index, 1)
            return del_user
        }
    }
    
    get(id) {
        return users.find(user => user.id === id)
    }
    
    getAll() {
        return users
    }
    
    getUsersInRoom(room) {
        return users.filter(user => user.room === room)
    }
}

module.exports = new User();