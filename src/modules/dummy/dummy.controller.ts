import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { DummyService } from './dummy.service';
import { CreateDummyDto } from './dto/create-dummy.dto';
import { DummyCreateDoc, DummyFindAllDoc, DummyFindOneDoc } from './decorators/api-doc.decorator';
import { ApiTags } from '@nestjs/swagger';
import { RawQueryService } from '../../common/utils/helpers';

/**
 * Controller for handling Dummy-related API endpoints.
 * Provides CRUD operations and a raw query example.
 */
@ApiTags('Dummy')
@Controller('dummy')
export class DummyController {
  // Inject the DummyService for business logic and RawQueryService for raw SQL
  constructor(
    private readonly dummyService: DummyService,
    private readonly rawQueryService: RawQueryService,
  ) {}

  /**
   * Create a new dummy entity.
   * @param body - Data for the new dummy
   */
  @Post()
  @DummyCreateDoc()
  async create(@Body() body: CreateDummyDto) {
    const data = await this.dummyService.create(body);
    return { data, messageKey: 'dummy.created' };
  }

  /**
   * Get all dummy entities.
   */
  @Get()
  @DummyFindAllDoc()
  async findAll() {
    const data = await this.dummyService.findAll();
    return { data, messageKey: 'dummy.found' };
  }

  /**
   * Get a dummy entity by its ID.
   * @param id - Dummy ID
   */
  @Get(':id')
  @DummyFindOneDoc()
  async findOne(@Param('id') id: string) {
    const data = await this.dummyService.findOne(Number(id));
    return { data, messageKey: 'dummy.found' };
  }

  /**
   * Example endpoint: Use a raw SQL query to fetch all dummies (for demonstration).
   * @returns Raw query result
   */
  @Get('/raw/all')
  async getAllRaw() {
    // Use the injected RawQueryService to execute a raw SQL query
    const result = await this.rawQueryService.execute('SELECT * FROM "Dummy"');
    return { data: result };
  }
} 