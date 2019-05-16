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
```

modify [database.json](database.json) file

```sh
# serve with hot reload at http://localhost:3000
$ yarn dev
```

## JWT Authorization Endpoints

> with [jsonwebtoken](http://jwt.io)

### POST /tokens

create token

```shell
# Content-type: x-www-form-urlencoded
$ curl -X POST -d "username=zce&password=wanglei" http://localhost:3000/tokens
# Content-type: application/json
$ curl -X POST -H "Content-type: application/json" -d "{\"username\":\"zce\",\"password\":\"wanglei\"}" http://localhost:3000/tokens
```

request body

```js
{ username: 'zce', password: 'wanglei' }
```

### GET /tokens

check token

```shell
$ curl -H "Authorization: Bearer <jwt-string>" http://localhost:3000/tokens
```

request headers

```js
{
  headers: { Authorization: 'Bearer <jwt-string>' }
}
```

### DELETE /tokens

revoke token

```shell
$ curl -X DELETE -H "Authorization: Bearer <jwt-string>" http://localhost:3000/tokens
```

request headers

```
{
  headers: { Authorization: 'Bearer <jwt-string>' }
}
```

## Additional Endpoints

### GET /users/me

Get current login user information

```shell
$ curl -H "Authorization: Bearer <jwt-string>" http://localhost:3000/users/me
```

request headers

```js
{
  headers: { Authorization: 'Bearer <jwt-string>' }
}
```

## License

[MIT](LICENSE) &copy; [汪磊](http://zce.me)



[travis-image]: https://img.shields.io/travis/zce/dashboard-server/master.svg
[travis-url]: https://travis-ci.org/zce/dashboard-server
[dependency-image]: https://img.shields.io/david/zce/dashboard-server.svg
[dependency-url]: https://david-dm.org/zce/dashboard-server
[devdependency-image]: https://img.shields.io/david/dev/zce/dashboard-server.svg
[devdependency-url]: https://david-dm.org/zce/dashboard-server?type=dev
[style-image]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg
[style-url]: http://standardjs.com/
