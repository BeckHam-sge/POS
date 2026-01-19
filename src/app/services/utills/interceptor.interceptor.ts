import { HttpInterceptorFn } from "@angular/common/http";

export const loggerInterceptor: HttpInterceptorFn = (req, next) =>{
  console.log('Request URL:' + req.url);

const authreq= req.clone({
  setHeaders: {
      Authorization: 'Bearer my-token'
    }
});
  return next(authreq);
}
