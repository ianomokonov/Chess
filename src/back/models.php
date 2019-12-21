<?php
class Game{
    public $Id;
    public $Type;
    public $FirstPlayerId;
    public $SecondPlayerId;
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
?>