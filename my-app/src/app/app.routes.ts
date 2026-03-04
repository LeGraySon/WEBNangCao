import { Routes } from '@angular/router';
import { About } from './about/about';
import { Contact } from './contact/contact';
import { PaymentComponent } from './payment/payment.component';
import { PaymentResultComponent } from './payment-result/payment-result.component';

export const routes: Routes = [
  { path: '', redirectTo: 'about', pathMatch: 'full' },
  { path: 'about', component: About },
  { path: 'contact', component: Contact },
  { path: 'payment', component: PaymentComponent },
  { path: 'payment-result', component: PaymentResultComponent }
];
