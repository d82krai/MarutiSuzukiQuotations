import { Routes } from '@angular/router';
import { ModelListComponent } from './components/models/model-list/model-list.component';
import { QuotationFormComponent } from './components/quotations/quotation-form/quotation-form.component';
import { QuotationListComponent } from './components/quotations/quotation-list/quotation-list.component';

export const routes: Routes = [
  { path: '', redirectTo: 'quotations', pathMatch: 'full' },
  { 
    path: 'quotations',
    children: [
      { path: '', component: QuotationListComponent },
      { path: 'new', component: QuotationFormComponent }
    ]
  },
  { path: 'models', component: ModelListComponent }
];