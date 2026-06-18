import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';

@Injectable()
export class EncryptionService {
  private readonly algorithm = 'aes-256-gcm';
  private readonly keyLength = 32;
  private readonly ivLength = 16;
  private readonly saltLength = 64;
  private readonly tagLength = 16;
  private readonly iterations = 100000;

  constructor() {
    if (!process.env.ENCRYPTION_KEY) {
      throw new Error('ENCRYPTION_KEY environment variable is not set');
    }
  }

  private getKey(salt: Buffer): Buffer {
    return crypto.pbkdf2Sync(
      process.env.ENCRYPTION_KEY!,
      salt,
      this.iterations,
      this.keyLength,
      'sha256',
    );
  }

  encrypt(text: string): { encrypted: string; iv: string; salt: string; tag: string } {
    const salt = crypto.randomBytes(this.saltLength);
    const iv = crypto.randomBytes(this.ivLength);
    const key = this.getKey(salt);

    const cipher = crypto.createCipheriv(this.algorithm, key, iv);
    
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    
    const tag = cipher.getAuthTag();

    return {
      encrypted,
      iv: iv.toString('hex'),
      salt: salt.toString('hex'),
      tag: tag.toString('hex'),
    };
  }

  decrypt(encryptedData: { encrypted: string; iv: string; salt: string; tag: string }): string {
    const { encrypted, iv, salt, tag } = encryptedData;
    
    const saltBuffer = Buffer.from(salt, 'hex');
    const ivBuffer = Buffer.from(iv, 'hex');
    const tagBuffer = Buffer.from(tag, 'hex');
    const key = this.getKey(saltBuffer);

    const decipher = crypto.createDecipheriv(this.algorithm, key, ivBuffer);
    decipher.setAuthTag(tagBuffer);

    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');

    return decrypted;
  }

  hash(text: string): string {
    return crypto.createHash('sha256').update(text).digest('hex');
  }

  compareHash(text: string, hash: string): boolean {
    return this.hash(text) === hash;
  }
}
