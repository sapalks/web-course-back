const express = require('express')
const app = express()
const port = 3000
const path = require('path')
const url = require('url')
const { Dropbox } = require('dropbox')
const fs = require('fs')
const fetch = require('node-fetch')

const REDIRECT_URI = 'http://localhost:3000/auth'
const GET_TOKEN_URI = 'https://api.dropbox.com/1/oauth2/token'

app.set('views', path.join(__dirname, 'public'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(express.json());

app.listen(port, () => {
    console.log(`Server is working on http://localhost:${port}`);
});

app.get('/main', function(req, res) {
    res.sendFile(__dirname + '/public/main.html');
});

app.post('/main', function(req, res) {
    res.redirect('https://www.dropbox.com/oauth2/authorize?client_id=mhc5ex0c83ub49z&response_type=code&redirect_uri=' + REDIRECT_URI);
});

app.get('/auth', function (req, res) {
    const reqUrl = req.url;
    const urlObj = url.parse(reqUrl, true); 
    const queryData = urlObj.query;
    getToken(res, queryData.code);
});

function getToken(res, code) {
    const options = {
        body: "grant_type=authorization_code&code=" + code + "&redirect_uri=" + REDIRECT_URI,
        method: 'post',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + Buffer.from('aip7d8nrxq3ygxw:d0k583k8sarchio', 'utf8').toString('base64')
        }
    };
    fetch(GET_TOKEN_URI, options)
    .then( res => res.json())
    .then( data => tokenInfo(res, data));
}

function tokenInfo(res, info) {
    res.render('getToken.html', {access_token: JSON.stringify(info.access_token), expires_in: JSON.stringify(info.expires_in), 
        token_type: JSON.stringify(info.token_type), account_id: JSON.stringify(info.account_id)});
    res.sendFile(__dirname + '/public/getToken.html');
}

app.get('/getInfo', function(req, res) {
    res.sendFile(__dirname + '/public/getInfo.html');
});

app.get('/upload', function(req, res) {
    res.sendFile(__dirname + '/public/upload.html');
});

app.post('/getFoldersAndFiles', function(req, res) {
    var info = getFoldersAndFiles(req);
    info.then(function(result) {
        var folders = result.folders.join(', ')
        var files = result.files.join(', ')
        res.render('getFoldersAndFiles.html', {folders: folders, files: files});
        res.sendFile(__dirname + '/public/getFoldersAndFiles.html');
    })
});

async function getFoldersAndFiles(req) {
    const dbx = new Dropbox({ accessToken: req.body.access_token });
    return dbx.filesListFolder({ path: '' })
      .then((response) => {
        var output = allocation(response.result.entries)
        return output;
      })
      .catch((err) => {
        console.log(err);
    });
}

function allocation(body) {
    var files = [];
    var folders = [];
    for(var i = 0; i < body.length; i++) {
        var name = body[i].name;
        if(path.extname(name) == '') {
            folders.push(name);
        } else {
            files.push(name);
        }
    }
    var output = { files, folders };
    return output;
}

app.get('/download', function(req, res) {
    res.sendFile(__dirname + '/public/download.html');
});

app.post('/download', function(req, res) {
    const dbx = new Dropbox({ accessToken: req.body.access_token});
    dbx.sharingGetSharedLinkFile({ url: req.body.shared_link })
    .then((data) => {
        fs.writeFile(data.result.name, data.result.fileBinary, (err) => {
            if (err) { throw err; }
            myResponse(res, data.result.name, 'saved');
        });
    })
    .catch((err) => {
        console.log(err);
    });
});

app.post('/upload', function(req, res) {
    const dbx = new Dropbox({ accessToken: req.body.access_token});
    const filename = req.body.filename;
    fs.readFile(path.join(__dirname, '/' + filename), (err, contents) => {
        if (err) {
          console.log('Error: ', err);
        }
        dbx.filesUpload({ path: '/' + filename, contents })
        .then((response) => {
            myResponse(res, filename, 'uploaded');
        })
        .catch((uploadErr) => {
            console.log(uploadErr);
        });
    });
});

function myResponse(res, filename, operation) {
    res.render('response.html', {response: filename, operation: operation});
    res.sendFile(__dirname + '/public/response.html');
}
