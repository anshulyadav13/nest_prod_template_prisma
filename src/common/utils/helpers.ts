import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

/**
 * Injectable service for executing raw SQL queries using Prisma.
 */
@Injectable()
export class RawQueryService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Executes a raw SQL query using Prisma's $queryRawUnsafe method.
   * Supports both array and object parameter formats for flexibility.
   *
   * @param query - The raw SQL query string
   * @param params - Parameters for the query (array or object)
   * @returns The result of the raw query
   */
  async execute(query: string, params: Record<string, any> | any[] = []) {
    // If params is an array, spread it into the query
    if (Array.isArray(params)) {
      return this.prisma.$queryRawUnsafe(query, ...params);
    } else if (typeof params === 'object' && params !== null) {
      // Convert object to array in the order of keys in the query (assumes :key syntax)
      const keys = Object.keys(params);
      const values = keys.map((k) => params[k]);
      return this.prisma.$queryRawUnsafe(query, ...values);
    } else {
      // No params provided
      return this.prisma.$queryRawUnsafe(query);
    }
  }
} 