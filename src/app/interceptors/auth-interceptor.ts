import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // return next(req);
  const baseUrl = 'https://apipos-production.up.railway.app';
  const token = localStorage.getItem('token');

  let apiReq = req.url.startsWith('http')
  ? req
  : req.clone({ url: `${baseUrl}${req.url}` });

  if (token) {
    apiReq = apiReq.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  return next(apiReq);

};
