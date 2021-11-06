import { Snack } from "../models/snack";
import { StateTransition } from "../models/stateTransition";

export const listStateTransition: StateTransition[] = [
    {"name": "stateOne", "value": 500},
    {"name": "stateTwo", "value": 1000},
    {"name": "stateThree", "value": 2000},
    {"name": "stateFour", "value": 5000}
];

export const defaultSnackData: Snack[] = [
    {id: 'cXeDFGNFId1m3B4', name: 'Pinchos charcuteros', value: 1000},
    {id: 'LmLI64iVDbyXOPl', name: 'Picada de Chorizos', value: 2000},
    {id: 'Yj5XmikTYqf0zng', name: 'Sandwich', value: 3000},
    {id: 'nN2XoIwT4IPcTPx', name: 'Sandwich de Jamón', value: 4000}
];