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


const CategoryController = require("../controllers/CategoryController");
const BookController = require("../controllers/BookController");
const DashboardController = require("../controllers/DashboardController");


router.post("/login", (req, res) => {
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


router.get("/dashboard", ensureIsAuth, DashboardController.index)

// category routes
router.get("/category/index", ensureIsAuth, CategoryController.index);
router.post("/category/store", ensureIsAuth, upload.single('image'), CategoryController.store)
router.post("/category/update/:id", ensureIsAuth, upload.single('image'), CategoryController.update)
router.get("/category/delete/:id", ensureIsAuth, CategoryController.delete)

// books routes
router.get("/books/index", ensureIsAuth, BookController.index);
router.post("/books/store", ensureIsAuth, upload.single('image'), BookController.store);
router.post("/books/update/:id", ensureIsAuth, upload.single('image'), BookController.update);
router.get("/books/delete/:id", ensureIsAuth, BookController.delete);

module.exports = router;