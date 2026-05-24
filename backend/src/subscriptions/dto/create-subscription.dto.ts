import { IsString, IsNumber, IsNotEmpty, IsOptional, IsBoolean, IsDateString } from 'class-validator';

export class CreateSubscriptionDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  category: string;

  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @IsString()
  @IsNotEmpty()
  currency: string;

  @IsString()
  @IsNotEmpty()
  billingCycle: string; // monthly, yearly, quarterly, weekly

  @IsDateString()
  @IsNotEmpty()
  nextBillingDate: string;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
