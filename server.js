const express = require('express');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('./swagger/swagger');
const authRoutes = require('./routes/authRoutes');
const jobRoutes = require('./routes/jobRoutes');
const applicationsRoutes = require('./routes/applicationsRoutes');
const sequelize = require('./config/config.js');
const { globalErrorHandler } = require('./middlewares/errorHandler');
const app = express();
app.use(bodyParser.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use('/auth', authRoutes);
app.use('/jobs', jobRoutes);
app.use('/applications',applicationsRoutes);
app.use(globalErrorHandler);
sequelize.sync({ force: false }).then(() => {
  app.listen(17443, () => {
    console.log('Server running on http://localhost:17443');
  });
});
