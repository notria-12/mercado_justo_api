import * as mongoose from 'mongoose';
export declare type CategoryDocument = Category & mongoose.Document;
export declare class Category {
    nome: string;
    pai: Category | string;
}
export declare const CategorySchema: mongoose.Schema<Category, mongoose.Model<Category, any, any, any, any>, {}, {}, {}, {}, "type", Category>;
