import { Figure, FigureType, StepType, FigureColor } from '../models';



export class FiguresSetting{
    public static white: Figure[] = [
        {
          x: 0,
          y: 0,
          Img: '../../assets/figures/bR.png',
          alive: true,
          Type: FigureType.Rook,
          Color: FigureColor.Black
        },
        {
          x: 7,
          y: 0,
          Img: '../../assets/figures/bR.png',
          alive: true,
          Type: FigureType.Rook,
          Color: FigureColor.Black
        },
        {
          x: 1,
          y: 0,
          Img: '../../assets/figures/bN.png',
          alive: true,
          Type: FigureType.Knight,
          Color: FigureColor.Black
        },
        {
          id: 2,
          x: 6,
          y: 0,
          Img: '../../assets/figures/bN.png',
          alive: true,
          Type: FigureType.Knight,
          Color: FigureColor.Black
        },
        {
          x: 2,
          y: 0,
          Img: '../../assets/figures/bB.png',
          alive: true,
          Type: FigureType.Bishop,
          Color: FigureColor.Black
        },
        {
          x: 5,
          y: 0,
          Img: '../../assets/figures/bB.png',
          alive: true,
          Type: FigureType.Bishop,
          Color: FigureColor.Black
        },
        {
          x: 4,
          y: 0,
          Img: '../../assets/figures/bK.png',
          alive: true,
          Type: FigureType.King,
          Color: FigureColor.Black
        },
        {
          x: 3,
          y: 0,
          Img: '../../assets/figures/bQ.png',
          alive: true,
          Type: FigureType.Queen,
          Color: FigureColor.Black
        },
        {
          x: 0,
          y: 7,
          Img: '../../assets/figures/wR.png',
          alive: true,
          Type: FigureType.Rook,
          Color: FigureColor.White
        },
        {
          x: 7,
          y: 7,
          Img: '../../assets/figures/wR.png',
          alive: true,
          Type: FigureType.Rook,
          Color: FigureColor.White
        },
        {
          x: 1,
          y: 7,
          Img: '../../assets/figures/wN.png',
          alive: true,
          Type: FigureType.Knight,
          Color: FigureColor.White
        },
        {
          x: 6,
          y: 7,
          Img: '../../assets/figures/wN.png',
          alive: true,
          Type: FigureType.Knight,
          Color: FigureColor.White
        },
        {
          x: 2,
          y: 7,
          Img: '../../assets/figures/wB.png',
          alive: true,
          Type: FigureType.Bishop,
          Color: FigureColor.White
        },
        {
          x: 5,
          y: 7,
          Img: '../../assets/figures/wB.png',
          alive: true,
          Type: FigureType.Bishop,
          Color: FigureColor.White
        },
        {
          x: 4,
          y: 7,
          Img: '../../assets/figures/wK.png',
          alive: true,
          Type: FigureType.King,
          Color: FigureColor.White
        },
        {
          x: 3,
          y: 7,
          Img: '../../assets/figures/wQ.png',
          alive: true,
          Type: FigureType.Queen,
          Color: FigureColor.White
        },
        {
          id: 1,
          x: 0,
          y: 1,
          Img: '../../assets/figures/bP.png',
          alive: true,
          Type: FigureType.Pawn,
          Color: FigureColor.Black
        },
        {
          x: 1,
          y: 1,
          Img: '../../assets/figures/bP.png',
          alive: true,
          Type: FigureType.Pawn,
          Color: FigureColor.Black
        },
        {
          x: 2,
          y: 1,
          Img: '../../assets/figures/bP.png',
          alive: true,
          Type: FigureType.Pawn,
          Color: FigureColor.Black
        },
        {
          x: 3,
          y: 1,
          Img: '../../assets/figures/bP.png',
          alive: true,
          Type: FigureType.Pawn,
          Color: FigureColor.Black
        },
        {
          x: 4,
          y: 1,
          Img: '../../assets/figures/bP.png',
          alive: true,
          Type: FigureType.Pawn,
          Color: FigureColor.Black
        },
        {
          x: 5,
          y: 1,
          Img: '../../assets/figures/bP.png',
          alive: true,
          Type: FigureType.Pawn,
          Color: FigureColor.Black
        },
        {
          x: 6,
          y: 1,
          Img: '../../assets/figures/bP.png',
          alive: true,
          Type: FigureType.Pawn,
          Color: FigureColor.Black
        },
        {
          x: 7,
          y: 1,
          Img: '../../assets/figures/bP.png',
          alive: true,
          Type: FigureType.Pawn,
          Color: FigureColor.Black
        },
        {
          x: 0,
          y: 6,
          Img: '../../assets/figures/wP.png',
          alive: true,
          Type: FigureType.Pawn,
          reverse: true,
          Color: FigureColor.White
        },
        {
          x: 1,
          y: 6,
          Img: '../../assets/figures/wP.png',
          alive: true,
          Type: FigureType.Pawn,
          reverse: true,
          Color: FigureColor.White
        },
        {
          x: 2,
          y: 6,
          Img: '../../assets/figures/wP.png',
          alive: true,
          Type: FigureType.Pawn,
          reverse: true,
          Color: FigureColor.White
        },
        {
          x: 3,
          y: 6,
          Img: '../../assets/figures/wP.png',
          alive: true,
          Type: FigureType.Pawn,
          reverse: true,
          Color: FigureColor.White
        },
        {
          x: 4,
          y: 6,
          Img: '../../assets/figures/wP.png',
          alive: true,
          Type: FigureType.Pawn,
          reverse: true,
          Color: FigureColor.White
        },
        {
          x: 5,
          y: 6,
          Img: '../../assets/figures/wP.png',
          alive: true,
          Type: FigureType.Pawn,
          reverse: true,
          Color: FigureColor.White
        },
        {
          x: 6,
          y: 6,
          Img: '../../assets/figures/wP.png',
          alive: true,
          Type: FigureType.Pawn,
          reverse: true,
          Color: FigureColor.White
        },
        {
          x: 7,
          y: 6,
          Img: '../../assets/figures/wP.png',
          alive: true,
          Type: FigureType.Pawn,
          reverse: true,
          Color: FigureColor.White
        }
        
    ];

