const KoaRouter = require('koa-router');

module.exports = function generic(modelName) {
  const router = new KoaRouter();
  router.post('/', async (ctx) => {
    const { model, request } = ctx;
    const User = model(modelName);
    const user = new User(request.body);
    await user.save();
    ctx.body = user;
  });
  router.get('/', async (ctx) => {
    const { model } = ctx;
    const User = model(modelName);
    ctx.body = await User.find();
  });
  router.get('/:id', async (ctx) => {
    const { model, params } = ctx;
    const User = model(modelName);
    const user = await User.findById(params.id);
    ctx.body = user;
  });
  router.put('/', async (ctx) => {
    const { model, request } = ctx;
    const User = model(modelName);
    const user = request.body;
    await User.update({ _id: user._id }, user);
    ctx.body = { success: 'ok' };
  });
  return router;
};
