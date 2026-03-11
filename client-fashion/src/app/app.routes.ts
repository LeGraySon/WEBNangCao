import { Routes } from '@angular/router';
import { FashionListComponent } from './components/fashion-list/fashion-list.component';
import { FashionDetailComponent } from './components/fashion-detail/fashion-detail.component';

export const routes: Routes = [
  { path: '', component: FashionListComponent },
  { path: 'fashion/:id', component: FashionDetailComponent },
  { path: '**', redirectTo: '' }
];
