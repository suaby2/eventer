import express from 'express';
import models from '../server/models';
import bcrypt from 'bcrypt';

const router = express.Router();

router.get('/register', (req, res) => {
   res.render('register');
});
router.post('/register', (req, res) => {
    // console.log(req.body);
    models.User.findOne({where: {email: req.body.email}}).then( user => {

        if(!user) {
            console.log(user);
            bcrypt.hash(req.body.password, 14, (err, hash) => {
                console.log(hash);
                // console.log('HASH', hash);
                if(!err) {
                    models.User.create({email: req.body.email, password: hash}).then(user => {
                        req.session.info = "User created, now you can login to dashboard";
                        res.redirect('login');
                    });
                }

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