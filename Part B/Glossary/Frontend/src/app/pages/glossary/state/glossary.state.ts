import { GlossaryTerm } from "../../../core/models/glossary-term";

export interface GlossaryState {
    terms: GlossaryTerm[],
    isLoading: boolean
}

