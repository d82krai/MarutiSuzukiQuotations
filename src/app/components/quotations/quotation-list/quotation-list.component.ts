import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { QuotationService } from '../../../services/quotation.service';
import { Quotation } from '../../../models/quotation.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-quotation-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <div class="content-wrapper">
      <section class="content-header">
        <div class="container-fluid">
          <div class="row mb-2">
            <div class="col-sm-6">
              <h1>Quotations</h1>
            </div>
            <div class="col-sm-6">
              <button class="btn btn-primary float-right" routerLink="/quotations/new">
                Create New Quotation
              </button>
            </div>
          </div>
        </div>
      </section>

      <section class="content">
        <div class="container-fluid">
          <div class="card">
            <div class="card-header">
              <div class="row">
                <div class="col-md-8">
                  <div class="input-group">
                    <input type="text" 
                           class="form-control" 
                           placeholder="Search quotations..."
                           [(ngModel)]="searchTerm"
                           (input)="onSearch()">
                    <div class="input-group-append">
                      <button class="btn btn-default">
                        <i class="fas fa-search"></i>
                      </button>
                    </div>
                  </div>
                </div>
                <div class="col-md-4">
                  <select class="form-control" [(ngModel)]="searchField" (change)="onSearch()">
                    <option value="quotationNumber">Quotation Number</option>
                    <option value="customerName">Customer Name</option>
                    <option value="contactNo">Contact Number</option>
                    <option value="date">Date</option>
                  </select>
                </div>
              </div>
            </div>
            <div class="card-body p-0">
              <table class="table table-striped">
                <thead>
                  <tr>
                    <th>Quotation No.</th>
                    <th>Date</th>
                    <th>Customer Name</th>
                    <th>Contact</th>
                    <th>Model</th>
                    <th>Variants</th>
                    <th>Total Amount</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr *ngFor="let quotation of filteredQuotations">
                    <td>{{quotation.quotationNumber}}</td>
                    <td>{{quotation.date | date:'mediumDate'}}</td>
                    <td>{{quotation.customerName}}</td>
                    <td>{{quotation.contactNo}}</td>
                    <td>{{quotation.model?.name}}</td>
                    <td>
                      <span class="badge badge-info mr-1" 
                            *ngFor="let variant of quotation.variants">
                        {{variant.name}}
                      </span>
                    </td>
                    <td>₹{{calculateTotal(quotation) | number}}</td>
                    <td>
                      <button class="btn btn-info btn-sm mr-2" (click)="viewQuotation(quotation)">
                        <i class="fas fa-eye"></i>
                      </button>
                      <button class="btn btn-success btn-sm mr-2" (click)="printQuotation(quotation)">
                        <i class="fas fa-print"></i>
                      </button>
                      <button class="btn btn-danger btn-sm" (click)="deleteQuotation(quotation)">
                        <i class="fas fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                  <tr *ngIf="filteredQuotations.length === 0">
                    <td colspan="8" class="text-center py-4">
                      No quotations found
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </div>
  `,
  styles: [`
    .badge {
      font-size: 0.9em;
    }
    .table td {
      vertical-align: middle;
    }
  `]
})
export class QuotationListComponent implements OnInit, OnDestroy {
  searchTerm = '';
  searchField: 'quotationNumber' | 'customerName' | 'contactNo' | 'date' = 'quotationNumber';
  filteredQuotations: Quotation[] = [];
  private subscription: Subscription | null = null;

  constructor(private quotationService: QuotationService) {}

  ngOnInit() {
    this.subscription = this.quotationService.getQuotations().subscribe(quotations => {
      this.filteredQuotations = quotations;
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  onSearch() {
    this.subscription = this.quotationService.getQuotations().subscribe(quotations => {
      if (!this.searchTerm) {
        this.filteredQuotations = quotations;
        return;
      }

      const searchTermLower = this.searchTerm.toLowerCase();
      this.filteredQuotations = quotations.filter(quotation => {
        const value = quotation[this.searchField];
        if (value instanceof Date) {
          return value.toLocaleDateString().toLowerCase().includes(searchTermLower);
        }
        return String(value).toLowerCase().includes(searchTermLower);
      });
    });
  }

  calculateTotal(quotation: Quotation): number {
    return quotation.variants.reduce((total, variant) => {
      const subtotal = variant.exShowroomPrice +
                      variant.rto +
                      variant.insurance +
                      variant.tcs +
                      variant.extendedWarranty +
                      variant.ccp +
                      variant.accessories +
                      variant.rewardProgram +
                      variant.fastag;
      
      // Apply discounts
      const rtoDiscount = variant.rto * 0.5; // 50% RTO discount
      const additionalDiscounts = quotation.consumerOffer +
                                quotation.retailSupport +
                                quotation.ruralOffer +
                                quotation.exchangeBonus;
      
      return total + (subtotal - rtoDiscount - additionalDiscounts);
    }, 0);
  }

  viewQuotation(quotation: Quotation) {
    // Navigate to quotation detail view
    console.log('View quotation:', quotation.quotationNumber);
  }

  printQuotation(quotation: Quotation) {
    // Implement print functionality
    console.log('Print quotation:', quotation.quotationNumber);
  }

  deleteQuotation(quotation: Quotation) {
    if (confirm(`Are you sure you want to delete quotation ${quotation.quotationNumber}?`)) {
      this.quotationService.deleteQuotation(quotation.id);
    }
  }
}