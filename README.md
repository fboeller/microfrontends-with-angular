# Microfrontends with Angular

## Local development setup

```
$ git clone https://github.com/fboeller/microfrontends-with-angular.git
$ cd microfrontends-with-angular
$ npm install
$ npm start
```

A visit to `localhost:4200` shows the application.

## Bookings local development

Serve the bookings microfrontend inside the train-platform application (does not support live-reload for microfrontend):
```
npm start train-platform
npm run ng run bookings:build:local-web-components && npx http-server projects/bookings/dist --port 4201
```

Serve the bookings microfrontend in isolation using the angular dev server:
```
npm start bookings
```

## Benefits of microfrontends

- Vertical services (backend and frontend are fully owned by one team, see [micro-frontends.org](https://micro-frontends.org/))
- Ship code independently and faster
- Freedom from existing opinionated codebase
- Failures will likely only affect your microfrontend and not the whole app and you can release a fix more quickly

## You might need microfrontends when...

- your releases are slow
- you need to wait for other teams for unblocking the release pipeline
- it is not clear who owns which views

## Drawbacks of microfrontends

- bigger bundle size
- added complexity of stitching shell app and microfrontends together

### Using webpack module federation

- microfrontends are more tightly coupled since they share common dependencies

## web-component vs iframe

iframes are more isolated while web-components are more tightly integrated with the application that embeds them.

### Disadvantages of iframes

#### Overlays

Modals and toast messages are only displayed within the element of the iframe itself and cannot "escape" it. This is why with iframes you would need to use some mechanisms like [Window.postMessage](https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage) to let the outer application know that it should display a modal or toast message with some specific content that is passed along.

#### Theming

The DOM of the iframe is separate from the DOM of the embedding application. This makes it harder to use CSS variables for example.