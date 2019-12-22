<?php
require 'repository.php';

function produce($data){

    $ctxt = new DataBase();

    if($data != null)
    {
        switch ($data->key) {
            case 'get-game':
                return json_encode($ctxt->getGame($data->Id));
                
            case 'get-step':
                return json_encode($ctxt->getStep($data->Id));
                
            case 'add-step':
                $b = $data['Value'];
                // return json_encode($ctxt->addStep($data['Login'], $data['Password'], $b));
                return json_encode($ctxt->addStep($b));
                
            case 'add-game':
                $b = $data['Value'];
                // return json_encode($ctxt->createGame($data['Login'], $data['Password'], $b));
                return json_encode($ctxt->addGame($b));
                
            case 'join-game':
                $b = $data['Value'];
                return json_encode($ctxt->addPlayer($b));
                
            case 'add-card':
                $b = $data['Value'];
                // return json_encode($ctxt->addCard($data['Login'], $data['Password'], $b));
                return json_encode($ctxt->addCard($b));
                
            case 'add-cells':
                $b = $data['Value'];
                // return json_encode($ctxt->addCardCells($data['Login'], $data['Password'], $b));
                return json_encode($ctxt->addCardCells($b));
                
            case 'get-card':
                return json_encode($ctxt->getCard($data->Id));
                
            default:
                return json_encode($data);
        }
    }
    else
    {  
        return json_encode($data);
    }
}

?>