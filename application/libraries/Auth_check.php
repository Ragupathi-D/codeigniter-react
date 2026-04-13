<?php
defined('BASEPATH') OR exit('No direct script access allowed');

/**
 * Auth_check Library
 * Session guard — redirect to login if user is not authenticated.
 * Load this in every protected controller's __construct().
 */
class Auth_check
{
    protected $CI;

    public function __construct()
    {
        $this->CI =& get_instance();

        if (!$this->CI->session->userdata('logged_in')) {
            redirect('auth/login');
            exit;
        }
    }
}
