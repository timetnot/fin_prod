import { IsString, IsNumber, IsOptional, IsBoolean, IsDateString } from 'class-validator';

export class UpdateSubscriptionDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  category?: string;

  @IsNumber()
  @IsOptional()
  amount?: number;

  @IsString()
  @IsOptional()
  currency?: string;

  @IsString()
  @IsOptional()
  billingCycle?: string;

  @IsDateString()
  @IsOptional()
  nextBillingDate?: string;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
