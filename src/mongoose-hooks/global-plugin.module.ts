import { Module } from '@nestjs/common';
import { GlobalPluginService } from 'src/mongoose-hooks/global-plugin.service';

@Module({
  providers: [GlobalPluginService],
  exports: [GlobalPluginService]
})
export class GlobalPluginModule { }
