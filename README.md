# loadtest-k6-main
Этот конфиг позволяет ударить нагрузкой по разным сайтам.
Чем больше CPU у машины и чем толще канал, тем большего эффекта можно добиться.

## Как запускать

Запустите один из скриптов. Например:

```shell
./run-world-payments.sh
./run-smartvote-search.sh
```

## Как настраивать (на примере world.fbk.info)

Скрипт `world-payments.js` обильно комментирован, поясняя, какие приёмы используются
для пробива кеша. Там же можно настраивать длительность теста, количество параллельных воркеров и т.д.

## Мониторинг (на примере world.fbk.info)

* Чтобы убедиться, что запросы пробивают CloudFlare и доходят до nginx-ingress, можно посмотреть логи:
  ```shell
  kubectl -n d8-ingress-nginx logs -f -l app=controller -c controller --tail 0 | grep world.fbk.info
  ```
* Посмотреть нагрузку на `nginx-ingress` можно тут: https://console.cloud.google.com/kubernetes/daemonset/europe-west1-c/fbk-production/d8-ingress-nginx/controller-main/details?project=fbk-production
* Посмотреть нагрузку на бэкенд можно тут: https://console.cloud.google.com/kubernetes/deployment/europe-west1-c/fbk-production/staging/donate-s-frontend/overview?project=fbk-production
