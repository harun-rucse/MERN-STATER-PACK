const authRouter = require('../routes/auth');
const userRouter = require('../routes/user');
const settingsRouter = require('../routes/settings');
const AppError = require('../utils/appError');
const globalErrorHandler = require('../controllers/error');

module.exports = (app) => {
  app.use('/api/auth', authRouter);
  app.use('/api/users', userRouter);
  app.use('/api/settings', settingsRouter);

  app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
  });

  app.use(globalErrorHandler);
};
