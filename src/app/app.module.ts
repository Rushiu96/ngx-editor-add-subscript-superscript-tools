import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgxEditorModule } from 'ngx-editor';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomMenuComponent } from './editor/custom-menu/custom-menu.component';

@NgModule({
  declarations: [
    AppComponent,
    CustomMenuComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    NgxEditorModule.forRoot({
      locals: {
        bold: 'Gras',
        italic: 'Italique',
        underline: 'souligner',
      },
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }