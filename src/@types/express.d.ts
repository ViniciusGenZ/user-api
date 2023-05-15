import {ITokenData} from '@interfaces/IToken';

declare global {
  namespace Express {
    export interface Request {
      decocedJwt: ITokenData;
    }
  }
}
