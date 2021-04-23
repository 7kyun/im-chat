/**
 * @description: 获取当前时间 精确到秒
 */
export function getNow(): number {
  return Math.round(new Date().getTime() / 1000);
}
