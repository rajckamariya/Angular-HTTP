import { HttpEventType, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { tap } from 'rxjs/operators';

export class AuthIntercepterService implements HttpInterceptor{
    intercept(req: HttpRequest<any>,next:HttpHandler){
        const modifiedRequest=req.clone({
            headers:req.headers.append('auth','xyz')
        })
        return next.handle(modifiedRequest)
    }
}