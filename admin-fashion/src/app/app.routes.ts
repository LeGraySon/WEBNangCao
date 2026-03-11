import { Routes } from '@angular/router';
import { FashionListComponent } from './components/fashion-list/fashion-list.component';
import { FashionFormComponent } from './components/fashion-form/fashion-form.component';
import { FashionDetailComponent } from './components/fashion-detail/fashion-detail.component';

export const routes: Routes = [
  { path: '', redirectTo: 'fashions', pathMatch: 'full' },
  { path: 'fashions', component: FashionListComponent },
  { path: 'fashions/new', component: FashionFormComponent },
  { path: 'fashions/:id/edit', component: FashionFormComponent },
  { path: 'fashions/:id', component: FashionDetailComponent },
  { path: '**', redirectTo: 'fashions' }
];
