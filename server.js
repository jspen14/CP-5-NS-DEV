const express = require('express');
const bodyParser = require('body-parser');

const app =express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static('dist'))

let comments = [];
let id = 0;

app.get('/api/comments', (req, res) => {
  res.send(comments);
});

app.put('/api/comments/:id', (req, res) => {
  let id = parseInt(req.params.id);
  let commentsMap = comments.map(comment => { return comment.id; }); //Is this right?
  let index = commentsMap.indexOf(id);
  let comment = comments[index];
  comment.text = req.body.text;
  comment.username = req.body.username;
  comment.likes = req.body.likes;
  comment.date = req.body.date;
  comment.sorted = req.body.sorted;
  res.send(comment);
});

app.post('/api/comments', (req, res) => {
  id = id + 1;
  let comment = {id:id, username:req.body.username, text:req.body.text, likes:req.body.likes, date:req.body.date, sorted:req.body.sorted}; // this is where we will add the number of likes

  comments.push(comment);
  res.send(comment);
});

app.delete('/api/comments/:id', (req, res) => {
  let id = parseInt(req.params.id);
  let removeIndex = comments.map(comment => { return comment.id; }).indexOf(id);
  // if (removeIndex === -1) {
  //   res.status(404).send("Sorry, that comment doesn't exist");
  //   return;
  // }
  comments.splice(removeIndex, 1);
  res.sendStatus(200);
});

app.listen(3001, () => console.log('Server listening on port 3001!'))
