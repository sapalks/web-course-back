const { URL } = require('url');

const { get, post, HttpResponse, HttpRequest } = require('../http/client');

class BaseWorld {
    _baseUrl;
    _state;

    constructor(state, baseUrl = 'http://localhost:3000/') {
        this._state = state;
        this._baseUrl = new URL(baseUrl);
    }

    forget() {
        this._state.response = null;
        this._state.request = null;
    }

    get response() {
        if (this._state.response === null) {
            throw new Error('be sure you did at least one request. response is not defined');
        }
        return this._state.response;
    }

    get request() {
        if (this._state.request === null) {
            throw new Error('be sure you did at least one request');
        }
        return this._state.request;
    }
    

    url(relOrAbsPath) {
        if (relOrAbsPath.startsWith('http')) {
            return new URL(relOrAbsPath);
        }
        const abs = relOrAbsPath.startsWith('/') ? relOrAbsPath : '/' + relOrAbsPath;
        return new URL(abs, this._baseUrl);
    }

    get(url, remember = true) {
        this._state.request = { method: 'GET', url: this.url(url) };
        const response = get(this._state.request);
        if (remember) {
            this._state.response = response;
        }
        return response;
    }

    post(url, body = {}, remember = true) {
        this._state.request = { method: 'POST', url: this.url(url), body: body };
        const response = post(this._state.request);
        if (remember) {
            this._state.response = response;
        }
        return response;
    }

    put(url, body = {}, remember = true) {
        this._state.request = { method: 'PUT', url: this.url(url), body: body };
        const response = post(this._state.request);
        if (remember) {
            this._state.response = response;
        }
        return response;
    }

    delete(url, remember = true) {
        this._state.request = { method: 'DELETE', url: this.url(url) };
        const response = get(this._state.request);
        if (remember) {
            this._state.response = response;
        }
        return response;
    }

}

module.exports = {
    BaseWorld
}