import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Estudiante } from './estudiante.entity';
import { Actividad } from 'src/actividades/actividad.entity';
import { Inscripcion } from 'src/inscripciones/inscripcion.entity';
import { CreateEstudianteDto } from './dto/create-estudiante.dto';

@Injectable()
export class EstudiantesService {
  constructor(
    @InjectRepository(Estudiante)
    private readonly estudianteRepo: Repository<Estudiante>,
    @InjectRepository(Actividad)
    private readonly actividadRepo: Repository<Actividad>,
    @InjectRepository(Inscripcion)
    private readonly inscripcionRepo: Repository<Inscripcion>,
  ) {}

  async crearEstudiante(data: CreateEstudianteDto): Promise<Estudiante> {
    if (!data.correo.includes('@')) {
      throw new BadRequestException('Email incorrecto');
    }

    if (data.semestre < 1 || data.semestre > 10) {
      throw new BadRequestException('Semestre debe estar entre 1 y 10');
    }

    const estudiante = this.estudianteRepo.create(data);
    return this.estudianteRepo.save(estudiante);
  }

  async findEstudianteById(id: number): Promise<Estudiante> {
    const estudiante = await this.estudianteRepo.findOne({ where: { id } });
    if (!estudiante) {
      throw new NotFoundException(`El estudiante no se ha encontrado`);
    }
    return estudiante;
  }

  async inscribirActividad(
    estudianteID: number,
    actividadID: number,
  ): Promise<Inscripcion> {
    const estudiante = await this.estudianteRepo.findOne({
      where: { id: estudianteID },
    });
    if (!estudiante) {
      throw new NotFoundException('Estudiante no existe');
    }

    const actividad = await this.actividadRepo.findOne({
      where: { id: actividadID },
      relations: ['inscripciones'],
    });
    if (!actividad) {
      throw new NotFoundException('Actividad no existe');
    }

    if (actividad.estado !== 0) {
      throw new BadRequestException('Actividad no está abierta');
    }

    const inscripciones = actividad.inscripciones || [];
    if (inscripciones.length >= actividad.cupoMaximo) {
      throw new BadRequestException('Actividad sin cupo disponible');
    }

    const previa = await this.inscripcionRepo.findOne({
      where: {
        estudiante: { id: estudianteID },
        actividad: { id: actividadID },
      },
    });
    if (previa) {
      throw new BadRequestException('Estudiante ya inscrito en esta actividad');
    }

    const inscripcion = this.inscripcionRepo.create({ estudiante, actividad });
    return this.inscripcionRepo.save(inscripcion);
  }
}
