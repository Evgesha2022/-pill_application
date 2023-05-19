
import { createMatchers, SaluteHandler, SaluteRequest, Surface, Device } from '@salutejs/scenario';
//import { AddNoteCommand, DeleteNoteCommand, DoneNoteCommand, NoteVariable, SetInitialNotesCommand } from './types';
import { data } from './data';

import {  SetInitialNotesCommand } from './types';




export const noMatchHandler: SaluteHandler = ({ res }) => {
    res.setPronounceText('Я не понимаю');
    res.appendBubble('Я не понимаю');
};

export const runAppHandler: SaluteHandler = ({ res }) => {
    res.appendSuggestions(['Запиши купить молоко', 'Добавь запись помыть машину']);
    res.setPronounceText('начнем');
    res.appendBubble('Начнем');

    res.appendCommand<SetInitialNotesCommand>({
        type: 'set_initial_notes',
        payload: data.notes,
    });

    
};