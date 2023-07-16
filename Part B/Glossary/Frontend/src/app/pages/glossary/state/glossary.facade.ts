import { Injectable } from "@angular/core";
import { Store, select } from "@ngrx/store";
import { GlossaryTerm } from "../../../core/models/glossary-term";
import { addTerm, updateTerm, deleteTerm, getAllTerms } from "./glossary.actions";
import { selectGlossaryTermsList, selectGlossaryIsLoading } from "./glossary.selectors";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class GlossaryFacade {
    constructor(private readonly store: Store) {}

    initData(): void {
        this.store.dispatch(getAllTerms());
    }
    
    getAllTerms(): Observable<GlossaryTerm[]> {
        return this.store.pipe(select(selectGlossaryTermsList));
    }

    getIsLoading(): Observable<boolean> {
        return this.store.pipe(select(selectGlossaryIsLoading));
    }

    addTerm(term: Partial<GlossaryTerm>): void {
        this.store.dispatch(addTerm({term}));
    }

    updateTerm(term: GlossaryTerm): void {
        this.store.dispatch(updateTerm({term}));
    }

    deleteTerm(term: GlossaryTerm): void {
        this.store.dispatch(deleteTerm({term}));
    }
}