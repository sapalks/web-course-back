const request = require('sync-request');

function toResponse(r) {
    let body = {};
    try {
        body = JSON.parse(r.getBody('utf8'));
    } catch (e) {
        try {
            body = JSON.parse(e.body);
        } catch (ex) {
            body = r.body.toString();
        }
    }
    const result = {
        statusCode: r.statusCode,
        headers: r.headers,
        json: body
    };
    return result;
}

function urlStr(url) {
    return typeof url === 'string' ? url : url.href;
}

function get(r) {
    const headers = {};
    if (r.headers) {
        for (let h of Object.keys(r.headers)) {
            headers[h] = r.headers[h];
        }
    }
    const opts = { followRedirects: false, headers: headers };
    const response = request(r.method, urlStr(r.url), opts);
    return toResponse(response);
}

function post(r) {
    const headers = {
        'Content-Type': 'application/json'
    };
    if (r.headers) {
        for (let h of Object.keys(r.headers)) {
            headers[h] = r.headers[h];
        }
    }
    const response = request(r.method, r.url.href, {
        json: r.body,
        headers: headers,
        followRedirects: false
    });
    return toResponse(response);
}

module.exports = {
    get, post
}