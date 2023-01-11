import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from 'src/config/configuration';
import { MongooseModule } from '@nestjs/mongoose';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ClsModule } from 'nestjs-cls';
import { GlobalPluginModule } from 'src/mongoose-hooks/global-plugin.module';
import { GlobalPluginService } from 'src/mongoose-hooks/global-plugin.service';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ResponseInterceptor } from './response.interceptor';
import { AuthModule } from './auth/auth.module';
import { LogModule } from './log/log.module';
import { ProductsModule } from './products/products.module';
import { PricesModule } from './prices/prices.module';
import { StateCityModule } from './state-city/state-city.module';
import { MailModule } from './mail/mail.module';
import { TokenModule } from './token/token.module';
import { AccessModule } from './access/access.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { ProblemsModule } from './problems/problems.module';
import { SupermarketsModule } from './supermarkets/supermarkets.module';
import { ImagesModule } from './images/images.module';
import { AwsSdkModule } from 'nest-aws-sdk';
import { Credentials, S3 } from 'aws-sdk';
import { CategoriesModule } from './categories/categories.module';
import { TermsUseModule } from './terms-use/terms-use.module';
import { FaqModule } from './faq/faq.module';
import { PaymentsModule } from './payments/payments.module';
import { PublicProductsModule } from './public-products/public-products.module';
import { PublicSupermarketsModule } from './public-supermarkets/public-supermarkets.module';
import { PublicPricesModule } from './public-prices/public-prices.module';

const ENV = process.env.NODE_ENV;

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      envFilePath: !ENV ? '.env.dev' : `.env.${ENV}`,
    }),
    ClsModule.register({
      global: true,
      middleware: { mount: true }
    }),
    MongooseModule.forRootAsync({
      useFactory: (
        configService: ConfigService,
        globalPluginService: GlobalPluginService
      ) => configService.get('mongo')(globalPluginService)
      ,
      imports: [
        ConfigModule,
        GlobalPluginModule
      ],
      inject: [
        ConfigService,
        GlobalPluginService
      ],
    }),
    EventEmitterModule.forRoot({
      wildcard: true
    }),
    AwsSdkModule.forRootAsync({
      defaultServiceOptions: {
        useFactory: (configService: ConfigService,) => ({
          region: configService.get('aws.region'),
          credentials: new Credentials({
            accessKeyId: configService.get('aws.accessKeyId'),
            secretAccessKey: configService.get('aws.secretAccessKey')
          }),
        }),
        imports: [ConfigModule],
        inject: [ConfigService]
      },
      services: [S3],
    }),
    AuthModule,
    LogModule,
    ProductsModule,
    PricesModule,
    StateCityModule,
    MailModule,
    TokenModule,
    AccessModule,
    DashboardModule,
    ProblemsModule,
    SupermarketsModule,
    ImagesModule,
    CategoriesModule,
    TermsUseModule,
    FaqModule,
    PaymentsModule,
    PublicProductsModule,
    PublicSupermarketsModule,
    PublicPricesModule

  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    }
  ]
})
export class AppModule { }
