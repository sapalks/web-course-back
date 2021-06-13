const path = require('path')
const url = require('url')
const {Dropbox} = require('dropbox')
const fs = require('fs')
const fetch = require('node-fetch')

const config = {
    fetch: fetch,
    clientId: 'yx7u57lxzzhhb9q',
    clientSecret: 'cj0paq6da4i9qlz',
    getTokenUri: 'https://api.dropbox.com/1/oauth2/token',
    redirectUrl: 'http://localhost:3000/auth',
    token: null
};

module.exports.home = async (req, res) => {
    res.render('main.ejs', {token: config.token});
};

module.exports.postHome = async (req, res) => {
    res.redirect(`https://www.dropbox.com/oauth2/authorize?client_id=${config.clientId}&response_type=code&redirect_uri=${config.redirectUrl}`);
};

module.exports.auth = async (req, res) => {
    const code = url.parse(req.url, true).query.code;
    const options = {
        body: `grant_type=authorization_code&code=${code}&redirect_uri=${config.redirectUrl}`,
        method: 'post',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + Buffer.from(`${config.clientId}:${config.clientSecret}`, 'utf8').toString('base64')
        }
    };
    fetch(config.getTokenUri, options)
        .then(res => res.json())
        .then(data => {
            config.token = data.access_token;
            console.log(config.token);
            res.redirect('/');
        });
};

module.exports.getFiles = async (req, res) => {
    if (config.token === null) {
        return;
    }
    const dbx = new Dropbox({accessToken: config.token});
    return dbx.filesListFolder({path: ''})
        .then((response) => {
            const ejsModel = ejsFilesModel(response.result.entries);
            res.render('files.ejs', {files: ejsModel.files, folders: ejsModel.folders});
        })
        .catch((err) => {
            console.log(err);
        });
};

module.exports.downloadPage = async (req, res) => {
    if (config.token === null) {
        return;
    }
    res.render('download.ejs');
}

module.exports.download = async (req, res) => {
    if (config.token === null) {
        return;
    }
    const dbx = new Dropbox({accessToken: config.token});
    dbx.sharingGetSharedLinkFile({url: req.body.download_link})
        .then((data) => {
            fs.writeFile(data.result.name, data.result.fileBinary, (err) => {
                if (err) {
                    throw err;
                }
                res.render('done.ejs');
            });
        })
        .catch((err) => {
            console.log(err);
        });
};

module.exports.upload = (req, res) => {
    if (config.token === null) {
        return;
    }
    const dbx = new Dropbox({accessToken: config.token});
    const filename = req.body.filename;
    fs.readFile(filename, (err, contents) => {
        if (err) {
            console.log('Error: ', err);
        }
        dbx.filesUpload({path: '/' + filename, contents})
            .then((response) => {
                res.render('done.ejs');
            })
            .catch((uploadErr) => {
                console.log(uploadErr);
            });
    });
};

module.exports.uploadPage = (req, res) => {
    if (config.token === null) {
        return;
    }
    res.render('upload.ejs');
}


function ejsFilesModel(body) {
    let files = [];
    let folders = [];
    for (let i = 0; i < body.length; i++) {
        let name = body[i].name;
        if (path.extname(name) === '') {
            folders.push(name);
        } else {
            files.push(name);
        }
    }
    return {files, folders};
}

