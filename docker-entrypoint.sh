#! /usr/bin/env sh
set -e

if [ -n ${API_BASE_URL} ]; then
    sed -i "s#http://shelf-back#${API_BASE_URL}#g" /usr/share/nginx/html/dist/index.js
fi

PORT="${PORT:-80}" envsubst '\$PORT' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf

exec "$@"
