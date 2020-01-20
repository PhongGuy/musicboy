<?php

/**
 * --------------------------------------------------------------------------
 *  STEAM API KEY
 * --------------------------------------------------------------------------
 *
 *  Steam API key can be found at http://steamcommunity.com/dev/apikey
 *
 */
$steamauth['apikey'] = "814349D7E2946389C11215A53A851786";

/**
 * --------------------------------------------------------------------------
 *  Return pages from login/logout
 * --------------------------------------------------------------------------
 *
 *  // The main URL of your website displayed in the login page
 *
 *  // Page to redirect to after a successfull logout (from the directory
 *     the SteamAuth-folder is located in) - NO slash at the beginning!
 *
 *  // Page to redirect to after a successfull login (from the directory
 *     the SteamAuth-folder is located in) - NO slash at the beginning!
 *
 */
$steamauth['domainname'] = $_SERVER['SERVER_NAME'];
$steamauth['logoutpage'] = 'https://birdykit.tf';
$steamauth['loginpage'] = 'https://birdykit.tf';
