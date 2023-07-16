import { Action, createReducer, on } from '@ngrx/store';
import { GlossaryState } from './glossary.state';
import { addTerm, addTermSuccess, deleteTerm, deleteTermSuccess, getAllTerms, getAllTermsSuccess, updateTerm, updateTermSuccess } from './glossary.actions';

export const initialGlossaryState: GlossaryState = {
    terms: [],
    isLoading: false
};

const reducer = createReducer<GlossaryState>(
    initialGlossaryState,
    on(getAllTerms, (state) => {
        return {
            ...state,
            isLoading: true
        };
    }),
    on(getAllTermsSuccess, (state, { terms }) => {
        return {
            ...state,
            isLoading: false,
            terms
        };
    }),
    on(addTerm, (state) => {
        return {
            ...state,
            isLoading: true,
        };
    }),
    on(addTermSuccess, (state, { term }) => {
        return {
            ...state,
            terms: [...state.terms, term],
            isLoading: false,
        };
    }),
    on(updateTerm, (state) => {
        return {
            ...state,
            isLoading: true,
        };
    }),
    on(updateTermSuccess, (state, { term }) => {
        return {
            ...state,
            terms: state.terms.map(t => t.id === term.id ? term : t),
            isLoading: false,
        };
    }),
    on(deleteTerm, (state) => {
        return {
            ...state,
            isLoading: true,
        };
    }),
    on(deleteTermSuccess, (state, { term }) => {
        return {
            ...state,
            isLoading: false,
            terms: state.terms.filter((t) => t.id !== term.id)
        };
    })
);

export function glossaryReducer(state = initialGlossaryState, actions: Action): GlossaryState {
    return reducer(state, actions);
}
