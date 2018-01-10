const clone = require('clone')

let db = {}

const defaultData = {
  "8xf0y6ziyjabvozdd253nd": {
    id: '8xf0y6ziyjabvozdd253nd',
    timestamp: 1467166872634,
    title: 'Not christmas',
    body: 'Dr.Prince wears a dress in red and green.',
    author: 'Ja',
    category: 'Daily',
    voteScore: 6,
    deleted: false,
    commentCount: 2
  },
  "6ni6ok3ym7mf1p33lnez": {
    id: '6ni6ok3ym7mf1p33lnez',
    timestamp: 1468479767190,
    title: 'a horror film',
    body: 'A dog ate god\'s hair and run !',
    author: 'Nancy',
    category: 'Daily',
    voteScore: 5,
    deleted: false,
    commentCount: 0
  },
    "8xf0y6zijabvozdd253nd": {
    id: '8xf0y6zijabvozdd253nd',
    timestamp: 1463366872634,
    title: '掉了',
    body: '曾经唱过的歌，分享过的笑声，在心中不断拉扯',
    author: '吴青峰',
    category: 'Music',
    voteScore: 60,
    deleted: false,
    commentCount: 0
  },
    "8xf0yziyjabvozdd253nd": {
    id: '8xf0yziyjabvozdd253nd',
    timestamp: 1469966872634,
    title: 'Cavaliers win',
    body: 'Cleveland Cavaliers beats golden state warriors with 112-110, Kyrie irving hits the clutch !',
    author: 'Jed',
    category: 'Sports',
    voteScore: 16,
    deleted: false,
    commentCount: 0
  },
    "8xf06ziyjabvozdd253nd": {
    id: '8xf06ziyjabvozdd253nd',
    timestamp: 1464566872634,
    title: 'Cruel Panda',
    body: 'Panda is dangerous, you can consider it as the combination of black bear and white bear',
    author: 'Bass',
    category: 'Biology',
    voteScore: 0,
    deleted: false,
    commentCount: 0
  },
    "8xfy6ziyjabvozdd253nd": {
    id: '8xfy6ziyjabvozdd253nd',
    timestamp: 1466066872634,
    title: 'I am writing a post ... ',
    body: 'I am making up posts for each category. I really don\'t know what to say',
    author: 'shin',
    category: 'Daily',
    voteScore: 11,
    deleted: false,
    commentCount: 0
  },
    "8x0y6ziyjabvozdd253nd": {
    id: '8x0y6ziyjabvozdd253nd',
    timestamp: 1462866872634,
    title: 'Brain',
    body: 'Someone outperforms you without efforts',
    author: 'unknown',
    category: 'Daily',
    voteScore: -3,
    deleted: false,
    commentCount: 0
  },
    "8f0y6ziyjabvozdd253nd": {
    id: '8f0y6ziyjabvozdd253nd',
    timestamp: 1469466872634,
    title: 'Holmes',
    body: 'Yes, someone I mean guys like Holmes',
    author: 'WatsonBBB',
    category: 'Literature',
    voteScore: 22,
    deleted: false,
    commentCount: 0
  },
    "xf0y6ziyjabvozdd253nd": {
    id: 'xf0y6ziyjabvozdd253nd',
    timestamp: 1567166872634,
    title: 'chicken winner',
    body: 'Lexburner is one of my favorite bilibili up',
    author: 'white',
    category: 'ACG',
    voteScore: 6,
    deleted: false,
    commentCount: 0
  },
}

function getData (token) {
  let data = db[token]
  if (data == null) {
    data = db[token] = clone(defaultData)
  }
  return data
}

function getByCategory (token, category) {
  return new Promise((res) => {
    let posts = getData(token)
    let keys = Object.keys(posts)
    let filtered_keys = keys.filter(key => posts[key].category === category && !posts[key].deleted)
    res(filtered_keys.map(key => posts[key]))
  })
}

function get (token, id) {
  return new Promise((res) => {
    const posts = getData(token)
    res(
      posts[id].deleted
        ? {}
        : posts[id]
    )
  })
}

function getAll (token) {
  return new Promise((res) => {
    const posts = getData(token)
    let keys = Object.keys(posts)
    let filtered_keys = keys.filter(key => !posts[key].deleted)
    res(filtered_keys.map(key => posts[key]))
  })
}

function add (token, post) {
  return new Promise((res) => {
    let posts = getData(token)

    posts[post.id] = {
      id: post.id,
      timestamp: post.timestamp,
      title: post.title,
      body: post.body,
      author: post.author,
      category: post.category,
      voteScore: 1,
      deleted: false,
      commentCount: 0
    }

    res(posts[post.id])
  })
}

function vote (token, id, option) {
  return new Promise((res) => {
    let posts = getData(token)
    post = posts[id]
    switch(option) {
        case "upVote":
            post.voteScore = post.voteScore + 1
            break
        case "downVote":
            post.voteScore = post.voteScore - 1
            break
        default:
            console.log(`posts.vote received incorrect parameter: ${option}`)
    }
    res(post)
  })
}

function disable (token, id) {
    return new Promise((res) => {
      let posts = getData(token)
      posts[id].deleted = true
      res(posts[id])
    })
}

function edit (token, id, post) {
    return new Promise((res) => {
        let posts = getData(token)
        for (prop in post) {
            posts[id][prop] = post[prop]
        }
        res(posts[id])
    })
}

function incrementCommentCounter(token, id, count) {
  const data = getData(token)
  if (data[id]) {
    data[id].commentCount += count
  }
}

module.exports = {
  get,
  getAll,
  getByCategory,
  add,
  vote,
  disable,
  edit,
  getAll,
  incrementCommentCounter
}
