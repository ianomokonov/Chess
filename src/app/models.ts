export interface Cell{
    x: number;
    y: number;
}

export class Figure{
    id?: number;
    x?: number;
    y?: number;
    Img: string;
    alive: boolean = true;
    Type: FigureType;
    reverse?: boolean;
    Color: FigureColor;
    active?: boolean;
}

export enum FigureType{
    /** пешка */
    Pawn = 'pawn',
    /** ладья */
    Rook = 'rook', // ладья
    /** конь */
    Knight = 'knight', // конь
    /** принц */
    Bishop = 'bishop', // ферзь
    /** ферзь */
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