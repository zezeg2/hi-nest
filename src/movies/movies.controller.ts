import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { Movie } from './entities/movies.entity';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

@Controller('movies')
export class MoviesController {
  constructor(private readonly MoviesService: MoviesService) {}
  @Get()
  getAll(): Movie[] {
    return this.MoviesService.getAll();
  }

  @Get(':/')
  getOne(@Param('id') id: number): Movie {
    const movie = this.MoviesService.getOne(id);
    if (!movie) throw new NotFoundException(`Movie with id ${id} is not found`);
    return movie;
  }

  @Post()
  createMovie(@Body() movieData: CreateMovieDto): Movie {
    return this.MoviesService.createMovie(movieData);
  }

  @Delete('/:id')
  removeMovie(@Param('id') id: number) {
    return this.MoviesService.deleteOne(id);
  }

  @Patch('/:id')
  patchMovie(@Param('id') id: number, @Body() updateData: UpdateMovieDto) {
    return this.MoviesService.updateMovie(id, updateData);
  }
}
