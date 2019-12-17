import { Figure, FigureType, StepType, FigureColor } from '../models';



export class FiguresSetting{
    public static white: Figure[] = [
        {
          x: 0,
          y: 0,
          img: '../../assets/figures/bR.png',
          alive: true,
          type: FigureType.Rook,
          color: FigureColor.Black
        },
        {
          x: 7,
          y: 0,
          img: '../../assets/figures/bR.png',
          alive: true,
          type: FigureType.Rook,
          color: FigureColor.Black
        },
        {
          x: 1,
          y: 0,
          img: '../../assets/figures/bN.png',
          alive: true,
          type: FigureType.Knight,
          color: FigureColor.Black
        },
        {
          x: 6,
          y: 0,
          img: '../../assets/figures/bN.png',
          alive: true,
          type: FigureType.Knight,
          color: FigureColor.Black
        },
        {
          x: 2,
          y: 0,
          img: '../../assets/figures/bB.png',
          alive: true,
          type: FigureType.Bishop,
          color: FigureColor.Black
        },
        {
          x: 5,
          y: 0,
          img: '../../assets/figures/bB.png',
          alive: true,
          type: FigureType.Bishop,
          color: FigureColor.Black
        },
        {
          x: 4,
          y: 0,
          img: '../../assets/figures/bK.png',
          alive: true,
          type: FigureType.King,
          color: FigureColor.Black
        },
        {
          x: 3,
          y: 0,
          img: '../../assets/figures/bQ.png',
          alive: true,
          type: FigureType.Queen,
          color: FigureColor.Black
        },
        {
          x: 0,
          y: 7,
          img: '../../assets/figures/wR.png',
          alive: true,
          type: FigureType.Rook,
          color: FigureColor.White
        },
        {
          x: 7,
          y: 7,
          img: '../../assets/figures/wR.png',
          alive: true,
          type: FigureType.Rook,
          color: FigureColor.White
        },
        {
          x: 1,
          y: 7,
          img: '../../assets/figures/wN.png',
          alive: true,
          type: FigureType.Knight,
          color: FigureColor.White
        },
        {
          x: 6,
          y: 7,
          img: '../../assets/figures/wN.png',
          alive: true,
          type: FigureType.Knight,
          color: FigureColor.White
        },
        {
          x: 2,
          y: 7,
          img: '../../assets/figures/wB.png',
          alive: true,
          type: FigureType.Bishop,
          color: FigureColor.White
        },
        {
          x: 5,
          y: 7,
          img: '../../assets/figures/wB.png',
          alive: true,
          type: FigureType.Bishop,
          color: FigureColor.White
        },
        {
          x: 4,
          y: 7,
          img: '../../assets/figures/wK.png',
          alive: true,
          type: FigureType.King,
          color: FigureColor.White
        },
        {
          x: 3,
          y: 7,
          img: '../../assets/figures/wQ.png',
          alive: true,
          type: FigureType.Queen,
          color: FigureColor.White
        },
        {
          id: 1,
          x: 0,
          y: 1,
          img: '../../assets/figures/bP.png',
          alive: true,
          type: FigureType.Pawn,
          color: FigureColor.Black
        },
        {
          x: 1,
          y: 1,
          img: '../../assets/figures/bP.png',
          alive: true,
          type: FigureType.Pawn,
          color: FigureColor.Black
        },
        {
          x: 2,
          y: 1,
          img: '../../assets/figures/bP.png',
          alive: true,
          type: FigureType.Pawn,
          color: FigureColor.Black
        },
        {
          x: 3,
          y: 1,
          img: '../../assets/figures/bP.png',
          alive: true,
          type: FigureType.Pawn,
          color: FigureColor.Black
        },
        {
          x: 4,
          y: 1,
          img: '../../assets/figures/bP.png',
          alive: true,
          type: FigureType.Pawn,
          color: FigureColor.Black
        },
        {
          x: 5,
          y: 1,
          img: '../../assets/figures/bP.png',
          alive: true,
          type: FigureType.Pawn,
          color: FigureColor.Black
        },
        {
          x: 6,
          y: 1,
          img: '../../assets/figures/bP.png',
          alive: true,
          type: FigureType.Pawn,
          color: FigureColor.Black
        },
        {
          x: 7,
          y: 1,
          img: '../../assets/figures/bP.png',
          alive: true,
          type: FigureType.Pawn,
          color: FigureColor.Black
        },
        {
          x: 0,
          y: 6,
          img: '../../assets/figures/wP.png',
          alive: true,
          type: FigureType.Pawn,
          reverse: true,
          color: FigureColor.White
        },
        {
          x: 1,
          y: 6,
          img: '../../assets/figures/wP.png',
          alive: true,
          type: FigureType.Pawn,
          reverse: true,
          color: FigureColor.White
        },
        {
          x: 2,
          y: 6,
          img: '../../assets/figures/wP.png',
          alive: true,
          type: FigureType.Pawn,
          reverse: true,
          color: FigureColor.White
        },
        {
          x: 3,
          y: 6,
          img: '../../assets/figures/wP.png',
          alive: true,
          type: FigureType.Pawn,
          reverse: true,
          color: FigureColor.White
        },
        {
          x: 4,
          y: 6,
          img: '../../assets/figures/wP.png',
          alive: true,
          type: FigureType.Pawn,
          reverse: true,
          color: FigureColor.White
        },
        {
          x: 5,
          y: 6,
          img: '../../assets/figures/wP.png',
          alive: true,
          type: FigureType.Pawn,
          reverse: true,
          color: FigureColor.White
        },
        {
          x: 6,
          y: 6,
          img: '../../assets/figures/wP.png',
          alive: true,
          type: FigureType.Pawn,
          reverse: true,
          color: FigureColor.White
        },
        {
          x: 7,
          y: 6,
          img: '../../assets/figures/wP.png',
          alive: true,
          type: FigureType.Pawn,
          reverse: true,
          color: FigureColor.White
        }
        
    ];

    public static rules = [
      {
        type: FigureType.Pawn,
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
        type: FigureType.Knight,
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
        type: FigureType.Bishop,
        types: [StepType.Diagonal]
        
      },
      {
        type: FigureType.Queen,
        types: [StepType.Diagonal, StepType.Strait]
        
      },
      {
        type: FigureType.Rook,
        types: [StepType.Strait]
        
      },
      {
        type: FigureType.King,
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