import { DemoStoreService } from './shared/demostore.service';
import { CounterComponent } from './counter/counter.component';
import { UsersComponent } from './users/users.component';
import { AppEventBusEffects } from './app.event-bus.effects';
import { AppEventBusService } from './app.event-bus.service';
import { EventBusService } from './shared/event-bus.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AppComponent } from './app.component';
import { reducers, metaReducers } from "./app.reducer";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MdButtonModule, MdInputModule, MdIconModule, MdListModule, MdCardModule, MdTabsModule, MdGridListModule } from '@angular/material';
import { ConferencesComponent } from './conference/list/conferences.component';
import { ConferenceComponent } from './conference/show/conference.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AppRoutingModule } from "./app-routing.module";
import { EditConferenceComponent } from './conference/edit/edit-conference.component';
import { ConferenceHolderComponent } from './conference/conference-holder.component';


@NgModule({
  declarations: [
    AppComponent, UsersComponent, CounterComponent, ConferencesComponent, ConferenceComponent, DashboardComponent, EditConferenceComponent, ConferenceHolderComponent
  ],
  imports: [
    BrowserModule,
    // router support
    AppRoutingModule,
    // store bootstrapping with init call and combined reducers
    StoreModule.forRoot(reducers, { metaReducers }),
    // store side effects interceptors
    EffectsModule.forRoot([AppEventBusEffects]),
    // material design
    BrowserAnimationsModule,
    MdButtonModule, MdInputModule, MdIconModule, MdListModule, MdCardModule, MdTabsModule, MdGridListModule
  ],
  providers: [
    EventBusService,
    AppEventBusService,
    DemoStoreService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { } 
