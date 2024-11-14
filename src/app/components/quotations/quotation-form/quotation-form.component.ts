import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CarService } from '../../../services/car.service';
import { QuotationService } from '../../../services/quotation.service';
import { CarModel, CarVariant } from '../../../models/car.model';

@Component({
  selector: 'app-quotation-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="content-wrapper">
      <section class="content-header">
        <div class="container-fluid">
          <div class="row mb-2">
            <div class="col-sm-6">
              <h1>Generate Quotation</h1>
            </div>
          </div>
        </div>
      </section>

      <section class="content">
        <div class="container-fluid">
          <!-- Customer Details -->
          <div class="card">
            <div class="card-header">
              <h3 class="card-title">Customer Details</h3>
            </div>
            <div class="card-body">
              <form [formGroup]="quotationForm">
                <div class="row">
                  <div class="col-md-6">
                    <div class="form-group">
                      <label>Customer Name</label>
                      <input type="text" class="form-control" formControlName="customerName">
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <label>Contact Number</label>
                      <input type="text" class="form-control" formControlName="contactNo">
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <label>Address</label>
                  <textarea class="form-control" formControlName="address" rows="3"></textarea>
                </div>
                <div class="row">
                  <div class="col-md-6">
                    <div class="form-group">
                      <label>Salesman Name</label>
                      <input type="text" class="form-control" formControlName="salesmanName">
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <label>Salesman Contact</label>
                      <input type="text" class="form-control" formControlName="salesmanContact">
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>

          <!-- Car Model Selection -->
          <div class="card">
            <div class="card-header">
              <h3 class="card-title">Select Car Model</h3>
            </div>
            <div class="card-body">
              <div class="row">
                <div class="col-md-4 mb-4" *ngFor="let model of models$ | async">
                  <div class="card h-100" 
                       [class.bg-light]="selectedModel?.id === model.id"
                       (click)="selectModel(model)">
                    <img [src]="model.imageUrl" class="card-img-top" [alt]="model.name">
                    <div class="card-body">
                      <h5 class="card-title">{{model.name}}</h5>
                      <p class="card-text">{{model.description}}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Variant Selection -->
          <div class="card" *ngIf="selectedModel">
            <div class="card-header">
              <h3 class="card-title">Select Variants (Max 4)</h3>
            </div>
            <div class="card-body">
              <div class="alert alert-info" *ngIf="selectedVariants.length >= 4">
                Maximum 4 variants can be selected
              </div>
              <div class="row">
                <div class="col-md-3 mb-4" *ngFor="let variant of selectedModel.variants">
                  <div class="card variant-card" 
                       [class.selected]="isVariantSelected(variant)"
                       [class.disabled]="!isVariantSelected(variant) && selectedVariants.length >= 4"
                       (click)="toggleVariant(variant)">
                    <div class="card-body">
                      <h5 class="card-title">{{variant.name}}</h5>
                      <p class="card-text">Ex-Showroom: ₹{{variant.exShowroomPrice | number}}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Price Comparison -->
          <div class="card" *ngIf="selectedVariants.length > 0">
            <div class="card-header">
              <h3 class="card-title">Price Comparison</h3>
            </div>
            <div class="card-body p-0">
              <div class="table-responsive">
                <table class="table table-bordered m-0">
                  <thead>
                    <tr>
                      <th>Details</th>
                      <th *ngFor="let variant of selectedVariants">
                        {{variant.name}}
                        <button type="button" class="close" (click)="removeVariant(variant)">
                          <span>&times;</span>
                        </button>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Ex-Showroom Price</td>
                      <td *ngFor="let variant of selectedVariants" class="text-right">
                        ₹{{variant.exShowroomPrice | number}}
                      </td>
                    </tr>
                    <tr>
                      <td>RTO</td>
                      <td *ngFor="let variant of selectedVariants" class="text-right">
                        ₹{{variant.rto | number}}
                      </td>
                    </tr>
                    <tr>
                      <td>Insurance (1+2 Years, Zero Dep)</td>
                      <td *ngFor="let variant of selectedVariants" class="text-right">
                        ₹{{variant.insurance | number}}
                      </td>
                    </tr>
                    <tr>
                      <td>1% TCS (If Applicable)</td>
                      <td *ngFor="let variant of selectedVariants" class="text-right">
                        ₹{{variant.tcs | number}}
                      </td>
                    </tr>
                    <tr>
                      <td>Total</td>
                      <td *ngFor="let variant of selectedVariants" class="text-right">
                        ₹{{calculateSubTotal(variant) | number}}
                      </td>
                    </tr>
                    <tr>
                      <td>Extended Warranty (5 Years)</td>
                      <td *ngFor="let variant of selectedVariants" class="text-right">
                        ₹{{variant.extendedWarranty | number}}
                      </td>
                    </tr>
                    <tr>
                      <td>CCP</td>
                      <td *ngFor="let variant of selectedVariants" class="text-right">
                        ₹{{variant.ccp | number}}
                      </td>
                    </tr>
                    <tr>
                      <td>Accessories</td>
                      <td *ngFor="let variant of selectedVariants" class="text-right">
                        ₹{{variant.accessories | number}}
                      </td>
                    </tr>
                    <tr>
                      <td>Maruti Suzuki Reward Program</td>
                      <td *ngFor="let variant of selectedVariants" class="text-right">
                        ₹{{variant.rewardProgram | number}}
                      </td>
                    </tr>
                    <tr>
                      <td>Fastag</td>
                      <td *ngFor="let variant of selectedVariants" class="text-right">
                        ₹{{variant.fastag | number}}
                      </td>
                    </tr>
                    <tr class="font-weight-bold">
                      <td>Total</td>
                      <td *ngFor="let variant of selectedVariants" class="text-right">
                        ₹{{calculateTotal(variant) | number}}
                      </td>
                    </tr>
                    <tr>
                      <td>Mela RTO Discount 50%</td>
                      <td *ngFor="let variant of selectedVariants" class="text-right">
                        ₹{{calculateRTODiscount(variant) | number}}
                      </td>
                    </tr>
                    <tr class="font-weight-bold bg-light">
                      <td>Grand Total</td>
                      <td *ngFor="let variant of selectedVariants" class="text-right">
                        ₹{{calculateGrandTotal(variant) | number}}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <!-- Discounts Section -->
          <div class="card" *ngIf="selectedVariants.length > 0">
            <div class="card-header">
              <h3 class="card-title">Additional Discounts</h3>
            </div>
            <div class="card-body">
              <form [formGroup]="quotationForm">
                <div class="row">
                  <div class="col-md-6">
                    <div class="form-group">
                      <label>Consumer Offer</label>
                      <input type="number" class="form-control" formControlName="consumerOffer">
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <label>Retail Support</label>
                      <input type="number" class="form-control" formControlName="retailSupport">
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-6">
                    <div class="form-group">
                      <label>Rural Offer/ISL</label>
                      <input type="number" class="form-control" formControlName="ruralOffer">
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <label>Exchange Bonus</label>
                      <input type="number" class="form-control" formControlName="exchangeBonus">
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <label>Price of Old Car</label>
                  <input type="number" class="form-control" formControlName="oldCarPrice">
                </div>
              </form>
            </div>
          </div>

          <!-- Generate Button -->
          <div class="text-center mt-4 mb-4" *ngIf="selectedVariants.length > 0">
            <button type="button" 
                    class="btn btn-primary btn-lg" 
                    [disabled]="!quotationForm.valid"
                    (click)="generateQuotation()">
              Generate Quotation
            </button>
          </div>
        </div>
      </section>
    </div>
  `,
  styles: [`
    .variant-card {
      cursor: pointer;
      transition: all 0.3s ease;
    }
    .variant-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 4px 8px rgba(0,0,0,0.1);
    }
    .variant-card.selected {
      border: 2px solid #007bff;
      background-color: #f8f9fa;
    }
    .variant-card.disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
    .close {
      padding: 0 5px;
      margin-left: 10px;
    }
    .table td, .table th {
      vertical-align: middle;
    }
  `]
})
export class QuotationFormComponent implements OnInit {
  quotationForm: FormGroup;
  models$ = this.carService.getModels();
  selectedModel: CarModel | null = null;
  selectedVariants: CarVariant[] = [];

  constructor(
    private fb: FormBuilder,
    private carService: CarService,
    private quotationService: QuotationService
  ) {
    this.quotationForm = this.fb.group({
      customerName: ['', Validators.required],
      contactNo: ['', Validators.required],
      address: ['', Validators.required],
      salesmanName: ['', Validators.required],
      salesmanContact: ['', Validators.required],
      consumerOffer: [0],
      retailSupport: [0],
      ruralOffer: [0],
      exchangeBonus: [0],
      oldCarPrice: [0]
    });
  }

  ngOnInit() {}

  selectModel(model: CarModel) {
    this.selectedModel = model;
    this.selectedVariants = [];
  }

  isVariantSelected(variant: CarVariant): boolean {
    return this.selectedVariants.some(v => v.id === variant.id);
  }

  toggleVariant(variant: CarVariant) {
    const index = this.selectedVariants.findIndex(v => v.id === variant.id);
    if (index === -1) {
      if (this.selectedVariants.length < 4) {
        this.selectedVariants.push(variant);
      }
    } else {
      this.selectedVariants.splice(index, 1);
    }
  }

  removeVariant(variant: CarVariant) {
    const index = this.selectedVariants.findIndex(v => v.id === variant.id);
    if (index !== -1) {
      this.selectedVariants.splice(index, 1);
    }
  }

  calculateSubTotal(variant: CarVariant): number {
    return variant.exShowroomPrice +
           variant.rto +
           variant.insurance +
           variant.tcs;
  }

  calculateTotal(variant: CarVariant): number {
    return this.calculateSubTotal(variant) +
           variant.extendedWarranty +
           variant.ccp +
           variant.accessories +
           variant.rewardProgram +
           variant.fastag;
  }

  calculateRTODiscount(variant: CarVariant): number {
    return variant.rto * 0.5;
  }

  calculateGrandTotal(variant: CarVariant): number {
    const total = this.calculateTotal(variant);
    const rtoDiscount = this.calculateRTODiscount(variant);
    const formValues = this.quotationForm.value;
    
    return total - rtoDiscount -
           (formValues.consumerOffer || 0) -
           (formValues.retailSupport || 0) -
           (formValues.ruralOffer || 0) -
           (formValues.exchangeBonus || 0);
  }

  generateQuotation() {
    if (this.quotationForm.valid && this.selectedVariants.length > 0) {
      const quotationData = {
        ...this.quotationForm.value,
        quotationNumber: this.quotationService.generateQuotationNumber(),
        date: new Date(),
        variants: this.selectedVariants,
        model: this.selectedModel
      };
      this.quotationService.addQuotation(quotationData);
      // Handle success (e.g., show message, redirect)
    }
  }
}