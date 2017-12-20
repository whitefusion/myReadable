# myReadable
Readble is a prototype of online post manage website. </br>
It is based and React and Redux. </br>
The local server is forked from [Readable Start Server](https://github.com/udacity/reactnd-project-readable-starter).

## Functionality
- Browse all posts by category in different orders
- Create/Edit/Delete/Vote/Comment a post
- Create/Edit/Delete/Vote a comment

## Folder Struture
```
- api-server
  [unchanged]
- frontend
    package-lock.json
    package.json
    yarn.lock
    -public
       index.html
       manifest.json
       favicon.ico
    -src
       App.css
       App.js
       index.js
       regiesterServiceWorker.js
       -actions
          category_action.js
          comment_action.js
          index.js
          post_action.js
          view_actionjs
       -components
          CategorySelect.js
          Comment.js
          CommentItem.js
          EditModal.js
          HeadBar.js
          PostCard.js
          PostDetail.js
          PostList.js
          PostModal.js
          SideBar.js
       -icons
          add.svg
          up.svg
          up-o.svg
          down.svg
          down-o.svg
       -reducers
          category_reducer.js
          comment_reducer.js
          post_reducer.js
          view_reducer.js
          index.js
       -utils
          api.js
          utility.js
```

## Install and Launch
1. Install dependency: Run `npm install` in *BOTH* **api-server/** and **frontend/** folder.  </br>
2. Start Server: run `node server` under **api-server/**.
3. Launch : In **frontend/**, run `npm start`, and you will be directed to http://localhost:3000 in your browser and see the website.

## Note
- Voting mechanism: Since the server does not provide api for saving voting status, you can vote for a post or a comment infinite times as long as you refresh the webpage. 
