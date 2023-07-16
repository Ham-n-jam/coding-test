import { NgModule } from '@angular/core';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { glossaryReducer } from './glossary.reducers';
import { GlossaryEffects } from './glossary.effects';


@NgModule({
    imports: [
        StoreModule.forFeature('glossary', glossaryReducer),
        EffectsModule.forFeature([GlossaryEffects])
    ]
})
export class GlossaryStoreModule {}