
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

ALTER TABLE figures ADD COLUMN x0 int(10);
ALTER TABLE figures ADD COLUMN y0 int(10);
                          

INSERT INTO figures (Type, Color, Img, x0, y0) 

VALUES

('Rook', 'Black', '../../assets/figures/bR.png',0,0),
('Rook', 'Black', '../../assets/figures/bR.png',7,0),
('Knight', 'Black', '../../assets/figures/bN.png',1,0),
('Knight', 'Black', '../../assets/figures/bN.png',6,0),
('Bishop', 'Black', '../../assets/figures/bB.png',2,0),
('Bishop', 'Black', '../../assets/figures/bB.png',5,0),
('King', 'Black', '../../assets/figures/bK.png',4,0),
('Queen', 'Black', '../../assets/figures/bQ.png',3,0),

('Rook', 'White', '../../assets/figures/wR.png',0,7),
('Rook', 'White', '../../assets/figures/wR.png',7,7),
('Knight', 'White', '../../assets/figures/wN.png',1,7),
('Knight', 'White', '../../assets/figures/wN.png',6,7),
('Bishop', 'White', '../../assets/figures/wB.png',2,7),
('Bishop', 'White', '../../assets/figures/wB.png',5,7),
('King', 'White', '../../assets/figures/wK.png',4,7),
('Queen', 'White', '../../assets/figures/wQ.png',3,7),

('Pawn', 'Black', '../../assets/figures/bP.png',0,1),
('Pawn', 'Black', '../../assets/figures/bP.png',1,1),
('Pawn', 'Black', '../../assets/figures/bP.png',2,1),
('Pawn', 'Black', '../../assets/figures/bP.png',3,1),
('Pawn', 'Black', '../../assets/figures/bP.png',4,1),
('Pawn', 'Black', '../../assets/figures/bP.png',5,1),
('Pawn', 'Black', '../../assets/figures/bP.png',6,1),
('Pawn', 'Black', '../../assets/figures/bP.png',7,1),

('Pawn', 'White', '../../assets/figures/wP.png',0,6),
('Pawn', 'White', '../../assets/figures/wP.png',1,6),
('Pawn', 'White', '../../assets/figures/wP.png',2,6),
('Pawn', 'White', '../../assets/figures/wP.png',3,6),
('Pawn', 'White', '../../assets/figures/wP.png',4,6),
('Pawn', 'White', '../../assets/figures/wP.png',5,6),
('Pawn', 'White', '../../assets/figures/wP.png',6,6),
('Pawn', 'White', '../../assets/figures/wP.png',7,6)

CREATE TABLE IF NOT EXISTS bingocards (
    Id int(10) PRIMARY KEY AUTO_INCREMENT,
    GameId int(10) NOT NULL,
    CONSTRAINT b_fk FOREIGN KEY(GameId) REFERENCES games(Id) ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS bingocardcells (
    CardId int(10) PRIMARY KEY AUTO_INCREMENT,
    Inex int(10) NOT NULL,
    Value int(10),
    Closed bit(1),
    CONSTRAINT dc_fk FOREIGN KEY(CardId) REFERENCES bingocards(Id) ON DELETE CASCADE);
