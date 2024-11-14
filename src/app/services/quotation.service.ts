import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Quotation } from '../models/quotation.model';

@Injectable({
  providedIn: 'root'
})
export class QuotationService {
  private quotations: Quotation[] = [];
  private quotationsSubject = new BehaviorSubject<Quotation[]>([]);

  getQuotations(): Observable<Quotation[]> {
    return this.quotationsSubject.asObservable();
  }

  addQuotation(quotation: Quotation) {
    this.quotations.push(quotation);
    this.quotationsSubject.next([...this.quotations]);
  }

  deleteQuotation(id: string) {
    this.quotations = this.quotations.filter(q => q.id !== id);
    this.quotationsSubject.next([...this.quotations]);
  }

  generateQuotationNumber(): string {
    const date = new Date();
    const year = date.getFullYear().toString().slice(-2);
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const count = (this.quotations.length + 1).toString().padStart(4, '0');
    return `QT${year}${month}${count}`;
  }
}