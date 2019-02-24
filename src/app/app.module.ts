import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, ErrorHandler } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ErrorService } from './error.service';

import { DialogModule, ButtonModule, InputTextModule, AutoCompleteModule } from 'primeng/primeng';
import { TableModule } from 'primeng/table';
import { AppService } from './app.service';
import { TagAutocompleteComponent } from './tag-autocomplete/tag-autocomplete.component';

@NgModule({
  declarations: [
    AppComponent,
    TagAutocompleteComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    DialogModule,
    InputTextModule,
    AutoCompleteModule,
    TableModule
  ],
  providers: [
    { provide: ErrorHandler, useClass: ErrorService },
    AppService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
