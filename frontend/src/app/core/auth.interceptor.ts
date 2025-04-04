import { HttpRequest, HttpHandlerFn, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth/auth.service'; // Ajustez le chemin
import { inject } from '@angular/core'; // Pour injecter le service

export function authInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  const authService = inject(AuthService); // Injection dynamique du service
  const publicUrls = ['/api/users/login',];
  const isPublicRequest = publicUrls.some(url => req.url.includes(url));

  if (isPublicRequest) {
    return next(req);
  }

  const token = authService.getToken();
  if (token) {
    const authReq = req.clone({
      setHeaders: { Authorization: `Bearer ${token}` }
    });
    return next(authReq);
  }
  return next(req);
}