import { ClsService } from 'nestjs-cls';
import * as mongoose from 'mongoose';
import { LogDocument } from 'src/schema';
export declare class GlobalPluginService {
    private readonly clsService;
    constructor(clsService: ClsService);
    setPlugin(logModel: mongoose.Model<LogDocument>): (schema: mongoose.Schema) => void;
    private logMiddleware;
}
