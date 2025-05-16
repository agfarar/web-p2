import { Actividad } from 'src/actividades/actividad.entity';
import { Inscripcion } from 'src/inscripciones/inscripcion.entity';
import { Resena } from 'src/resenas/resena.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Estudiante {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int')
  cedula: number;

  @Column({ length: 100 })
  nombre: string;

  @Column({ length: 200 })
  correo: string;

  @Column({ length: 100 })
  programa: string;

  @Column('int')
  semestre: number;

  @OneToMany(() => Resena, (resena) => resena.estudiante)
  resenas: Resena[];

  @OneToMany(() => Inscripcion, (inscripcion) => inscripcion.estudiante)
  inscripciones: Inscripcion[];

  @ManyToMany(() => Actividad, (actividad) => actividad.estudiantes)
  @JoinTable({
    name: 'inscripcion',
    joinColumn: { name: 'estudianteId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'actividadId', referencedColumnName: 'id' },
  })
  actividades: Actividad[];
}
