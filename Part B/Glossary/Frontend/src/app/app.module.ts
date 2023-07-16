import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';

import { GlossaryComponent } from "./pages/glossary/glossary.component";
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { GlossaryStoreModule } from './pages/glossary/state/glossary-store.module';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
    declarations: [
        AppComponent
    ],
    providers: [],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
        HttpClientModule,
        GlossaryComponent,
        StoreModule.forRoot(),
        EffectsModule.forRoot(),
        StoreDevtoolsModule.instrument({}),
        GlossaryStoreModule
    ]
})
export class AppModule { }
