import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';
import { NotFoundException } from '@nestjs/common';

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAll', () => {
    it('should return an array', function () {
      const result = service.getAll();
      expect(result).toBeInstanceOf(Array);
    });
  });

  describe('getOne', () => {
    it('should return a bomie', function () {
      service.createMovie({
        title: 'title',
        year: '2011-11-11',
        genre: ['hello', 'world'],
      });
      const movie = service.getOne(1);
      expect(movie).toBeDefined();
      expect(movie.id).toEqual(1);
    });

    it('should throw NotFoundException', function () {
      try {
        service.getOne(999);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toEqual(`Movie with id 999 is not found`);
      }
    });
  });

  describe('deleteOne', () => {
    it('should deleta a movie', function () {
      service.createMovie({
        title: 'title',
        year: '2011-11-11',
        genre: ['hello', 'world'],
      });
      const beforeDelete = service.getAll();
      service.deleteOne(1);
      const afterDelete = service.getAll();
      expect(afterDelete.length).toEqual(beforeDelete.length - 1);
    });

    it('should return NotFoundException', function () {
      try {
        service.deleteOne(999);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toEqual(`Movie with id 999 is not found`);
      }
    });
  });

  describe('createMovie', () => {
    it('should create a movie', function () {
      const beforeCreate = service.getAll().length;
      service.createMovie({
        title: 'title',
        year: '2011-11-11',
        genre: ['hello', 'world'],
      });
      const afterCreate = service.getAll().length;
      expect(afterCreate).toEqual(beforeCreate + 1);
    });
  });

  describe('updateMovie', () => {
    it('should update a movie', function () {
      service.createMovie({
        title: 'title',
        year: '2011-11-11',
        genre: ['hello', 'world'],
      });
      service.updateMovie(1, { title: 'updatedTest' });
      const movie = service.getOne(1);
      expect(movie.title).toEqual('updatedTest');
    });
    it('should return NotFoundException', function () {
      try {
        service.deleteOne(999);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toEqual(`Movie with id 999 is not found`);
      }
    });
  });
});
