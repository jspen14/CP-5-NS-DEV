
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static('dist'))

// Knex Setup
const env = process.env.NODE_ENV || 'development';
const config = require('./knexfile')[env];
const knex = require('knex')(config);

// bcrypt setup
let bcrypt = require('bcrypt');
const saltRounds = 10

// jwt setup
const jwt = require('jsonwebtoken');
let jwtSecret = process.env.jwtSecret;
if (jwtSecret === undefined) {
  console.log("You need to define a jwtSecret environment variable to continue.");
  knex.destroy();
  process.exit();
}

// Verify the token that a client gives us.
// This is setup as middleware, so it can be passed as an additional argument to Express after
// the URL in any route. This will restrict access to only those clients who possess a valid token.
const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token)
    return res.status(403).send({ error: 'No token provided.' });
  jwt.verify(token, jwtSecret, function(err, decoded) {
    if (err)
      return res.status(500).send({ error: 'Failed to authenticate token.' });
    // if everything good, save to request for use in other routes
    req.userID = decoded.id;
    next();
  });
}

let comments = [];
let id = 0;

app.post('/api/login', (req, res) => {
  if (!req.body.email || !req.body.password)
    return res.status(400).send();
  knex('users').where('email',req.body.email).first().then(user => {
    if (user === undefined) {
      res.status(403).send("Invalid credentials");
      throw new Error('abort');
    }
    return [bcrypt.compare(req.body.password, user.hash),user];
  }).spread((result,user) => {
    if (result) {
     let token = jwt.sign({ id: user.id }, jwtSecret, {
      expiresIn: 86400 // expires in 24 hours
      });
      res.status(200).json({user:{username:user.username,name:user.name, user_id:user.user_id, age:user.age,
        hometown:user.hometown, salesCompany:user.salesCompany, sports:user.sports, major:user.major}});
    } else {
       res.status(403).send("Invalid credentials");
    }
    // if (result)
    //   res.status(200).json({user:{username:user.username,name:user.name, user_id:user.user_id, age:user.age, hometown:user.hometown, salesCompany:user.salesCompany,
    //     sports:user.sports, major:user.major}});
    // else
    //   res.status(403).send("Invalid credentials");
    return;
  }).catch(error => {
    if (error.message !== 'abort') {
      console.log(error);
      res.status(500).json({ error });
    }
  });
});

app.post('/api/users', (req, res) => {
  if (!req.body.email || !req.body.password || !req.body.username || !req.body.name || !req.body.age || !req.body.hometown || !req.body.salesCompany || !req.body.sports || !req.body.major)
    return res.status(400).send();
  knex('users').where('email',req.body.email).first().then(user => {
    if (user !== undefined) {
      res.status(403).send("Email address already exists");
      throw new Error('abort');
    }
    return knex('users').where('username',req.body.username).first();
  }).then(user => {
    if (user !== undefined) {
      res.status(409).send("User name already exists");
      throw new Error('abort');
    }
    return bcrypt.hash(req.body.password, saltRounds);
  }).then(hash => {
    return knex('users').insert({email: req.body.email, hash: hash, username:req.body.username, age:req.body.age, hometown:req.body.hometown, salesCompany:req.body.salesCompany, sports:req.body.sports, major:req.body.major,
				 name:req.body.name});//see if the order matters
  }).then(ids => {
    return knex('users').where('user_id',ids[0]).first().select('username','name','user_id', 'age'); // This might be user-ids[]
  }).then(user => {
    //res.status(200).json({user:user});
    let token = jwt.sign({ id: user.id }, jwtSecret, {
      expiresIn: 86400 // expires in 24 hours
    });
     res.status(200).json({user:user,token:token});
    return;
  }).catch(error => {
    if (error.message !== 'abort') {
      console.log(error);
      res.status(500).json({ error });
    }
  });
});

// app.post('/api/users/:id/posts', (req, res) => {
//   let id = parseInt(req.body.user_id); // might need to be req.params.user_id
app.post('/api/users/:id/posts', (req, res) => {
  let id = parseInt(req.body.user_id); // might need to be req.params.user_id
  knex('users').where('user_id',id).first().then(user => {
    return knex('posts').insert({user_id: id, post:req.body.post, dateCreated: new Date(), username: req.body.username});
  }).then(ids => { // might be post_ids
    console.log("api/user/:id/posts  " + knex('posts').where('post_id',ids[0]));
    return knex('posts').where('post_id',ids[0]).first();
  }).then(post => {
    res.status(200).json({post:post});
    console.log(post);
    return;
  }).catch(error => {
    console.log(error);
    res.status(500).json({ error });
  });
});


//
// app.get('/api/comments', (req, res) => {
//   res.send(comments);
// });
  // Users //

  // Get my account
  app.get('/api/me', verifyToken, (req,res) => {
    knex('users').where('id',req.userID).first().select('user_id','email','username',
    'name','age','hometown','salesCompany','sports',
    'major').then(user => {
      res.status(200).json({user:user});
    }).catch(error => {
      res.status(500).json({ error });
    });
  });

app.get('/api/users/:id', (req, res) => {
  let id = parseInt(req.params.id);
  knex('users').where('users.id', id).select('user_id','email','username',
  'name','age','hometown','salesCompany','sports',
  'major').then(users => {res.status(200).json({users:users});
}).catch(error => {
    res.status(500).json({ error });
});
});

app.get('/api/posts' , (req, res) => {
  let ret = knex('posts').select('post_id','post','dateCreated','user_id','username');
  console.log("return from posts " + knex('posts').select('post_id','post','dateCreated','user_id','username'));
  return ret
    .then(posts => {
      //console.log(posts);
      res.status(200).json({posts:posts});
    }).catch(error => {
      console.log(error);
      res.status(500).json({error});
    });

});

// app.put('/api/dummy', (req,res) => {
//   let dummy_var = mathRandom();
//   knex('posts').where('post_id', '=', 1).update({dummy:dummy_var});
//   return dummy_var;
// });

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

// app.post('/api/comments', (req, res) => {
//   id = id + 1;
//   let comment = {id:id, username:req.body.username, text:req.body.text, likes:req.body.likes, date:req.body.date, sorted:req.body.sorted}; // this is where we will add the number of likes
//
//   comments.push(comment);
//   res.send(comment);
// });

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
