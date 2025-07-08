import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { UNSAFE_KEYS } from '../constants/app.constants';

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

/**
 * Injectable service for removing sensitive keys from objects or arrays.
 */
@Injectable()
export class SensitiveDataSanitizer {
  /**
   * Removes specified keys from an object or array of objects.
   * @param data The object or array to sanitize
   * @param keysToRemove Optional array of keys to remove; defaults to UNSAFE_KEYS
   * @returns A new object or array with specified keys removed
   */
  sanitize<T extends Record<string, any> | Record<string, any>[]>(
    data: T,
    keysToRemove: string[] = UNSAFE_KEYS,
  ): T {
    if (Array.isArray(data)) {
      return data.map((item) => this.removeKeys(item, keysToRemove)) as T;
    }
    return this.removeKeys(data, keysToRemove) as T;
  }

  /**
   * Recursively removes specified keys from an object or array of objects.
   * @param obj The object or array to sanitize
   * @param keysToRemove Optional array of keys to remove; defaults to UNSAFE_KEYS
   * @returns A new object or array with specified keys removed
   * @private
   */
  private removeKeys(obj: Record<string, any>, keysToRemove: string[]): Record<string, any> {
    if (!obj || typeof obj !== 'object') return obj;
    const sanitized = { ...obj };
    keysToRemove.forEach((key) => {
      if (key in sanitized) {
        delete sanitized[key];
      }
    });
    return sanitized;
  }
} 