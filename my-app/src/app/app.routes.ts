import { Routes } from '@angular/router';
import { About } from './about/about';
import { Contact } from './contact/contact';
import { PaymentComponent } from './payment/payment.component';
import { PaymentResultComponent } from './payment-result/payment-result.component';
import { FashionComponent } from './fashion/fashion';
import { Login } from './login/login';
import { Ex63Component } from './ex63/ex63';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'about', component: About },
  { path: 'contact', component: Contact },
  { path: 'payment', component: PaymentComponent },
  { path: 'payment-result', component: PaymentResultComponent },
  { path: 'fashion', component: FashionComponent },
  { path: 'ex63', component: Ex63Component }
];
