<?php
defined('BASEPATH') OR exit('No direct script access allowed');

require_once APPPATH . 'core/MY_API_Controller.php';

/**
 * api/Auth
 *
 * Handles session-based authentication for the React frontend.
 * All methods return JSON.
 *
 *   POST /api/auth/login   — validate credentials, create session
 *   GET  /api/auth/check   — return current auth state
 *   POST /api/auth/logout  — destroy session
 */
class Auth extends MY_API_Controller {

    public function __construct()
    {
        parent::__construct();
        $this->load->model('User_model');
    }

    // ----------------------------------------------------------------

    /**
     * POST /api/auth/login
     *
     * Body: { "username": "...", "password": "..." }
     */
    public function login()
    {
        if ($this->input->method() !== 'post') {
            $this->_json(['success' => false, 'message' => 'Method not allowed'], 405);
        }

        $body     = $this->_get_json_input();
        $username = isset($body['username']) ? trim($body['username']) : '';
        $password = isset($body['password']) ? $body['password'] : '';

        if ($username === '' || $password === '') {
            $this->_json(['success' => false, 'message' => 'Username and password are required'], 422);
        }

        // Support both form-post and JSON body
        if (empty($body)) {
            $username = $this->input->post('username', TRUE);
            $password = $this->input->post('password'); // not XSS-cleaned — needed for password_verify
        }

        $user = $this->User_model->login($username, $password);

        if ( ! $user) {
            $this->_json(['success' => false, 'message' => 'Invalid username or password'], 401);
        }

        $this->session->set_userdata([
            'user_id'   => $user->id,
            'username'  => $user->username,
            'name'      => $user->name,
            'role'      => $user->role,
            'logged_in' => TRUE,
        ]);

        $this->_json([
            'success' => true,
            'user'    => [
                'id'       => $user->id,
                'username' => $user->username,
                'name'     => $user->name,
                'role'     => $user->role,
            ],
        ]);
    }

    // ----------------------------------------------------------------

    /**
     * GET /api/auth/check
     *
     * Returns current session state. Called by React on every app boot.
     */
    public function check()
    {
        if ($this->_is_logged_in()) {
            $this->_json([
                'authenticated' => true,
                'user' => [
                    'id'       => $this->session->userdata('user_id'),
                    'username' => $this->session->userdata('username'),
                    'name'     => $this->session->userdata('name'),
                    'role'     => $this->session->userdata('role'),
                ],
            ]);
        }

        $this->_json(['authenticated' => false]);
    }

    // ----------------------------------------------------------------

    /**
     * POST /api/auth/logout
     *
     * Destroys the session.
     */
    public function logout()
    {
        $this->session->sess_destroy();
        $this->_json(['success' => true, 'message' => 'Logged out']);
    }
}
