import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { GlossaryTerm } from '../../core/models/glossary-term';
import { Observable, map } from 'rxjs';
import { GlossaryFacade } from './state/glossary.facade';
import { AddEditGlossaryTermComponent } from './edit-glossary-term/add-edit-glossary-term.component';
import { EditMode } from './edit-glossary-term/add-edit-mode.enum';

@Component({
  selector: 'glossary-overview',
  templateUrl: './glossary.component.html',
  styleUrls: ['./glossary.component.scss'],
  imports: [CommonModule, AddEditGlossaryTermComponent],
  standalone: true
})
export class GlossaryComponent implements OnInit {
	terms$ = new Observable<GlossaryTerm[]>
    isLoading$ = new Observable<boolean>;
	editMode: EditMode = EditMode.Add;
	termToEdit: GlossaryTerm | undefined 

    constructor(private readonly glossaryFacade: GlossaryFacade) {}

    public ngOnInit(): void {
        this.glossaryFacade.initData();
        this.initSubscriptions();
    }

	public onSubmitAddEdit(term: Partial<GlossaryTerm>): void {
		switch(this.editMode) {
			case EditMode.Add:
				this.onAddTerm(term);
				break;

			case EditMode.Edit:
				this.onUpdateTerm(term as GlossaryTerm);
				break;
		}

		this.editMode = EditMode.Add
	}

    public onAddTerm(term: Partial<GlossaryTerm>): void {
        this.glossaryFacade.addTerm(term);
    }

    public onUpdateTerm(term: GlossaryTerm): void {
        this.glossaryFacade.updateTerm(term);
    }

	public onEditClicked(term: GlossaryTerm): void {
		this.termToEdit = term
		this.editMode = EditMode.Edit
	}

    public onDeleteClicked(term: GlossaryTerm): void {
        this.glossaryFacade.deleteTerm(term);
		
		// Switch to add mode to prevent editing the deleted term
		this.editMode = EditMode.Add
    }

    private initSubscriptions(): void {
        this.terms$ = this.glossaryFacade.getAllTerms()
			.pipe(
				// Alphabetical sort by term
				map(terms => [...terms].sort((a, b) => a.term.localeCompare(b.term)))
			);
        this.isLoading$ = this.glossaryFacade.getIsLoading();
    }
}
