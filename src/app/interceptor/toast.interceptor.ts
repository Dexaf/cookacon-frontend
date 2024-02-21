import { HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from "@angular/common/http";
import { Observable, catchError, tap } from "rxjs";
import { Errors } from "../models/interfaces/errors.interface";
import { environment } from "../../environments/environment";
import { ToastService } from "../services/toast.service";
import { inject } from "@angular/core";
import { toastType } from "../models/enums/toastType.enum";
import { TranslocoService } from "@ngneat/transloco";


export const toastInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> => {
  const toastService = inject(ToastService);
  const translocoService = inject(TranslocoService);

  if (req.url.includes(environment.providerUrl))
    return next(req).pipe(
      catchError((errResponse: HttpErrorResponse) => {
        let title = "ND";
        let body = "ND";
        //get data from req
        if (errResponse.error.errors) {
          const mainProblem = errResponse.error.message;
          const listTemplate = "<ul>@LIST</ul>";
          const listItemTemplate = "<li>@TEXT</li>";
          let concItems = "";

          const errorCodes = (errResponse.error.errors as Errors).flatMap(e => e.msg.message)
          errorCodes.forEach(ec => {
            concItems += listItemTemplate.replace("@TEXT", translocoService.translate(`errorCodes.errors.${ec}`))
          })
          body = listTemplate.replace("@LIST", concItems);
          title = translocoService.translate("errorCodes.mainProblems." + mainProblem);
        }
        else {
          title = translocoService.translate("errorCodes.FAILED_CONNECTION_TO_PROVIDER.title");
          body = translocoService.translate("errorCodes.FAILED_CONNECTION_TO_PROVIDER.body");
        }
        toastService.makeToast(toastType.Error, title, body, 5000);
        //send to toast service
        throw errResponse;
      })
    );
  else
    return next(req)
}