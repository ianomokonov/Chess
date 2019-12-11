export interface Cell{
    x: number;
    y: number;
}

export class Figure{
    x?: number;
    y?: number;
    img: string;
    alive: boolean = true;
    type: FigureType;
}

export enum FigureType{
    /** пешка */
    Pawn = 'pawn',
    /** ладья */
    Rook = 'rook', // ладья
    /** конь */
    Knight = 'knight', // конь
    /** ферзь */
    Bishop = 'bishop', // ферзь
    /** королева */
    Queen = 'queen',
    /** король */
    King = 'king'
}

export enum StepType{
    Diagonal,
    Strait
}