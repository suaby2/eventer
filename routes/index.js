import express from 'express';
import models from '../models';
import bcrypt from "bcrypt";
import getSession from "../helpers/index";
const app = express();
const router = express.Router();

app.use(getSession);
router.get('/', (req, res) => {
    res.render('index');
});
/*
    Register
 */
router.get('/register', (req, res) => {
    res.render('register');
});
router.post('/register', (req, res) => {
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
                        res.redirect('login');
                    });
                }
            });

        } else {
            res.render('register', {error: "User with this email already exist"});
        }
    });
});
/*
    Login
 */
router.get('/login',  (req, res) => {
    res.render('login');
});
router.post('/login', (req, res, next) =>{

    models.User.findOne({where: {email: req.body.email }}).then(user => {
        if(!user){
            res.render('login', {error: "User with this email not exist"});
        } else if (!bcrypt.compareSync(req.body.password, user.password)) {
            res.render('login', {error: "Wrong Password"});
        } else {
            let userData = {
                id: user.id,
                email: user.email,
                nick: user.nick
            };
            req.session.user = userData;
            req.session.save(function (err) {
                if (err) return next(err)
                res.redirect('/dashboard');
            })

        }
    });
});
router.get('/dashboard/*', getSession);
router.get('/dashboard',getSession, (req, res) => {
      res.render('dashboard', {user: req.session.user});
});
router.get('/logout', (req, res) => {
    req.session.destroy(function (err) {
        if (err) return next(err)
        res.redirect('/dashboard/login')
    })
});

export default router;
