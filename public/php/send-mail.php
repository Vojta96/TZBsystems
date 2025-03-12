<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = htmlspecialchars($_POST["name"]);
    $phone = filter_var($_POST["phone"], FILTER_VALIDATE_PHONE);
    $email = filter_var($_POST["email"], FILTER_VALIDATE_EMAIL);
    $message = htmlspecialchars($_POST["message"]);

    if (!$email) {
        echo "Neplatná e-mailová adresa.";
        exit;
    }

    $to = "info@tzbsystems.cz"; // Změň na svůj e-mail!
    $subject = "Nová zpráva z webového formuláře";
    $headers = "From: $email\r\nReply-To: $email\r\nContent-Type: text/plain; charset=UTF-8";
    $services = isset($_POST['services']) ? $_POST['services'] : [];
    $message .= "Vybrané služby:\n";

    foreach ($services as $service) {
        $scope = $_POST['scope-' . array_search($service, $services)]; // Získání rozsahu
        $message .= "- " . $service . ": " . $scope . "\n";
    }
    $fullMessage = "Jméno: $name\nTelefon: $phone\nE-mail: $email\n\nZpráva:\n$message";

    if (mail($to, $subject, $fullMessage, $headers)) {
        echo "success";
    } else {
        echo "Chyba při odesílání zprávy.";
    }
} else {
    echo "Neplatná žádost.";
}
