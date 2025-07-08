import { IsString, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

/**
 * Data Transfer Object for creating a Dummy entity.
 */
export class CreateDummyDto {
  /**
   * Name of the dummy (required)
   */
  @ApiProperty({ example: 'John', description: 'Name of the dummy' })
  @IsString()
  name: string;

  /**
   * Optional value for the dummy
   */
  @ApiPropertyOptional({ example: 'Some value', description: 'Optional value for the dummy' })
  @IsString()
  @IsOptional()
  value?: string;

  /**
   * Password (for logging exclusion example)
   */
  @ApiPropertyOptional({ example: 'secret', description: 'Password (for logging exclusion example)' })
  @IsString()
  @IsOptional()
  password?: string; // For logging exclusion example
} 