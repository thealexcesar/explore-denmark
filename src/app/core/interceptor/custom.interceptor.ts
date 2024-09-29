import { HttpInterceptorFn } from '@angular/common/http';

export const customInterceptor: HttpInterceptorFn = (req, next) => {
    const token = localStorage.getItem("token_angular");
    if (!token) return next(req);
    return next(req.clone({ setHeaders: { Authorization: `Bearer ${token}` } }));
};
