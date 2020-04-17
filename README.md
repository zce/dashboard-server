# dashboard-server

[![Build Status][travis-image]][travis-url]
[![Dependency Status][dependency-image]][dependency-url]
[![devDependency Status][devdependency-image]][devdependency-url]
[![Code Style][style-image]][style-url]

> A JSON file RESTful API with authorization based on [json-server](https://github.com/typicode/json-server) for [zce/dashboard](https://github.com/zce/dashboard)

## Usage

```sh
# clone repo
$ git clone https://github.com/zce/dashboard-server.git <my-api-server>

# change directory
$ cd <my-api-server>

# install dependencies
$ yarn # or npm install

# serve with nodemon at http://localhost:3000
$ yarn dev
```

## JWT Authorization Endpoints

> with [jsonwebtoken](http://jwt.io)

### POST `/tokens`

create token

```sh
# Content-type: x-www-form-urlencoded
$ curl -X POST -d "username=zce&password=wanglei" http://localhost:3000/tokens
# Content-type: application/json
$ curl -X POST -H "Content-type: application/json" -d "{\"username\":\"zce\",\"password\":\"wanglei\"}" http://localhost:3000/tokens
```

request body

```js
{ username: 'zce', password: 'wanglei' }
```

### GET `/tokens`

check token

```sh
$ curl -H "Authorization: Bearer <jwt-string>" http://localhost:3000/tokens
```

request headers

```js
{
  headers: { Authorization: 'Bearer <jwt-string>' }
}
```

### DELETE `/tokens`

revoke token

```sh
$ curl -X DELETE -H "Authorization: Bearer <jwt-string>" http://localhost:3000/tokens
```

request headers

```js
{
  headers: { Authorization: 'Bearer <jwt-string>' }
}
```

## JSON Server Resources Endpoints

- Comments: `/comments/:id?`
- Posts: `/posts/:id?`
- Terms: `/terms/:id?`
- Users: `/users/:id?`
- Options: `/options/:id?`

To access and modify resources, you can use any HTTP method: `GET` `POST` `PUT` `PATCH` `DELETE` `OPTIONS`

## Additional Endpoints

### GET `/users/me`

get current login user information

```sh
$ curl -H "Authorization: Bearer <jwt-string>" http://localhost:3000/users/me
```

request headers

```js
{
  headers: { Authorization: 'Bearer <jwt-string>' }
}
```

## Backdoor Endpoints

### GET `/backdoor/reset`

reset the database to its initial state

```sh
$ curl http://localhost:3000/backdoor/reset
```

### GET `/backdoor/delay`

add a delay of 1000ms for each endpoint

```sh
$ curl http://localhost:3000/backdoor/delay
```

## Related

- [zce/locally-server](https://github.com/zce/locally-server) - A JSON file RESTful API without JWT authorization

## License

[MIT](LICENSE) &copy; [汪磊](https://zce.me)



[travis-image]: https://img.shields.io/travis/zce/dashboard-server.svg
[travis-url]: https://travis-ci.org/zce/dashboard-server
[dependency-image]: https://img.shields.io/david/zce/dashboard-server.svg
[dependency-url]: https://david-dm.org/zce/dashboard-server
[devdependency-image]: https://img.shields.io/david/dev/zce/dashboard-server.svg
[devdependency-url]: https://david-dm.org/zce/dashboard-server?type=dev
[style-image]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg
[style-url]: https://standardjs.com/
