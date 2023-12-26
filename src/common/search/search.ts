import { FilterQuery, Model, PopulateOptions, Types } from 'mongoose';
import { SearchObj, FindAllSearchDto, generatePagination } from 'src/common';
import { isNumber, isBoolean, isString, isMongoId, isNumberString } from 'class-validator';
import { BadRequestException } from '@nestjs/common';
const DATE_SEPARATOR = ';';

export async function findAllWithPaginationSearch(
  model: Model<any>,
  query: FindAllSearchDto,
  select: string = '',
  populate: PopulateOptions | string = '',
  preFilter: FilterQuery<any> = {}
) {

  const parsedSearch = tryToParse(query.procurar);
  const searchObjs: SearchObj[] = Array.isArray(parsedSearch) ? parsedSearch : [parsedSearch];
  const { limit, sort, skip } = generatePagination(query);
  const search = generateSearchObject(query);
  

  // const data = await (model as any).find({ ...preFilter, ...search },)
  //   .skip(skip)
  //   .limit(limit)
  //   .sort(sort)
  //   .select(select)
  //   .populate(populate);

  const data = await (model as any).aggregate([
    {
      $match: { ...preFilter,
        ...search
      },
    },
    {
      $addFields: {
        startsWithO: { $regexMatch: { input: '$descricao', regex: `^${searchObjs[0].valor}\\b`,options: 'i' } },
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

  const totalCount = await model.countDocuments({ ...preFilter, ...search });
  const totalPages = Math.floor(totalCount / limit);
  return { data, totalCount, totalPages };
}

export async function listByKey(
  model: Model<any>,
  query: FindAllSearchDto,
  key: string,
  select = '',
  populate: PopulateOptions | string = '',
) {
  const { sort } = generatePagination(query);
  const search = generateSearchObject(query);
  const items = await (model as any).find(search)
    .sort(sort)
    .select(select)
    .populate(populate);

  // Use aggregation (?)
  let result = [];
  for (const item of items) {
    if (item[key] && !result.includes(item[key])) {
      result.push(item[key]);
    }
  }
  return result;
}

export function generateSearchObject(rawSearch: FindAllSearchDto) {
  if (!rawSearch.procurar) {
    return {};
  }
  const parsedSearch = tryToParse(rawSearch.procurar);
  const searchObjs: SearchObj[] = Array.isArray(parsedSearch) ? parsedSearch : [parsedSearch];
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
      if (isString(searchObj.valor)) {
        if (searchObj.valor.match(/^-$/)) {

          Object.assign(resultSearchObj, {
            [searchObj.termo]: {
              $exists: false,
            }
          });
        } else if (searchObj.valor.match(/^-/)) {
          Object.assign(resultSearchObj, {
            [searchObj.termo]: {
              $ne: searchObj.valor.replace(/^-/, ''),
            }
          });
        } else {
          Object.assign(resultSearchObj, {
            [searchObj.termo]: {
              $regex: regexWithAccents(searchObj.valor),
              $options: 'i'
            }
          });
        }
      } else if (searchObj.multi) {
        if (Array.isArray(searchObj.valor) && !searchObj.valor.some(v => !isString(v))) {
          Object.assign(resultSearchObj, {
            [searchObj.termo]: {
              $in: searchObj.valor
            }
          });
        }
      }
    } else if (searchObj.tipo === 'number') {
      if (isNumber(searchObj.valor)) {
        if (searchObj.estrito) {
          Object.assign(resultSearchObj, {
            [searchObj.termo]: Number(searchObj.valor)
          });
        } else {
          Object.assign(resultSearchObj, {
            [searchObj.termo]: {
              $gte: Number(searchObj.valor),
              $lte: Number(searchObj.valor)
            }
          });
        }
      } else if (searchObj.multi) {
        if (Array.isArray(searchObj.valor) && !searchObj.valor.some(v => !isNumber(v))) {
          Object.assign(resultSearchObj, {
            [searchObj.termo]: {
              $in: searchObj.valor
            }
          });
        }
      }
    } else if (searchObj.tipo === 'date') {
      if (isValidDate(searchObj.valor)) {
        if (searchObj.valor.includes(DATE_SEPARATOR)) {
          const firstDate = new Date(searchObj.valor.split(DATE_SEPARATOR)[0]);
          const secondDate = new Date(searchObj.valor.split(DATE_SEPARATOR)[1]);
          const initialDate = firstDate < secondDate ? firstDate : secondDate;
          const finalDate = firstDate > secondDate ? firstDate : secondDate;
          finalDate.setDate(finalDate.getDate() + 1)
          Object.assign(resultSearchObj, {
            [searchObj.termo]: {
              $gte: initialDate.toISOString(),
              $lte: finalDate.toISOString()
            }
          });
        } else {
          const nextDay = new Date(searchObj.valor)
          nextDay.setDate(nextDay.getDate() + 1)
          Object.assign(resultSearchObj, {
            [searchObj.termo]: {
              $gte: new Date(searchObj.valor).toISOString(),
              $lt: nextDay.toISOString()
            }
          });
        }
      }
    } else if (searchObj.tipo === 'boolean') {
      if (isBoolean(searchObj.valor)) {
        Object.assign(resultSearchObj, {
          [searchObj.termo]: searchObj.valor
        });
      }

    } else if (searchObj.tipo === 'objectId') {
      if (searchObj.multi) {
        if (Array.isArray(searchObj.valor) && !searchObj.valor.some(v => !isMongoId(v))) {
          Object.assign(resultSearchObj, {
            [searchObj.termo]: {
              $in: searchObj.valor.map(v => new Types.ObjectId(v))
            }
          });
        }
      } else {
        if (isMongoId(searchObj.valor)) {
          Object.assign(resultSearchObj, {
            [searchObj.termo]: new Types.ObjectId(searchObj.valor)
          });
        }
      }
    } else if (searchObj.tipo === 'null') {
      Object.assign(resultSearchObj, {
        [searchObj.termo]: null,
      });
    }
  }
  return resultSearchObj;
}

function isValidDate(value: string) {
  if (value.includes(DATE_SEPARATOR)) {
    const firstDate = value.split(DATE_SEPARATOR)[0];
    const secondDate = value.split(DATE_SEPARATOR)[1];
    return isValidDate(firstDate) && isValidDate(secondDate);
  }
  return value.length >= 'yyyy-mm-dd'.length &&
    isFinite(new Date(value).getTime()) &&
    new Date(value) instanceof Date;
}

export function tryToParse(value: any) {
  try {
    if (typeof value === 'string') {
      return JSON.parse(value);
    } else {
      return value;
    }
  } catch (error) {
    throw new BadRequestException({
      mensagem: 'Algo na sua busca está errado.',
      dados: error.message
    });
  }
}

function regexWithAccents(search: string) {
  let result = search.replace(new RegExp("(\\w)(\\s+)(e|do|da|do|das|de|di|du)(\\s+)(\\w)"), "$1 $5")
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
    let found = false
    for (const group of charsAccent) {
      if (group.includes(char)) {
        newRegex += `[${group.toString().replace(/,/g, '')}]`
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
