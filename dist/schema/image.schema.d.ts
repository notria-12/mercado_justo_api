import * as mongoose from 'mongoose';
export declare const imageCategory: readonly ["logo", "produto"];
export declare type ImageCategory = typeof imageCategory[number];
export declare type ImageDocument = Image & mongoose.Document;
export declare class Image {
    url: string;
    id?: number;
    codigo_barras: string;
    categoria: ImageCategory;
}
export declare const ImageSchema: mongoose.Schema<Image, mongoose.Model<Image, any, any, any, any>, {}, {}, {}, {}, "type", Image>;
