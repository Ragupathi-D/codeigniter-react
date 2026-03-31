<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class MY_Controller extends CI_Controller {

    protected $allowed_origins = ['http://localhost:5173'];

    public function __construct() {
        parent::__construct();
        $this->_set_cors_headers();

        if ($this->input->method() === 'options') {
            $this->output->set_status_header(204);
            exit;
        }
    }

    protected function _set_cors_headers() {
        $origin = isset($_SERVER['HTTP_ORIGIN']) ? $_SERVER['HTTP_ORIGIN'] : '';
        if (in_array($origin, $this->allowed_origins)) {
            header('Access-Control-Allow-Origin: ' . $origin);
        }
        header('Access-Control-Allow-Credentials: true');
        header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
        header('Access-Control-Allow-Headers: Content-Type, X-Requested-With');
    }

    protected function json_response($data, $status = 200) {
        $this->output
            ->set_status_header($status)
            ->set_content_type('application/json')
            ->set_output(json_encode($data));
    }

    protected function require_auth() {
        if (!$this->session->userdata('user_id')) {
            $this->json_response(['error' => 'Unauthorized'], 401);
            exit;
        }
    }
}
