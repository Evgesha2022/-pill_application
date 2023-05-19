

import { createMatchers,createUserScenario,  NLPRequest,NLPResponse,  SaluteHandler,createSaluteResponse,createSaluteRequest , SaluteRequest, Surface, Device, createScenarioWalker, createSystemScenario } from '@salutejs/scenario';
import { SaluteMemoryStorage } from '@salutejs/storage-adapter-memory';
import {
    noMatchHandler, runAppHandler} from './handlers';

const storage = new SaluteMemoryStorage();
const { action, regexp, text } = createMatchers<SaluteRequest>();
const userScenario = createUserScenario({})

const scenarioWalker = createScenarioWalker({
        systemScenario: createSystemScenario({
            //Сообщение о запуске смартапа
            //RUN_APP: runAppHandler,
            NO_MATCH: noMatchHandler
        })
    });


export const handleNlpRequest = async (request: NLPRequest): Promise<NLPResponse> => {
    const req = createSaluteRequest(request);
    const res = createSaluteResponse(request);

    const sessionId = request.uuid.userId;
    const session = await storage.resolve(sessionId);

    await scenarioWalker({ req, res, session });
    await storage.save({ id: sessionId, session });

    return res.message;
};