import { PaginationDto } from '../pagination';
export declare class SearchObj {
    termo: string;
    valor: any;
    estrito: boolean;
    tipo: 'string' | 'number' | 'date' | 'boolean' | 'objectId';
    multi: boolean;
}
export declare class FindAllSearchDto extends PaginationDto {
    procurar?: SearchObj[];
}
