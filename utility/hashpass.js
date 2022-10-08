const bcrypt = require("bcryptjs");
const hashPassword = async (password) => {
  const hashPass = await bcrypt.hash(password, 12);
  return hashPass;
};

module.exports = hashPassword;
