import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ApiResponse } from '../models/apiResponse';

@Injectable({
  providedIn: 'root'
})
export class ResponseAlertManagerService {

  constructor(private toastr: ToastrService) { }

  manageErrorResponseAlert(response: any) {
    let apiResponse:ApiResponse<any> = response.error;
    console.log(JSON.stringify(apiResponse));
    this.toastr.error(
      apiResponse.error?.message ? apiResponse.error.message : '',
      apiResponse.message || 'Error desconocido', 
      {
        timeOut: 5000,
        progressAnimation: 'decreasing',
        progressBar: true
      }
    );
  }

  manageSuccessResponseAlert(response: ApiResponse<any>) {
    this.toastr.success(
      '',
      response.message || 'Operación exitosa',
      {
        timeOut: 5000,
        progressAnimation: 'decreasing',
        progressBar: true
      }
    );
  }
}
