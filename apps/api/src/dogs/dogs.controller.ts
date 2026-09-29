import { Controller, Get, Post, Body } from '@nestjs/common';
import { DogsService } from './dogs.service';

@Controller('dogs')
export class DogsController {

  constructor(private readonly dogsService: DogsService) {}

  @Get()
  findAll() {
    return this.dogsService.findAll();
  }

  @Post()
  create(@Body() dog) {

    this.dogsService.create(dog);

    return {
      message: "Dog added",
      data: dog
    };

  }

}