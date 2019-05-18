const faker = require('faker')
const objectId = require('bson-objectid')

const randomItem = items => items[faker.random.number({ max: items.length - 1 })]

const randomItems = items => [...Array(faker.random.number({ max: items.length - 1 }))].map(() => items[faker.random.number({ max: items.length - 1 })])

const createOptions = () => {
  const defs = {
    app_name: 'wedn.net',
    app_version: '0.1.0',
    app_description: 'wedn.net site',
    site_url: 'http://localhost:2080/',
    site_name: 'WEDN.NET',
    site_description: 'MAKE IT BETTER!',
    site_favicon: '/favicon.ico',
    site_charset: 'utf-8',
    site_lang: 'zh-CN',
    site_theme: '2016',
    mail_server_hostname: '',
    mail_server_port: '465',
    mail_server_secure: 'true',
    mail_server_name: 'WEDN.NET',
    mail_server_login: '',
    mail_server_password: '',
    last_updated: '2016-12-24T15:42:32'
  }
  return Object.keys(defs).map((k, i) => ({
    id: objectId(),
    key: k,
    value: defs[k],
    enabled: true,
    updated: faker.date.past()
  }))
}

const createUsers = length => [...Array(length)].map(() => ({
  id: objectId(),
  slug: faker.helpers.slugify(faker.name.firstName()),
  username: faker.name.firstName(),
  password: faker.internet.password(),
  email: faker.internet.email(),
  phone: faker.phone.phoneNumberFormat(),
  name: faker.name.findName(),
  status: randomItem(['activated', 'email-unactivated', 'phone-unactivated', 'forbidden']),
  roles: randomItems(['administrator', 'author', 'editor', 'contributor', 'subscriber']),
  created: faker.date.past(),
  updated: faker.date.past(),
  meta: {
    avatar: faker.image.avatar(),
    cover: faker.image.image(),
    bio: faker.lorem.sentence(),
    website: faker.internet.url(),
    location: 'Beijing, China',
    language: randomItem(['zh_CN', 'en_US']),
    last_login: faker.date.past(),
    last_ip: faker.internet.ip()
  }
}))

const createPosts = (length, users) => [...Array(length)].map(() => ({
  id: objectId(),
  slug: faker.lorem.slug(),
  title: faker.lorem.sentence(),
  excerpt: faker.lorem.paragraph(),
  content: faker.lorem.paragraphs(),
  type: randomItem(['blog', 'page']),
  status: randomItem(['published', 'drafted']),
  comment_status: randomItem(['open', 'close']),
  comment_count: faker.random.number({ max: 100 }),
  view_count: faker.random.number({ max: 1000 }),
  user_id: randomItem(users).id,
  parent_id: null,
  created: faker.date.past(),
  updated: faker.date.past(),
  meta: {}
}))

const createTerms = (length, posts) => [...Array(length)].map(() => ({
  id: objectId(),
  slug: faker.lorem.slug(),
  name: faker.lorem.word(),
  type: randomItem(['category', 'tag']),
  description: faker.lorem.sentence(),
  count: 1,
  parent_id: null,
  created: faker.date.past(),
  updated: faker.date.past(),
  relations: [
    randomItem(posts).id,
    randomItem(posts).id,
    randomItem(posts).id,
    randomItem(posts).id
  ],
  meta: {}
}))

const createComments = (length, posts) => [...Array(length)].map(() => ({
  id: objectId(),
  author: faker.name.findName(),
  email: faker.internet.email(),
  ip: faker.internet.ip(),
  content: faker.lorem.paragraph(),
  status: randomItem(['hold', 'rejected', 'approved']),
  user_agent: faker.internet.userAgent(),
  post_id: randomItem(posts).id,
  user_id: 0,
  parent_id: null,
  created: faker.date.past(),
  updated: faker.date.past(),
  meta: {}
}))

module.exports = () => {
  const options = createOptions()
  const users = createUsers(80)
  const posts = createPosts(50, users)
  const terms = createTerms(10, posts)
  const comments = createComments(10, posts)

  return { options, users, posts, terms, comments }
}
