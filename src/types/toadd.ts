
import { InputActionType } from '../scenario/types';
import { SaluteCommand } from '@salutejs/scenario';
import { createAssistant, createSmartappDebugger } from '@salutejs/client';
export type Action = {
    type: string;
    payload: Record<string, unknown> | unknown[];
};

export interface AddPillCommand extends SaluteCommand {
    type: 'add_note';
    payload: {
        note: string;
    };
}

export type OutputActionType = AddPillCommand ;

export type Assistant = (ReturnType<typeof createAssistant> | ReturnType<typeof createSmartappDebugger>) & {
    sendActionPromisified?: (actionToSend: OutputActionType) => Promise<InputActionType['payload']>;
};