var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/register', function(req, res, next) {
  res.render('register', {
    'title': 'Register'
  });
});

router.get('/login', function(req, res, next) {
  res.render('login', {
    'title': 'Login'
  });
});

router.post('/register', function(req, res, next) {
  //Get Form Values
  var name = req.body.name;
  var email = req.body.email;
  var username = req.body.username;
  var password = req.body.password;
  var password2 = req.body.password2;

  //Check for Image Field
  if (req.files.profileimage) {
    console.log('Uploading File...');
    //File Info
    var profileImageOriginalName = req.files.profileimage.originalname;
    var profileImageName = req.files.profileimage.name;
    var profileImageMime = req.files.profileimage.mimeType;
    var profileImagePath = req.files.profileimage.path;
    var profileImageExt = req.files.profileimage.extension;
    var profileImageSize = req.files.profileimage.Size;
  } else {
    //Set a Default Image
    var profileImageName = 'default.png';
  }

  //Form Validation
  req.checkBody('name', 'Name filed is required').notEmpty();
  req.checkBody('email', 'Email filed is required').isEmail();
  req.checkBody('username', 'Username filed is required').notEmpty();
  req.checkBody('password', 'Password filed is required').notEmpty();
  req.checkBody('password2', 'Passwords do not match').equals(req.body.password);

  //Check for errors
  var errors = req.validationErrors();

  if (errors) {
    res.render('register', {
      errorss: errors,
      name: name,
      email: email,
      username: username,
      passowrd: password,
      password2: password2
    });
  } else {
    var newUser = new User({
      name: name,
      email: email,
      username: username,
      passowrd: password,
      profileimage: profileImageName
    });

    //Create User
    User.createUser(newUser, function(err, user) {
      if (err) throw err;
      console.log(user);
    });

    //Sending Flash Message to User
    req.flah('success', 'You are now registered and may login');
    //Redirect back to home profileimage
    res.location('/');
    res.redirect('/');
  }
});

module.exports = router;
