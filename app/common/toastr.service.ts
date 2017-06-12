import { Injectable } from '@angular/core'

declare let toastr:any  // this way we declare toastr is on the global scope

@Injectable()
export class ToastrService {
  success(message: string, title?: string) {
    toastr.success(message, title)
  }
  info(message: string, title?: string) {
    toastr.info(message, title)
  }
  warning(message: string, title?: string) {
    toastr.warning(message, title)
  }
  error(message: string, title?: string) {
    toastr.error(message, title)
  }
}