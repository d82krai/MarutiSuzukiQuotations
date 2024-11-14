import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CarModel, Quotation } from '../../models/quotation.model';

@Component({
  selector: 'app-quotation-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="container mx-auto p-4">
      <div class="bg-white shadow-lg rounded-lg p-6">
        <div class="flex justify-between items-center mb-6">
          <img src="assets/maruti-logo.png" alt="Maruti Suzuki" class="h-12">
          <h2 class="text-2xl font-bold">PROFORMA INVOICE / QUOTATION</h2>
        </div>

        <form [formGroup]="quotationForm" (ngSubmit)="onSubmit()">
          <div class="grid grid-cols-2 gap-4">
            <div class="form-group">
              <label>Customer Name</label>
              <input type="text" formControlName="customerName" class="form-control">
            </div>
            <div class="form-group">
              <label>Contact Number</label>
              <input type="text" formControlName="contactNo" class="form-control">
            </div>
            <div class="form-group col-span-2">
              <label>Address</label>
              <textarea formControlName="address" class="form-control"></textarea>
            </div>
          </div>

          <div class="mt-6">
            <h3 class="text-xl font-semibold mb-4">Vehicle Selection</h3>
            <div class="grid grid-cols-4 gap-4">
              <div *ngFor="let model of carModels" 
                   class="border p-4 rounded cursor-pointer"
                   [class.bg-blue-100]="selectedModel?.name === model.name"
                   (click)="selectModel(model)">
                <h4 class="font-bold">{{model.name}}</h4>
                <p>Ex-Showroom: ₹{{model.exShowroomPrice | number}}</p>
              </div>
            </div>
          </div>

          <div class="mt-6" *ngIf="selectedModel">
            <h3 class="text-xl font-semibold mb-4">Price Breakdown</h3>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <p>Ex-Showroom Price: ₹{{selectedModel.exShowroomPrice | number}}</p>
                <p>RTO: ₹{{selectedModel.rto | number}}</p>
                <p>Insurance: ₹{{selectedModel.insurance | number}}</p>
                <p>TCS: ₹{{selectedModel.tcs | number}}</p>
              </div>
              <div>
                <p>Extended Warranty: ₹{{selectedModel.extendedWarranty | number}}</p>
                <p>CCP: ₹{{selectedModel.ccp | number}}</p>
                <p>Accessories: ₹{{selectedModel.accessories | number}}</p>
                <p>Fastag: ₹{{selectedModel.fastag | number}}</p>
              </div>
            </div>

            <div class="mt-4">
              <h4 class="font-bold">Total: ₹{{calculateTotal() | number}}</h4>
            </div>
          </div>

          <div class="mt-6">
            <button type="submit" 
                    class="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
              Generate Quotation
            </button>
          </div>
        </form>
      </div>
    </div>
  `,
  styles: [`
    .form-control {
      @apply w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500;
    }
    .form-group {
      @apply mb-4;
    }
    label {
      @apply block mb-1 font-medium;
    }
  `]
})
export class QuotationFormComponent {
  quotationForm: FormGroup;
  selectedModel: CarModel | null = null;

  carModels: CarModel[] = [
    {
      name: 'ERTIGA',
      exShowroomPrice: 962710,
      rto: 90017,
      insurance: 28266,
      tcs: 1522,
      extendedWarranty: 16237,
      ccp: 1522,
      accessories: 45000,
      rewardProgram: 885,
      fastag: 600
    },
    {
      name: 'VXI (O)',
      exShowroomPrice: 1057710,
      rto: 121171,
      insurance: 29841,
      tcs: 1699,
      extendedWarranty: 19612,
      ccp: 1699,
      accessories: 45000,
      rewardProgram: 885,
      fastag: 600
    },
    // Add other models as needed
  ];

  constructor(private fb: FormBuilder) {
    this.quotationForm = this.fb.group({
      customerName: ['', Validators.required],
      contactNo: ['', Validators.required],
      address: ['', Validators.required]
    });
  }

  selectModel(model: CarModel) {
    this.selectedModel = model;
  }

  calculateTotal(): number {
    if (!this.selectedModel) return 0;
    return this.selectedModel.exShowroomPrice +
           this.selectedModel.rto +
           this.selectedModel.insurance +
           this.selectedModel.tcs +
           this.selectedModel.extendedWarranty +
           this.selectedModel.ccp +
           this.selectedModel.accessories +
           this.selectedModel.rewardProgram +
           this.selectedModel.fastag;
  }

  onSubmit() {
    if (this.quotationForm.valid && this.selectedModel) {
      const quotation: Quotation = {
        id: Date.now().toString(),
        date: new Date(),
        customerName: this.quotationForm.get('customerName')?.value,
        address: this.quotationForm.get('address')?.value,
        contactNo: this.quotationForm.get('contactNo')?.value,
        salesmanName: '',
        salesmanContact: '',
        selectedModel: this.selectedModel,
        rtoDiscount: 0,
        consumerOffer: 0,
        retailSupport: 0,
        ruralOffer: 0,
        oldCarPrice: 0,
        exchangeBonus: 0
      };
      console.log('Generated Quotation:', quotation);
      // Here you would typically save the quotation or generate a PDF
    }
  }
}