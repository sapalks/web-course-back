const fetch = require('node-fetch')
const dropboxConfig = require('../configs/dropbox.config')
const { Dropbox } = require('dropbox')
const fs = require('fs')
const path = require('path')

let acs_token;
let type;
let lifetime;
let files = [];
let folders = [];
let resultUpload;
let currentDir = '';

exports.main = (req, res) => {
    res.render('main.ejs');
};
exports.logout = (req, res) => {
    res.redirect('/main');
    acs_token = null;
    type = null
    lifetime = null
    files = [];
    folders = [];
    resultUpload = null
    currentDir = '';
}
exports.enter = (req, res) => {
    res.redirect(`https://www.dropbox.com/oauth2/authorize?client_id=${dropboxConfig.APP_KEY}&response_type=code&redirect_uri=${dropboxConfig.REDIRECT_URI}`)
}
exports.auth = async (req, res) => {
    const query = {
        body: `grant_type=authorization_code&code=${req.query.code}&client_id=${dropboxConfig.APP_KEY}&client_secret=${dropboxConfig.APP_SECRET}&redirect_uri=${dropboxConfig.REDIRECT_URI}`,
        method: 'post',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };

    await fetch('https://api.dropbox.com/oauth2/token', query)
        .then(res => res.json())
        .then(data => { acs_token = data.access_token; lifetime = data.expires_in; type = data.token_type; })
    res.redirect('/token');
}
exports.token = (req, res) => {
    res.render('token.ejs', { access_token: acs_token, lifetime: lifetime, type: type, files: files, folders: folders, resultUpload: resultUpload });
}

exports.getFiles = async (req, res) => {
    await getFilesForCurrentDirectory(req.query.newPath);
    res.redirect('/token');
}

async function getFilesForCurrentDirectory(filepath) {
    const dbx = new Dropbox({ accessToken: acs_token });
    if (filepath.length > 0) {
        let normalPath = path.normalize(filepath);
        currentDir = currentDir + '/' + normalPath
    }
    else {
        currentDir = '';
    }
    let queryFilesListFolder = (await dbx.filesListFolder({ path: currentDir })).result.entries
    folders = [];
    files = [];
    queryFilesListFolder.forEach(entrie => {
        if (path.extname(entrie.name) == '') {
            folders.push(entrie)
        } else {
            files.push(entrie)
        }
    });
}

exports.download = async (req, res) => {
    let path = req.query.path
    const dbx = new Dropbox({ accessToken: acs_token });
    let sharedLink = (await dbx.sharingCreateSharedLink({ path: path })).result.url;
    dbx.sharingGetSharedLinkFile({ url: sharedLink })
        .then((data) => {
            fs.writeFile(data.result.name, data.result.fileBinary, (err) => {
                if (err) { throw err; }
            });
        })
}

exports.upload = async (req, res) => {
    const dbx = new Dropbox({ accessToken: acs_token });
    const filename = req.body.filename;
    let normalPath;
    if (filename.length > 0) {
        normalPath = path.normalize(filename);
    } else {
        console.error("Пустой путь")
        return;
    }
    if (fs.existsSync(normalPath)) {
        let data;
        fs.readFileSync(normalPath, (err, contents) => {
            if (err) {
                console.error(err);
            }
            data = contents
        });
        await dbx.filesUpload({ path: currentDir + '/' + path.basename(normalPath), data })
            .catch((uploadErr) => {
                resultUpload = 'Ошибка'
                console.log(uploadErr);
            })
        resultUpload = 'Успешно';
    }
    res.redirect('/token');
}
