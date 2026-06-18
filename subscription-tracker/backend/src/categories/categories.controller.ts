import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('categories')
@UseGuards(JwtAuthGuard)
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @Post()
  create(@Request() req, @Body() dto: CreateCategoryDto) {
    return this.categoriesService.create(req.user.userId, dto);
  }

  @Get()
  findAll(@Request() req) {
    return this.categoriesService.findAll(req.user.userId);
  }

  @Get(':id')
  findOne(@Request() req, @Param('id') id: string) {
    return this.categoriesService.findOne(req.user.userId, id);
  }

  @Put(':id')
  update(@Request() req, @Param('id') id: string, @Body() dto: UpdateCategoryDto) {
    return this.categoriesService.update(req.user.userId, id, dto);
  }

  @Delete(':id')
  remove(@Request() req, @Param('id') id: string) {
    return this.categoriesService.remove(req.user.userId, id);
  }
}
