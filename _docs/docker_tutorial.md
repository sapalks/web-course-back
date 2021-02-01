# База знаний по Docker

![](https://techrocks.ru/wp-content/uploads/2019/04/Docker.png)

# Что такое Docker?

**Docker** — программное обеспечение для автоматизации развёртывания и управления приложениями в средах с поддержкой [контейнеризации](https://ru.wikipedia.org/wiki/%D0%9A%D0%BE%D0%BD%D1%82%D0%B5%D0%B9%D0%BD%D0%B5%D1%80%D0%B8%D0%B7%D0%B0%D1%86%D0%B8%D1%8F). Позволяет «упаковать» приложение со всем его [окружением](https://ru.wikipedia.org/w/index.php?title=%D0%9E%D0%BF%D0%B5%D1%80%D0%B0%D1%86%D0%B8%D0%BE%D0%BD%D0%BD%D0%BE%D0%B5_%D0%BE%D0%BA%D1%80%D1%83%D0%B6%D0%B5%D0%BD%D0%B8%D0%B5&action=edit&redlink=1) и зависимостями в контейнер, который может быть перенесён на любую [Linux](https://ru.wikipedia.org/wiki/Linux)-систему с поддержкой [cgroups](https://ru.wikipedia.org/wiki/Cgroups) в [ядре](https://ru.wikipedia.org/wiki/%D0%AF%D0%B4%D1%80%D0%BE_Linux), а также предоставляет среду по управлению контейнерами.

На сегодняшний день умеет работать на Linux, Windows и Mac.

# Чего в нем крутого и какие минусы?
## Плюсы:
- Изоляция окружения и ресурсов между приложениями
- Абстрагирование от машины разработчика. Если код запускается в docker-образе у тебя на ПК - с вероятностью 99% будет работать у коллег и на сервере
- Масштабирование - даже на одной машине можно запустить несколько контейнеров, а используя средства оркестрирования, можно делать это автоматически и на пуле серверов.
- Легкость. Это не виртуальная машина в привычном понимании. Занимает меньше места, использует меньше ресурсов.
- Community - есть куча готовых образов
## Минусы:
- Замороченная настройка, особенно при масштабировании и больших нагрузках
- Еще одна система, за которой нужно следить и администрировать - она может нещадно сжирать место на диске
- Производительность - она все же чуть ниже, чем без использования контейнеров

# Что такое Docker Compose?

**Docker Compose** - штука, которая позволяет работать с docker-контейнерами проще. Позволяет описывать и запускать несколько связанных приложений одной командой, то есть строить инфраструктуру в рамках одного ПК.

**Ну, и он просто удобный.**

# Реестры/репозитории с образами

Каждый docker-образ можно опубликовать в тот или иной реестр образов (по умолчанию это hub.docker.com).
По логике работы это похоже на репозиторий с кодом. Можно делать pull, push, можно делать различные теги (аналог веток и тего в гит).

hub.docker.com позволяет публиковать сколько угодно публичных образов и только один бесплатный приватный (по аналогии с github.com)

По умолчанию, все образы публикуются как публичные, поэтому рекомендую сменить эту настройку в настройках аккаунта.

## Название образа

Название образа состоит из 3х частей:

- Пользователь, например, `sapalks`
- Название образа, например, `ping`
- Тег, например, `latest` - задается по умолчанию.

Тег является инструментом версионирования.
Пример полного наименования образа `sapalks/ping:latest`

# Как установить Docker и Docker Compose
## Windows

Если у вас Windows 10 Pro, Enterprise или Education (версии, которые поддерживают виртуализацию), вы можете установить полноценную версию [Docker for Windows](https://docs.docker.com/docker-for-windows/install/).

Если установить ее не удалось, то есть [Docker Toolbox on Windows](https://docs.docker.com/toolbox/toolbox_install_windows/). Это VirtualBox + образ линухи + конфигурация системы такая, что образы docker’a запускаются именно на этой VM внутри VirtualBox.
Это накладывает некоторые ограничения:

- При запуске системы нужно запускать Kitematic (ярлык будет на рабочем столе)
- Нужно открывать нужные порты в настройках VM внутри VirtualBox для доступа по localhost:8000, например.

Docker Compose устанавливается автоматически.

## Linux

Отдельно ставим docker, отдельно ставим docker-compose по официальным мануалам.

## Mac

По аналогии с Windows есть полноценная версия - [ссылка на нее.](https://docs.docker.com/docker-for-mac/install/)
И если не получится установить, то есть [Docker Toolbox on Mac](https://docs.docker.com/toolbox/toolbox_install_mac/).

Docker Compose устанавливается автоматически.

## Аккаунт на hub.docker.com и авторизация

Скорее всего, при установке уже пришлось зарегистрироваться на hub.docker.com

Теперь нужно авторизоваться на локальной машине. Вводим в консоль:

    docker login

Указываем авторизационные данные и можем начинать работу.

# Как начать работу?

Я настоятельно рекомендую потратить вечер и пройти по [мануалу на хабре по поводу Docker.](https://habr.com/ru/post/310460/)
В этом мануале рассказывается почти про всё, что я рассказываю в текущей инструкции.

Также, специально для node.js разработчиков рекомендую затем прочитать [статью с деталями именно для node.js.](https://habr.com/ru/company/ruvds/blog/440656/)

## Docker

В двух словах:

- Берем проект, которых хотим завернуть в docker-образ
- Добавляем в него `dockerfile`
- Прописываем в нем на базе какого образа хотим работать, например `FROM node:12` означаем, что мы берем образ linux с 12 версией node.js
- Задаем директорию, с которой будем работать через `WORKDIR`
- Указываем в нем, какие файлы нужно поместить в этот образ и какие команды выполнить для настройки окружения. Команды `RUN`, `ADD`, `COPY`
- Указываем в нем, как запустить наше приложение - блок `CMD` или `ENTRYPOINT`

На чистом docker собираем образ:

    docker build -t your_name/image_name .

Запускаем его:

    docker run --name testapp -p 80:3016 your_name/image_name

где `testapp` имя нашего контейнера, 
`-p 80:3016` говорит, что мы “вытаскиваем” порт 3016 нашего приложения на 80 порт хост-машины

## Docker Compose

Описываем docker-compose.yml файл и 
И делаем тоже самое при помощи `docker-compose`:

    docker-compose up --build

где `up` запускает кластер,
а флаг `--build` говорит о том, что приложение нужно пересобрать.


## Синтаксис dockerfile и docker-compose файлов
- [Синтаксис dockerfile](https://docs.docker.com/engine/reference/builder/)
- [Синтаксис docker-compose файла](https://docs.docker.com/compose/compose-file/)
## Примеры dockerfile и docker-compose.yml

Рассмотрим на примере приложения [al-server](https://github.com/B2BFamily/al-server) - web приложение на node.js, которое обрабатывает http запросы.

**dockerfile**

    FROM node:12-alpine
    # Папка приложения
    ARG APP_DIR=app
    RUN mkdir -p ${APP_DIR}
    WORKDIR ${APP_DIR}
    # Установка зависимостей
    COPY package*.json ./
    RUN npm install ${INSTALL_FLAG}
    # Копирование файлов проекта
    COPY . .
    # Уведомление о порте, который будет прослушивать работающее приложение
    # EXPOSE 8016
    # Запуск проекта
    CMD ["npm", "start"]

**docker-compose.yml**

    version: '3'
    services:
      web:
        build:
          context: .
          args:
           INSTALL_FLAG: ${INSTALL_FLAG}
        image: b2bfamily/al-server:${GIT_BRANCH:-local}
        ports:
          - 8000:8016

**docker-compose.prod.yml (конфигурация, которая заливается на сервер, выкачивает и запускает приложение)**

    version: '3'
    services:
      web:
        image: b2bfamily/al-server:${GIT_BRANCH}
        ports:
          - ${APP_NETWORK_PORT:-3001}:8016
        restart: always

Переменные `${INSTALL_FLAG}` и `${GIT_BRANCH}` берутся из .env файла.

**.env (пример файла)**

    GIT_BRANCH=dev
    INSTALL_FLAG=--production


# Какие команды нужно знать обязательно?
## Docker

**Самая важная команда**

    docker --help

**docker build - сборка образа**
Пример:

    docker build --build-arg APP_DIR=var/app -t nickolaykazakov/node-app:V1 .

**docker run - запуск контейнера**
Пример:

    docker run -p 8000:3000 -d --name node-app nickolaykazakov/node-app:V1

**docker stop - остановка контейнера**
Указывается name или container id в качестве аргумента

**docker push - публикация контейнера в удаленный репозиторий**

    docker push nickolaykazakov/node-app:V1

**docker pull - получение нужной версии образа из удаленного репозитория**

    docker pull nickolaykazakov/node-app:V1

**docker ps - список запущенных контейнеров**

**docker images - список образов на машине**
Нужно, чтобы например, посмотреть имя образа, которое хочешь удалить.

**docker container ls - список контейнеров на машине**

**docker rm - удаление контейнера**
Указывается name или container id в качестве аргумента

**docker rmi - удаление образа с локального хранилища**

**docker attach - подключаемся к io контейнера после его запуска, чтобы вывод**
Удобно, если запустили контейнер с флагом `-d`, а понадобилось посмотреть вывод (например вывод http сервера, запущенного в контейнере)

**docker exec - выполняем bash команду на контейнере**
Удобно, чтобы, например, посмотреть процессы, которые запущены внутри контейнера, сделать ping или запустить что-то.

**docker system prune - очистка неиспользуемых образов, контейнеров и дисков**

- флаг `-f` позволяет не спрашивать подтверждение
- флаг `-a` удаляет не только “не нужные”, но и все неиспользуемые на данный момент образы
- флаг `--volumes` удаляет также неиспользуемые диски/хранилища

## Docker Compose

Почти все команды `docker` дублируются в `docker-compose`, может быть кроме `docker attach`. И лучше и проще использовать команды именно `docker-compose`

По-прежнему,
**Самая важная команда**

    docker-compose --help

По каждой команде можно получить подробную информацию, например:

    docker-compose pull --help

Флаг `-f` с любой командой позволяет указать docker-compose файл, отличный от `docker-compose.yml`
Пример:

    docker-compose -f docker-compose.prod.yml build

при сборке будет использоваться файл `docker-compose.prod.yml`, вместо стандартного

**docker-compose up - запуск кластера**
Параметр `-d` позволяет запускать кластер и не подключаться к io исполняемого контейнера.
Параметр `--build` показывает, что нужно собрать образы кластера перед запуском. Удобно в процессе разработки.

**docker-compose down - остановка всего кластера и удаление всех контейнеров**

**docker-compose stop - остановка кластера или конкретного контейнера**

**docker-compose start - запуск остановленного кластера или конкретного контейнера**

**docker-compose build - сборка всего кластера**
Также, можно использовать `docker-compose build service1`, чтобы собрать только `service1` из описанного кластера.
Есть `--build-arg key=val`, как и в `docker build`. Важно, что они пробрасываются напрямую в конфиг `dockerfile` и не подставятся в переменные, которые используются в `docker-compose.yml`
Флаг `--no-cache` может быть полезен, если в описание нужно пересобрать образ без использования кеша.

**docker-compose pull - получение актуальных версий образов, описанных в \*.yml файле** 

**docker-compose push - публикация всех образов, собранных локально и описанных в \*.yml файле  в удаленный репозиторий**

**docker-compose ps - получение списка запущенных контейнеров через docker-compose**

**docker-compose exec - выполняем bash команду на контейнере**
Параметром принимает имя сервиса, описанное в *.yml файле, например:

    docker-compose exec service_1 df -h

Вернет информацию по дисковому пространству внутри исполняемого контейнера service_1

# Особенности
## .env файл и пробелы

Нельзя использовать пробелы между key, = и value в .env файле.
Так плохо:

    GIT_BRANCH = dev

Так хорошо:

    GIT_BRANCH=dev
## .env файл и значения USERNAME, PASSWORD и другие

Не стоит использовать environment переменные типа `USERNAME` или `PASSWORD` в своих приложениях и, соответственно, в .env файле.

Это может очень сильно поломать работу docker или работу в github workflow при сборке или публикации проекта.

Лучше использовать эти же переменные, но с префиксами, которые, к тому же, лучше объясняют какой смысл несут эти переменные. Например, `AMO_USERNAME` и `AMO_PASSWORD`.

## Очистка места на диске

По мере работы, обновлений образов, место на диске будет заниматься устаревшими контейнерами, образами и дисками.
Важно удалять эти данные, особенно на production серверах.

Базово, это делает упомянутая выше команда:

    docker system prune

Для использования на сервере лучше использовать флаг `-f`:

    docker system prune -f

Также, на сервере хорошо бы добавить команду в cron. 
Переход в редактирование:

    crontab -e

Строка, которую добавляем:

    0 1 * * * /usr/bin/docker system prune -f
## Перезапуск контейнера

В *.yml файле можно прописать `restart: always`, что означает, что Docker Compose будет перезапускать контейнер при любой ситуации.
Есть несколько других вариантов значения параметра `restart`, почитать [можно здесь](https://docs.docker.com/compose/compose-file/#restart).

## .dockerignore

Аналогично .gitignore-файлам содержит информацию о том, какие файлы не нужно копировать в docker-образ при выполнении команды `COPY . .`

Пример моего текущего файла:

    # Logs
    logs
    *.log
    # Runtime data
    pids
    *.pid
    *.seed
    # Directory for instrumented libs generated by jscoverage/JSCover
    lib-cov
    # Coverage directory used by tools like istanbul
    coverage
    # Grunt intermediate storage (http://gruntjs.com/creating-plugins#storing-task-files)
    .grunt
    # node-waf configuration
    .lock-wscript
    # builded files
    build
    # Dependency directory
    # https://www.npmjs.org/doc/misc/npm-faq.html#should-i-check-my-node_modules-folder-into-git
    node_modules
    src/*.spec.js
    kubernetes
    # md files
    *.md
    # github workflow files
    .github
    # git files
    .git
    # gitignore file
    .gitignore
    # dockerignore file
    .dockerignore
    # docker-compose files
    docker-compose*.yml
    # dockerfile
    dockerfile
## alpine-образы

Охуенно маленькие, с выпиленными лишними утилитами образы.
Есть просто `alpine` образ - очень мелкий образ linux.
На базе него, например, есть образ `node:12-alpine`, по факту `alpine`-образ, на который накатили `node.js`

Для сравнения, на сегодняшний день, размер
**alpine:latest VS ubuntu:latest  = 5.59MB VS 64.2MB**

Поэтому, старайтесь в своей работе использовать именно `alpine`-версии образов.

## Multy-stage building или многоступенчатый процесс сборки образов

Основная идея - берем полноценный образ, собираем проект, получаем результат.
Берем новый образ (легкий, без лишний зависимостей) и копируем файлы в него.

Результат - итоговый образ весит на порядок меньше, чем мог бы.

Пример:    

    FROM node:8 As build
    # Папки
    RUN mkdir /app && mkdir /src
    WORKDIR /src
    # Установка зависимостей
    COPY package*.json ./
    RUN npm install
    # Для использования в продакшне
    # RUN npm install --production
    # Копирование файлов проекта и сборка проекта
    COPY . .
    RUN npm run build:production
    
    # В результате получается образ, состоящий из одного слоя
    FROM node:alpine
    # Копируем собранные файлы из папки build в папку app
    COPY --from=build ./src/build/* /app/
    ENTRYPOINT ["/app"]
    CMD ["--help"]


## Timeout сборки образа через docker build и docker-compose build

Может так случиться, что образ собирается долго - больше пары минут, например, если мы говорим про сборку без кеша (во время публикации через CI происходит именно такая сборка).
Тогда процесс сборки может упереться в timeout этого процесса, что может “сломать” публикацию приложения через github actions.

Что нужно сделать? - Задать environment переменные перед сборкой:

    DOCKER_CLIENT_TIMEOUT: 180
    COMPOSE_HTTP_TIMEOUT: 180

Время (в секундах) можно менять произвольно, здесь значения, которые достаточны для уже существующих проектов.



## How to install docker and docker-compose to ubuntu 18.04 server

https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-on-ubuntu-18-04

https://www.digitalocean.com/community/tutorials/how-to-install-docker-compose-on-ubuntu-18-04-ru

