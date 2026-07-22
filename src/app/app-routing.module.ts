import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PostDashboardComponent } from './components/post-dashboard/post-dashboard.component';
import { ContactComponent } from './components/contact/contact.component';
import { AboutComponent } from './components/about/about.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    title: 'Home',
    component: HomeComponent
  },
  {
    path: 'blogs',
    title: 'Blogs',
    component: PostDashboardComponent
  },
  {
    path: 'about',
    title: 'About',
    component: AboutComponent
  },
  {
    path: 'contact',
    title: 'Contact',
    component: ContactComponent
  },
  {
    path: '**',
    title: 'Not Found',
    redirectTo: 'home'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }