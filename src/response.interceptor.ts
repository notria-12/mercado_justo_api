import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Request, Response } from 'express';
import { ClsService } from 'nestjs-cls';

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor {
  constructor(private readonly cls: ClsService) { }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    this.cls.set('user', context.switchToHttp().getRequest().user);
    this.cls.set('controller', context.getClass().name);
    this.cls.set('ip', context.switchToHttp().getRequest().headers['x-forwarded-for'] || context.switchToHttp().getRequest().ip)

    const handler = context.getHandler().name;
    const path = (context.switchToHttp()).getRequest<Request>().path;
    const prefix = '/mercado-justo/api/v1/';
    let route = path.replace(prefix, '');

    for (const routeKey in this.orderKeysDescending(routes)) {
      if (route.match(RegExp(routeKey))) {
        route = routeKey;
        break;
      }
    }

    return next.handle().pipe(map(data => ({
      mensagem: this.generateMessage(route, handler),
      dados: this.handleData(context, handler, data),
      timestamp: new Date().toISOString(),
    })));
  }

  generateMessage(route: string, handler: string): string {
    if (handler.match(/create/i)) {
      return `${routes[route].singular} criad${routes[route].gender} com sucesso.`;
    } else if (handler.match(/all/i)) {
      return `${routes[route].plural} listad${routes[route].gender}s com sucesso.`;
    } else if (handler.match(/login/i)) {
      return 'Logado com sucesso.';
    }else if (handler.match(/verify/i)) {
      return `Numero verificado com sucesso.`
    }else if (handler.match(/one/i)) {
      console.log(handler);
      return `${routes[route].singular} recuperad${routes[route].gender} com sucesso.`;
    } else if (handler.match(/update/i)) {
      return `${routes[route].singular} atualizad${routes[route].gender} com sucesso.`;
    } else if (handler.match(/bulkRemove/i)) {
      return `${routes[route].plural} removid${routes[route].gender}s com sucesso.`;
    } else if (handler.match(/remove/i)) {
      return `${routes[route].singular} removid${routes[route].gender} com sucesso.`;
    }  else if (handler.match(/validate/i)) {
      return 'Token de acesso validado com sucesso.';
    } else if (handler.match(/exists/i)) {
      return `${routes[route].singular} verificad${routes[route].gender} com sucesso.`
    } else if (handler.match(/import/i)) {
      return `Dados importados com sucesso para ${routes[route].singular}.`
    }
 
  }

  handleData(context: ExecutionContext, handler: string, resData: any) {
    if (handler.match(/findAll/i) && Object.keys(resData).includes('totalCount')) {
      const { data, totalCount, totalPages } = resData;
      (context.switchToHttp()).getResponse<Response>().header('X-Total-Count', totalCount);
      (context.switchToHttp()).getResponse<Response>().header('X-Total-Pages', totalPages);
      return data;
    } else {
      return resData;
    }
  }

  orderKeysDescending(object) {
    return Object.keys(object).sort((a, b) => {
      if (a < b) return 1;
      if (a > b) return -1;
      return 0;
    }).reduce((obj, key) => {
      obj[key] = object[key];
      return obj;
    }, {});
  }
}

const routes = {
  acessos: {
    singular: 'Acesso',
    plural: 'Acessos',
    gender: 'o'
  },
  categorias: {
    singular: 'Categoria',
    plural: 'Categorias',
    gender: 'o'
  },
  dashboard: {
    singular: 'Dashboard',
    plural: 'Dashboard',
    gender: 'o',
  },
  'estado-cidade': {
    singular: 'Estado/Cidade',
    plural: 'Estados/Cidades',
    gender: 'o'
  },
  imagens: {
    singular: 'Imagem',
    plural: 'Imagens',
    gender: 'a'
  },
  logs: {
    singular: 'Log',
    plural: 'Logs',
    gender: 'o'
  },
  mercados: {
    singular: 'Mercado',
    plural: 'Mercados',
    gender: 'o'
  },
  'perguntas-frequentes': {
    singular: 'Pergunta frequente',
    plural: 'Perguntas frequentes',
    gender: 'a'
  },
  precos: {
    singular: 'Preço',
    plural: 'Preços',
    gender: 'o'
  },
  problemas: {
    singular: 'Problema',
    plural: 'Problemas',
    gender: 'o'
  },
  produtos: {
    singular: 'Produto',
    plural: 'Produtos',
    gender: 'o'
  },
  'termos-uso': {
    singular: 'Termos de uso',
    plural: '',
    gender: 'o'
  },
  usuarios: {
    singular: 'Usuário',
    plural: 'Usuários',
    gender: 'o'
  },
};
