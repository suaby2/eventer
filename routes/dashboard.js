import express from 'express';
import models from '../models';
import bcrypt from 'bcrypt';

const router = express.Router();


/*
*
* USERS ROUTES
*
 */

router.get('/users', (req,res) => {

    models.User.findAll({
      logging: console.log,
      attributes: ['id', 'email', 'nick'],
      include: [{model: models.Role, as: 'role', attributes: ['id', 'name']}]
    }).then(users => {
      // res.json(users);
      res.render('dashboard/users/index', {users: users});
    });
});

router.get('/users/create', (req, res) => {
  models.Role.findAll({
    attributes:['id', 'name']
  }).then(roles => {
    res.render('dashboard/users/create', {
      pageTitle: "Create user with privileges",
      roles: roles
    });
  });
});

router.post('/users/create', (req, res) => {
  models.User.findOne({where: {email: req.body.email}}).then( user => {
    if(!user) {
      bcrypt.hash(req.body.password, 14, (err, hash) => {
        if(!err) {
          let newUser = {
            nick: req.body.nick,
            email: req.body.email,
            password: hash
          };
          models.User.create(newUser).then(user => {
            res.redirect('/dashboard/users');
          });
        }
      });

    } else {
      res.render('/dashboard/users/create', {error: "User with this email already exist"});
    }
  });
});


router.get('/users/:id', (req, res) => {
  console.log("PARAM_ID", req.params.id);
  models.User.findOne({ where: {id: req.params.id} }).then(user => {
    console.log("USER", user);
    res.render('dashboard/users/profile', {user: user});
  });
});

router.get('/users/:id/edit', (req, res) => {
  models.User.findOne({
    where: {id: req.params.id},
    include: [{model: models.Role, as: 'role', attributes: ['id', 'name']}]
  }).then(user => {
    // res.send(user);
    res.render('dashboard/users/edit', {user: user});
  });
});
router.post('/users/:id/edit', (req, res) => {
  models.User.update(
  {
    nick: req.body.nick,
    firstName: req.body.firstname,
    lastName: req.body.lastname,
    updatedAt: Date.now()
  },
  {
    where: {
      id: req.params.id
    }
  }).then(user => {
    res.json(user);
  });
});
router.get('/users/:id/remove', (req,res) => {
  models.User.findOne({
    where: {id: req.params.id},
    include: [{model: models.Role, as: 'role', attributes: ['id', 'name']}]
  }).then(user => {
    // res.send(user);
    res.render('dashboard/users/remove', {pageTitle: "Delete user", user: user});
  });
});
// TODO: THIS POST REMOVE ALL USERS NOT ONE. NEXT TIME NEED FIX
// TODO: AFTER REMOVE USER SESSION STAY STILL ACTIVE - NEED FIX
router.post('/users/:id/remove', (req, res) => {
  models.User.destroy({
    where: {id: req.params.id}
  }).then(user => {
    console.log(user);
    res.json(user);

  })
});

export default router;
