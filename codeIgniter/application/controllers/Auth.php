<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Auth extends MY_Controller {

    public function __construct() {
        parent::__construct();
        $this->load->model('User_model');
    }

    // POST /api/auth/login
    public function login() {
        if ($this->input->method() !== 'post') {
            return $this->json_response(['error' => 'Method not allowed'], 405);
        }

        $raw  = $this->input->raw_input_stream;
        $body = json_decode($raw, TRUE);

        $email    = isset($body['email'])    ? trim($body['email'])  : '';
        $password = isset($body['password']) ? $body['password']     : '';

        if (empty($email) || empty($password)) {
            return $this->json_response(['error' => 'Email and password are required'], 422);
        }

        $user = $this->User_model->get_by_email($email);

        if (!$user || !$this->User_model->verify_password($password, $user->password)) {
            return $this->json_response(['error' => 'Invalid credentials'], 401);
        }

        $this->session->sess_regenerate(TRUE);

        $this->session->set_userdata([
            'user_id'  => $user->id,
            'username' => $user->username,
            'email'    => $user->email,
        ]);

        return $this->json_response([
            'message' => 'Login successful',
            'user'    => [
                'id'       => $user->id,
                'username' => $user->username,
                'email'    => $user->email,
            ],
        ]);
    }

    // POST /api/auth/logout
    public function logout() {
        $this->session->sess_destroy();
        return $this->json_response(['message' => 'Logged out']);
    }

    // GET /api/auth/check
    public function check() {
        $user_id = $this->session->userdata('user_id');
        if (!$user_id) {
            return $this->json_response(['authenticated' => FALSE]);
        }

        return $this->json_response([
            'authenticated' => TRUE,
            'user' => [
                'id'       => $user_id,
                'username' => $this->session->userdata('username'),
                'email'    => $this->session->userdata('email'),
            ],
        ]);
    }
}
