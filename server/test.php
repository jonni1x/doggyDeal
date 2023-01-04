<?php

require __DIR__ . '/vendor/autoload.php';
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
    

    $key = 'example_key';
    $payload = [
        'iss' => 'http://example.org',
        'aud' => 'http://example.com',
        'iat' => 1356999524,
        'nbf' => 1357000000
    ];


    $token = JWT::encode($payload, $key, 'HS256');

    print_r($token);