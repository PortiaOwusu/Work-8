const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const user = require("../models/user");

const register = async (req, res) => {
  try {
    const { email, username, password } = req.body;

    // Check if all fields are present
    if (!email || !username || !password) {
      return res.status(400).send("Please provide all fields. ");
    }

    // Check if username/email is alread in database
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).send("Email already exsists");
    }

    //   Hashing of password
    const hashedpassword = await bcrypt.hash(password, 12);

    //   save the user to the DB (create user)
    const user = await User.create({
      email,
      username,
      password: hashedpassword,
    });

    // Generate Token
    const token = jwt.sign({ id: user._id }, "secretspace", {
      expiresIn: "1h",
    });

    // return response
    res.status(201).json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // check if user in the database
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send("Invalid Credentials");
    }

    // compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send("Invalid Credentials");
    }

    // Generate Token
    const token = jwt.sign({ id: user._id }, "secretspace", {
      expiresIn: "1h",
    });

    // return response
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const verifyToken = (req, res, next) => {
  let token = req.headers["authorization"];

  if (!token) {
    return res.status(401).json({ message: "Not Authorized." });
  }

  token = token.split(" ")[1];
  try {
    let user = jwt.verify(token, "secretspace");
    req.user = user.id;
    return next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }

  next();
};

module.exports = {
  register,
  login,
  verifyToken,
};
