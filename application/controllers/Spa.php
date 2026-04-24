<?php
defined('BASEPATH') OR exit('No direct script access allowed');

/**
 * Spa
 *
 * Serves the React single-page application shell views.
 * All sub-routes within a module (e.g. /admin/users/edit/5) are
 * caught by routes.php and forwarded here — React Router handles
 * the actual client-side routing.
 *
 * Authentication is NOT enforced here: the React app calls
 * GET /api/auth/check on boot and redirects to login itself.
 */
class Spa extends CI_Controller {

    public function __construct()
    {
        parent::__construct();
        $this->load->helper('react');
    }

    // ----------------------------------------------------------------

    /**
     * Serves the Admin React SPA shell.
     * Handles: /admin  and  /admin/(:any)
     */
    public function admin()
    {
        $this->load->view('spa/admin');
    }

    // ----------------------------------------------------------------

    /**
     * Serves the Report React SPA shell.
     * Handles: /report  and  /report/(:any)
     */
    public function report()
    {
        $this->load->view('spa/report');
    }
}
