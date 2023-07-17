import { MongooseModuleOptions } from '@nestjs/mongoose';
import { JwtModuleOptions } from '@nestjs/jwt';
import { GlobalPluginService } from 'src/mongoose-hooks/global-plugin.service';
import * as multer from 'multer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
declare const _default: () => {
    mongo: (globalPluginService: GlobalPluginService) => MongooseModuleOptions;
    jwt: JwtModuleOptions;
    google: {
        client_id: string;
    };
    multer: {
        storage: multer.StorageEngine;
    };
    mailer: {
        transport: {
            host: string;
            secure: boolean;
            logger: boolean;
            debug: boolean;
            port: number;
            auth: {
                user: string;
                pass: string;
            };
        };
        defaults: {
            from: string;
        };
        template: {
            dir: string;
            adapter: HandlebarsAdapter;
            options: {
                strict: boolean;
            };
        };
    };
    token: {
        expiresIn: number;
        length: number;
    };
    aws: {
        bucketName: string;
        region: string;
        accessKeyId: string;
        secretAccessKey: string;
    };
};
export default _default;
