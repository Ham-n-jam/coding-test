import { createAction, props } from '@ngrx/store';
import { GlossaryTerm } from '../../../core/models/glossary-term';

const prefix = '[GlossaryTerms]';

export const getAllTerms = createAction(`${prefix} Get terms`);
export const getAllTermsSuccess = createAction(
    `${getAllTerms.type} Success`,
    props<{
        terms: GlossaryTerm[];
    }>()
);

export const addTerm = createAction(
    `${prefix} Add term`,
    props<{
        term: Partial<GlossaryTerm>;
    }>()
);
export const addTermSuccess = createAction(
    `${addTerm.type} Success`,
    props<{
        term: GlossaryTerm;
    }>()
);

export const updateTerm = createAction(
    `${prefix} Update term`,
    props<{
        term: GlossaryTerm;
    }>()
);
export const updateTermSuccess = createAction(
    `${updateTerm.type} Success`,
    props<{
        term: GlossaryTerm;
    }>()
);

export const deleteTerm = createAction(
    `${prefix} Delete term`,
    props<{
        term: GlossaryTerm;
    }>()
);
export const deleteTermSuccess = createAction(
    `${deleteTerm.type} Success`,
    props<{
        term: GlossaryTerm;
    }>()
);
