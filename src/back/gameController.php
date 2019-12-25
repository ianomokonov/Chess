<?php
require 'repository.php';

function produce($data){

    $ctxt = new DataBase();

    if($data != null)
    {
        switch ($data->key) {
            case 'get-game':
                return json_encode($ctxt->getGame($data->id));
                
            case 'enter-game':
                $b = $data->value;
                return json_encode($ctxt->enterGame($b));

            case 'get-step':
                return json_encode($ctxt->getStep($data->Id));
                
            case 'step':
                $b = $data->value;
                // return json_encode($ctxt->addStep($data['Login'], $data['Password'], $b));
                return json_encode($ctxt->addStep($b));
                
            case 'add-game':
                $b = $data->value;
                return json_encode($ctxt->addGame($b));
                
            case 'join-game':
                $b = $data->value;
                return json_encode($ctxt->addPlayer($b));
                
            case 'add-card':
                $b = $data->value;
                // return json_encode($ctxt->addCard($data['Login'], $data['Password'], $b));
                return json_encode($ctxt->addCards($b));
                
            case 'add-cells':
                $b = $data->value;
                // return json_encode($ctxt->addCardCells($data['Login'], $data['Password'], $b));
                return json_encode($ctxt->addCardCells($b));
                
            case 'get-card':
                return json_encode($ctxt->getCard($data->Id));
                
            case 'add-user':
                $b = $data->value;
                return json_encode($ctxt->addUser($b));

            case 'log-in':
                $b = $data->value;
                return json_encode($ctxt->logIn($b));
                
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