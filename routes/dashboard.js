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
  res.render('dashboard/users/create');
});

router.get('/users/:id', (req, res) => {
  console.log("PARAM_ID", req.params.id);
  models.User.findOne({ where: {id: req.params.id} }).then(user => {
    console.log("USER", user);
    res.render('dashboard/users/profile', {user: user});
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

export default router;
