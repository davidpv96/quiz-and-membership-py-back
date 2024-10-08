import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, HttpException, HttpStatus } from '@nestjs/common';
import { SubtemaService } from './subtema.service';
import { CreateSubtemaDto } from './dto/create-subtema.dto';
import { UpdateSubtemaDto } from './dto/update-subtema.dto';

@Controller('subtema')
export class SubtemaController {
  constructor(private readonly subtemaService: SubtemaService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  async create(@Body() createSubtemaDto: CreateSubtemaDto) {
    try {
      const subtema = await this.subtemaService.create(createSubtemaDto);
      return {
        statusCode: HttpStatus.CREATED,
        message: 'Subtema creado exitosamente',
        data: subtema,
      };
    } catch (error) {
      console.error('Error al crear el subtema:', error.message);
      throw new HttpException(error.message || 'Error al crear el subtema', HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  async findAll() {
    try {
      const subtemas = await this.subtemaService.findAll();
      return {
        statusCode: HttpStatus.OK,
        message: 'Subtemas recuperados exitosamente',
        data: subtemas,
      };
    } catch (error) {
      console.error('Error al recuperar los subtemas:', error.message);
      throw new HttpException(error.message || 'Error al recuperar los subtemas', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const subtema = await this.subtemaService.findOne(+id);
      if (!subtema) {
        console.error('Subtema no encontrado');
        throw new HttpException('Subtema no encontrado', HttpStatus.NOT_FOUND);
      }
      return {
        statusCode: HttpStatus.OK,
        message: 'Subtema recuperado exitosamente',
        data: subtema,
      };
    } catch (error) {
      console.error('Error al recuperar el subtema:', error.message);
      throw new HttpException(error.message || 'Error al recuperar el subtema', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe())
  async update(@Param('id') id: string, @Body() updateSubtemaDto: UpdateSubtemaDto) {
    try {
      const [numberOfAffectedRows, [updatedSubtema]] = await this.subtemaService.update(+id, updateSubtemaDto);
      if (numberOfAffectedRows === 0) {
        console.error('Subtema no encontrado o sin cambios');
        throw new HttpException('Subtema no encontrado o sin cambios', HttpStatus.NOT_FOUND);
      }
      return {
        statusCode: HttpStatus.OK,
        message: 'Subtema actualizado exitosamente',
        data: updatedSubtema,
      };
    } catch (error) {
      console.error('Error al actualizar el subtema:', error.message);
      throw new HttpException(error.message || 'Error al actualizar el subtema', HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      await this.subtemaService.remove(+id);
      return {
        statusCode: HttpStatus.NO_CONTENT,
        message: 'Subtema eliminado exitosamente',
      };
    } catch (error) {
      console.error('Error al eliminar el subtema:', error.message);
      throw new HttpException(error.message || 'Error al eliminar el subtema', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
