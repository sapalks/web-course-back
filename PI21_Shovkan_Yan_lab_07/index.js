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

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

app.use(express.urlencoded({ extended: true }));
app.use(express.static('views'));
app.use(express.json());

app.listen(port, () => {
    console.log(`Server is working on http://localhost:${port}`);
});

app.get('/index', function(req, res) {
    res.sendFile(__dirname + '/views/index.html');
});

app.post('/index', function(req, res) {
    res.redirect('https://www.dropbox.com/oauth2/authorize?client_id=cad2hfeqxef0di0&response_type=code&redirect_uri=' + REDIRECT_URI);
});

app.get('/auth', function (req, res) {
    const reqUrl = req.url;
    const urlObj = url.parse(reqUrl, true); 
    const queryData = urlObj.query;
    gettoken(res, queryData.code);
});

function gettoken(res, code) {
    const options = {
        body: "grant_type=authorization_code&code=" + code + "&redirect_uri=" + REDIRECT_URI,
        method: 'post',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + Buffer.from('cad2hfeqxef0di0:vw7osbuk0ssxbsv', 'utf8').toString('base64')
        }
    };
    fetch(GET_TOKEN_URI, options)
    .then( res => res.json())
    .then( data => tokeninfo(res, data));
}

function tokeninfo(res, info) {
    res.render('gettoken.html', {access_token: JSON.stringify(info.access_token), expires_in: JSON.stringify(info.expires_in), 
        token_type: JSON.stringify(info.token_type), account_id: JSON.stringify(info.account_id)});
    res.sendFile(__dirname + '/views/gettoken.html');
}

app.get('/getinfo', function(req, res) {
    res.sendFile(__dirname + '/views/getinfo.html');
});

app.get('/upload', function(req, res) {
    res.sendFile(__dirname + '/views/upload.html');
});

app.post('/getfiles', function(req, res) {
    var info = getfiles(req);
    info.then(function(result) {
        var folders = result.folders.join(', ')
        var files = result.files.join(', ')
        res.render('getfiles.html', {folders: folders, files: files});
        res.sendFile(__dirname + '/views/getfiles.html');
    })
});

async function getfiles(req) {
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
    res.sendFile(__dirname + '/views/download.html');
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
    res.sendFile(__dirname + '/views/response.html');
}