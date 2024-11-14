import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CarVariant } from '../../../models/car.model';

@Component({
  selector: 'app-variant-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="modal">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Add New Variant</h5>
            <button type="button" class="close" (click)="onClose()">
              <span>&times;</span>
            </button>
          </div>
          <form [formGroup]="variantForm" (ngSubmit)="onSubmit()">
            <div class="modal-body">
              <!-- Basic Information -->
              <h6 class="mb-3">Basic Information</h6>
              <div class="row">
                <div class="col-md-6">
                  <div class="form-group">
                    <label>Variant Name</label>
                    <input type="text" class="form-control" formControlName="name">
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group">
                    <label>Image URL</label>
                    <input type="text" class="form-control" formControlName="imageUrl">
                  </div>
                </div>
              </div>

              <!-- Technical Specifications -->
              <h6 class="mt-4 mb-3">Technical Specifications</h6>
              <div class="row">
                <div class="col-md-4">
                  <div class="form-group">
                    <label>Rating (out of 5)</label>
                    <input type="number" class="form-control" formControlName="rating" step="0.1" min="0" max="5">
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="form-group">
                    <label>Number of Reviews</label>
                    <input type="number" class="form-control" formControlName="reviews" min="0">
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="form-group">
                    <label>Transmission</label>
                    <select class="form-control" formControlName="transmission">
                      <option value="Manual">Manual</option>
                      <option value="Automatic">Automatic</option>
                      <option value="AMT">AMT</option>
                    </select>
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="col-md-4">
                  <div class="form-group">
                    <label>Engine (cc)</label>
                    <input type="text" class="form-control" formControlName="engine">
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="form-group">
                    <label>Fuel Type</label>
                    <select class="form-control" formControlName="fuelType">
                      <option value="Petrol">Petrol</option>
                      <option value="Diesel">Diesel</option>
                      <option value="CNG">CNG</option>
                      <option value="Electric">Electric</option>
                    </select>
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="form-group">
                    <label>Power (bhp)</label>
                    <input type="text" class="form-control" formControlName="power">
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="col-md-6">
                  <div class="form-group">
                    <label>Boot Space (Litres)</label>
                    <input type="text" class="form-control" formControlName="bootSpace">
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group">
                    <label>Number of Airbags</label>
                    <input type="number" class="form-control" formControlName="airbags" min="0">
                  </div>
                </div>
              </div>

              <!-- Pricing Information -->
              <h6 class="mt-4 mb-3">Pricing Information</h6>
              <div class="row">
                <div class="col-md-6">
                  <div class="form-group">
                    <label>Ex-Showroom Price</label>
                    <input type="number" class="form-control" formControlName="exShowroomPrice">
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group">
                    <label>RTO</label>
                    <input type="number" class="form-control" formControlName="rto">
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="col-md-6">
                  <div class="form-group">
                    <label>Insurance</label>
                    <input type="number" class="form-control" formControlName="insurance">
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group">
                    <label>TCS</label>
                    <input type="number" class="form-control" formControlName="tcs">
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="col-md-6">
                  <div class="form-group">
                    <label>Extended Warranty</label>
                    <input type="number" class="form-control" formControlName="extendedWarranty">
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group">
                    <label>CCP</label>
                    <input type="number" class="form-control" formControlName="ccp">
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="col-md-4">
                  <div class="form-group">
                    <label>Accessories</label>
                    <input type="number" class="form-control" formControlName="accessories">
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="form-group">
                    <label>Reward Program</label>
                    <input type="number" class="form-control" formControlName="rewardProgram">
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="form-group">
                    <label>Fastag</label>
                    <input type="number" class="form-control" formControlName="fastag">
                  </div>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" (click)="onClose()">Close</button>
              <button type="submit" class="btn btn-primary" [disabled]="!variantForm.valid">Save</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .modal {
      display: block;
      background: rgba(0,0,0,0.5);
    }
    .form-group {
      margin-bottom: 1rem;
    }
    h6 {
      color: #666;
      font-weight: 600;
    }
  `]
})
export class VariantFormComponent {
  @Input() modelId!: string;
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<CarVariant>();

  variantForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.variantForm = this.fb.group({
      name: ['', Validators.required],
      imageUrl: ['', Validators.required],
      // Technical specifications
      rating: [4.0, [Validators.required, Validators.min(0), Validators.max(5)]],
      reviews: [0, [Validators.required, Validators.min(0)]],
      transmission: ['Manual', Validators.required],
      engine: ['', Validators.required],
      fuelType: ['Petrol', Validators.required],
      power: ['', Validators.required],
      bootSpace: ['', Validators.required],
      airbags: [2, [Validators.required, Validators.min(0)]],
      // Pricing
      exShowroomPrice: [0, [Validators.required, Validators.min(0)]],
      rto: [0, [Validators.required, Validators.min(0)]],
      insurance: [0, [Validators.required, Validators.min(0)]],
      tcs: [0, [Validators.required, Validators.min(0)]],
      extendedWarranty: [0, [Validators.required, Validators.min(0)]],
      ccp: [0, [Validators.required, Validators.min(0)]],
      accessories: [0, [Validators.required, Validators.min(0)]],
      rewardProgram: [0, [Validators.required, Validators.min(0)]],
      fastag: [0, [Validators.required, Validators.min(0)]]
    });
  }

  onClose() {
    this.close.emit();
  }

  onSubmit() {
    if (this.variantForm.valid) {
      const variant: CarVariant = {
        id: Date.now().toString(),
        ...this.variantForm.value
      };
      this.save.emit(variant);
    }
  }
}