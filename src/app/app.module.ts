import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { materialModule } from './materials/material.module';
import { HomeComponent } from './components/home/home.component';
import { PostDashboardComponent } from './components/post-dashboard/post-dashboard.component';
import { ContactComponent } from './components/contact/contact.component';
import { AboutComponent } from './components/about/about.component';
import { AppRoutingModule } from './app-routing.module';
import { PostCardComponent } from './components/post-dashboard/post-card/post-card.component';
import { PostFormComponent } from './components/post-dashboard/post-form/post-form.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PostDashboardComponent,
    ContactComponent,
    AboutComponent,
    PostCardComponent,
    PostFormComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    materialModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
],
  providers:[],
  bootstrap: [AppComponent]
})
export class AppModule { }
