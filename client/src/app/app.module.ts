import { AppEventBusEffects } from './app.event-bus.effects';
import { AppEventBusService } from './app.event-bus.service';
import { EventBusService } from './shared/event-bus.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { counterReducer } from './redux/reducer/test';
import { AppComponent } from './app.component';
import { reducers, metaReducers } from "./app.reducer";
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {MdButtonModule, MdInputModule, MdIconModule} from '@angular/material';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    // store bootstrapping with init call and combined reducers
    StoreModule.forRoot(reducers, {metaReducers}),
    // store side effects interceptors
    EffectsModule.forRoot([AppEventBusEffects]),
    // material design
    NoopAnimationsModule,
    MdButtonModule, MdInputModule, MdIconModule
  ],
  providers: [
    EventBusService,
    AppEventBusService],
  bootstrap: [AppComponent]
})
export class AppModule { } 
