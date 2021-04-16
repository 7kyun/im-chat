export class ResDto<T = any> {
  code: number;
  msg: string;
  data?: T;
}