    public static rules = [
      {
        Type: FigureType.Pawn,
        steps: [
          {
            y: 1
          },
          {
            y: 2,
            if_y: [1,6]
          }
        ],
        kill: [
          {
            x: 1,
            y: 1
          },
          {
            x: -1,
            y: 1
          }
        ]
      },
      {
        Type: FigureType.Knight,
        steps: [
          {
            y: 2,
            x: 1
          },
          {
            y: 2,
            x: -1
          },
          {
            y: 1,
            x: 2
          },
          {
            y: -1,
            x: 2
          },
          {
            y: -1,
            x: -2
          },
          {
            y: 1,
            x: -2
          },
          {
            y: -2,
            x: -1
          },
          {
            y: -2,
            x: 1
          }
        ]
        
      },
      {
        Type: FigureType.Bishop,
        types: [StepType.Diagonal]
        
      },
      {
        Type: FigureType.Queen,
        types: [StepType.Diagonal, StepType.Strait]
        
      },
      {
        Type: FigureType.Rook,
        types: [StepType.Strait]
        
      },
      {
        Type: FigureType.King,
        steps: [
          {
            x: 1,
            y: 0
          },
          {
            x: -1,
            y: 0
          },
          {
            x: 1,
            y: 1
          },
          {
            x: -1,
            y: 1
          },
          {
            x: 0,
            y: 1
          },
          {
            x: 0,
            y: -1
          },
          {
            x: 1,
            y: -1
          },
          {
            x: -1,
            y: -1
          }
        ]
      }
    ]
}