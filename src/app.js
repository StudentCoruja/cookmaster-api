const express = require('express');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
require('express-async-errors');

const recipeRouter = require('./routes/recipe.routes');
const categoryRouter = require('./routes/category.route');
const userRouter = require('./routes/user.route');
const authRouter = require('./routes/auth.route');
const errorHandler = require('./middlewares/error.handler');
const rateLimiter = require('./middlewares/rate.limiter.middleware');
const speedLimiter = require('./middlewares/throttle.middleware');

const app = express();

morgan.token('custom-date', () => new Date().toISOString());

app.use(
  morgan(':custom-date :method :url :status - :response-time ms', {
    skip: (_req, res) => res.statusCode < 400, // Apenas loga respostas com erro (status >= 400)
  }),
);
app.use(helmet());

app.use(express.json({ limit: '1mb' })); // Limita o corpo JSON a 1 MB
app.use(express.urlencoded({ limit: '1mb', extended: true })); // Limita dados de formulários a 1 MB

app.use(cors());
app.use(rateLimiter);
app.use(speedLimiter);
app.use(compression());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/recipes', recipeRouter);
app.use('/categories', categoryRouter);
app.use('/users', userRouter);
app.use('/login', authRouter);
app.use((_req, res) => res.status(404).json({ message: 'Route Not Found!' }));

app.use((err, req, res, next) => {
  if (err.type === 'entity.too.large') {
    return res.status(413).json({ error: 'Payload Too Large' });
  }
  next(err);
});
app.use(errorHandler);

module.exports = app;
