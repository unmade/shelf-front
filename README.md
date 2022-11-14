# Shelf App

This is frontend for a shelf project - a self-hosted file storage.

![App Preview Light Theme](https://i.imgur.com/VPREFxb.png#gh-light-mode-only)

![App Preview Dark Theme](https://i.imgur.com/4A8XD0P.png#gh-dark-mode-only)

## Demo

[https://app.getshelf.cloud](https://app.getshelf.cloud)

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
