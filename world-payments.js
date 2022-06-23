import http from "k6/http";

const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
const charactersLength = characters.length;

function randomString(length) {
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

export let options = {
    vus: 500,
    duration: '5m',

    // Можно раскомментировать этот фрагмент, чтобы бить мимо CF прямо в Nginx.
    /*hosts: {
        'survey.navalnyteam.com:443': '51.38.35.219:443',
    },*/
};

export default function() {
    // Передаём случайные параметры URL-запроса, чтобы нейтрализовать CloudFlare.
    // Если nginx-ingress будет игнорировать неизвестные параметры URL, то он сможет закешировать ответ.
    let response = http.get("https://survey.navalnyteam.com/?" + randomString(3) + '=' + randomString(10), {
        headers: {
            // web- front возвращает заголовок "Vary: Accept-Encoding". Это значит, что
            // если клиент отправляет другой Accept-Encoding, это будет кеш-промах, и запрос
            // пройдёт в бэкенд
            'Accept-Encoding': randomString(5),
        }
    });
};
