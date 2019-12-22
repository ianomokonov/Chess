<?php
require 'models.php';
class DataBase {
    public $db;
    public function __construct()
    {
        $this->db = new PDO('mysql:host=localhost;dbname=games; charset=UTF8','root','');
        $this->db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_WARNING);
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
        $res = $this->genInsertQuery($game,"games");
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

    public function getGame($id){
        return array("game" => $game, "Figures" => $this->getFigures());
        $sth = $this->db->prepare("SELECT * FROM games WHERE Id=?");
        $sth->execute(array($id));
        $sth->setFetchMode(PDO::FETCH_CLASS, 'Game');
        $game = $sth->fetch();
        $game->Figures = $this->getFigures();
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

    public function addCard($card){
        $res = $this->genInsertQuery($card,"bingocards");
        $s = $this->db->prepare($res[0]);
        if($res[1][0]!=null){
            $s->execute($res[1]);
        }
        return $this->db->lastInsertId();
    }

    public function addCardCells($card){
        $res = $this->genInsertQuery($card,"bingocardcells");
        $s = $this->db->prepare($res[0]);
        if($res[1][0]!=null){
            $s->execute($res[1]);
        }
        return $this->db->lastInsertId();
    }

    public function getCard($cardId){
        $sth = $this->db->prepare("SELECT * FROM bingocardcells WHERE CardId=?");
        $sth->execute(array($cardId));
        $sth->setFetchMode(PDO::FETCH_CLASS, 'Bingo');
        return $sth->fetch();
    }
}
?>