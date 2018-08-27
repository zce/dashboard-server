# api-server

[![Build Status][travis-image]][travis-url]
[![Dependency Status][dependency-image]][dependency-url]
[![devDependency Status][devdependency-image]][devdependency-url]
[![Code Style][style-image]][style-url]

[travis-image]: https://img.shields.io/travis/zce/dashboard-server/master.svg
[travis-url]: https://travis-ci.org/zce/dashboard-server
[dependency-image]: https://img.shields.io/david/zce/dashboard-server.svg
[dependency-url]: https://david-dm.org/zce/dashboard-server
[devdependency-image]: https://img.shields.io/david/dev/zce/dashboard-server.svg
[devdependency-url]: https://david-dm.org/zce/dashboard-server?type=dev
[style-image]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg
[style-url]: http://standardjs.com/

> A JSON file RESTful API with authorization based on [json-server](https://github.com/typicode/json-server)

## Usage

```sh
# clone repo
$ git clone https://github.com/zce/dashboard-server.git <my-api>

# change directory
$ cd <my-api>

# install dependencies
$ yarn # or npm install
```

modify [database.json](database.json) file

```sh
# serve with hot reload at http://localhost:2080
$ yarn dev
```

## JWT Authorization

> with [jsonwebtoken](http://jwt.io)

```
# create token
POST /tokens
{ username: 'zce', password: 'wanglei' }

# check token
GET /tokens
{
  header: { Authorization: 'Bearer <jsonwebtoken>' }
}

# revoke token
DELETE /tokens
{
  header: { Authorization: 'Bearer <jsonwebtoken>' }
}
```

## License

[MIT](LICENSE) &copy; [汪磊](http://zce.me)
