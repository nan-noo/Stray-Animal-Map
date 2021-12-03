# Stray-Animal-Map

stray animal map + community  
you can register lost or found animals on the map  
still developing...

<p>
<img src="https://img.shields.io/badge/React.js-61DAFB?style=flat-square&logo=react&logoColor=black">&nbsp;
<img src="https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=Node.js&logoColor=white"/>&nbsp;
<img src="https://img.shields.io/badge/MongoDB-47A248?style=flat-square&logo=MongoDB&logoColor=white"/>&nbsp;
<img src="https://img.shields.io/badge/GoogleMapsAPI-4285f4?style=flat-square&logo=Google Maps&logoColor=white"/>&nbsp;
<img src="https://img.shields.io/badge/AWS-232F3E?style=flat-square&logo=Amazon AWS&logoColor=white"/>&nbsp;
</p>

---

## Start - front

server: https://github.com/nan-noo/Stray-Animal-Map-Server

0. clone or download project

1. create .env file in root folder

```
    REACT_APP_GOOGLE_API_KEY=<YOUR_API_KEY>

    REACT_APP_SERVER_URL=<YOUR_EXTERNAL_SERVER>
```

3. install node_modules in root folder

```
    npm install
```

4. run the project in root folder

```
    npm run start
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

- [x] Login & Register
- [x] Search Location
- [x] Geocode Location, LatLng
- [x] Upload Post through Map onClick Event
- [x] List Posts filtered by Map-Bound, Type-Checkbox and Animal-Type-DropList
- [x] Comments
- [x] Responsive Web
- [x] Choose whether to disclose user info(email) or not
- [x] Go to the post through Marker onClick Event

---

## Screen

![잃어버린 동물 지도 (2)](https://user-images.githubusercontent.com/54002105/143589099-12932b20-1efe-490a-bc19-aec3b21f4e84.gif)

---

## Modules

| client                             | detail                            |
| ---------------------------------- | --------------------------------- |
| "@ant-design/icons": "^4.7.0"      | use antd icons                    |
| "@react-google-maps/api": "^2.4.0" | use google map api                |
| "antd": "^4.16.8"                  | use antd style components         |
| "axios": "^0.21.4"                 | request to server                 |
| "formik": "^2.2.9"                 | use customized form               |
| "yup": "^0.32.9"                   | use customized form               |
| "moment": "^2.29.1"                | user profile image                |
| "react-dropzone": "^11.4.2"        | drag & drop image                 |
| "react-geocode": "^0.2.3"          | use geocode api                   |
| "react-icons": "^4.3.1"            | use react icons                   |
| "react-redux": "^7.2.4"            | manage state                      |
| "react-router-dom": "^5.2.0"       | SPA                               |
| "redux": "^4.1.0"                  | manage state                      |
| "redux-promise": "^0.6.0"          | redux middleware: handle promise  |
| "redux-thunk": "^2.3.0"            | redux middleware: handle function |
| "styled-components": "^5.3.3"      | use styled components             |

---

- more detail  
  <a href="https://first-daisy-ddd.notion.site/Stray-Animal-Map-209a68fa7d974e60bf814b9282bd2ca1">LINK</a>

---

## Trouble-shooting

항상 cors가 문제다!!! 단순 동일 출처가 아니어서 요청이 안되는 경우는 cors 모듈 호출만 하면 해결되었지만, 프론트의 쿠키가 서버에 전송이 안 됐다. cookie를 보낼 수 있기 위해 프론트와 백 모두 설정을 더 해야 했다.

- 프론트: 인증, 로그아웃 관련 action 함수에서 axios 요청을 보낼 때 config option으로 {withCredentials: true} 추가
- 백: cors({origin: true, credentials: true}) 옵션 필요

이렇게 하고 나서 로컬에서는 오류가 안 났는데, ec2 정책 상 allow-origin이 항상 '\*'이라 쿠키와 같은 credential을 허용하지 않는다고 한다.. 쿠키 대신 localstorage로 바꿔봐야 겠다.. -> 성공!!!!! cors 에러가 사라졌다.

amplify로 배포했더니 ec2 서버에 SSL 등록이 필요했다. SSL 등록 후 nginx에 443번 포트에 들어오는 요청을 로컬서버에 프록시 패스 했더니 성공!
