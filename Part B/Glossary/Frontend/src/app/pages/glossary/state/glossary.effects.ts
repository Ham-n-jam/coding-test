import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';

import { map, switchMap } from 'rxjs/operators';
import { GlossaryApiService } from '../../../core/services/glossary-api-service';
import { addTerm, addTermSuccess, deleteTerm, deleteTermSuccess, getAllTerms, getAllTermsSuccess, updateTerm, updateTermSuccess } from './glossary.actions';
import { GlossaryTerm } from '../../../core/models/glossary-term';


@Injectable()
export class GlossaryEffects {
    constructor(
        private readonly actions$: Actions,
        private readonly glossaryApiService: GlossaryApiService
    ) {}

    getAllTerms$ = createEffect(() =>
        this.actions$.pipe(
            ofType(getAllTerms.type),
            switchMap(() => this.glossaryApiService.getAllGlossaryTerms()),
            map((terms: GlossaryTerm[]) => getAllTermsSuccess({terms}))
        )
    );

    addTerm$ = createEffect(() =>
        this.actions$.pipe(
            ofType(addTerm),
            switchMap(({term}) => this.glossaryApiService.addGlossaryTerm(term)),
            map((term: GlossaryTerm) => addTermSuccess({term}))
        )
    );

    updateTerm$ = createEffect(() =>
        this.actions$.pipe(
            ofType(updateTerm),
            switchMap(({term}) => this.glossaryApiService.updateGlossaryTerm(term)),
            map((term: GlossaryTerm) => updateTermSuccess({term}))
        )
    );

    deleteTerm$ = createEffect(() =>
        this.actions$.pipe(
            ofType(deleteTerm),
            switchMap(({term}) => this.glossaryApiService.deleteGlossaryTerm(term)),
            map((term: GlossaryTerm) => deleteTermSuccess({term}))
        )
    );
}
