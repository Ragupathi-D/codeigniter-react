<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Auth extends CI_Controller
{
    public function __construct()
    {
        parent::__construct();
        $this->load->model('User_model');
    }

    public function login()
    {
        // Already logged in — go straight to dashboard
        if ($this->session->userdata('logged_in')) {
            redirect('dashboard');
            return;
        }

        $data = ['error' => ''];

        if ($this->input->post()) {
            $username = $this->input->post('username', TRUE);
            $password = $this->input->post('password');   // NOT XSS-cleaned — needed for password_verify

            $user = $this->User_model->login($username, $password);

            if ($user) {
                $this->session->set_userdata([
                    'user_id'   => $user->id,
                    'username'  => $user->username,
                    'name'      => $user->name,
                    'role'      => $user->role,
                    'logged_in' => TRUE,
                ]);
                redirect('dashboard');
                return;
            }

            $data['error'] = 'Invalid username or password.';
        }

        $this->load->view('auth/login', $data);
    }

    public function logout()
    {
        $this->session->sess_destroy();
        redirect('auth/login');
    }
}
