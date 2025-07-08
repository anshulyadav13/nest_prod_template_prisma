import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiHeader, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateDummyDto } from '../dto/create-dummy.dto';

export function DummyCreateDoc() {
  return applyDecorators(
    ApiHeader({ name: 'x-lang', description: 'Language code for translation', required: false }),
    ApiOperation({ summary: 'Create Dummy', description: 'Creates a new dummy entity.' }),
    ApiBody({ type: CreateDummyDto }),
    ApiResponse({ status: 201, description: 'Dummy created successfully.' }),
    ApiResponse({ status: 400, description: 'Bad Request.' }),
    ApiResponse({ status: 401, description: 'Unauthorized.' }),
    ApiResponse({ status: 404, description: 'Not Found.' }),
  );
}

export function DummyFindAllDoc() {
  return applyDecorators(
    ApiHeader({ name: 'x-lang', description: 'Language code for translation', required: false }),
    ApiOperation({ summary: 'Get All Dummies', description: 'Retrieves all dummy entities.' }),
    ApiResponse({ status: 200, description: 'List of dummies returned.' }),
    ApiResponse({ status: 401, description: 'Unauthorized.' }),
    ApiResponse({ status: 404, description: 'Not Found.' }),
  );
}

export function DummyFindOneDoc() {
  return applyDecorators(
    ApiHeader({ name: 'x-lang', description: 'Language code for translation', required: false }),
    ApiOperation({ summary: 'Get Dummy by ID', description: 'Retrieves a dummy entity by its ID.' }),
    ApiResponse({ status: 200, description: 'Dummy found.' }),
    ApiResponse({ status: 401, description: 'Unauthorized.' }),
    ApiResponse({ status: 404, description: 'Not Found.' }),
  );
} 