import express from 'express';
import models from '../models';
const app = express();

const router = express.Router();

router.get('/', (req, res) => {
    res.render('index');
});
router.get('/dashboard', (req, res) => {
    if(req.session && req.session.user) {
        console.log(req.session.user);
        res.render('dashboard', {user: req.session.user});
    } else {
        res.redirect('/dashboard/login')
    }

});
router.get('/logout', (req, res) => {
    req.session.destroy(function (err) {
        if (err) return next(err)
        res.redirect('/dashboard/login')
    })
});

export default router;
