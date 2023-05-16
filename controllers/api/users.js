const User = require("../../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const SALT_ROUNDS = 6;
module.exports = {
  create,
  login,
  checkToken,
};

async function create(req, res) {
  // console.trace("last step in lifecycle");
  try {
    const user = await User.create({
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
    });
    const token = createJWT(user);
    console.log(token);
    res.status(200).json(token);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
}

// async/wait new syntax for .then() aka thennables

async function login(req, res) {
  try {
    // Query our database to find a user with the email provided
    const user = await User.findOne({ email: req.body.email });
    if (!user) throw new Error();
    // if we found the email, compare password
    // 1st argument from the credentials that the user typed in
    // 2nd argument what's stored in the database
    const match = await bcrypt.compare(req.body.password, user.password);
    if (!match) throw new Error();
    // if everything checks out, create token, login!
    res.json(createJWT(user));
  } catch {
    res.status(400).json("Bad Credentials");
  }
}

function checkToken(req, res) {
  // req.user will always be there for you when a token is sent
  console.log("req.user", req.user);
  res.json(req.exp);
}
/* Helper function*/
function createJWT(user) {
  return jwt.sign({ user }, process.env.JWT_SECRET, { expiresIn: "24h" });
}
