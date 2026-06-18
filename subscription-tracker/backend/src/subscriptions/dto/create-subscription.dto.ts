import { 
  IsString, 
  IsNumber, 
  IsNotEmpty, 
  IsOptional, 
  IsBoolean, 
  IsDateString, 
  IsUrl, 
  IsUUID,
  Min,
  Max,
  Length,
  Matches,
  IsIn
} from 'class-validator';

export class CreateSubscriptionDto {
  @IsString()
  @IsNotEmpty()
  @Length(2, 100, { message: 'Name must be between 2 and 100 characters' })
  @Matches(/^[a-zA-Zа-яА-Я0-9\s\-_\.]+$/, { message: 'Name contains invalid characters' })
  name: string;

  @IsString()
  @IsNotEmpty()
  @Length(2, 50, { message: 'Category must be between 2 and 50 characters' })
  category: string;

  @IsUUID()
  @IsOptional()
  categoryId?: string;

  @IsNumber()
  @IsNotEmpty()
  @Min(0.01, { message: 'Amount must be greater than 0' })
  @Max(1000000, { message: 'Amount cannot exceed 1,000,000' })
  amount: number;

  @IsString()
  @IsNotEmpty()
  @IsIn(['RUB', 'USD', 'EUR', 'GBP'], { message: 'Invalid currency' })
  currency: string;

  @IsString()
  @IsNotEmpty()
  @IsIn(['monthly', 'yearly', 'quarterly', 'weekly'], { message: 'Invalid billing cycle' })
  billingCycle: string;

  @IsDateString()
  @IsNotEmpty()
  nextBillingDate: string;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  @IsUrl()
  @IsOptional()
  @Length(0, 500, { message: 'Logo URL cannot exceed 500 characters' })
  logoUrl?: string;
}
