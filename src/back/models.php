<?php
class Game{
    public $Id;
    public $Type;
    public $FirstPlayerId;
    public $SecondPlayerId;

    public $Figures;
}

class Step{
    public $Id;
    public $GameId;
    public $PlayerId;
    public $x;
    public $y;
    public $FigureId;
    public $Number;
}

class Figure{
    public $Id;
    public $x;
    public $y;
    public $Type;
    public $Color;
    public $Img;
}

class Bingo{
    public $CardId;
    public $Position;
    public $Value;
    public $Closed;
}

class Card{
    public $Id;
    public $GameId;
}
 class User{
     public $Id;
     public $Name;
     public $Login;
     public $Password;
 }
?>