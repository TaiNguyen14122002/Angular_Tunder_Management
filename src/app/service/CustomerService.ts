import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private customerData: any;

  setCustomerData(data: any) {
    this.customerData = data;
  }

  getCustomerData() {
    return this.customerData;
  }
}
