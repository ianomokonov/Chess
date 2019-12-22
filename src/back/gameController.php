<?php
require 'repository.php';
header("Access-Control-Allow-Origin: *"); 
header("Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token , Authorization");

$ctxt = new DataBase();
if(isset($_GET['Key']))
{
    
    switch ($_GET['Key']) {
        case 'get-game':
            echo json_encode($ctxt->getGame($_GET['Id']));
            break;
        case 'get-step':
            echo json_encode($ctxt->getStep($_GET['Id']));
            break;
        case 'add-step':
            $b = json_decode(file_get_contents('php://input'), true);
            // echo json_encode($ctxt->addStep($_GET['Login'], $_GET['Password'], $b));
            echo json_encode($ctxt->addStep($b));
            break;
        case 'add-game':
            $b = json_decode(file_get_contents('php://input'), true);
            // echo json_encode($ctxt->createGame($_GET['Login'], $_GET['Password'], $b));
            echo json_encode($ctxt->addGame($b));
            break;
        case 'join-game':
            $b = json_decode(file_get_contents('php://input'), true);
            echo json_encode($ctxt->addPlayer($b));
            break;
        case 'add-card':
            $b = json_decode(file_get_contents('php://input'), true);
            // echo json_encode($ctxt->addCard($_GET['Login'], $_GET['Password'], $b));
            echo json_encode($ctxt->addCard($b));
            break;
        case 'add-cells':
            $b = json_decode(file_get_contents('php://input'), true);
            // echo json_encode($ctxt->addCardCells($_GET['Login'], $_GET['Password'], $b));
            echo json_encode($ctxt->addCardCells($b));
            break;
        case 'get-card':
            echo json_encode($ctxt->getCard($_GET['Id']));
            break;
        default:
            echo "Введенный ключ несуществует";
    }
}
else
{  
    echo "Введенные данные некорректны";
}
?>