"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tryToParse = exports.generateSearchObject = exports.listByKey = exports.findAllWithPaginationSearch = void 0;
const mongoose_1 = require("mongoose");
const common_1 = require("..");
const class_validator_1 = require("class-validator");
const common_2 = require("@nestjs/common");
const DATE_SEPARATOR = ';';
async function findAllWithPaginationSearch(model, query, select = '', populate = '', preFilter = {}) {
    const { limit, sort, skip } = (0, common_1.generatePagination)(query);
    const search = generateSearchObject(query);
    let data;
    const parsedSearch = tryToParse(query.procurar);
    const searchObjs = Array.isArray(parsedSearch) ? parsedSearch : [parsedSearch];
    if (searchObjs[0] != null && searchObjs[0].termo == 'descricao') {
        data = await model.aggregate([
            {
                $match: Object.assign(Object.assign({}, preFilter), search),
            },
            {
                $addFields: {
                    startsWithO: { $regexMatch: { input: '$descricao', regex: `^${searchObjs[0].valor}\\b`, options: 'i' } },
                },
            },
            {
                $sort: { startsWithO: -1 },
            },
            {
                $skip: skip,
            },
            {
                $limit: limit,
            },
        ]);
    }
    else {
        data = await model.find(Object.assign(Object.assign({}, preFilter), search))
            .skip(skip)
            .limit(limit)
            .sort(sort)
            .select(select)
            .populate(populate);
    }
    const totalCount = await model.countDocuments(Object.assign(Object.assign({}, preFilter), search));
    const totalPages = Math.floor(totalCount / limit);
    return { data, totalCount, totalPages };
}
exports.findAllWithPaginationSearch = findAllWithPaginationSearch;
async function listByKey(model, query, key, select = '', populate = '') {
    const { sort } = (0, common_1.generatePagination)(query);
    const search = generateSearchObject(query);
    const items = await model.find(search)
        .sort(sort)
        .select(select)
        .populate(populate);
    let result = [];
    for (const item of items) {
        if (item[key] && !result.includes(item[key])) {
            result.push(item[key]);
        }
    }
    return result;
}
exports.listByKey = listByKey;
function generateSearchObject(rawSearch) {
    if (!rawSearch.procurar) {
        return {};
    }
    const parsedSearch = tryToParse(rawSearch.procurar);
    const searchObjs = Array.isArray(parsedSearch) ? parsedSearch : [parsedSearch];
    let resultSearchObj = {};
    for (const searchObj of searchObjs) {
        if (searchObj.estrito) {
            Object.assign(resultSearchObj, {
                [searchObj.termo]: searchObj.valor
            });
            continue;
        }
        if (searchObj.termo === 'all') {
            Object.assign(resultSearchObj, {
                $text: {
                    $search: searchObj.valor
                }
            });
            continue;
        }
        if (searchObj.tipo === 'string' || !searchObj.tipo) {
            if ((0, class_validator_1.isString)(searchObj.valor)) {
                if (searchObj.valor.match(/^-$/)) {
                    Object.assign(resultSearchObj, {
                        [searchObj.termo]: {
                            $exists: false,
                        }
                    });
                }
                else if (searchObj.valor.match(/^-/)) {
                    Object.assign(resultSearchObj, {
                        [searchObj.termo]: {
                            $ne: searchObj.valor.replace(/^-/, ''),
                        }
                    });
                }
                else {
                    Object.assign(resultSearchObj, {
                        [searchObj.termo]: {
                            $regex: regexWithAccents(searchObj.valor),
                            $options: 'i'
                        }
                    });
                }
            }
            else if (searchObj.multi) {
                if (Array.isArray(searchObj.valor) && !searchObj.valor.some(v => !(0, class_validator_1.isString)(v))) {
                    Object.assign(resultSearchObj, {
                        [searchObj.termo]: {
                            $in: searchObj.valor
                        }
                    });
                }
            }
        }
        else if (searchObj.tipo === 'number') {
            if ((0, class_validator_1.isNumber)(searchObj.valor)) {
                if (searchObj.estrito) {
                    Object.assign(resultSearchObj, {
                        [searchObj.termo]: Number(searchObj.valor)
                    });
                }
                else {
                    Object.assign(resultSearchObj, {
                        [searchObj.termo]: {
                            $gte: Number(searchObj.valor),
                            $lte: Number(searchObj.valor)
                        }
                    });
                }
            }
            else if (searchObj.multi) {
                if (Array.isArray(searchObj.valor) && !searchObj.valor.some(v => !(0, class_validator_1.isNumber)(v))) {
                    Object.assign(resultSearchObj, {
                        [searchObj.termo]: {
                            $in: searchObj.valor
                        }
                    });
                }
            }
        }
        else if (searchObj.tipo === 'date') {
            if (isValidDate(searchObj.valor)) {
                if (searchObj.valor.includes(DATE_SEPARATOR)) {
                    const firstDate = new Date(searchObj.valor.split(DATE_SEPARATOR)[0]);
                    const secondDate = new Date(searchObj.valor.split(DATE_SEPARATOR)[1]);
                    const initialDate = firstDate < secondDate ? firstDate : secondDate;
                    const finalDate = firstDate > secondDate ? firstDate : secondDate;
                    finalDate.setDate(finalDate.getDate() + 1);
                    Object.assign(resultSearchObj, {
                        [searchObj.termo]: {
                            $gte: initialDate.toISOString(),
                            $lte: finalDate.toISOString()
                        }
                    });
                }
                else {
                    const nextDay = new Date(searchObj.valor);
                    nextDay.setDate(nextDay.getDate() + 1);
                    Object.assign(resultSearchObj, {
                        [searchObj.termo]: {
                            $gte: new Date(searchObj.valor).toISOString(),
                            $lt: nextDay.toISOString()
                        }
                    });
                }
            }
        }
        else if (searchObj.tipo === 'boolean') {
            if ((0, class_validator_1.isBoolean)(searchObj.valor)) {
                Object.assign(resultSearchObj, {
                    [searchObj.termo]: searchObj.valor
                });
            }
        }
        else if (searchObj.tipo === 'objectId') {
            if (searchObj.multi) {
                if (Array.isArray(searchObj.valor) && !searchObj.valor.some(v => !(0, class_validator_1.isMongoId)(v))) {
                    Object.assign(resultSearchObj, {
                        [searchObj.termo]: {
                            $in: searchObj.valor.map(v => new mongoose_1.Types.ObjectId(v))
                        }
                    });
                }
            }
            else {
                if ((0, class_validator_1.isMongoId)(searchObj.valor)) {
                    Object.assign(resultSearchObj, {
                        [searchObj.termo]: new mongoose_1.Types.ObjectId(searchObj.valor)
                    });
                }
            }
        }
        else if (searchObj.tipo === 'null') {
            Object.assign(resultSearchObj, {
                [searchObj.termo]: null,
            });
        }
    }
    return resultSearchObj;
}
exports.generateSearchObject = generateSearchObject;
function isValidDate(value) {
    if (value.includes(DATE_SEPARATOR)) {
        const firstDate = value.split(DATE_SEPARATOR)[0];
        const secondDate = value.split(DATE_SEPARATOR)[1];
        return isValidDate(firstDate) && isValidDate(secondDate);
    }
    return value.length >= 'yyyy-mm-dd'.length &&
        isFinite(new Date(value).getTime()) &&
        new Date(value) instanceof Date;
}
function tryToParse(value) {
    try {
        if (typeof value === 'string') {
            return JSON.parse(value);
        }
        else {
            return value;
        }
    }
    catch (error) {
        throw new common_2.BadRequestException({
            mensagem: 'Algo na sua busca está errado.',
            dados: error.message
        });
    }
}
exports.tryToParse = tryToParse;
function regexWithAccents(search) {
    let result = search.replace(new RegExp("(\\w)(\\s+)(e|do|da|do|das|de|di|du)(\\s+)(\\w)"), "$1 $5");
    const charsAccent = [
        ['a', 'á', 'à', 'â', 'ã'],
        ['e', 'é', 'ê'],
        ['i', 'í'],
        ['o', 'ó', 'ô', 'õ'],
        ['u', 'ú'],
        ['c', 'ç']
    ];
    let newRegex = '';
    const preWorkedSearch = `(?=.*${result.toLowerCase()}.*)`;
    for (const char of preWorkedSearch) {
        let found = false;
        for (const group of charsAccent) {
            if (group.includes(char)) {
                newRegex += `[${group.toString().replace(/,/g, '')}]`;
                found = true;
                break;
            }
        }
        if (!found) {
            newRegex += char;
        }
    }
    return `${newRegex.replace(/\s/g, ")(?=.*")}`;
}
//# sourceMappingURL=search.js.map