import {body}  from 'express-validator';
export const registerValidation =[
    body('name').notEmpty(), 
    body('surname').notEmpty(),
    body('birthday').notEmpty()
];

export const addPill =[
    body('name').notEmpty(), 
    body('doza').notEmpty(),
    body('period_days').notEmpty(), 
    body('start_date').notEmpty()
];