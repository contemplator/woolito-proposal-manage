import { Injectable, ErrorHandler } from "@angular/core";

@Injectable()
export class ErrorService extends ErrorHandler {
  public handleError(error: any): void {
    console.log(error);
  }
}
