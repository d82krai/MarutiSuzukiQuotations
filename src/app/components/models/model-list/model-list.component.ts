import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarService } from '../../../services/car.service';
import { CarModel, CarVariant } from '../../../models/car.model';
import { ModelFormComponent } from '../model-form/model-form.component';
import { VariantFormComponent } from '../variant-form/variant-form.component';

@Component({
  selector: 'app-model-list',
  standalone: true,
  imports: [CommonModule, ModelFormComponent, VariantFormComponent],
  template: `
    <div class="content-wrapper">
      <section class="content-header">
        <div class="container-fluid">
          <div class="row mb-2">
            <div class="col-sm-6">
              <h1>Car Models</h1>
            </div>
            <div class="col-sm-6">
              <button class="btn btn-primary float-right" (click)="showAddModel = true">
                Add New Model
              </button>
            </div>
          </div>
        </div>
      </section>

      <section class="content">
        <div class="container-fluid">
          <div class="row">
            <div class="col-12">
              <div class="card">
                <div class="card-body p-0">
                  <table class="table table-striped">
                    <thead>
                      <tr>
                        <th>Model</th>
                        <th>Image</th>
                        <th>Description</th>
                        <th>Variants</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr *ngFor="let model of models$ | async">
                        <td>{{model.name}}</td>
                        <td>
                          <img [src]="model.imageUrl" class="img-thumbnail" style="max-width: 100px">
                        </td>
                        <td>{{model.description}}</td>
                        <td>{{model.variants.length}}</td>
                        <td>
                          <button class="btn btn-info btn-sm mr-2" (click)="showVariants(model)">
                            <i class="fas fa-list"></i> Manage Variants
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <!-- Variants Panel -->
              <div class="card" *ngIf="selectedModel">
                <div class="card-header">
                  <h3 class="card-title">Variants for {{selectedModel.name}}</h3>
                  <button class="btn btn-primary btn-sm float-right" (click)="showAddVariant = true">
                    Add Variant
                  </button>
                </div>
                <div class="card-body p-0">
                  <table class="table table-striped">
                    <thead>
                      <tr>
                        <th>Variant</th>
                        <th>Specs</th>
                        <th>Ex-Showroom Price</th>
                        <th>Rating</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr *ngFor="let variant of selectedModel.variants">
                        <td>{{variant.name}}</td>
                        <td>
                          <small class="d-block">{{variant.engine}} | {{variant.transmission}}</small>
                          <small class="d-block">{{variant.power}} | {{variant.fuelType}}</small>
                          <small class="d-block">Boot Space: {{variant.bootSpace}}</small>
                        </td>
                        <td>₹{{variant.exShowroomPrice | number}}</td>
                        <td>
                          <div class="d-flex align-items-center">
                            <span class="text-warning mr-1">★</span>
                            <span>{{variant.rating}}</span>
                            <small class="text-muted ml-1">({{variant.reviews}})</small>
                          </div>
                        </td>
                        <td>
                          <button class="btn btn-danger btn-sm">
                            <i class="fas fa-trash"></i>
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>

    <app-model-form *ngIf="showAddModel"
                    (close)="showAddModel = false"
                    (save)="onModelSave($event)">
    </app-model-form>

    <app-variant-form *ngIf="showAddVariant"
                      [modelId]="selectedModel?.id || ''"
                      (close)="showAddVariant = false"
                      (save)="onVariantSave($event)">
    </app-variant-form>
  `
})
export class ModelListComponent {
  models$ = this.carService.getModels();
  showAddModel = false;
  showAddVariant = false;
  selectedModel: CarModel | null = null;

  constructor(private carService: CarService) {}

  showVariants(model: CarModel) {
    this.selectedModel = model;
  }

  onModelSave(model: CarModel) {
    this.carService.addModel(model);
    this.showAddModel = false;
  }

  onVariantSave(variant: CarVariant) {
    if (this.selectedModel) {
      this.carService.addVariant(this.selectedModel.id, variant);
      this.showAddVariant = false;
    }
  }
}