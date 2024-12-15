const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const { swaggerUi, swaggerSpec } = require('./swagger');
const yaml = require('js-yaml');
const authRoutes = require('./routes/authRoutes');
const jobRoutes = require('./routes/jobRoutes');
const applicationsRoutes = require('./routes/applicationsRoutes');
const bookmarkRoutes =require('./routes/bookmarkRoutes');
const companyReviewRoutes =require('./routes/companyReviewRoutes');
const { errorHandler } = require('./middlewares/errorHandler');
const sequelize = require('./config/config.js');
const requestLogger = require('./middlewares/requestLogger');
const errorLogger = require('./middlewares/errorLogger');
const performanceMonitor = require('./middlewares/performanceMonitor');
const logger = require('./utils/logger');
const app = express();
app.use(bodyParser.json());
app.use(requestLogger);


app.use(performanceMonitor);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/auth', authRoutes);
app.use('/jobs', jobRoutes);
app.use('/applications',applicationsRoutes);
app.use('/bookmarks',bookmarkRoutes);
app.use('/companyreview', companyReviewRoutes);
app.use(errorLogger);
app.use(errorHandler);

app.use((err, req, res, next) => {
  logger.error(`Error: ${err.message}`);

});
sequelize.sync({ force: false }).then(() => {
  app.listen(8080,() => {
    console.log(`Server running on http://localhost:10241`);
  });
});
