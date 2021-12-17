import express, { Express } from "express";
import morgan from "morgan";
import cors from "cors";

import logModule from "./modules/log.module";
import mongooseModule from "./modules/mongoose.module";
import components from "./components";
import notFoundMiddleware from "./middlewares/not-found.middleware";
import socketModule from "./modules/socket.module";
import { createServer } from "http";
const server: Express = express();
export let httpServer = createServer(server)


async function main(){
  const port: number = parseInt(process.env['PORT'] || '3000');
  server.use(express.json());
  server.use(express.urlencoded({ extended: true }));
  server.use(morgan('dev'));
  server.use(cors());
  server.use('/api', ...components);
  server.use('*', notFoundMiddleware)
  socketModule.socketConnect();
  
  try {
    await mongooseModule.connect();
    logModule.success('Database connection successful');
    httpServer.listen(port, () => {
      logModule.success(`Server listening on: http://localhost:${port}`);
  })
    // server.listen(port, () => {
    //   logModule.success(`Server listening on: http://localhost:${port}`);
    // });
  } 
  catch (error) {
    logModule.error(`Failed database connection`);
  }

}
export default { main };
