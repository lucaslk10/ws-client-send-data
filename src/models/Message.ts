import { ContentSql } from './ContentSql';

export interface Message {
  content: string | ContentSql | any;
  isBroadcast?: boolean;
  microservice?: string;
  sender?: string;
  time?: Date;
  uId: string;
  return?: boolean;
}
