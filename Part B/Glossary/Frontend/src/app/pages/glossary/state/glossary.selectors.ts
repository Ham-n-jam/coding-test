import { createSelector, createFeatureSelector } from '@ngrx/store';
import { GlossaryState } from './glossary.state';

export const selectGlossaryState = createFeatureSelector<GlossaryState>('glossary');
export const selectGlossaryTermsList = createSelector(selectGlossaryState, (state) => state.terms);
export const selectGlossaryIsLoading = createSelector(selectGlossaryState, (state) => state.isLoading);
