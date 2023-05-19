
type SaluteCommand = {
    type: string;
    payload?: Record<string, unknown> | Array<unknown>;
};

export interface Note {
    id: string;
    title: string;
    completed: boolean;
}

export interface SetInitialNotesCommand extends SaluteCommand {
    type: 'set_initial_notes';
    payload: Note[];
}