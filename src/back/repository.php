<?php
require 'models.php';
class DataBase {
    public $db;
    private $numbers;
    public function __construct()
    {
        $this->db = new PDO('mysql:host=localhost;dbname=games; charset=UTF8','root','');
        $this->db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_WARNING);
        $this->numbers = [];
        for($i = 0; $i < 9; $i++){
            $row = [];
            for($j = 0; $j < 10; $j++){
            if($i == 0 && $j == 0){
                continue;
            }
            $row[] = $i*10 + $j;

            }
            $this->numbers[] = $row;
        }
        $this->numbers[8][] = 90;
    }

    private function genInsertQuery($ins, $t){
        $res = array('INSERT INTO '.$t.' (',array());
        $q = '';
        for ($i = 0; $i < count(array_keys($ins)); $i++) {
            $res[0] = $res[0].array_keys($ins)[$i].',';
            $res[1][]=$ins[array_keys($ins)[$i]];
            $q=$q.'?,';
        }
        $res[0]=rtrim($res[0],',');
        $res[0]=$res[0].') VALUES ('.rtrim($q,',').');';
        return $res;
    }

    private function genUpdateQuery($keys, $values, $t, $id){
        $res = array('UPDATE '.$t.' SET ',array());
        $q = '';
        for ($i = 0; $i < count($keys); $i++) {
            if($values[$i]!='now()'){
                $res[0] = $res[0].$keys[$i].'=?, ';
                $res[1][]=$values[$i];
            }
            else{
                $res[0] = $res[0].$keys[$i].'=now(), ';
            }
        }
        $res[0]=rtrim($res[0],', ');
        $res[0]=$res[0].' WHERE Id = '.$id;
    }

    public function addGame($game){
        $res = $this->genInsertQuery($game,'games');
        $s = $this->db->prepare($res[0]);
        if($res[1][0]!=null){
            $s->execute($res[1]);
        }
        return $this->db->lastInsertId();
    }

    public function addPlayer($player){
        $res = $this->genInsertQuery($player,"games");
        $s = $this->db->prepare($res[0]);
        if($res[1][0]!=null){
            $s->execute($res[1]);
        }
        return $this->db->lastInsertId();
    }

    private function getFigures(){
        $sth = $this->db->query("SELECT * FROM figures");
        $sth->setFetchMode(PDO::FETCH_CLASS, 'Figure');
        return $sth->fetchAll();
    }

    private function getCards($gameId, $playerId = false){
        if($playerId){
            $sth = $this->db->prepare("SELECT * FROM bingocards WHERE GameId=? AND PlayerId=?");
            $sth->execute(array($gameId, $playerId));
        } else {
            $sth = $this->db->prepare("SELECT * FROM bingocards WHERE GameId=?");
            $sth->execute(array($gameId));
        }
        
        $sth->setFetchMode(PDO::FETCH_CLASS, 'Card');
        $cards = [];
        while($card = $sth->fetch()){
            $card->Cells = $this->getCard($card->Id);
            $cards[] = $card;
        }
        return $cards;
    }

    public function getGame($id){
        $sth = $this->db->prepare("SELECT * FROM games WHERE Id=?");
        $sth->execute(array($id));
        $sth->setFetchMode(PDO::FETCH_CLASS, 'Game');
        $game = $sth->fetch();
        if($game->Type == 'bingo'){
            $game->Cards = $this->getCards($id);
        } else {
            $game->Figures = $this->getFigures();
        }
        
        return $game;
    }
    
    public function addStep($step){
        $res = $this->genInsertQuery($step,"steps");
        $s = $this->db->prepare($res[0]);
        if($res[1][0]!=null){
            $s->execute($res[1]);
        }
        return $this->db->lastInsertId();
    }

    public function getStep($id){
        $sth = $this->db->prepare("SELECT * FROM steps WHERE Id=?");
        $sth->execute(array($id));
        $sth->setFetchMode(PDO::FETCH_CLASS, 'Step');
        return $sth->fetch();
    }

    public function addCards($card){
        if(count($this->getCards($card->GameId, $card->PlayerId)) < 1){
            for( $i = 0; $i < 2; $i++){
                $cells = $this->genCard($this->numbers);
                $res = $this->genInsertQuery((array)$card,"bingocards");
                $s = $this->db->prepare($res[0]);
                if($res[1][0]!=null){
                    $s->execute($res[1]);
                }
                $id = $this->db->lastInsertId();
                $this->addCardCells($cells, $id);
            }
        }
        
        
        return $this->getGame($card->GameId);
    }

    private function addCardCells($cardCells, $cardId){
        foreach($cardCells as $cell){
            $cell = (array)$cell;
            $cell['CardId'] = $cardId;
            $res = $this->genInsertQuery((array)$cell,"bingocardcells");
            $s = $this->db->prepare($res[0]);
            if($res[1][0]!=null){
                $s->execute($res[1]);
            }
        }
    }

    public function getCard($cardId){
        $sth = $this->db->prepare("SELECT * FROM bingocardcells WHERE CardId=?");
        $sth->execute(array($cardId));
        $sth->setFetchMode(PDO::FETCH_CLASS, 'Bingo');
        return $sth->fetchAll();
    }

    private function genCard($numbers) {
        $nums = json_decode(json_encode($numbers));
        $cells = [];
        for($j = 0; $j<27; $j+=3){
          $number = $j/3;
          $index = $this->randomInteger(0, count($nums[$number])-1);
          $cells[] = array("Position" => $j+1, "Value" => $nums[$number][$index]);
          unset($nums[$number][$index]);
          $index = $this->randomInteger(0, count($nums[$number])-1);
          $cells[] = array("Position" => $j+2, "Value" => $nums[$number][$index]);
          unset($nums[$number][$index]);
          $index = !$cells[$j] && !$cells[$j+1] ? 
          $this->randomInteger(0, count($nums[$number])-1, false) : $this->randomInteger(0, count($nums[$number]), false);
            $cells[] = array("Position" => $j+3, "Value" => $nums[$number][$index]);
        unset($nums[$number][$index]);
    
        }
        return $cells ;
    }
    
    private function randomInteger($min, $max, $withEmpty = false) {
    
        $m = $withEmpty ? $max + 10 : $max;
        // получить случайное число от (min-0.5) до (max+0.5)
        $rand = rand($min, $max);
        return $rand > $max ? null : $rand;
    }

    public function addUser($user){
        $res = $this->genInsertQuery((array)$user,'users');
        $s = $this->db->prepare($res[0]);
        if($res[1][0]!=null){
            $s->execute($res[1]);
        }
        return $this->db->lastInsertId();
    }

    public function logIn($user){
        $password = $user->Password;
        $sth = $this->db->prepare("SELECT * FROM users WHERE Login=?");
        $sth->execute(array($user->Login));
        $sth->setFetchMode(PDO::FETCH_CLASS, 'User');
        $res = $sth->fetch();
        if ($res->Password==$password) {
            return $res->Id;
        }
        else {
            return null;
        }
    }

    private function getUserPassword($id){
        $s = $this->db->prepare("SELECT Password FROM users WHERE Id=?");
        $s->execute(array($id));
        return $s->fetch()['Password'];
    }
}
?>