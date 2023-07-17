"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schema_1 = require("../schema");
const global_plugin_service_1 = require("../mongoose-hooks/global-plugin.service");
const multer = require("multer");
const handlebars_adapter_1 = require("@nestjs-modules/mailer/dist/adapters/handlebars.adapter");
const path_1 = require("path");
exports.default = () => ({
    mongo: function (globalPluginService) {
        return {
            uri: process.env.MONGO_URI,
            connectionFactory: (connection) => {
                const logModel = connection.model(schema_1.Log.name, schema_1.LogSchema);
                connection.plugin(globalPluginService.setPlugin(logModel));
                return connection;
            },
        };
    },
    jwt: {
        secret: process.env.JWT_SECRET,
        signOptions: {
            expiresIn: '30d'
        },
    },
    google: {
        client_id: process.env.GOOGLE_CLIENT_ID
    },
    multer: {
        storage: multer.diskStorage({
            destination: function (req, file, cb) {
                const folder = '/tmp';
                cb(null, folder);
            },
            filename: function (req, file, cb) {
                const newFilename = `${Date.now()}-${file.originalname}`;
                cb(null, `${newFilename}`);
            }
        })
    },
    mailer: {
        transport: {
            host: process.env.MAIL_HOST,
            secure: false,
            port: 587,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASSWORD,
            },
        },
        defaults: {
            from: process.env.MAIL_FROM,
        },
        template: {
            dir: (0, path_1.join)(__dirname, '../mail/templates'),
            adapter: new handlebars_adapter_1.HandlebarsAdapter(),
            options: {
                strict: true,
            },
        },
    },
    token: {
        expiresIn: 5 * 60 * 1000,
        length: 6
    },
    aws: {
        bucketName: process.env.AWS_BUCKET_NAME,
        region: process.env.AWS_REGION,
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_KEY
    }
});
//# sourceMappingURL=configuration.js.map