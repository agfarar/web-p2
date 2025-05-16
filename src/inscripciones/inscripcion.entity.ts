import { Actividad } from 'src/actividades/actividad.entity';
import { Estudiante } from 'src/estudiantes/estudiante.entity';
import { Entity, ManyToOne, PrimaryGeneratedColumn, JoinColumn } from 'typeorm';

@Entity()
export class Inscripcion {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Estudiante, (estudiante) => estudiante.inscripciones, {
    nullable: false,
  })
  @JoinColumn({ name: 'estudianteId' })
  estudiante: Estudiante;

  @ManyToOne(() => Actividad, (actividad) => actividad.inscripciones, {
    nullable: false,
  })
  @JoinColumn({ name: 'actividadId' })
  actividad: Actividad;
}
