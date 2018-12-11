const jwtStrategy=require('passport-jwt').Strategy;
const extractJwt=require('passport-jwt').ExtractJwt;
const User=require('../models/user');
const config=require('../config/database');

module.exports=function(passport){
    let opts={};
    opts.jwtFromRequest =extractJwt.fromAuthHeaderAsBearerToken();
    opts.secretOrKey =config.secret;
    passport.use(new jwtStrategy(opts,(jwt_payload,done)=>{
        console.log('jwt_payload'+jwt_payload);
        User.getUserById( jwt_payload._id,(err,user)=>{
            if (err) {
                return done(err, false);
            }
            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
                // or you could create a new account
            }
        })
    }));
}
