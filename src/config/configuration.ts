import { MongooseModuleOptions } from '@nestjs/mongoose';
import { JwtModuleOptions } from '@nestjs/jwt';
import { Log, LogSchema } from 'src/schema';
import { GlobalPluginService } from 'src/mongoose-hooks/global-plugin.service';
import * as multer from 'multer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { join } from 'path';

export default () => ({
  mongo: function (globalPluginService: GlobalPluginService) {
    return {
      uri: process.env.MONGO_URI,
      connectionFactory: (connection) => {
        const logModel = connection.model(Log.name, LogSchema);
        connection.plugin(globalPluginService.setPlugin(logModel))
        return connection
      },
    } as MongooseModuleOptions
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    signOptions: {
      expiresIn: '7d'
    },
  } as JwtModuleOptions,
  google: {
    client_id: process.env.GOOGLE_CLIENT_ID
  },
  multer: {
    storage: multer.diskStorage({
      destination: function (req, file, cb) {
        const folder = '/tmp'
        cb(null, folder)
      },
      filename: function (req, file, cb) {
        const newFilename = `${Date.now()}-${file.originalname}`
        cb(null, `${newFilename}`)
      }
    })
  },
  mailer: {
    transport: {
      host: process.env.MAIL_HOST,
      secure: true,
      port: 465,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD,
      },
    },
    defaults: {
      from: process.env.MAIL_FROM,
    },
    template: {
      dir: join(__dirname, '../mail/templates'),
      adapter: new HandlebarsAdapter(),
      options: {
        strict: true,
      },
    },
  },
  token: {
    expiresIn: 5 * 60 * 1000, // milliseconds
    length: 6
  },
  aws: {
    bucketName: process.env.AWS_BUCKET_NAME,
    region: process.env.AWS_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY
  }
})