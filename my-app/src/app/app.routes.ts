import { Routes } from '@angular/router';
import { Learnbinding } from './learnbinding/learnbinding';
import { About } from './about/about';
import { Contact } from './contact/contact';
import { Ptb } from './ptb/ptb';

export const routes: Routes = [
  { path: '', redirectTo: 'learnbinding', pathMatch: 'full' },
  { path: 'learnbinding', component: Learnbinding },
  { path: 'about', component: About },
  { path: 'contact', component: Contact },
  { path: 'ptb', component: Ptb }
];
