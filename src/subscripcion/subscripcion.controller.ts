import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, HttpException, HttpStatus } from '@nestjs/common';
import { SubscripcionService } from './subscripcion.service';
import { CreateSubscripcionDto } from './dto/create-subscripcion.dto';
import { UpdateSubscripcionDto } from './dto/update-subscripcion.dto';

@Controller('subscripcion')
export class SubscripcionController {
  constructor(private readonly subscripcionService: SubscripcionService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  async create(@Body() createSubscripcionDto: CreateSubscripcionDto) {
    try {
      const subscripcion = await this.subscripcionService.create(createSubscripcionDto);
      return {
        statusCode: HttpStatus.CREATED,
        message: 'Suscripción creada exitosamente',
        data: subscripcion,
      };
    } catch (error) {
      console.error('Error al crear la suscripción:', error.message);
      throw new HttpException(error.message || 'Error al crear la suscripción', HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  async findAll() {
    try {
      const subscripciones = await this.subscripcionService.findAll();
      return {
        statusCode: HttpStatus.OK,
        message: 'Suscripciones recuperadas exitosamente',
        data: subscripciones,
      };
    } catch (error) {
      console.error('Error al recuperar las suscripciones:', error.message);
      throw new HttpException(error.message || 'Error al recuperar las suscripciones', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const subscripcion = await this.subscripcionService.findOne(+id);
      if (!subscripcion) {
        console.error('Suscripción no encontrada');
        throw new HttpException('Suscripción no encontrada', HttpStatus.NOT_FOUND);
      }
      return {
        statusCode: HttpStatus.OK,
        message: 'Suscripción recuperada exitosamente',
        data: subscripcion,
      };
    } catch (error) {
      console.error('Error al recuperar la suscripción:', error.message);
      throw new HttpException(error.message || 'Error al recuperar la suscripción', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe())
  async update(@Param('id') id: string, @Body() updateSubscripcionDto: UpdateSubscripcionDto) {
    try {
      const [numberOfAffectedRows, [updatedSubscripcion]] = await this.subscripcionService.update(+id, updateSubscripcionDto);
      if (numberOfAffectedRows === 0) {
        console.error('Suscripción no encontrada o sin cambios');
        throw new HttpException('Suscripción no encontrada o sin cambios', HttpStatus.NOT_FOUND);
      }
      return {
        statusCode: HttpStatus.OK,
        message: 'Suscripción actualizada exitosamente',
        data: updatedSubscripcion,
      };
    } catch (error) {
      console.error('Error al actualizar la suscripción:', error.message);
      throw new HttpException(error.message || 'Error al actualizar la suscripción', HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      await this.subscripcionService.remove(+id);
      return {
        statusCode: HttpStatus.NO_CONTENT,
        message: 'Suscripción eliminada exitosamente',
      };
    } catch (error) {
      console.error('Error al eliminar la suscripción:', error.message);
      throw new HttpException(error.message || 'Error al eliminar la suscripción', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}

