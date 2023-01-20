"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generatePagination = void 0;
function generatePagination(options) {
    let limit = 20;
    let sort = {};
    let skip = 0;
    if (options && options.itens_pagina) {
        limit = Number(options.itens_pagina);
    }
    if (options && options.ordernar) {
        const [key, value] = options.ordernar.split(',');
        sort = { [key]: Number(value) };
    }
    if (options && options.pagina) {
        const pagina = options.pagina;
        skip = pagina > 0 ? ((pagina - 1) * limit) : 0;
    }
    return { limit, sort, skip };
}
exports.generatePagination = generatePagination;
//# sourceMappingURL=pagination.js.map