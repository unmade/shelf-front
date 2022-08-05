# Shelf App

This is frontend for a shelf project - a self-hosted file storage.

<img src="https://i.imgur.com/GJF6meP.png" alt="shelf-main" width="1379" alt="App Preview">

## Demo

[https://shelfcloud.herokuapp.com/files](https://shelfcloud.herokuapp.com/files)

The demo version runs on free Heroku instance with no persistent storage.
A dyno restart wipes out all data.

You can login with a test user:

- login: **admin**
- password: **root**

## Development

Install dependencies:

```bash
yarn install
```

Run development server:

```bash
yarn start
```

To generate translation file:

```bash
yarn makelocales
```

### Building a Docker image

Normally, a docker image is built in CI whenever there is a new tag.

To build a docker image locally:

```bash
docker build . -t shelf_front:0.1.0 --build-arg api_base_url=http://backend_hostname
```

Sometimes you don't know your backend url in advance. In this case,
it is better to omit the `api_base_url` arg and build a docker image as is.
Then, you could provide the `API_BASE_URL` env variablie when running docker:

```bash
docker run --rm -p "8080:80" -e "API_BASE_URL=http://example.com" shelf-front:0.1.0
```
