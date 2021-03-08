const users = []

// Join user to chat
function userJoin(id, username, room) {
    const user = { id, username, room }
    users.push(user)
    return user
}

const getCurrentUser = (id) => users.find(user => user.id === id)


// User leaves chat
const userLeave = (id) => {
    const index = users.findIndex(user => user.id === id)
    if (index !== -1) return users.splice(index, 1)[0]
}

//Get room users
const getRoomUsers = (room) => users.filter(user => user.room === room)


const getAllUsers = () => users

module.exports = {
    userJoin,
    getCurrentUser,
    userLeave,
    getRoomUsers,
    getAllUsers
}