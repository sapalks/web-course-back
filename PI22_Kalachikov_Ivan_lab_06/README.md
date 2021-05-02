# Лаботраторная 6 
# ПИбд-22 Калачиков Иван

1. Была реализована аутентификация и регистрация через яндекс (**passport.js** со стратегией **yandex-passoprt**)
1. Было реализовано обновление refresh токенов (**fetch** для отправки запросов к серверу яндекса)
1. Было реализовано веб приложение для авторизации (**ejs** для отрисовки данных)
1. В коде 4 лабы была изменена авторизация запросов

Во время выполнения лабораторной столкнулся с проблемой, что если в callback методе
делать авторизацию еще раз (**passport.authorize()**), то код для получения токенов становится невалидным

Как я догадался, токены с сервера забираются внутри кода стратегии
```
passport.use(
    new YandexStrategy({
            clientID: keys.yandex.clientID,
            clientSecret: keys.yandex.clientSecret,
            callbackURL: keys.yandex.redirect
        },
        async (accessToken, refreshToken, profile, done) => {
            let client = await authController.findOneByYandexId(profile.id);
            if (!client) {
                client = await authController.saveClient(profile.displayName, profile.id)
            }
            done(null, client)
        })
);
```

и еще раз получить по тому же коду мы их не можем, я пробовал получать новый код
(метод остался в контроллере аутентификации), но он все так же выдавал ошибку **Code has expired**

Но если удалить **passport.authorize()** из callback`а, то пользователь не будет записываться в request,
то есть нельзя будет авторизовывать запросы или вообще получить пользователя (**req.user** = null)

Было принято решение записывать токены в пользователя и получать пользователя из реквеста,
а из него уже получать сами токены

```
passport.use(
    new YandexStrategy({
            clientID: keys.yandex.clientID,
            clientSecret: keys.yandex.clientSecret,
            callbackURL: keys.yandex.redirect
        },
        async (accessToken, refreshToken, profile, done) => {
            let client = await authController.findOneByYandexId(profile.id);
            if (!client) {
                client = await authController.saveClient(profile.displayName, profile.id)
            }
            client.accessToken = accessToken
            client.refreshToken = refreshToken
            done(null, client)
        })
);

router.get('/tokens', async (req, res) => {
    res.render('tokens', {
        accessToken: await req.user.accessToken,
        refreshToken: await req.user.refreshToken
    })
})
```