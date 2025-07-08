import { BadGatewayException, BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateDummyDto } from './dto/create-dummy.dto';
import { Dummy } from '../../../generated/prisma';
import { LoggerService } from '../../common/logger/logger.service';

/**
 * Service for handling business logic related to Dummy entities.
 */
@Injectable()
export class DummyService {
  /**
   * Constructor injects PrismaService for DB access and LoggerService for logging.
   */
  constructor(
    private readonly prisma: PrismaService,
    private readonly logger: LoggerService,
  ) {}

  /**
   * Create a new dummy entity in the database.
   * @param data - Data for the new dummy
   * @returns The created dummy
   */
  async create(data: CreateDummyDto): Promise<Dummy> {
    const { name, value } = data;
    const dummy = await this.prisma.dummy.create({ data: { name, value } });
    this.logger.log(`Created dummy with id ${dummy.id}`);
    return dummy;
  }

  /**
   * Retrieve all dummy entities from the database.
   * @returns List of dummies
   */
  async findAll(): Promise<Dummy[]> {
    const dummies = await this.prisma.dummy.findMany();
    throw new BadRequestException('dummy.not_founsd');
    this.logger.log(`Fetched all dummies`);
    return dummies;
  }

  /**
   * Retrieve a single dummy entity by its ID.
   * @param id - Dummy ID
   * @returns The found dummy or throws if not found
   */
  async findOne(id: number): Promise<Dummy> {
    const dummy = await this.prisma.dummy.findUnique({ where: { id } });
    if (dummy) {
      this.logger.log(`Fetched dummy with id ${id}`);
      return dummy;
    } else {
      this.logger.warn(`Dummy with id ${id} not found`);
      throw new BadRequestException('dummy.not_found');
    }
  }
} 