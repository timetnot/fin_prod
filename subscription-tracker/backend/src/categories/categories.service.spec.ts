import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesService } from './categories.service';
import { PrismaService } from '../prisma/prisma.service';

describe('CategoriesService', () => {
  let service: CategoriesService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoriesService,
        {
          provide: PrismaService,
          useValue: {
            category: {
              create: jest.fn(),
              findMany: jest.fn(),
              findFirst: jest.fn(),
              update: jest.fn(),
              delete: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<CategoriesService>(CategoriesService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a category', async () => {
      const mockCategory = {
        id: '1',
        name: 'Entertainment',
        icon: 'film',
        color: '#8b5cf6',
        userId: 'user-1',
      };

      jest.spyOn(prismaService.category, 'create').mockResolvedValue(mockCategory as any);

      const result = await service.create('user-1', mockCategory as any);

      expect(prismaService.category.create).toHaveBeenCalledWith({
        data: expect.objectContaining({
          userId: 'user-1',
          name: 'Entertainment',
        }),
      });
      expect(result).toEqual(mockCategory);
    });
  });

  describe('findAll', () => {
    it('should return all categories for a user', async () => {
      const mockCategories = [
        { id: '1', name: 'Entertainment', icon: 'film' },
        { id: '2', name: 'Software', icon: 'computer' },
      ];

      jest.spyOn(prismaService.category, 'findMany').mockResolvedValue(mockCategories as any);

      const result = await service.findAll('user-1');

      expect(prismaService.category.findMany).toHaveBeenCalledWith({
        where: { userId: 'user-1' },
        orderBy: { name: 'asc' },
      });
      expect(result).toEqual(mockCategories);
    });
  });

  describe('findOne', () => {
    it('should return a single category', async () => {
      const mockCategory = {
        id: '1',
        name: 'Entertainment',
        userId: 'user-1',
      };

      jest.spyOn(prismaService.category, 'findFirst').mockResolvedValue(mockCategory as any);

      const result = await service.findOne('user-1', '1');

      expect(prismaService.category.findFirst).toHaveBeenCalledWith({
        where: { id: '1', userId: 'user-1' },
      });
      expect(result).toEqual(mockCategory);
    });

    it('should throw error if category not found', async () => {
      jest.spyOn(prismaService.category, 'findFirst').mockResolvedValue(null);

      await expect(service.findOne('user-1', '1')).rejects.toThrow();
    });
  });

  describe('update', () => {
    it('should update a category', async () => {
      const mockCategory = {
        id: '1',
        name: 'Entertainment',
        color: '#ec4899',
        userId: 'user-1',
      };

      jest.spyOn(prismaService.category, 'findFirst').mockResolvedValue(mockCategory as any);
      jest.spyOn(prismaService.category, 'update').mockResolvedValue(mockCategory as any);

      const result = await service.update('user-1', '1', { color: '#ec4899' } as any);

      expect(prismaService.category.update).toHaveBeenCalledWith({
        where: { id: '1' },
        data: expect.objectContaining({ color: '#ec4899' }),
      });
      expect(result).toEqual(mockCategory);
    });
  });

  describe('remove', () => {
    it('should delete a category', async () => {
      const mockCategory = {
        id: '1',
        name: 'Entertainment',
        userId: 'user-1',
      };

      jest.spyOn(prismaService.category, 'findFirst').mockResolvedValue(mockCategory as any);
      jest.spyOn(prismaService.category, 'delete').mockResolvedValue(mockCategory as any);

      const result = await service.remove('user-1', '1');

      expect(prismaService.category.delete).toHaveBeenCalledWith({
        where: { id: '1' },
      });
      expect(result).toEqual(mockCategory);
    });
  });
});
