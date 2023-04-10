import { ErrorHandler, Injectable } from "@angular/core";
import Swal from "sweetalert2";

@Injectable()
export class GlobalErrorHandlerService implements ErrorHandler {

  constructor() {
  }

  handleError(error:any) {
    console.log('error to handle is');
    console.log(error);
    Swal.fire('Failure', error, 'error');
  }

}
