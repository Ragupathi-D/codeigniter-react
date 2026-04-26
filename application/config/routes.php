<?php
defined('BASEPATH') OR exit('No direct script access allowed');

/*
| -------------------------------------------------------------------------
| URI ROUTING
| -------------------------------------------------------------------------
| This file lets you re-map URI requests to specific controller functions.
|
| Typically there is a one-to-one relationship between a URL string
| and its corresponding controller class/method. The segments in a
| URL normally follow this pattern:
|
|	example.com/class/method/id/
|
| In some instances, however, you may want to remap this relationship
| so that a different class/function is called than the one
| corresponding to the URL.
|
| Please see the user guide for complete details:
|
|	https://codeigniter.com/userguide3/general/routing.html
|
| -------------------------------------------------------------------------
| RESERVED ROUTES
| -------------------------------------------------------------------------
|
| There are three reserved routes:
|
|	$route['default_controller'] = 'welcome';
|
| This route indicates which controller class should be loaded if the
| URI contains no data. In the above example, the "welcome" class
| would be loaded.
|
|	$route['404_override'] = 'errors/page_missing';
|
| This route will tell the Router which controller/method to use if those
| provided in the URL cannot be matched to a valid route.
|
|	$route['translate_uri_dashes'] = FALSE;
|
| This is not exactly a route, but allows you to automatically route
| controller and method names that contain dashes. '-' isn't a valid
| class or method name character, so it requires translation.
| When you set this option to TRUE, it will replace ALL dashes in the
| controller and method URI segments.
|
| Examples:	my-controller/index	-> my_controller/index
|		my-controller/my-method	-> my_controller/my_method
*/
$route['default_controller'] = 'auth/login';
$route['404_override'] = '';
$route['translate_uri_dashes'] = FALSE;

// -------------------------------------------------------------------------
// API Routes — JSON responses, handled by MY_API_Controller subclasses
// -------------------------------------------------------------------------
$route['api/auth/login']            = 'api/auth/login';
$route['api/auth/check']            = 'api/auth/check';
$route['api/auth/logout']           = 'api/auth/logout';

$route['api/admin/users']           = 'api/admin/users';
$route['api/admin/users/(:num)']    = 'api/admin/user/$1';

$route['api/report/list']           = 'api/report/list';
$route['api/report/detail/(:num)']  = 'api/report/detail/$1';

// -------------------------------------------------------------------------
// SPA Catch-All Routes — React Router handles sub-paths inside each module
// -------------------------------------------------------------------------
$route['admin']                     = 'spa/admin';
$route['admin/(.+)']                = 'spa/admin';
$route['report']                    = 'spa/report';
$route['report/(.+)']               = 'spa/report';

// -------------------------------------------------------------------------
// Existing PHP Routes
// -------------------------------------------------------------------------
$route['auth/login']                = 'auth/login';
$route['auth/logout']               = 'auth/logout';
$route['dashboard']                 = 'dashboard/index';
