<?php
defined('BASEPATH') OR exit('No direct script access allowed');

/**
 * MY_API_Controller
 *
 * Base controller for all JSON API endpoints.
 * Enforces session-based auth, outputs JSON, handles CORS for dev.
 */
class MY_API_Controller extends CI_Controller {

    public function __construct()
    {
        parent::__construct();
        $this->_set_headers();
    }

    // ----------------------------------------------------------------

    /**
     * Set common API response headers.
     */
    protected function _set_headers()
    {
        // Allow credentials (session cookie) across same-domain requests
        header('Content-Type: application/json; charset=UTF-8');

        // Only allow from same origin in production.
        // In development, Vite dev server may run on a different port.
        if (ENVIRONMENT === 'development') {
            $origin = isset($_SERVER['HTTP_ORIGIN']) ? $_SERVER['HTTP_ORIGIN'] : '';
            $allowed = ['http://localhost:5173', 'http://localhost:5174'];
            if (in_array($origin, $allowed)) {
                header('Access-Control-Allow-Origin: ' . $origin);
                header('Access-Control-Allow-Credentials: true');
                header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
                header('Access-Control-Allow-Headers: Content-Type, X-Requested-With');
            }
        }

        // Handle pre-flight OPTIONS request
        if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
            http_response_code(204);
            exit;
        }
    }

    // ----------------------------------------------------------------

    /**
     * Check if the current session has a logged-in user.
     */
    protected function _is_logged_in(): bool
    {
        return (bool) $this->session->userdata('logged_in');
    }

    // ----------------------------------------------------------------

    /**
     * Require authentication. Sends 401 and exits if not logged in.
     */
    protected function _require_auth()
    {
        if ( ! $this->_is_logged_in()) {
            $this->_json(['success' => false, 'message' => 'Unauthenticated'], 401);
        }
    }

    // ----------------------------------------------------------------

    /**
     * Require a specific role. Sends 403 and exits if role does not match.
     *
     * @param string|array $roles
     */
    protected function _require_role($roles)
    {
        $this->_require_auth();

        $user_role = $this->session->userdata('role');
        $roles     = (array) $roles;

        if ( ! in_array($user_role, $roles)) {
            $this->_json(['success' => false, 'message' => 'Forbidden'], 403);
        }
    }

    // ----------------------------------------------------------------

    /**
     * Send a JSON response and stop execution.
     *
     * @param mixed $data
     * @param int   $status_code HTTP status code
     */
    protected function _json($data, int $status_code = 200)
    {
        http_response_code($status_code);
        echo json_encode($data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
        exit;
    }

    // ----------------------------------------------------------------

    /**
     * Parse JSON request body. Returns decoded array or empty array.
     */
    protected function _get_json_input(): array
    {
        $raw = file_get_contents('php://input');
        $data = json_decode($raw, true);
        return is_array($data) ? $data : [];
    }
}
