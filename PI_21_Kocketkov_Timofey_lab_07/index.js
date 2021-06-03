const express = require('express');
const app = express();
const path = require('path');
const axios = require('axios');
const fs = require('fs');
const port = 8000;
const {
    Dropbox
} = require('dropbox');

const app_key = 'alf692kt5rqmmfi'
const app_secret = 'o6p4xw44y5oa2wy'

const redirect_uri = 'http://localhost:8000/token'
const token_url = 'https://api.dropbox.com/oauth2/token'

let curr_access_token;

app.set('view engine', 'ejs')

app.use(express.urlencoded({
    extended: true
}));

app.use('/static', express.static('static'))

app.get('/', (req, res) => {
    res.render('index.ejs');
});

app.get('/auth', (function (req, res) {
    res.redirect('https://www.dropbox.com/oauth2/authorize?client_id=' + app_key + '&response_type=code&redirect_uri=' + redirect_uri);
}));

app.get('/token', function ({
    query: {
        code
    }
}, res) {
    axios({
        method: 'post',
        url: token_url,
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
        })
        //console.log(json.data);
        curr_access_token = json.data.access_token;
        //console.log(curr_access_token);
    })
})

app.get('/content', async function (req, res) {
    //console.log(curr_access_token);
    const dbx = new Dropbox({
        accessToken: curr_access_token
    });
    let content = (await dbx.filesListFolder({
        path: ''
    })).result.entries
    folders = [];
    files = [];
    for (var i = 0; i < content.length; i++) {
        if (path.extname(content[i].name) == '') {
            folders.push(content[i]);
        } else {
            files.push(content[i]);
        }
    }
    res.render('content', {
        folders: folders,
        files: files
    })
});

app.get('/download', async function ({
    query: {
        shared_link
    }
}, res) {
    try {
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
    }
    catch (ex) {
        console.log(ex);
    }
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
            .catch((err) => {
                console.log(err);
            });
    });
});

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
})