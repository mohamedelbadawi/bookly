const router = require("express").Router();
const { generateToken } = require("../helpers/utils");
const { ensureIsAuth } = require("../helpers/utils");
const { ensureNotAuth } = require("../helpers/utils");
const { body, validationResult } = require('express-validator');

const passport = require("passport");
var multer = require('multer');


var storage = multer.diskStorage({
    destination: 'public/images',
    filename: function (req, file, cb) {
        cb(null, "UploadedOn" + Date.now() + "fileOrigName" + file.originalname)
    }
})
var upload = multer({ storage: storage });


const CategoryController = require("../controllers/CategoryController")



router.post("/login", (req, res) => {
    // console.log(req.body)
    passport.authenticate('local', {
        successRedirect: '/dashboard',
        failureRedirect: '/login',
    })(req, res);
});

router.get("/login", ensureNotAuth, (req, res) => {
    res.render('admin/login', { layout: 'admin/login' })
})

router.get('/logout', function (req, res, next) {
    req.logout(function (err) {
        if (err) { return next(err); }
        res.redirect('/login');
    });
});


router.get("/home", (req, res) => {
    res.render('home')
})

router.get("/dashboard", ensureIsAuth, (req, res) => {

    res.render('admin/dashboard',)
})
// category routes

router.get("/category/index", CategoryController.index);
router.post("/category/store", upload.single('image'), CategoryController.store)
router.post("/category/update/:id", upload.single('image'), CategoryController.update)
router.get("/category/delete/:id", CategoryController.delete)


module.exports = router;