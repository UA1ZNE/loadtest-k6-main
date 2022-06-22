import http from "k6/http";

const characters = '0123456789';
const charactersLength = characters.length;

function randomNumber(length) {
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

export let options = {
    vus: 20000,
    duration: '10m',
    hosts: {
        'cik-api.navalny.com:443': '35.187.32.208:443',
    },
};

export default function() {
    // Текст: "Фрязино, Проспект Мира <число>/<число>, корп. <число>, стр. <число>"
    let response = http.get("https://cik-api.navalny.com/api/v1/addresses?query=%D0%A4%D1%80%D1%8F%D0%B7%D0%B8%D0%BD%D0%BE,%20%D0%9F%D1%80%D0%BE%D1%81%D0%BF%D0%B5%D0%BA%D1%82%20%D0%9C%D0%B8%D1%80%D0%B0+" + randomNumber(5) + '/' + randomNumber(5) + '+%D1%81%D1%82%D1%80.+' + randomNumber(3) + '+%D0%BA%D0%BE%D1%80%D0%BF.+' + randomNumber(3));
};
