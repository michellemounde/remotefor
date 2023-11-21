const express = require('express');
const bcrypt = require('bcryptjs');

const { check } = require('express-validator');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');

const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

const validateSignup = [
  check('email')
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage('Please provide a valid email.'),
  check('username')
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage('Please provide a username with at least 4 characters.'),
  check('username')
    .not()
    .isEmail()
    .withMessage('Username cannot be an email.'),
  check('firstName')
    .exists({ checkFalsy: true })
    .isLength({ min: 1 })
    .withMessage('Please provide a first name with at least 1 character.'),
  check('firstName')
    .not()
    .isEmail()
    .withMessage('First name cannot be an email.'),
  check('lastName')
    .exists({ checkFalsy: true })
    .isLength({ min: 1 })
    .withMessage('Please provide a last name with at least 1 character.'),
  check('lastName')
    .not()
    .isEmail()
    .withMessage('Last name cannot be an email.'),
  check('password')
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage('Password must be 6 characters or more.'),
  handleValidationErrors,
];

// Sign up
// POST /api/users
router.post(
  '/',
  validateSignup,
  async (req, res) => {
    const {
      email, password, username, firstName, lastName,
    } = req.body;
    const hashedPassword = bcrypt.hashSync(password);
    const user = await User.create({
      email, username, firstName, lastName, hashedPassword,
    });

    const safeUser = {
      id: user.id,
      email: user.email,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
    };

    await setTokenCookie(res, safeUser);

    return res.json({ user: safeUser });
  },
);

module.exports = router;
