const { PrismaClient } = require("@prisma/client");
const { Strategy } = require("passport-local").Strategy;
const { hash, compare } = require("../app/helpers/utils");
const user = require('../app/models/User')


// Initialize a prisma client
const prisma = new PrismaClient();
// Set strategy options
const options = {
    usernameField: "email",
    passwordField: "password",
    passReqToCallback: true
};



module.exports = (passport) => {

    const user = passport.use(new Strategy(options, async (req, e, p, done) => {
        // match  the user
        console.log(req.body._csrf);
        const email = req.body.email;
        const password = req.body.password;
        const user = await prisma.user.findFirst({ where: { email } });
        if (!user) {
            return done(null, false, { message: "Error" });
        }
        // match the password
        const validPassword = await compare(password, user.password);
        if (validPassword) {
            return done(null, user)
        }
        else {
            return done(null, false, { message: "Error in password" });
        }
    }));

    passport.serializeUser((user, done) => {
        done(null, user);
    });
    passport.deserializeUser(async (user, done) => {
        await prisma.user.findFirst({ where: { id: Number(user.id) } })
        done(null, user)
    })
}



























// module.exports = (passport) => {
//     // Passport middleware to signup users
//     passport.use(
//         "signup",
//         new Strategy(options, async (req, email, password, cb) => {
//             try {
//                 // Check if user found
//                 const existsEmail = await prisma.user.findFirst({ where: { email } });
//                 if (existsEmail)
//                     return cb(null, false, {
//                         message: "Email already exists.",
//                         statusCode: 400
//                     });
//                 // Create the user
//                 const user = await prisma.user.create({
//                     data: {
//                         name: req.body.name,
//                         email,
//                         password: await hash(password)
//                     }
//                 });
//                 return cb(null, user);
//             } catch (err) {
//                 console.error(err.message);
//                 return cb(null, err);
//             }
//         })
//     );
//     // Passport middleware to login users
//     options.passReqToCallback = false;
//     passport.use(
//         "login",
//         new Strategy(options, async (email, password, cb) => {
//             try {
//                 // Check if user found
//                 const user = await prisma.user.findFirst({ where: { email } });
//                 if (!user)
//                     return cb(null, false, {
//                         message: "No user found.",
//                         statusCode: 400
//                     });
//                 // Compare password
//                 const validPassword = await compare(password, user.password);
//                 if (!validPassword)
//                     return cb(null, false, {
//                         message: "Invalid credentials.",
//                         statusCode: 401
//                     });
//                 return cb(null, user);
//             } catch (err) {
//                 console.error(err.message);
//                 return cb(null, err);
//             }
//         })
//     );
// }