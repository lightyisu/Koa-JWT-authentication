const crypto = require("crypto");
const jwt = require("jsonwebtoken");

let userList = [];

class UserController {

  static async register(ctx) {
    const data = ctx.request.body;

    const checkUser = userList.find(item => item.name === data.name);
    if (checkUser) {
      return ctx.body = {
        code: 'x02',
        message: '该用户已经存在'
      }
    }
    const user = {
      name: data.name,
      password: crypto.createHash('md5').update(data.password).digest('hex')
    }
    userList.push(user);
    return ctx.body = {
      code: '0',
      message: '注册成功'
    }
  }

  static getUersList(ctx) {
    return ctx.body = {
      code: '66',
      message: {
        userList
      }
    }
  }












  static async login(ctx) {
    const data = ctx.request.body;
    if (!data.name || !data.password) {
      return (ctx.body = {
        code: "00000x2",
        message: "参数不合法",
      });
    }
    const res = userList.find(
      (item) =>
        item.name === data.name &&
        item.password ===
        crypto.createHash("md5").update(data.password).digest("hex")
    );
    if (res) {
      const token = jwt.sign(
        {
          name: res.name,
        },
        "token_super",
        { expiresIn: 60 * 60 }
      );
      return ctx.body = {
        code: '0',
        message: '登录成功',
        data: {
          token
        }
      }
    } else {
      return ctx.body = {
        code: '02x',
        message: '用户名或密码错误'
      }
    }
  }
}
module.exports = UserController;