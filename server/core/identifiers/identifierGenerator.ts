import { v7 } from 'uuid';

export abstract class IdentifierGenerator {
  public static generateUUIDV7(): string {
    return v7();
  }
}
