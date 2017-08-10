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

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    StoreModule.forRoot(reducers, {metaReducers}),
    EffectsModule.forRoot([AppEventBusEffects])
  ],
  providers: [
    EventBusService,
    AppEventBusService],
  bootstrap: [AppComponent]
})
export class AppModule { } 
