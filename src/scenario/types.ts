

/* eslint-disable @typescript-eslint/ban-ts-comment */
import { SaluteRequestVariable } from '@salutejs/scenario';
type SaluteCommand = {
    type: string;
    payload?: Record<string, unknown> | Array<unknown>;
};

export interface AddPillCommand extends SaluteCommand {
    type: 'add_note';
    payload: {
        note: string;
    };
}



export interface Note {
    id: string;
    title: string;
    completed: boolean;
}

export interface SetInitialNotesCommand extends SaluteCommand {
    type: 'set_initial_notes';
    payload: Note[];
}

export interface NoteVariable extends SaluteRequestVariable {
    note: string;
}

export type InputActionType = AddPillCommand | SetInitialNotesCommand;

