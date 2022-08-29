const router = require("express").Router();
const { generateToken } = require("../helpers/utils");
const { ensureIsAuth } = require("../helpers/utils");
const { ensureNotAuth  } = require("../helpers/utils");
const passport = require("passport");
const connectEnsureLogin = require('connect-ensure-login');
// router.post("/signup", (req, res, next) => {
//     passport.authenticate("signup", { session: true }, (err, user, info) => {
//         // Check for errors
//         if (err) throw new Error(err);
//         // Generate token
//         const token = generateToken(user.id);
//         return res.status(201).json({
//             status: "success",
//             data: {
//                 message: "Account created.",
//                 user,
//                 token
//             },
//             statusCode: res.statusCode
//         });
//     })(req, res, next);
// });

router.post("/login", (req, res) => {
    // console.log(req.body)
    passport.authenticate('local', {
        successRedirect: '/home',
        failureRedirect: '/login',
    })(req, res);
});

router.get("/login",ensureNotAuth ,(req, res) => {
    res.render('login')
})

router.get('/logout', function (req, res, next) {
    req.logout(function (err) {
        if (err) { return next(err); }
        res.redirect('/login');
    });
});





router.get("/home", ensureIsAuth,(req, res) => {
    res.render('home')
})

module.exports = router;