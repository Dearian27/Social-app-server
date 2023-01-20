import User from '../models/user.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken';



// Register 
export const register = async (req, res) => {
  try {
    const { username, password } = req.body;

    const isUsed = await User.findOne({ username });
    if (isUsed) {
      return res.json({
        message: "This username is already used",
      })
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    const newUser = new User({
      username,
      password: hash,
    })
    const token = jwt.sign(
      {
        id: newUser._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '30d'
      }
    )

    await newUser.save()

    res.json({
      newUser,
      token,
      message: "registration success"
    })

    console.log(res)
  }
  catch (err) {
    console.log(err)
    res.json({
      message: "error in creating account"
    })
  }
}
// Login
export const login = async (req, res) => {
  try {
    const { password, username } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      return res.json({
        message: "this user not exists"
      })
    }

    const isPasswordCorrect = bcrypt.compare(password, user.password)
    if (!isPasswordCorrect) {
      return res.json({
        message: "password is not correct"
      })
    }

    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '30d'
      }
    )

    res.json({
      token, user, message: `welcome ${user.username}`
    })
  }
  catch (err) {
    res.json({
      message: "errorr"
    })
  }
}
// Get me 
export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.userId)

    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '30d'
      }
    )
    res.json({
      user,
      token
    })
  }
  catch (err) {
    res.json({ message: "have not access" })
  }
}