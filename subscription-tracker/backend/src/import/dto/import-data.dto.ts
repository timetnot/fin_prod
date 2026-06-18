import { IsArray, IsString, IsNumber, IsOptional, IsBoolean, IsDateString } from 'class-validator';

export class ImportSubscriptionDto {
  @IsString()
  name: string;

  @IsString()
  category: string;

  @IsNumber()
  amount: number;

  @IsString()
  currency: string;

  @IsString()
  billingCycle: string;

  @IsDateString()
  nextBillingDate: string;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  @IsString()
  @IsOptional()
  logoUrl?: string;
}

export class ImportDataDto {
  @IsArray()
  subscriptions: ImportSubscriptionDto[];
}
