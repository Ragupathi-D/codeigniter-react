<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Dashboard extends CI_Controller
{
    public function __construct()
    {
        parent::__construct();
        $this->load->library('Auth_check');
    }

    public function index()
    {
        $data['page_title'] = 'Dashboard';
        $data['active']     = 'dashboard';

        $this->load->view('layout/header', $data);
        $this->load->view('dashboard/index', $data);
        $this->load->view('layout/footer', $data);
    }
}
