import { PaginationDto } from './pagination.dto';
export declare function generatePagination(options: PaginationDto): {
    limit: number;
    sort: {};
    skip: number;
};
