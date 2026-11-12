# Обновление сайта на сервере

## Собрать версию из GitHub

Выполните команды на сервере в каталоге, куда клонирован репозиторий. Подойдёт Node.js 22 или 24. В примере `/путь/к/danya_rezoner` замените на реальный путь.

```bash
cd /путь/к/danya_rezoner
node -v
git switch main
git pull --ff-only origin main
npm ci --include=dev
npm test
npm run build
```

Если репозитория на сервере ещё нет, клонируйте его один раз с помощью `git clone https://github.com/alexVinter/danya_rezoner.git`. При ошибке на любом шаге сначала устраните её. Готовый сайт лежит в `dist/`, включая HTML каждой страницы, `robots.txt` и `sitemap.xml`.

## Опубликовать сборку

На хостинг загружается всё содержимое `dist/`. Если на сервере уже настроена отдельная папка для публичных файлов, оставьте её корнем сайта и скопируйте сборку в неё. В примере `/var/www/winterlead` замените на текущий корень сайта.

```bash
WEB_ROOT=/var/www/winterlead
sudo rsync -a --exclude='*.html' dist/ "$WEB_ROOT/" &&
sudo rsync -a dist/ "$WEB_ROOT/"
```

Вторая команда обновляет страницы после копирования ресурсов. Сборку обслуживает веб-сервер как статические файлы. Node.js нужен для сборки, а `npm run preview` используется для локальной проверки.

## Маршруты в Nginx

Если используется Nginx, добавьте эти правила в существующий блок `server` для домена. В нём должен быть указан текущий `root`. Если `location /` уже есть, обновите его правило `try_files`. Сохраните действующие настройки HTTPS и отдельное правило `/api/telegram`, если оно настроено.

```nginx
location / {
    try_files $uri/index.html $uri =404;
}

location = /cases/kontur-elba {
    return 301 /;
}

error_page 404 /404.html;
location = /404.html {
    internal;
}
```

Это позволяет адресу `/services/yandex-direct` отдавать собственный HTML услуги. После изменения настроек выполните `sudo nginx -t && sudo systemctl reload nginx`. При последующих обновлениях статических файлов перезагрузка Nginx обычно не нужна.

## Проверить на домене

Когда домен подключён и работает HTTPS, проверьте, что открываются главная, одна услуга и один кейс. В исходном HTML услуги должен быть её собственный `title`. У карты сайта и `robots.txt` должен быть статус 200, у вымышленного адреса — 404.

```bash
curl -fsS https://winterlead.ru/services/yandex-direct | grep -o '<title>[^<]*</title>'
curl -fsSI https://winterlead.ru/sitemap.xml
curl -fsSI https://winterlead.ru/robots.txt
curl -sSI https://winterlead.ru/services/no-such-service
```
