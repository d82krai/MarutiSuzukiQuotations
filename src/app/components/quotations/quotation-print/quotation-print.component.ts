import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Quotation } from '../../../models/quotation.model';

@Component({
  selector: 'app-quotation-print',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="quotation-print">
      <!-- Header -->
      <div class="header">
        <div class="logo">
          <img src="assets/maruti-logo.png" alt="Maruti Suzuki">
        </div>
        <div class="dealer-info">
          <h1>MARUTI SUZUKI ARENA</h1>
          <p>Authorized Dealer</p>
          <p>123 Dealership Street, City - 123456</p>
          <p>Tel: (123) 456-7890 | Email: info@dealer.com</p>
        </div>
      </div>

      <!-- Quotation Details -->
      <div class="quotation-details">
        <div class="row">
          <div class="col">
            <p><strong>Quotation No:</strong> {{quotation.quotationNumber}}</p>
            <p><strong>Date:</strong> {{quotation.date | date:'mediumDate'}}</p>
          </div>
        </div>
      </div>

      <!-- Customer Details -->
      <div class="customer-details">
        <div class="row">
          <div class="col">
            <h3>Customer Details</h3>
            <p><strong>Name:</strong> {{quotation.customerName}}</p>
            <p><strong>Address:</strong> {{quotation.address}}</p>
            <p><strong>Contact:</strong> {{quotation.contactNo}}</p>
          </div>
          <div class="col">
            <h3>Salesperson Details</h3>
            <p><strong>Name:</strong> {{quotation.salesmanName}}</p>
            <p><strong>Contact:</strong> {{quotation.salesmanContact}}</p>
          </div>
        </div>
      </div>

      <!-- Vehicle Details -->
      <div class="vehicle-details">
        <h3>Vehicle Details</h3>
        <table class="table table-bordered">
          <thead>
            <tr>
              <th>Description</th>
              <th *ngFor="let variant of quotation.variants">{{variant.name}}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Ex-Showroom Price</td>
              <td *ngFor="let variant of quotation.variants" class="text-right">
                ₹{{variant.exShowroomPrice | number}}
              </td>
            </tr>
            <tr>
              <td>RTO</td>
              <td *ngFor="let variant of quotation.variants" class="text-right">
                ₹{{variant.rto | number}}
              </td>
            </tr>
            <tr>
              <td>Insurance</td>
              <td *ngFor="let variant of quotation.variants" class="text-right">
                ₹{{variant.insurance | number}}
              </td>
            </tr>
            <tr>
              <td>TCS</td>
              <td *ngFor="let variant of quotation.variants" class="text-right">
                ₹{{variant.tcs | number}}
              </td>
            </tr>
            <tr>
              <td>Extended Warranty</td>
              <td *ngFor="let variant of quotation.variants" class="text-right">
                ₹{{variant.extendedWarranty | number}}
              </td>
            </tr>
            <tr>
              <td>CCP</td>
              <td *ngFor="let variant of quotation.variants" class="text-right">
                ₹{{variant.ccp | number}}
              </td>
            </tr>
            <tr>
              <td>Accessories</td>
              <td *ngFor="let variant of quotation.variants" class="text-right">
                ₹{{variant.accessories | number}}
              </td>
            </tr>
            <tr>
              <td>Fastag</td>
              <td *ngFor="let variant of quotation.variants" class="text-right">
                ₹{{variant.fastag | number}}
              </td>
            </tr>
            <tr class="total">
              <td><strong>Total On-Road Price</strong></td>
              <td *ngFor="let variant of quotation.variants" class="text-right">
                <strong>₹{{calculateTotal(variant) | number}}</strong>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Discounts -->
      <div class="discounts" *ngIf="hasDiscounts()">
        <h3>Applicable Discounts</h3>
        <table class="table table-bordered">
          <tbody>
            <tr *ngIf="quotation.consumerOffer">
              <td>Consumer Offer</td>
              <td class="text-right">₹{{quotation.consumerOffer | number}}</td>
            </tr>
            <tr *ngIf="quotation.retailSupport">
              <td>Retail Support</td>
              <td class="text-right">₹{{quotation.retailSupport | number}}</td>
            </tr>
            <tr *ngIf="quotation.ruralOffer">
              <td>Rural Offer</td>
              <td class="text-right">₹{{quotation.ruralOffer | number}}</td>
            </tr>
            <tr *ngIf="quotation.exchangeBonus">
              <td>Exchange Bonus</td>
              <td class="text-right">₹{{quotation.exchangeBonus | number}}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Terms and Conditions -->
      <div class="terms">
        <h3>Terms & Conditions</h3>
        <ol>
          <li>This quotation is valid for 3 days from the date of issue.</li>
          <li>Prices are subject to change without prior notice.</li>
          <li>Final price may vary based on government regulations and taxes.</li>
          <li>Insurance rates are indicative and subject to change.</li>
          <li>Accessories prices are approximate and may vary.</li>
        </ol>
      </div>

      <!-- Footer -->
      <div class="footer">
        <div class="row">
          <div class="col">
            <p>Customer's Signature</p>
            <div class="signature-line"></div>
          </div>
          <div class="col text-right">
            <p>For MARUTI SUZUKI ARENA</p>
            <div class="signature-line"></div>
            <p>Authorized Signatory</p>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .quotation-print {
      padding: 20px;
      max-width: 1200px;
      margin: 0 auto;
      background: white;
    }

    .header {
      display: flex;
      align-items: center;
      margin-bottom: 30px;
      padding-bottom: 20px;
      border-bottom: 2px solid #ddd;
    }

    .logo img {
      max-width: 200px;
      margin-right: 30px;
    }

    .dealer-info h1 {
      font-size: 24px;
      margin-bottom: 5px;
    }

    .dealer-info p {
      margin: 0;
      line-height: 1.4;
    }

    .quotation-details {
      margin-bottom: 20px;
    }

    .customer-details, .vehicle-details, .discounts, .terms {
      margin-bottom: 30px;
    }

    h3 {
      color: #333;
      border-bottom: 1px solid #ddd;
      padding-bottom: 10px;
      margin-bottom: 15px;
    }

    .table {
      width: 100%;
      margin-bottom: 1rem;
      border-collapse: collapse;
    }

    .table th, .table td {
      padding: 12px;
      border: 1px solid #ddd;
    }

    .table th {
      background-color: #f8f9fa;
    }

    .total {
      background-color: #f8f9fa;
      font-weight: bold;
    }

    .terms ol {
      padding-left: 20px;
    }

    .terms li {
      margin-bottom: 5px;
    }

    .footer {
      margin-top: 50px;
      padding-top: 30px;
      border-top: 1px solid #ddd;
    }

    .signature-line {
      border-top: 1px solid #000;
      width: 200px;
      margin: 10px 0;
    }

    .text-right {
      text-align: right;
    }

    @media print {
      .quotation-print {
        padding: 0;
      }

      @page {
        margin: 20mm;
      }
    }
  `]
})
export class QuotationPrintComponent {
  @Input() quotation!: Quotation;

  calculateTotal(variant: any): number {
    return variant.exShowroomPrice +
           variant.rto +
           variant.insurance +
           variant.tcs +
           variant.extendedWarranty +
           variant.ccp +
           variant.accessories +
           variant.fastag;
  }

  hasDiscounts(): boolean {
    return !!(this.quotation.consumerOffer ||
             this.quotation.retailSupport ||
             this.quotation.ruralOffer ||
             this.quotation.exchangeBonus);
  }
}