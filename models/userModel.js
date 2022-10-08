const hashPassword = require("../utility/hashpass");
const validator = require("validator");
const User = (sequelize, DataTypes) => {
  const User = sequelize.define("users", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        min: 5,
        max: 20,
      },
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        min: 5,
        max: 20,
      },
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isAlphanumeric: true,
        len: [3, 20],
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
      lowercase: true,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [10, 15],
        validatePhone: (value) => {
          if (!validator.isMobilePhone(value)) {
            throw new Error("Phone number is not valid");
          }
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        min: 8,
        max: 20,
        strongPass(value) {
          if (!validator.isStrongPassword(value)) {
            throw new Error("Password is not strong enough");
          }
        },
      },
    },
    passwordConfirm: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        passConfirm(value) {
          if (value !== this.password) {
            throw new Error("Password and passwordConfirm are not the same");
          }
        },
      },
    },
    role: {
      type: DataTypes.ENUM,
      defaultValue: "user",
      values: ["admin", "user", "moderator"],
    },
    activ: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    hashToken: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {},
    },
    expiresToken: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    emailActiv: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    phoneActiv: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  });
  User.beforeCreate(async (user, options) => {
    const password = await hashPassword(user.password);
    user.password = password;
    user.passwordConfirm = null;
  });
  return User;
};
module.exports = User;
