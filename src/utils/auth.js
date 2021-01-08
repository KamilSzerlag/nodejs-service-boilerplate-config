import config from "../../config";
import { User } from "../resources/user/user.model";
import jwt from "jsonwebtoken";

export const newToken = (user) => {
  return jwt.sign({ id: user.id, email: user.email }, config.secrets.jwt, {
    expiresIn: config.secrets.jwtExp,
  });
};

export const verifyToken = (token) =>
  new Promise((resolve, reject) => {
    jwt.verify(token, config.secrets.jwt, (err, payload) => {
      if (err) return reject(err);
      resolve(payload);
    });
  });

export const signup = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  if (!email || !password) {
    return res.status(400).send({ message: "User couldn't be created" });
  }
  try {
    const user = await User.create(req.body);
    const token = newToken(user);
    return res.status(201).send({ token: token });
  } catch (e) {
    console.error(e);
    return res.status(400).send({ message: "User couldn't be created" });
  }
};

export const signin = async (req, res) => {};

export const protect = async (req, res, next) => {
  next();
};
