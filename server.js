const express = require('express');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('./swagger/swagger');
const authRoutes = require('./routes/authRoutes');
const jobRoutes = require('./routes/jobRoutes');
const applicationsRoutes = require('./routes/applicationsRoutes');
const bookmarkRoutes =require('./routes/bookmarkRoutes');
const companyReviewRoutes =require('./routes/companyReviewRoutes');
const { errorHandler } = require('./middlewares/errorHandler');
const sequelize = require('./config/config.js');

const app = express();
app.use(bodyParser.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use('/auth', authRoutes);
app.use('/jobs', jobRoutes);
app.use('/applications',applicationsRoutes);
app.use('/bookmarks',bookmarkRoutes);
app.use('/companyreview', companyReviewRoutes);
app.use(errorHandler);

app.use(errorHandler);
sequelize.sync({ force: false }).then(() => {
  app.listen(17443, () => {
    console.log('Server running on http://localhost:17443');
  });
});
