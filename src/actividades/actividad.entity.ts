// actividad.entity.ts
import { Estudiante } from 'src/estudiantes/estudiante.entity';
import { Inscripcion } from 'src/inscripciones/inscripcion.entity';
import { Resena } from 'src/resenas/resena.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToMany,
} from 'typeorm';

@Entity()
export class Actividad {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 200 })
  titulo: string;

  @Column('date')
  fecha: string;

  @Column('int')
  cupoMaximo: number;

  @Column('int', { default: 0 })
  estado: number;

  @OneToMany(() => Resena, (resena) => resena.actividad)
  resenas: Resena[];

  @OneToMany(() => Inscripcion, (inscripcion) => inscripcion.actividad)
  inscripciones: Inscripcion[];

  @ManyToMany(() => Estudiante, (estudiante) => estudiante.actividades)
  estudiantes: Estudiante[];
}
