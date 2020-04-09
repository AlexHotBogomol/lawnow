<?php
header("Access-Control-Allow-Origin: *");
$rest_json = file_get_contents("php://input");
$_POST = json_decode($rest_json, true);

if (count($_POST['Unfalldaten'])){
    $data = $_POST['Unfalldaten'];
    $Rechtsschutzversicherer = $data['Rechtsschutzversicherer'];
    $Versicherungsscheinnummer = $data['Versicherungsscheinnummer'];
    $Schadennummer = $data['Schadennummer'];
    $Geschlecht = $data['Geschlecht'];
    $Vorname = $data['Vorname'];
    $Nachname = $data['Nachname'];
    $Strasse = $data['Strasse'];
    $Stadt = $data['Stadt'];
    $Telefon = $data['Telefon'];
    $Email = $data['Email']; 
    $PLZ = $data['PLZ'];
    $Kennzeichen_Geg = $data['Kennzeichen_Geg'];
    $Herkunftsland = $data['Herkunftsland']; 
    $Versicherung = $data['Versicherung'];
    $Versicherer = $data['Versicherer'];
    $Nr = $data['Nr'];
    $Unfalldatum = $data['Unfalldatum'];
    $Unfallort = $data['Unfallort'];
    $Sonstiges = $data['Sonstiges'];
    $Unfallart = $data['Unfallart'];


    $subject = "Lawnow";
    // $to = "anselm.appel@42dbs.de";
    // $to = "Zakablukov777@gmail.com";
    $to= "mandat@lawnow.de, anselm.appel@42dbs.de, fifih.i@42dbs.de, Zakablukov777@gmail.com";
    // $to = "evseenko.stp@gmail.com";
    
    $from = $Email;

    // data

    $msg = "<h1>Unfalldaten</h1>";
    $msg .= "<p>Rechtsschutzversicherer: " . $Rechtsschutzversicherer . "</p>";
    $msg .= "<p>Versicherungsscheinnummer: " . $Versicherungsscheinnummer . "</p>";
    $msg .= "<p>Schadennummer: " . $Schadennummer . "</p>";
    $msg .= "<p>Geschlecht: " . $Geschlecht . "</p>";
    $msg .= "<p>Vorname: " . $Vorname . "</p>";
    $msg .= "<p>Nachname: " . $Nachname . "</p>";
    $msg .= "<p>Telefon: " . $Telefon . "</p>";
    $msg .= "<p>Email: " . $Email . "</p>";
    $msg .= "<p>Strasse: " . $Strasse . "</p>";
    $msg .= "<p>PLZ: " . $PLZ . "</p>";
    $msg .= "<p>Stadt: " . $Stadt . "</p>";
    $msg .= "<p>Kennzeichen_Geg: " . $Kennzeichen_Geg . "</p>";
    $msg .= "<p>Herkunftsland: " . $Herkunftsland . "</p>";
    $msg .= "<p>Versicherung: " . $Versicherung . "</p>";
    $msg .= "<p>Versicherer: " . $Versicherer . "</p>";
    $msg .= "<p>Nr: " . $Nr . "</p>";
    $msg .= "<p>Unfalldatum: " . date("Y-m-d", strtotime($Unfalldatum)) . " 00:00:00</p>";
    $msg .= "<p>Unfallort: " . $Unfallort . "</p>";
    $msg .= "<p>Unfallart: " . $Unfallart . "</p>";
    $msg .= "<p>Sonstiges: " . $Sonstiges . "</p>";
    
    // Headers

    $headers = "MIME-Version: 1.0\r\n";
    $headers.= "Content-type: text/html; charset=UTF-8\r\n";
    $headers.= "From: <" . $from . ">";
    $result = mail($to, $subject, $msg, $headers);

    if ($result) {
        http_response_code(200);
        echo "Thank You! Your message has been sent.";
    } else {
        http_response_code(500);
        echo "Oops! Something went wrong and we couldn't send your message.";
    }
} else {
    http_response_code(403);
    echo "There was a problem with your submission, please try again.";
}

?>