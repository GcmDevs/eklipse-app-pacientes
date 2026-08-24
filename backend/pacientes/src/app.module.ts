import { Module, OnModuleInit } from '@nestjs/common';
import { initializeSources } from '@common/infrastructure/services';
import { GeneralModule } from '@gen/general/module';
import { SecurityModule } from '@gen/security/module';
import { ENTITIES } from './app.entities';

@Module({
  imports: [
    // --- AVOID NOWRAP --- //
    GeneralModule,
    SecurityModule,
  ],
})
export class AppModule implements OnModuleInit {
  public onModuleInit(): void {
    initializeSources(ENTITIES);
  }
}
