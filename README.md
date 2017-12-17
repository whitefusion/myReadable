# myReadable
Readble is a prototype of online post manage website. </br>
It is based and React and Redux. </br>
The local server is forked from [Readable Start Server](https://github.com/udacity/reactnd-project-readable-starter).

## Functionality
- Browse all posts or by category
- Create/Edit/Delete a post
- Sort posts by date or votescore
- Upvote or downvote a post
- Create/Edit/Delete a comment

## Folder Struture
```
- api-server
   catgories.js
   comments.js
   config.js
   package-lock.json
   package.json
   posts.js
   README.md
   server.js
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
          Post.js
          PostCard.js
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
First run `npm install` both **api-server/** and **frontend/** folder.  </br>
To start Server, run `node server` under **api-server/**.
In **frontend/**, run `npm start`, and you will be directed to http://localhost:3000 in your browser to see the website.
