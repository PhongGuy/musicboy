<?php

session_name('ursn');
session_start();

require 'openid.php';
require 'SteamConfig.php';
if (isset($_GET['r'])) {
    $steamauth['loginpage'] = $_GET['r'];
}
try {
    $openid = new LightOpenID($steamauth['domainname']);

    if (!$openid->mode) {
        $openid->identity = 'https://steamcommunity.com/openid';
        header('Location: ' . $openid->authUrl());
    } elseif ($openid->mode == 'cancel') {
        echo 'User has canceled authentication!';
    } else {
        if ($openid->validate()) {
            $id = $openid->identity;
            $ptn = "/^https?:\/\/steamcommunity\.com\/openid\/id\/(7[0-9]{15,25}+)$/";
            preg_match($ptn, $id, $matches);

            $_SESSION['STEAM_ID'] = $matches[1];
            if (!headers_sent()) {
                header('Location: ' . $steamauth['loginpage']);
                exit;
            } else {
                echo '<script type="text/javascript">window.location.href = "' . $steamauth['loginpage'] . '";</script>
                <noscript><meta http-equiv="refresh" content="0;url=' . $steamauth['loginpage'] . '" /></noscript>';
                exit;
            }
        } else {
            echo "User is not logged in.\n";
        }
    }
} catch (ErrorException $e) {
    echo $e->getMessage();
}
