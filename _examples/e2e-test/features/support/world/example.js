const { BaseWorld } = require('./base')
class ExampleWorld extends BaseWorld {

    constructor(_state) {
        super(_state);
    }
    
    ping() {
        this.get('/ping');
    }
}

module.exports = {
    ExampleWorld
}
