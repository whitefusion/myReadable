const clone = require('clone')
const config = require('./config')

let db = {}

const defaultData = {
  categories: [
      {
        name: 'Literature',
        path: 'literature'
      },
      {
        name: 'Biology',
        path: 'biology'
      },
      {
        name: "Music",
        path: "music"
      },
      {
        name: "Daily",
        path: "daily"
      },
      {
        name: "Sports",
        path: "sports"
      },
      {
        name: "ACG",
        path: "acg"
      }
  ]
}

function getData (token) {
  //Each token has it's own copy of the DB. The token in this case is like an app id.
  let data = db[token]
  //This populates the default user data if there isn't any in the db.
  if (data == null) {
    data = db[token] = clone(defaultData)
  }
  return data
}

function getAll (token) {
  return new Promise((res) => {
    res(getData(token))
  })
}

module.exports = {
  getAll
}
