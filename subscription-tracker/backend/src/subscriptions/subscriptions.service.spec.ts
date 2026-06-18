import { Test, TestingModule } from '@nestjs/testing';
import { SubscriptionsService } from './subscriptions.service';
import { PrismaService } from '../prisma/prisma.service';

describe('SubscriptionsService', () => {
  let service: SubscriptionsService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SubscriptionsService,
        {
          provide: PrismaService,
          useValue: {
            subscription: {
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

    service = module.get<SubscriptionsService>(SubscriptionsService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a subscription', async () => {
      const mockSubscription = {
        id: '1',
        name: 'Netflix',
        category: 'entertainment',
        amount: 15.99,
        currency: 'USD',
        billingCycle: 'monthly',
        nextBillingDate: new Date(),
        isActive: true,
      };

      jest.spyOn(prismaService.subscription, 'create').mockResolvedValue(mockSubscription as any);

      const result = await service.create('user-1', mockSubscription as any);

      expect(prismaService.subscription.create).toHaveBeenCalledWith({
        data: expect.objectContaining({
          userId: 'user-1',
          name: 'Netflix',
        }),
      });
      expect(result).toEqual(mockSubscription);
    });
  });

  describe('findAll', () => {
    it('should return all subscriptions for a user', async () => {
      const mockSubscriptions = [
        { id: '1', name: 'Netflix', amount: 15.99 },
        { id: '2', name: 'Spotify', amount: 9.99 },
      ];

      jest.spyOn(prismaService.subscription, 'findMany').mockResolvedValue(mockSubscriptions as any);

      const result = await service.findAll('user-1');

      expect(prismaService.subscription.findMany).toHaveBeenCalledWith({
        where: { userId: 'user-1' },
        orderBy: { createdAt: 'desc' },
      });
      expect(result).toEqual(mockSubscriptions);
    });
  });

  describe('findOne', () => {
    it('should return a single subscription', async () => {
      const mockSubscription = {
        id: '1',
        name: 'Netflix',
        amount: 15.99,
        userId: 'user-1',
      };

      jest.spyOn(prismaService.subscription, 'findFirst').mockResolvedValue(mockSubscription as any);

      const result = await service.findOne('user-1', '1');

      expect(prismaService.subscription.findFirst).toHaveBeenCalledWith({
        where: { id: '1', userId: 'user-1' },
      });
      expect(result).toEqual(mockSubscription);
    });

    it('should throw error if subscription not found', async () => {
      jest.spyOn(prismaService.subscription, 'findFirst').mockResolvedValue(null);

      await expect(service.findOne('user-1', '1')).rejects.toThrow();
    });
  });

  describe('update', () => {
    it('should update a subscription', async () => {
      const mockSubscription = {
        id: '1',
        name: 'Netflix',
        amount: 19.99,
        userId: 'user-1',
      };

      jest.spyOn(prismaService.subscription, 'findFirst').mockResolvedValue(mockSubscription as any);
      jest.spyOn(prismaService.subscription, 'update').mockResolvedValue(mockSubscription as any);

      const result = await service.update('user-1', '1', { amount: 19.99 } as any);

      expect(prismaService.subscription.update).toHaveBeenCalledWith({
        where: { id: '1' },
        data: expect.objectContaining({ amount: 19.99 }),
      });
      expect(result).toEqual(mockSubscription);
    });
  });

  describe('remove', () => {
    it('should delete a subscription', async () => {
      const mockSubscription = {
        id: '1',
        name: 'Netflix',
        userId: 'user-1',
      };

      jest.spyOn(prismaService.subscription, 'findFirst').mockResolvedValue(mockSubscription as any);
      jest.spyOn(prismaService.subscription, 'delete').mockResolvedValue(mockSubscription as any);

      const result = await service.remove('user-1', '1');

      expect(prismaService.subscription.delete).toHaveBeenCalledWith({
        where: { id: '1' },
      });
      expect(result).toEqual(mockSubscription);
    });
  });
});
