import { Actividad } from 'src/actividades/actividad.entity';
import { Estudiante } from 'src/estudiantes/estudiante.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class Resena {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  comentario: string;

  @Column('int')
  calificacion: number;

  @Column('date')
  fecha: string;

  @ManyToOne(() => Estudiante, (estudiante) => estudiante.resenas, {
    nullable: false,
  })
  @JoinColumn({ name: 'estudianteId' })
  estudiante: Estudiante;

  @ManyToOne(() => Actividad, (actividad) => actividad.resenas, {
    nullable: false,
  })
  @JoinColumn({ name: 'actividadId' })
  actividad: Actividad;
}
