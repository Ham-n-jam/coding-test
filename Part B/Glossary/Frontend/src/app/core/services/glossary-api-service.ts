import { Observable, map, take } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';

import { GlossaryTerm } from '../models/glossary-term';

@Injectable({
  providedIn: 'root',
})
export class GlossaryApiService {

    private readonly apiUrl: string;

    constructor(
        private http: HttpClient,
        @Inject('BASE_URL') baseUrl: string
    ) {
        this.apiUrl = baseUrl + 'glossaryterm';
    }
    
    /**
     * GET: Retrieve all glossary terms 
     */
    getAllGlossaryTerms(): Observable<GlossaryTerm[]> {
        return this.http.get<GlossaryTerm[]>(this.apiUrl);
    }
    
    /**
     * POST: Add a single glossary term
     * @param term The term to add, excluding the id field
     * @returns The added term complete with id
     */
    addGlossaryTerm(term: Partial<GlossaryTerm>): Observable<GlossaryTerm> {
        return this.http.post<string>(this.apiUrl, term).pipe(
            take(1),
            map(apiReturnedId => {
                return {...term, id: apiReturnedId} as GlossaryTerm
            })
        );
    }

    /**
     * PATCH: Update a single glossary term
     * @param term The term to update
     * @returns the updated term (same as input)
     */
    updateGlossaryTerm(term: GlossaryTerm): Observable<GlossaryTerm> {
        return this.http.patch<string>(this.apiUrl, term).pipe(
            take(1),
            map(_ => term)
        );
    }
    
    /**
     * DELETE: Remove a single glossary term
     * @param term The term to delete
     * @returns The deleted term (same as input)
     */
    deleteGlossaryTerm(term: GlossaryTerm): Observable<GlossaryTerm> {
        return this.http.delete<string>(`${this.apiUrl}/${term.id}`).pipe(
            take(1),
            map(_ => term)
        );
    }
}
