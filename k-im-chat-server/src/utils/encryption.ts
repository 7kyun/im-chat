import * as crypto from 'crypto';

/**
 * @description: 生成密码盐
 * @return {string} salt 密码盐
 */
export function getSalt(): string {
  return crypto.randomBytes(3).toString('base64');
}

/**
 * @description: 密码加密
 * @param {string} password 密码
 * @param {string} salt 密码盐
 * @return {string} 加密后的密码
 */
export function encrypt(password: string, salt: string): string {
  if (!password || !salt) {
    return '';
  }
  return crypto
    .pbkdf2Sync(password, salt, 10000, 16, 'sha256')
    .toString('base64');
}
