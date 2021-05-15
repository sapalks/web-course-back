const express = require('express');
const app = express();
const port = 3000;
const axios = require('axios');
const path = require('path');
const fs = require('fs');
const {
    Dropbox
} = require('dropbox');

const app_key = '3ekz351hmzzqern'
const app_secret = 'hixtbfb6109d5ro'
const redirect_uri = 'http://localhost:3000/token'
const get_token_uri = 'https://api.dropbox.com/oauth2/token'

let curr_access_token;

app.set('view engine', 'ejs')

app.use(express.urlencoded({
    extended: true
}));

app.use('/static', express.static('static'))

app.get('/', (req, res) => {
    res.render('index.ejs');
});

app.get('/authDropBox', (function (req, res) {
    res.redirect('https://www.dropbox.com/oauth2/authorize?client_id=' + app_key + '&response_type=code&redirect_uri=' + redirect_uri);
}));

app.get('/token', function ({
    query: {
        code
    }
}, res) {
    axios({
        method: 'post',
        url: get_token_uri,
        data: 'grant_type=authorization_code&code=' + code + '&redirect_uri=' + redirect_uri,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + Buffer.from(app_key + ':' + app_secret, 'utf8').toString('base64')
        }
    }).then(json => {
        res.render('token', {
            code: code,
            access_token: json.data.access_token,
            expires_in: json.data.expires_in,
            token_type: json.data.token_type,
            account_id: json.data.account_id
        })
        curr_access_token = json.data.access_token;
    })
})

app.get('/filesAndFolders', async function (req, res) {
    const dbx = new Dropbox({
        accessToken: curr_access_token
    });
    let queryFilesListFolder = (await dbx.filesListFolder({
        path: ''
    })).result.entries
    folders = [];
    files = [];
    for (var i = 0; i < queryFilesListFolder.length; i++) {
        if (path.extname(queryFilesListFolder[i].name) == '') {
            folders.push(queryFilesListFolder[i]);
        } else {
            files.push(queryFilesListFolder[i]);
        }
    }
    res.render('filesAndFolders', {
        folders: folders,
        files: files
    })
});

app.get('/download', async function ({
    query: {
        shared_link
    }
}, res) {
    const dbx = new Dropbox({
        accessToken: curr_access_token
    });
    let sharedLink = (await dbx.sharingCreateSharedLink({
        path: shared_link
    })).result.url;
    dbx.sharingGetSharedLinkFile({
            url: sharedLink
        })
        .then((data) => {
            fs.writeFile(data.result.name, data.result.fileBinary, (err) => {
                if (err) {
                    throw err;
                }
            });
        })
    res.render('download', {
        shared_link: shared_link
    })
});

app.get('/uploadFile', function (req, res) {
    res.render('uploadFile')
})

app.get('/upload', function ({
    query: {
        filename
    }
}, res) {
    const dbx = new Dropbox({
        accessToken: curr_access_token
    });
    fs.readFile(path.join(__dirname, '/' + filename), (err, contents) => {
        if (err) {
            throw err;
        }
        dbx.filesUpload({
                path: '/' + filename,
                contents
            })
            .then(json => {
                res.render('upload', {
                    filename: filename
                })
            })
            .catch((uploadErr) => {
                console.log(uploadErr);
            });
    });
});

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
})