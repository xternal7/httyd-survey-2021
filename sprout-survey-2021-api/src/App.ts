import express from 'express';
import { resolvePing } from './routes/ping';
import dotenv from 'dotenv';
import { GdocsScrapper } from './modules/GdocsScrapper';

export class App {
  app: any = undefined;
  port: number = 8888;



  gdocScrapper: any;

  start() {
    dotenv.config();
    
    this.app = express();
    this.registerRoutes();
    this.app.listen(this.port);
    console.log(`App is reachable on port ${this.port}`);
    console.log('process.env.dataUrl', process.env.dataUrl);

    if (process.env.dataUrl) {
      this.gdocScrapper = new GdocsScrapper(process.env.dataUrl);

      this.gdocScrapper.getData();
    } else {
      throw 'process.env.dataUrl is not defined'
    }
  }
  
  private registerRoutes() {
    this.app.get('/ping', resolvePing);
  }
} 
