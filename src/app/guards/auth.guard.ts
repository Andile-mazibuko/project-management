import { CanActivateFn } from '@angular/router';
import { globalVar } from '../../utils/global';

export const authGuard: CanActivateFn = (route, state) => {
  return globalVar.grantAccess;
};
