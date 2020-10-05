import "reflect-metadata";
import express from 'express';


const startApp = async () => {
  try {
    const app = express();
    app.use(express.json());
    app.use(express.urlencoded({extended: true}));
    app.get('/ping', (req, res, _) => {
      res.send('pong');
    });

    const port = process.env.PORT || 3000;
    app.listen(port, () => {
      console.log(`portfolio-publication-service listening on port ${port}`);
    });
  } catch (e) {
    console.error('Could not start application %o', e);
    process.exit(1);
  }
};

startApp();