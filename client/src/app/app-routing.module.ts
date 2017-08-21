import { ConferencesComponent } from './conference/list/conferences.component';
import { ConferenceComponent } from './conference/show/conference.component';
import { EditConferenceComponent } from './conference/edit/edit-conference.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ConferenceHolderComponent } from "./conference/conference-holder.component";

const routes: Routes = [
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    { path: 'dashboard', component: DashboardComponent },
    {
        path: 'conference',
        component: ConferenceHolderComponent,
        children: [
            {
                path: '',
                component: ConferencesComponent,
                children: [
     
                ]
            },
            {
                path: ':uuid',
                component: ConferenceComponent,
                children: [
                ]
            },
            { path: 'edit/:uuid', component: EditConferenceComponent }
        ]
    }
];

/**
 * Routing facade to decouple router configuration from the main module configuration.
 */
@NgModule({
    imports: [RouterModule.forRoot(routes, {enableTracing:true})],
    exports: [RouterModule]
})
export class AppRoutingModule { }