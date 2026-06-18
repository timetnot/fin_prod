import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, dto: CreateCategoryDto) {
    try {
      return this.prisma.category.create({
        data: {
          userId,
          name: dto.name,
          icon: dto.icon,
          color: dto.color,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async findAll(userId: string) {
    try {
      return this.prisma.category.findMany({
        where: { userId },
        orderBy: { name: 'asc' },
      });
    } catch (error) {
      throw error;
    }
  }

  async findOne(userId: string, id: string) {
    try {
      const category = await this.prisma.category.findFirst({
        where: { id, userId },
      });

      if (!category) {
        throw new NotFoundException('Категория не найдена');
      }

      return category;
    } catch (error) {
      throw error;
    }
  }

  async update(userId: string, id: string, dto: UpdateCategoryDto) {
    try {
      await this.findOne(userId, id);

      return this.prisma.category.update({
        where: { id },
        data: {
          ...(dto.name && { name: dto.name }),
          ...(dto.icon !== undefined && { icon: dto.icon }),
          ...(dto.color !== undefined && { color: dto.color }),
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async remove(userId: string, id: string) {
    try {
      await this.findOne(userId, id);

      return this.prisma.category.delete({
        where: { id },
      });
    } catch (error) {
      throw error;
    }
  }
}
