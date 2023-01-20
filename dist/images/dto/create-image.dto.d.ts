import { ImageCategory } from 'src/schema';
export declare class CreateImageDto {
    url: string;
    id: number;
    codigo_barras: string;
    categoria: ImageCategory;
}
