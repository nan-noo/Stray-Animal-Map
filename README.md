# Stray-Animal-Map

stray animal map + community  
you can register lost or found animals on the map  
still developing...

<p>
<img src="https://img.shields.io/badge/React.js-61DAFB?style=flat-square&logo=react&logoColor=black">&nbsp;
<img src="https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=Node.js&logoColor=white"/>&nbsp;
<img src="https://img.shields.io/badge/MongoDB-47A248?style=flat-square&logo=MongoDB&logoColor=white"/>&nbsp;
<img src="https://img.shields.io/badge/GoogleMapsAPI-4285f4?style=flat-square&logo=Google Maps&logoColor=white"/>&nbsp;
</p>

---

## Start

0. clone or download project

1. create dev.js file in './server/config' and export your mongodb key.

```JS
    // dev.js
    module.exports = {mongoURI: 'YOUR_MONGO_URI'};

```

2. create secret.js file in './client/src' and export your google api key.

```JS
    export const GOOGLE_API_KEY = "YOUR_GOOGLE_KEY";
```

3. install node_modules both './server' and './client' folder

```
    npm install
```

4. run the project in './server'

```
    npm run dev
```

- development: server port 5000, client port 3000

---

## Web Pages

SPA using react-router-dom

1. Landing Page: Map & List View(latest order)
2. Login Page: Sign in(email, pw, remember me)
3. Register Page: Sign up(email, name, last name, pw, confirm pw)
4. Community Page: Grid View(latest order)
5. PostDetail Page: Post Information & Comments
6. Upload Page: Image, Title, Location, Type, Animal Type, Content

---

## Functions

[x] Login & Register  
[x] Search Location  
[x] Geocode Location, LatLng  
[x] Upload Post through Map onClick Event  
[x] List Posts filtered by Map-Bound, Type-Checkbox and Animal-Type-DropList  
[x] Comments  
[x] Responsive Web  
[ ] Choose whether to disclose user info(email) or not

---

## Modules

| server                    | client                                   |
| ------------------------- | ---------------------------------------- |
| "bcrypt": "^5.0.1"        | "@ant-design/icons": "^4.7.0"            |
| "cookie-parser": "^1.4.5" | "@react-google-maps/api": "^2.4.0"       |
| "cors": "^2.8.5"          | "@testing-library/jest-dom": "^5.14.1"   |
| "express": "^4.17.1"      | "@testing-library/react": "^11.2.7"      |
| "jsonwebtoken": "^8.5.1"  | "@testing-library/user-event": "^12.8.3" |
| "mongoose": "^5.13.3"     | "antd": "^4.16.8"                        |
| "multer": "^1.4.3"        | "axios": "^0.21.4"                       |
|                           | "formik": "^2.2.9"                       |
|                           | "http-proxy-middleware": "^2.0.1"        |
|                           | "moment": "^2.29.1"                      |
|                           | "react": "^17.0.2"                       |
|                           | "react-dom": "^17.0.2"                   |
|                           | "react-dropzone": "^11.4.2"              |
|                           | "react-geocode": "^0.2.3"                |
|                           | "react-icons": "^4.3.1"                  |
|                           | "react-redux": "^7.2.4"                  |
|                           | "react-router-dom": "^5.2.0"             |
|                           | "react-scripts": "^3.4.4"                |
|                           | "redux": "^4.1.0"                        |
|                           | "redux-promise": "^0.6.0"                |
|                           | "redux-thunk": "^2.3.0"                  |
|                           | "styled-components": "^5.3.3"            |
|                           | "web-vitals": "^1.1.2"                   |
|                           | "yup": "^0.32.9"                         |

---

- more detail  
  <a href="https://first-daisy-ddd.notion.site/Stray-Animal-Map-209a68fa7d974e60bf814b9282bd2ca1">LINK</a>
