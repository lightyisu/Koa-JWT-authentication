const Koa = require("koa");
const app = new Koa();
const bodyParser = require("koa-bodyparser");

const user = require("./router/user");
const koaJwt = require("koa-jwt");

app.use(
  bodyParser({
    enableTypes: ["json", "form", "text"],
  })
);

app.use(
  koaJwt({
    secret: "token_super",
  }).unless({
    path: [/\/api\/register/, /\/api\/login/, /\/api\/userList/],
  })
);
app.use(user.routes(), user.allowedMethods());
app.listen(8080);
