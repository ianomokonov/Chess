
CREATE TABLE IF NOT EXISTS users (
    Id int(10) PRIMARY KEY AUTO_INCREMENT,
    Name varchar(255) NOT NULL,
    Login varchar(255) NOT NULL,
    Password varchar(255) NOT NULL
);
CREATE TABLE IF NOT EXISTS games (
    Id int(10) PRIMARY KEY AUTO_INCREMENT,
    Type varchar(255) NOT NULL,
    FirstPlayerId int(10) NOT NULL,
    SecondPlayerId int(10) NOT NULL,
    CONSTRAINT g1_fk FOREIGN KEY(FirstPlayerId) REFERENCES users(Id) ON DELETE CASCADE,
    CONSTRAINT g2_fk FOREIGN KEY(SecondPlayerId) REFERENCES users(Id) ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS figures (
    Id int(10) PRIMARY KEY AUTO_INCREMENT,
    Type varchar(255) NOT NULL,
    Color varchar(255),
    Img varchar(255) NOT NULL
);
CREATE TABLE IF NOT EXISTS steps (
    Id int(10) PRIMARY KEY AUTO_INCREMENT,
    GameId int(10) NOT NULL,
    PlayerId int(10) NOT NULL,
    x int(10) NOT NULL,
    y int(10) NOT NULL,
    FigureId int(10),
    Number int(10),
    CONSTRAINT sg_fk FOREIGN KEY(GameId) REFERENCES games(Id) ON DELETE CASCADE,
    CONSTRAINT sp_fk FOREIGN KEY(PlayerId) REFERENCES users(Id) ON DELETE CASCADE
);

ALTER TABLE figures ADD COLUMN x int(10);
ALTER TABLE figures ADD COLUMN y int(10);
                          

INSERT INTO figures (Type, Color, Img, x, y) 

VALUES

('rook', 'black', '../../assets/figures/bR.png',0,0),
('rook', 'black', '../../assets/figures/bR.png',7,0),
('knight', 'black', '../../assets/figures/bN.png',1,0),
('knight', 'black', '../../assets/figures/bN.png',6,0),
('bishop', 'black', '../../assets/figures/bB.png',2,0),
('bishop', 'black', '../../assets/figures/bB.png',5,0),
('king', 'black', '../../assets/figures/bK.png',4,0),
('queen', 'black', '../../assets/figures/bQ.png',3,0),

('rook', 'white', '../../assets/figures/wR.png',0,7),
('rook', 'white', '../../assets/figures/wR.png',7,7),
('knight', 'white', '../../assets/figures/wN.png',1,7),
('knight', 'white', '../../assets/figures/wN.png',6,7),
('bishop', 'white', '../../assets/figures/wB.png',2,7),
('bishop', 'white', '../../assets/figures/wB.png',5,7),
('king', 'white', '../../assets/figures/wK.png',4,7),
('queen', 'white', '../../assets/figures/wQ.png',3,7),

('pawn', 'black', '../../assets/figures/bP.png',0,1),
('pawn', 'black', '../../assets/figures/bP.png',1,1),
('pawn', 'black', '../../assets/figures/bP.png',2,1),
('pawn', 'black', '../../assets/figures/bP.png',3,1),
('pawn', 'black', '../../assets/figures/bP.png',4,1),
('pawn', 'black', '../../assets/figures/bP.png',5,1),
('pawn', 'black', '../../assets/figures/bP.png',6,1),
('pawn', 'black', '../../assets/figures/bP.png',7,1),

('pawn', 'white', '../../assets/figures/wP.png',0,6),
('pawn', 'white', '../../assets/figures/wP.png',1,6),
('pawn', 'white', '../../assets/figures/wP.png',2,6),
('pawn', 'white', '../../assets/figures/wP.png',3,6),
('pawn', 'white', '../../assets/figures/wP.png',4,6),
('pawn', 'white', '../../assets/figures/wP.png',5,6),
('pawn', 'white', '../../assets/figures/wP.png',6,6),
('pawn', 'white', '../../assets/figures/wP.png',7,6);

CREATE TABLE IF NOT EXISTS bingocards ( 
    Id int(10) PRIMARY KEY AUTO_INCREMENT, 
    GameId int(10) NOT NULL,
    PlayerId int(10) NOT NULL,
    
    CONSTRAINT bp_fk FOREIGN KEY(PlayerId) REFERENCES users(Id) ON DELETE CASCADE,
    CONSTRAINT b_fk FOREIGN KEY(GameId) REFERENCES games(Id) ON DELETE CASCADE 
); 
CREATE TABLE IF NOT EXISTS bingocardcells ( 
    CardId int(10), 
    Position int(10) NOT NULL, 
    Value int(10), 
    Closed bit(1) DEFAULT b'0', 
    CONSTRAINT pk_bc PRIMARY KEY(CardId, Position),
    CONSTRAINT dc_fk FOREIGN KEY(CardId) REFERENCES bingocards(Id) ON DELETE CASCADE
);
