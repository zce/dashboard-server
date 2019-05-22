/**
 * LowDB Google Cloud Storage Adapter
 */

const { Storage } = require('@google-cloud/storage')

const stringify = obj => JSON.stringify(obj, null, 2)

module.exports = class GCloudAdapter {
  constructor (
    source = 'db.json',
    {
      defaultValue = {},
      serialize = stringify,
      deserialize = JSON.parse,
      projectId,
      credentials,
      bucketName,
    } = {}
  ) {
    this.source = source
    this.defaultValue = defaultValue
    this.serialize = serialize
    this.deserialize = deserialize
    this.bucketName = bucketName

    // Creates a client
    this.storage = new Storage({
      projectId,
      credentials
    })

    this.bucket = this.storage.bucket(this.bucketName)
    this.file = this.bucket.file(this.source)
  }

  read () {
    // return this.defaultValue
    return this.file.download()
      .then(data => this.deserialize(data[0]))
      .catch(err => {
        if (err.code !== 404) throw err

        return this.write(this.defaultValue)
          .then(() => this.defaultValue)
      })
  }

  write(data) {
    return this.file.save(this.serialize(data), {
      // Support for HTTP requests made with `Accept-Encoding: gzip`
      gzip: true,
      metadata: {
        contentType: 'application/json',
        cacheControl: 'no-cache',
      },
    })
  }
}
