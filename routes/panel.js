import express from 'express';
import models from '../server/models';

const router = express.Router();

router.get('/register', (req, res) => {
   res.render('register');
});
router.post('/register', (req, res) => {
    console.log(req.body);
    models.User.findOne({where: {email: req.body.email}}).then( user => {
        if(!user) {
            models.User.create({email: req.body.email, password: req.body.password}).then(user => {
                res.json(user);
            });
        } else {
            res.render('register', {error: "User with this email already exist"});
        }
    });
});

router.get('/login', (req, res) => {
    res.render('login');
});
router.post('/login', (req, res) =>{
    models.User.findOne({where: {emial: req.body.email}}).then(user => {
        if(!user){
            res.render('login', {error: "User with this email not exist"});
        }
        res.redirect('/dashboard');
    });
});

router.get('/dashboard', (req,res) => {
    res.render('dashboard')
});

export default router;