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
    reverse?: boolean;
    color: FigureColor;
    active?: boolean;
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

export enum FigureColor{
    Black = 'black',
    White = 'white'
}