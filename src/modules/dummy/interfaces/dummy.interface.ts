/**
 * Interface representing the shape of a Dummy object.
 */
export interface IDummy {
  /**
   * Unique identifier for the dummy
   */
  id: number;
  /**
   * Name of the dummy
   */
  name: string;
  /**
   * Optional value for the dummy
   */
  value?: string | null;
} 