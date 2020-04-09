<?php
	header("Access-Control-Allow-Origin: *");
	$rest_json = file_get_contents("php://input");
	$_POST = json_decode($rest_json, true);
	
	if(count($_POST['Unfalldaten'])
		&& count($_POST['Unfallverursacher'])
		&& count($_POST['Unfallaufnahme'])
		&& count($_POST['Unfallaufnahme'])
		&& count($_POST['Zeugen'])
		&& count($_POST['Fahrzeugschaden'])
		&& count($_POST['Fahrten'])
		&& count($_POST['Abschleppkosten'])
		&& count($_POST['Verletzt'])
		&& count($_POST['Arbeitsunfahigkeit'])
		&& count($_POST['Unfall'])
	) {
		require $_SERVER['DOCUMENT_ROOT'] . '/libs/PHPMailer/src/PHPMailer.php';
		
		$Unfalldaten = $_POST['Unfalldaten'];
		$Unfalldaten_UhrZeit = $Unfalldaten['UhrZeit'];
		$Unfalldaten_StrNr = $Unfalldaten['StrNr'];
		$Unfalldaten_Str = $Unfalldaten['Str'];
		$Unfalldaten_PLZ = $Unfalldaten['PLZ'];
		$Unfalldaten_Stadt = $Unfalldaten['Stadt'];
		
		$Unfallverursacher = $_POST['Unfallverursacher'];
		$Unfallverursacher_Frage = $Unfallverursacher['Frage'];
		$Unfallverursacher_Vorname = $Unfallverursacher['Vorname'];
		$Unfallverursacher_Nachname = $Unfallverursacher['Nachname'];
		$Unfallverursacher_StrNr = $Unfallverursacher['StrNr'];
		$Unfallverursacher_PLZ = $Unfallverursacher['PLZ'];
		$Unfallverursacher_Stadt = $Unfallverursacher['Stadt'];
		
		
		$Unfallaufnahme = $_POST['Unfallaufnahme'];
		$Unfallaufnahme_Frage = $Unfallaufnahme['Frage'];
		$Unfallaufnahme_Behoerde = $Unfallaufnahme['Behoerde'];
		$Unfallaufnahme_Aktenzeichen = $Unfallaufnahme['Aktenzeichen'];
		$Unfallaufnahme_StrNr = $Unfallaufnahme['StrNr'];
		$Unfallaufnahme_PLZ = $Unfallaufnahme['PLZ'];
		$Unfallaufnahme_Stadt = $Unfallaufnahme['Stadt'];
		$Unfallaufnahme_Doks = $Unfallaufnahme['Dok']['fileList'];
		foreach ($Unfallaufnahme_Doks as $dok){
			$Unfallaufnahme_Doks_Names[] = $dok['name'];
			$Unfallaufnahme_Doks_Files[] = $dok['originFileObj'];
		}
		
		$Zeugen = $_POST['Zeugen'];
		$Zeugen_Frage = $Zeugen['Frage'];
		$Zeugen_Vorname = $Zeugen['Vorname'];
		$Zeugen_Nachname = $Zeugen['Nachname'];
		$Zeugen_StrNr = $Zeugen['StrNr'];
		$Zeugen_PLZ = $Zeugen['PLZ'];
		$Zeugen_Stadt = $Zeugen['Stadt'];
		
		
		$Fahrzeugschaden = $_POST['Fahrzeugschaden'];
		$Fahrzeugschaden_Frage = $Fahrzeugschaden['Frage'];
		$Fahrzeugschaden_Fahrzeugart = $Fahrzeugschaden['Fahrzeugart'];
		$Fahrzeugschaden_AmtKennzeichen = $Fahrzeugschaden['AmtKennzeichen'];
		$Fahrzeugschaden_MarkeFahrzeugtyp = $Fahrzeugschaden['MarkeFahrzeugtyp'];
		$Fahrzeugschaden_fahrbereit = $Fahrzeugschaden['fahrbereit'];
		$Fahrzeugschaden_finanziert = $Fahrzeugschaden['finanziert'];
		$Fahrzeugschaden_3Jahre = $Fahrzeugschaden['3Jahre'];
		$Fahrzeugschaden_Datum = $Fahrzeugschaden['Datum'];
		$Fahrzeugschaden_Laufleistung = $Fahrzeugschaden['Laufleistung'];
		$Fahrzeugschaden_Vorsteuerabzug = $Fahrzeugschaden['Vorsteuerabzug'];
		$Fahrzeugschaden_gutachtenkosten = $Fahrzeugschaden['gutachtenkosten'];
		$Fahrzeugschaden_Besteatigung = $Fahrzeugschaden['Besteatigung']['fileList'];
		foreach ($Fahrzeugschaden_Besteatigung as $dok){
			$Fahrzeugschaden_Besteatigung_Names[] = $dok['name'];
			$Fahrzeugschaden_Besteatigung_Files[] = $dok['originFileObj'];
		}
		$Fahrzeugschaden_Markenwerkstatt = $Fahrzeugschaden['Markenwerkstatt'];
		$Fahrzeugschaden_Nachweis = $Fahrzeugschaden['Markenwerkstatt']['fileList'];
		foreach ($Fahrzeugschaden_Nachweis as $dok){
			$Fahrzeugschaden_Nachweis_Names[] = $dok['name'];
			$Fahrzeugschaden_Nachweis_Files[] = $dok['originFileObj'];
		}
		
		$Fahrten = $_POST['Fahrten'];
		$Fahrten_Frage = $Fahrten['Frage'];
		$Fahrten_Rechnung = $Fahrten['Rechnung']['fileList'];
		foreach ($Fahrten_Rechnung as $dok){
			$Fahrten_Rechnung_Names[] = $dok['name'];
			$Fahrten_Rechnung_Files[] = $dok['originFileObj'];
		}
		
		$Abschleppkosten = $_POST['Abschleppkosten'];
		$Abschleppkosten_Frage = $Abschleppkosten['Frage'];
		$Abschleppkosten_Rechnung = $Abschleppkosten['Rechnung']['fileList'];
		foreach ($Abschleppkosten_Rechnung as $dok){
			$Abschleppkosten_Rechnung_Names[] = $dok['name'];
			$Abschleppkosten_Rechnung_Files[] = $dok['originFileObj'];
		}
		
		$Verletzt = $_POST['Verletzt'];
		$Verletzt_Frage = $Verletzt['Frage'];
		$Verletzt_Rechnung = $Verletzt['Rechnung']['fileList'];
		foreach ($Verletzt_Rechnung as $dok){
			$Verletzt_Rechnung_Names[] = $dok['name'];
			$Verletzt_Rechnung_Files[] = $dok['originFileObj'];
		}
		$Verletzt_Verletzungen = $Verletzt['Verletzungen'];
		
		$Arbeitsunfahigkeit = $_POST['Arbeitsunfahigkeit'];
		$Arbeitsunfahigkeit_Frage = $Arbeitsunfahigkeit['Frage'];
		
		$Unfall = $_POST['Unfall'];
		$Unfall_Vollmacht = $Unfall['Vollmacht']['fileList'];
		foreach ($Unfall_Vollmacht as $dok){
			$Unfall_Vollmacht_Names[] = $dok['name'];
			$Unfall_Vollmacht_Files[] = $dok['originFileObj'];
		}
		$Unfall_Weiteres = $Unfall['Weiteres'];
		$Unfall_Weiteres_Doks = $Unfall_Weiteres['Dok']['fileList'];
		foreach ($Unfall_Weiteres_Doks as $dok){
			$Unfall_Weiteres_Doks_Names[] = $dok['name'];
			$Unfall_Weiteres_Doks_Files[] = $dok['originFileObj'];
		}
		$Unfall_Weiteres_Infos = $Unfall_Weiteres['Infos'];
		$Unfall_Email = $Unfall['Email'];
		$Unfall_Aktenzeichen = $Unfall['Aktenzeichen'];
		
		$Sachverstaendigengebuehren = $_POST['Sachverstaendigengebuehren'];
		$Sachverstaendigengebuehren_Frage = $Sachverstaendigengebuehren['Frage'];
		$Sachverstaendigengebuehren_Rechnung = $Sachverstaendigengebuehren['Rechnung']['fileList'];
		foreach ($Sachverstaendigengebuehren_Rechnung as $dok){
			$Sachverstaendigengebuehren_Rechnung_Names[] = $dok['name'];
			$Sachverstaendigengebuehren_Rechnung_Files[] = $dok['originFileObj'];
		}
		$Sachverstaendigengebuehren_Gutachterkosten = $Sachverstaendigengebuehren['Gutachterkosten'];
		
		$Kostenvoranschlag = $_POST['Kostenvoranschlag'];
		$Kostenvoranschlag_Dok = $Kostenvoranschlag['Dok']['fileList'];
		foreach ($Kostenvoranschlag_Dok as $dok){
			$Kostenvoranschlag_Dok_Names[] = $dok['name'];
			$Kostenvoranschlag_Dok_Files[] = $dok['originFileObj'];
		}
		$Kostenvoranschlag_Foto = $Kostenvoranschlag['Foto']['fileList'];
		foreach ($Kostenvoranschlag_Foto as $dok){
			$Kostenvoranschlag_Foto_Names[] = $dok['name'];
			$Kostenvoranschlag_Foto_Files[] = $dok['originFileObj'];
		}
		$Kostenvoranschlag_Netto = $Kostenvoranschlag['Netto'];
		
		
		$Gutachten = $_POST['$Gutachten'];
		$Gutachten_Gutachten = $Gutachten['Gutachten']['fileList'];
		foreach ($Gutachten_Gutachten as $dok){
			$Gutachten_Gutachten_Names[] = $dok['name'];
			$Gutachten_Gutachten_Files[] = $dok['originFileObj'];
		}
		$Gutachten_Kosten = $Gutachten['Kosten'];
		$Gutachten_WBW = $Gutachten['WBW'];
		$Gutachten_Rest = $Gutachten['Rest'];
		$Gutachten_Abzugn = $Gutachten['Abzug'];
		$Gutachten_Minderwert = $Gutachten['Minderwert'];
		$Gutachten_Nutzungsausfalls = $Gutachten['Nutzungsausfalls'];
		$Gutachten_Tage = $Gutachten['Tage'];

		
		$Schmerzensgeld = $_POST['Schmerzensgeld'];
		$Schmerzensgeld_Dok = $Schmerzensgeld['Dok']['fileList'];
		foreach ($Schmerzensgeld_Dok as $dok){
			$Schmerzensgeld_Dok_Names[] = $dok['name'];
			$Schmerzensgeld_Dok_Files[] = $dok['originFileObj'];
		}
		$Schmerzensgeld_Verletzungen = $Schmerzensgeld['Verletzungen'];
		
		$Haushaltsfuhrungsschaden = $_POST['Haushaltsfuhrungsschaden'];
		$Haushaltsfuhrungsschaden_Frage = $Haushaltsfuhrungsschaden['Frage'];
		$Haushaltsfuhrungsschaden_Eingeschrankt = $Haushaltsfuhrungsschaden['Eingeschränkt'];
		$Haushaltsfuhrungsschaden_Tatigkeit = $Haushaltsfuhrungsschaden['Tatigkeit'];
		$Haushaltsfuhrungsschaden_DatumVon_start = $Haushaltsfuhrungsschaden['DatumVon'][0];
		$Haushaltsfuhrungsschaden_DatumVon_end = $Haushaltsfuhrungsschaden['DatumVon'][1];
		
		
		$Heilbehandlungskosten = $_POST['Heilbehandlungskosten'];
		$Heilbehandlungskosten_Frage = $Heilbehandlungskosten['Frage'];
		$Heilbehandlungskosten_Rechnung = $Heilbehandlungskosten['Rechnung']['fileList'];
		foreach ($Heilbehandlungskosten_Rechnung as $dok){
			$Heilbehandlungskosten_Rechnung_Names[] = $dok['name'];
			$Heilbehandlungskosten_Rechnung_Files[] = $dok['originFileObj'];
		}
		$Heilbehandlungskosten_Leistung = $Heilbehandlungskosten['Leistung'];
		$Heilbehandlungskosten_Summe = $Heilbehandlungskosten['Summe'];
		
		
		
		$Gegenstaende = $_POST['Gegenstaende'];
		$Gegenstaende_Frage = $Gegenstaende['Frage'];
		$Gegenstaende_Gegenstaende_Rechnung = $Gegenstaende['Gegenstaende']['Rechnung']['fileList'];
		foreach ($Gegenstaende_Gegenstaende_Rechnung as $dok){
			$Gegenstaende_Gegenstaende_Rechnung_Names[] = $dok['name'];
			$Gegenstaende_Gegenstaende_Rechnung_Files[] = $dok['originFileObj'];
		}
		$Gegenstaende_Gegenstaende_Foto = $Gegenstaende['Gegenstaende']['Foto']['fileList'];
		foreach ($Gegenstaende_Gegenstaende_Foto as $dok){
			$Gegenstaende_Gegenstaende_Foto_Names[] = $dok['name'];
			$Gegenstaende_Gegenstaende_Foto_Files[] = $dok['originFileObj'];
		}
		$Gegenstaende_Gegenstaende_Bezeichnung = $Gegenstaende['Gegenstaende']['Bezeichnung'];
		$Gegenstaende_Gegenstaende_Preis = $Gegenstaende['Gegenstaende']['Preis'];
		$Gegenstaende_Gegenstaende_Datum = $Gegenstaende['Gegenstaende']['Datum'];
		
		$Haushaltsfuehrungsschaden_Zeitraum_Angabe = $_POST['Haushaltsfuehrungsschaden']['Zeitraum']['Angabe'];
		$Haushaltsfuehrungsschaden_Zeitraum_a = $_POST['Haushaltsfuehrungsschaden']['Zeitraum']['a'];
		
		
		$email = new PHPMailer\PHPMailer\PHPMailer();
		$email->SetFrom($Unfall_Email, 'Lawnow');
		$email->isHTML(true);
		$email->Subject   = 'Lawnow - Second form';
		$email->AddAddress( 'Zakablukov777@gmail.com' );

		$msg = "<h1>Unfalldaten</h1>";
		$msg .= "<p>UhrZeit: " . $Unfalldaten_UhrZeit . "</p>";
		$msg .= "<p>StrNr: " . $Unfalldaten_StrNr . "</p>";
		$msg .= "<p>Str: " . $Unfalldaten_Str . "</p>";
		$msg .= "<p>PLZ: " . $Unfalldaten_PLZ . "</p>";
		$msg .= "<p>Stadt: " . $Unfalldaten_Stadt . "</p>";
		
		$msg .= "<h1>Unfallverursacher</h1>";
		$msg .= "<p>Frage: " . $Unfallverursacher_Frage . "</p>";
		$msg .= "<p>Vorname: " . $Unfallverursacher_Vorname . "</p>";
		$msg .= "<p>Nachname: " . $Unfallverursacher_Nachname . "</p>";
		$msg .= "<p>StrNr: " . $Unfallverursacher_StrNr . "</p>";
		$msg .= "<p>PLZ: " . $Unfallverursacher_PLZ . "</p>";
		$msg .= "<p>Stadt: " . $Unfallverursacher_Stadt . "</p>";
		
		$msg .= "<h1>Unfallaufnahme</h1>";
		$msg .= "<p>Frage: " . $Unfallaufnahme_Frage . "</p>";
		$msg .= "<p>Behoerde: " . $Unfallaufnahme_Behoerde . "</p>";
		$msg .= "<p>Aktenzeichen: " . $Unfallaufnahme_Aktenzeichen . "</p>";
		$msg .= "<p>StrNr: " . $Unfallaufnahme_StrNr . "</p>";
		$msg .= "<p>PLZ: " . $Unfallaufnahme_PLZ . "</p>";
		$msg .= "<p>Stadt: " . $Unfallaufnahme_Stadt . "</p>";
		$msg .= "<p>Doks: " . join(", ", $Unfallaufnahme_Doks_Names) . "</p>";
		
		$msg .= "<h1>Zeugen</h1>";
		$msg .= "<p>Frage: " . $Zeugen_Frage . "</p>";
		$msg .= "<p>Vorname: " . $Zeugen_Vorname . "</p>";
		$msg .= "<p>Nachname: " . $Zeugen_Nachname . "</p>";
		$msg .= "<p>StrNr: " . $Zeugen_StrNr . "</p>";
		$msg .= "<p>PLZ: " . $Zeugen_PLZ . "</p>";
		$msg .= "<p>Stadt: " . $Zeugen_Stadt . "</p>";
		
		$msg .= "<h1>Fahrzeugschaden</h1>";
		$msg .= "<p>Frage: " . $Fahrzeugschaden_Frage . "</p>";
		$msg .= "<p>Fahrzeugart: " . $Fahrzeugschaden_Fahrzeugart . "</p>";
		$msg .= "<p>AmtKennzeichen: " . $Fahrzeugschaden_AmtKennzeichen . "</p>";
		$msg .= "<p>MarkeFahrzeugtyp: " . $Fahrzeugschaden_MarkeFahrzeugtyp . "</p>";
		$msg .= "<p>fahrbereit: " . $Fahrzeugschaden_fahrbereit . "</p>";
		$msg .= "<p>finanziert: " . $Fahrzeugschaden_finanziert . "</p>";
		$msg .= "<p>3Jahre: " . $Fahrzeugschaden_3Jahre . "</p>";
		$msg .= "<p>Datum: " . date("Y-m-d", strtotime($Fahrzeugschaden_Datum)) . " 00:00:00</p>";
		$msg .= "<p>Laufleistung: " . $Fahrzeugschaden_Laufleistung . "</p>";
		$msg .= "<p>Vorsteuerabzug: " . $Fahrzeugschaden_Vorsteuerabzug . "</p>";
		$msg .= "<p>gutachtenkosten: " . $Fahrzeugschaden_gutachtenkosten . "</p>";
		$msg .= "<p>Besteatigung: " . join(', ', $Fahrzeugschaden_Besteatigung_Names) . "</p>";
		$msg .= "<p>Markenwerkstatt: " . $Fahrzeugschaden_Markenwerkstatt . "</p>";
		$msg .= "<p>Nachweis: " . join(', ', $Fahrzeugschaden_Nachweis_Names) . "</p>";
		
		$msg .= "<h1>Fahrten</h1>";
		$msg .= "<p>Frage: " . $Fahrten_Frage . "</p>";
		$msg .= "<p>Rechnung: " . join(', ', $Fahrten_Rechnung_Names) . "</p>";
		
		$msg .= "<h1>Abschleppkosten</h1>";
		$msg .= "<p>Frage: " . $Abschleppkosten_Frage . "</p>";
		$msg .= "<p>Rechnung: " . join(', ', $Abschleppkosten_Rechnung_Names) . "</p>";
		
		$msg .= "<h1>Verletzt</h1>";
		$msg .= "<p>Frage: " . $Verletzt_Frage . "</p>";
		$msg .= "<p>Rechnung: " . join(', ', $Verletzt_Rechnung_Names) . "</p>";
		$msg .= "<p>Verletzungen: " . $Verletzt_Verletzungen . "</p>";
		
		$msg .= "<h1>Arbeitsunfahigkeit</h1>";
		$msg .= "<p>Frage: " . $Arbeitsunfahigkeit_Frage . "</p>";
		
		$msg .= "<h1>Unfall</h1>";
		$msg .= "<p>Vollmacht: " . join(", ", $Unfall_Vollmacht_Names) . "</p>";
		$msg .= "<p>Weiteres_Dok: " . join(", ", $Unfall_Weiteres_Doks_Names) . "</p>";
		$msg .= "<p>Weiteres_Infos: " . $Unfall_Weiteres_Infos . "</p>";
		$msg .= "<p>Email: " . $Unfall_Email . "</p>";
		$msg .= "<p>Aktenzeichen: " . $Unfall_Aktenzeichen . "</p>";
		
		$msg .= "<h1>Sachverstaendigengebuehren</h1>";
		$msg .= "<p>Frage: " . $Sachverstaendigengebuehren_Frage . "</p>";
		$msg .= "<p>Rechnung: " . join(", ", $Sachverstaendigengebuehren_Rechnung_Names) . "</p>";
		$msg .= "<p>Gutachterkosten: " . $Sachverstaendigengebuehren_Gutachterkosten . "</p>";
		
		$msg .= "<h1>Kostenvoranschlag</h1>";
		$msg .= "<p>Dok: " . join(", ", $Kostenvoranschlag_Dok_Names) . "</p>";
		$msg .= "<p>Foto: " . join(", ", $Kostenvoranschlag_Foto_Names) . "</p>";
		$msg .= "<p>Netto: " . $Kostenvoranschlag_Netto . "</p>";
		
		$msg .= "<h1>Gutachten</h1>";
		$msg .= "<p>Gutachten: " . join(", ", $Gutachten_Gutachten_Names) . "</p>";
		$msg .= "<p>Kosten: " . $Gutachten_Kosten . "</p>";
		$msg .= "<p>WBW: " . $Gutachten_WBW . "</p>";
		$msg .= "<p>Rest: " . $Gutachten_Rest . "</p>";
		$msg .= "<p>Abzugn: " . $Gutachten_Abzugn . "</p>";
		$msg .= "<p>Minderwert: " . $Gutachten_Minderwert . "</p>";
		$msg .= "<p>Nutzungsausfalls: " . $Gutachten_Nutzungsausfalls . "</p>";
		$msg .= "<p>Tage: " . $Gutachten_Tage . "</p>";
		
		$msg .= "<h1>Schmerzensgeld</h1>";
		$msg .= "<p>Dok: " . join(", ", $Schmerzensgeld_Dok_Names) . "</p>";
		$msg .= "<p>Verletzungen: " . $Schmerzensgeld_Verletzungen . "</p>";
		
		$msg .= "<h1>Haushaltsfuhrungsschaden</h1>";
		$msg .= "<p>Frage: " . $Haushaltsfuhrungsschaden_Frage . "</p>";
		$msg .= "<p>Eingeschrankt: " . $Haushaltsfuhrungsschaden_Eingeschrankt . "</p>";
		$msg .= "<p>Tatigkeit: " . $Haushaltsfuhrungsschaden_Tatigkeit . "</p>";
		$msg .= "<p>DatumVon_start: " . date("Y-m-d", strtotime($Haushaltsfuhrungsschaden_DatumVon_start)) . " 00:00:00</p>";
		$msg .= "<p>DatumVon_end: " . date("Y-m-d", strtotime($Haushaltsfuhrungsschaden_DatumVon_end)) . " 00:00:00</p>";
		
		$msg .= "<h1>Heilbehandlungskosten</h1>";
		$msg .= "<p>Frage: " . $Heilbehandlungskosten_Frage . "</p>";
		$msg .= "<p>Rechnung: " . join(", ", $Heilbehandlungskosten_Rechnung_Names) . "</p>";
		$msg .= "<p>Leistung: " . $Heilbehandlungskosten_Leistung . "</p>";
		$msg .= "<p>Summe: " . $Heilbehandlungskosten_Summe . "</p>";
		
		$msg .= "<h1>Gegenstaende</h1>";
		$msg .= "<p>Frage: " . $Gegenstaende_Frage . "</p>";
		$msg .= "<p>Rechnung: " . join(", ", $Gegenstaende_Gegenstaende_Rechnung_Names) . "</p>";
		$msg .= "<p>Foto: " . join(", ", $Gegenstaende_Gegenstaende_Foto_Names) . "</p>";
		$msg .= "<p>Bezeichnung: " . $Gegenstaende_Gegenstaende_Bezeichnung . "</p>";
		$msg .= "<p>Preis: " . $Gegenstaende_Gegenstaende_Preis . "</p>";
		$msg .= "<p>Datum: " . date("Y-m-d", strtotime($Gegenstaende_Gegenstaende_Datum)) . " 00:00:00</p>";
		
		$msg .= "<h1>Haushaltsfuehrungsschaden / Zeitraum</h1>";
		$msg .= "<p>Angabe: " . $Haushaltsfuehrungsschaden_Zeitraum_Angabe . "</p>";
		$msg .= "<p>a: " . $Haushaltsfuehrungsschaden_Zeitraum_a . "</p>";
		
		
		$email->Body = $msg;
		
		if(!$email->send()) {
			echo 'Message could not be sent.';
			echo 'Mailer Error: ' . $email->ErrorInfo;
		} else {
			echo 'Message has been sent';
		}
	} else {
		http_response_code(403);
		echo "There was a problem with your submission, please try again.";
	}
