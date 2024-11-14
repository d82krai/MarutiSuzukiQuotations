import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CarModel } from '../../../models/car.model';

@Component({
  selector: 'app-model-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="modal">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Add New Model</h5>
            <button type="button" class="close" (click)="onClose()">
              <span>&times;</span>
            </button>
          </div>
          <form [formGroup]="modelForm" (ngSubmit)="onSubmit()">
            <div class="modal-body">
              <div class="form-group">
                <label>Model Name</label>
                <input type="text" class="form-control" formControlName="name">
              </div>
              <div class="form-group">
                <label>Description</label>
                <textarea class="form-control" formControlName="description"></textarea>
              </div>
              <div class="form-group">
                <label>Image URL</label>
                <input type="text" class="form-control" formControlName="imageUrl">
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" (click)="onClose()">Close</button>
              <button type="submit" class="btn btn-primary" [disabled]="!modelForm.valid">Save</button>
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
  `]
})
export class ModelFormComponent {
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<CarModel>();

  modelForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.modelForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      imageUrl: ['', Validators.required]
    });
  }

  onClose() {
    this.close.emit();
  }

  onSubmit() {
    if (this.modelForm.valid) {
      const model: CarModel = {
        id: Date.now().toString(),
        ...this.modelForm.value,
        variants: []
      };
      this.save.emit(model);
    }
  }
}