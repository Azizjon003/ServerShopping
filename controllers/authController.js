const db = require("../configs/db");
const cli = require("cli-color");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const AppError = require("../utility/appError");
const bcrypt = require("bcryptjs");
const catchAsync = require("../utility/catchAsync");
const Email = require("../utility/email");
const validator = require("validator");
const JwtSecret = process.env.JWT_SECRET;
const resetFunc = (token) => {
  const url = "http://localhost/resetpassword/";
  const expiresToken = new Date().getTime() + 15 * 60 * 1000;
  const hashToken = crypto
    .createHash("sha256")
    .digest("base64")
    .toString("hex");

  let mainUrl = url + token;
  return {
    mainUrl,
    hashToken,
    expiresToken,
  };
};
const passStrongly = (pass) => {
  if (!validator.isStrongPassword(pass)) {
    return false;
  }

  return true;
};
const tekshir = (email, username, phone) => {
  if (!validator.isEmail(email)) {
    return false;
  }
  if (!validator.isAlphanumeric(username)) {
    return false;
  }
  if (!validator.isMobilePhone(phone)) {
    return false;
  }
  return true;
};
const User = db.users;
const signUp = catchAsync(async (req, res, next) => {
  const {
    first_name,
    last_name,
    username,
    email,
    phone,
    password,
    passwordConfirm,
  } = req.body;
  const user = await User.create({
    first_name,
    last_name,
    username,
    email,
    phone,
    password,
    passwordConfirm,
  });
  if (!user) {
    new AppError("User not created", 400);
  }
  const id = user.id;
  const token = jwt.sign({ id }, JwtSecret, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
  res.status(200).json({
    token: token,
  });
});

const login = catchAsync(async (req, res, next) => {
  const { email, password, username, phone } = req.body;
  if ((!email && !username && !phone) || !password) {
    return next(new AppError("Please provide email and password", 400));
  }
  const user = await User.findOne({
    attributes: ["id", "email", "password", "username", "role"],
    where: {
      [db.Op.or]: [{ email }, { username }, { phone }],
    },
  });
  if (!user) {
    return next(new AppError("User not found", 404));
  }
  const shart = await bcrypt.compare(password, user.password);
  if (user.role === "admin") {
  }
  if (!shart) {
    return next(new AppError("Incorrect password", 401));
  }
  const id = user.id;
  const token = jwt.sign({ id }, JwtSecret, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
  res.status(200).json({
    token,
  });
});
const updatePassword = catchAsync(async (req, res, next) => {
  const { email, currentPassword, password, passwordConfirm } = req.body;
  // hamma ma'lumotlar kelayaptimi shuni tekshirib oldim
  if (!currentPassword || !password || !passwordConfirm || !email) {
    return next(
      new AppError("Fields currentpassword,password, email required", 400)
    );
  }
  //email bilan tekshirdim shu kishi bor yo'qligini
  const user = await User.findOne({
    attributes: [
      "id",
      "email",
      "password",
      "username",
      "role",
      "passwordConfirm",
    ],
    where: {
      email,
    },
  });
  if (!user) {
    return next(new AppError("user email is not found", 400));
  }
  console.log(cli.blue(user.password));
  const shart = await bcrypt.compare(currentPassword, user.password);
  if (!shart) {
    return next(new AppError("Current password is not pass", 401));
  }
  if (password !== passwordConfirm) {
    return next(new AppError("Password and password confirm not match", 401));
  }
  if (!passStrongly(password)) {
    return next(new AppError("Password is not strong", 401));
  }

  const newPass = await bcrypt.hash(password, 12);

  const updatedUser = await User.update(
    {
      password: newPass,
    },
    {
      where: {
        email,
      },
    }
  );

  if (!updatedUser) {
    return next(new AppError("Password not updated", 400));
  }

  res.status(200).json({
    status: "success",
    token: "",
  });
});
const protect = catchAsync(async (req, res, next) => {
  console.log(req.headers.authorization);
  let token = req.headers.authorization;
  if (token.split(" ")[0] === "Bearer" && token.split(" ")[1])
    token = req.headers.authorization.split(" ")[1];
  else return next(new AppError("Token not found", 401));
  const decoded = await jwt.verify(token, process.env.JWT_SECRET);

  const time = new Date().getTime();
  if (!decoded || !(decoded.exp <= time)) {
    return next(new AppError("Token is not valid", 401));
  }
  const user = await User.findOne({
    attributes: ["id", "email", "password", "username", "role"],
    where: {
      id: decoded.id,
    },
  });
  if (!user) {
    return new AppError("User not found", 404);
  }
  req.user = user;
  next();
});
const forgotPassword = catchAsync(async (req, res, next) => {
  const { email } = req.body;
  if (!email) {
    return next(new AppError("Email is required", 400));
  }
  const user = await User.findOne({
    attributes: ["id", "email", "password", "username", "role"],
    where: {
      email,
    },
  });
  if (!user) {
    return next(new AppError("User not found", 404));
  }
  const resetToken = crypto.randomBytes(32).toString("hex");
  const data = resetFunc(resetToken);
  const mail = new Email(user, data.mainUrl);

  await mail.sendMessage();

  const updatedUser = await User.update(
    {
      hashToken: data.hashToken,
      expiresToken: data.expiresToken,
    },
    {
      where: {
        email,
      },
    }
  );
  if (!updatedUser) {
    return next(new AppError("Password not updated", 400));
  }
  res.status(200).json({
    status: "success",
    message: "Email is sent reset token link",
  });
});
const resetPassword = catchAsync(async (req, res, next) => {
  const token = req.params.token;
  const hashToken = resetFunc(token).hashToken;
  console.log(cli.red(hashToken));
  const user = await User.findOne({
    where: {
      hashToken,
      expiresToken: {
        [db.Op.gt]: new Date().getTime(),
      },
    },
  });
  console.log(user);
  if (!user) {
    return next(new AppError("Token is not valid", 400));
  }
  const { password, passwordConfirm } = req.body;
  if (!password || !passwordConfirm) {
    return next(new AppError("Password and password confirm is required", 400));
  }

  if (password !== passwordConfirm) {
    return next(new AppError("Password and password confirm not match", 400));
  }
  if (!passStrongly(password)) {
    return next(new AppError("Password is not strong", 400));
  }
  const newPass = await bcrypt.hash(password, 12);
  const updatedUser = await User.update(
    {
      password: newPass,
      hashToken: null,
      expiresToken: null,
    },
    {
      where: {
        id: user.id,
      },
    }
  );
  if (!updatedUser) {
    return next(new AppError("Password not updated", 400));
  }
  res.status(200).json({
    message: "Password is updated",
  });
});

const role = (roles) => {
  return catchUser(async (req, res, next) => {
    if (!role.include(req.user.role)) {
      return next(new AppError("Sizning lavozimingiz to'g'ri kelmaydi", 401));
    }
    next();
  });
};
const updateMe = catchAsync(async (req, res, next) => {
  const userReq = req.user;
  const { phone, email, username } = req.body;
  const user = await User.findOne({
    where: {
      id: userReq.id,
    },
  });
  if (!user) {
    return next(new AppError("User not found", 404));
  }
  phone = phone || user.phone;
  email = email || user.email;
  username = username || user.username;
  const shart = tekshir(phone, email, username);
  if (!shart) {
    return next(new AppError("Phone, email, username is required", 400));
  }
  const updatedUser = await User.update(
    {
      phone,
      email,
      username,
    },
    {
      where: {
        id: userReq.id,
      },
    }
  );
});
const logout = catchAsync(async (req, res, next) => {
  res.cookie("jwt", "logout", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  res.status(200).json({
    status: "success",
  });
});
module.exports = {
  signUp,
  login,
  updatePassword,
  protect,
  forgotPassword,
  resetPassword,
  role,
  logout,
  updateMe,
};
