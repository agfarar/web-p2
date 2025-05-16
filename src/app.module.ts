import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EstudiantesModule } from './estudiantes/estudiantes.module';
import { ActividadesModule } from './actividades/actividades.module';
import { InscripcionesModule } from './inscripciones/inscripciones.module';
import { ResenasModule } from './resenas/resenas.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'tu_usuario',
      password: 'tu_contraseña',
      database: 'bonosdb',
      autoLoadEntities: true,
      synchronize: true,
    }),
    EstudiantesModule,
    ActividadesModule,
    InscripcionesModule,
    ResenasModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
