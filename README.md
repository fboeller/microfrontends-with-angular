- Platform: [![Netlify Status](https://api.netlify.com/api/v1/badges/04f71aef-c76d-47a0-8f72-9b619233f98b/deploy-status)](https://app.netlify.com/sites/jolly-cobbler-bab33d/deploys)
- Microfrontend: [![Netlify Status](https://api.netlify.com/api/v1/badges/14649930-1ce6-47c5-8f5c-1da9edd25fd2/deploy-status)](https://app.netlify.com/sites/curious-bublanina-10c9c8/deploys)

# Microfrontends with Angular

```
$ git clone https://github.com/fboeller/microfrontends-with-angular.git
$ cd microfrontends-with-angular
$ npm install
$ npm start
```

A visit to `localhost:4200` shows the application.

## Serving the microfrontend inside the shell application locally

Execute these two commands in two shells:

```
$ npm start train-platform
```

```
$ npm run ng run bookings:build:local-web-components && npx http-server projects/bookings/dist --port 4201
```

## Environments

### Local

- Platform: Off
- Microfrontend: `http://localhost:4200/`
- Platform-Translations: Off
- Microfrontend-Translations: `http://localhost:4200/assets/i18n/<lang>.json`

### Production

- Platform: `https://my.domain.net/`
- Microfrontend: `https://my.domain.net/frontends/<frontend>/`
- Platform-Translations: `https://my.domain.net/assets/i18n/<lang>.json`
- Microfrontend-Translations: `https://my.domain.net/frontends/<frontend>/assets/i18n/<lang>.json`

### Local Web Components

Redirect: `http://localhost:4200/frontends/<frontend>/` -> `http://localhost:4201/`

- Platform: `http://localhost:4200/`
- Microfrontend: `http://localhost:4201/`
- Platform-Translations: `http://localhost:4200/assets/i18n/<lang>.json`
- Microfrontend-Translations: `http://localhost:4201/assets/i18n/<lang>.json`


## Fancy diagrams

### Component hierarchies

```mermaid
graph TB
    subgraph "Shell app"
        n7(app-root)
        n8(app-navbar)
        n9(app-journey-selection)
        n10(app-bookings-host)
        n7-->n8
        n7-->n9
        n7-->n10
    end
    subgraph "Microfrontend"
        n13(mf-bookings-entry)
        n14(mf-booking-form)
        n15(mf-booking-list)
    end
    n13-->n14
    n10-->n13
    n13-->n15
```

### Main page
No microfrontend is loaded on this page.

```mermaid
    graph TB
        subgraph "Shell app"
            n7(app-root)
            n8(app-navbar)
            n9(app-journey-selection)
            n7-->n8
            n7-->n9
        end
```

### Booking form page
This diagram shows all the Angular components that are rendered on the booking form page and illustrates which components are exposed by the shell application and which by the bookings microfrontend.

```mermaid
    graph TB
        subgraph "Shell app"
            n10(app-root)
            n11(app-navbar)
            n12(app-bookings-host)
        end
        subgraph "Microfrontend"
            n13(mf-bookings-entry)
            n14(mf-booking-form)
        end
        n10-->n11
        n10-->n12
        n12-->n13
        n13-->n14
```

### My bookings page
This diagram shows all the Angular components that are rendered on the booking form page and illustrates which components are exposed by the shell application and which by the bookings microfrontend.

```mermaid
    graph TB
        subgraph "Shell app"
            n10(app-root)
            n11(app-navbar)
            n12(app-bookings-host)
        end
        subgraph "Microfrontend"
            n13(mf-bookings-entry)
            n14(mf-booking-form)
        end
        n10-->n11
        n10-->n12
        n12-->n13
        n13-->n14
```

### User clicks on "Book" of Journey 1
```mermaid
sequenceDiagram
    actor user
    participant trainPlatform as TrainPlatform
    participant windowUrl as window.url
    participant bookings as Bookings
    user->>trainPlatform: Click on "Book" of Journey 1
    trainPlatform->>windowUrl: Set url "bookings/journey/1
    trainPlatform->>bookings: Pass "bookings/journey/1" url as input
    bookings->>user: Render booking-form
```
### User clicks on "Special Offer" from "My bookings"
```mermaid
sequenceDiagram
    actor user
    participant trainPlatform as TrainPlatform
    participant windowUrl as window.url
    participant bookings as Bookings
    user->>bookings: Click on "special offer"
    bookings->>trainPlatform: Pass url "/bookings/journey/42" via component output
    trainPlatform->>windowUrl: Set url to "/bookings/journey/42"
    trainPlatform->>bookings: Pass url "/bookings/journey/42" via component input
    bookings->>user: Render journey 42
```

### User clicks on "Special offer" from "My bookings"
```mermaid
sequenceDiagram
    actor user
    participant trainPlatform as TrainPlatform
    participant windowUrl as window.url
    participant bookings as Bookings
    user->>bookings: Click on "Special offer" from "My bookings"
    bookings->>trainPlatform: Pass url "/bookings/journey/42" via component output 
    trainPlatform->>windowUrl: Set url to "/bookings/journey/42"
    trainPlatform->>bookings: Pass "/bookings/journey/42" url as input
    bookings->>user: Render special offer journey 42
```