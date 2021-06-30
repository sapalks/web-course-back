const fetch = require('node-fetch')
const clientId = '0d6ab1c267fd4ca4861f49e1ba561f12'
const clientSecret = 'c7e5718556b54b59ae31f48302231a1e'
let responseRefreshToken
let responseAccesToken
let responseUser
let lifetime
let type

class AuthController {
    

    index = (req, res) => {
        res.render('index.ejs');
    }

    logout = (req, res) => {
        req.logout();
        res.redirect('/index')
        responseRefreshToken = null
        responseAccesToken = null
        responseUser = null;
        lifetime = null
        type = null
    }

    authorization = async (req, res) => {
        const query = {
            body: `grant_type=authorization_code&client_id=${clientId}&client_secret=${clientSecret}&code=${req.query.code}`,
            method: 'post'
        };

        await fetch('https://oauth.yandex.ru/token', query)
            .then(res => res.json())
            .then(data => { responseAccesToken = data.access_token; responseRefreshToken = data.refresh_token; })

        await fetch(`https://login.yandex.ru/info?oauth_token=${responseAccesToken}`, query)
            .then(res => res.json())
            .then(data => { responseUser = data })
        
        res.redirect('/account');
    }

    account = (req, res) => {
        res.render('account.ejs', { access_token: responseAccesToken, refresh_token: responseRefreshToken, user: responseUser })
    }

    updateToken = async (req, res) => {
        if (responseRefreshToken != null) {
            const query = {
                body: `grant_type=refresh_token&refresh_token=${responseRefreshToken}&client_id=${clientId}&client_secret=${clientSecret}`,
                method: 'post'
            }

            await fetch('https://oauth.yandex.ru/token', query)
                .then(res => res.json())
                .then(data => { responseAccesToken = data.access_token; responseRefreshToken = data.refresh_token; lifetime = data.expires_in; type = data.token_type; })
        }
        res.redirect('/account')
    }

}
module.exports = new AuthController()