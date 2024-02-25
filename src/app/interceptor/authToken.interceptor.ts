import { HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from "@angular/common/http";
import { Observable, map, take } from "rxjs";
import { environment } from "../../environments/environment";
import { inject } from "@angular/core";
import { AppState } from "@store/interfaces";
import { Store } from "@ngrx/store";
import { getAuthToken$ } from "@store/selectors";


export const authTokenInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> => {
  const store = inject(Store<AppState>);
  let authToken: string | null = null;

  store.select(getAuthToken$)
    .pipe(take(1))
    .subscribe(token => authToken = token)

  if (req.url.includes(environment.providerUrl) && authToken)
    return next(req.clone({ headers: req.headers.set('Authorization', `Bearer ${authToken}`) }))
  else
    return next(req)
}