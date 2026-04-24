<?php
defined('BASEPATH') OR exit('No direct script access allowed');

require_once APPPATH . 'core/MY_API_Controller.php';

/**
 * api/Admin
 *
 * JSON API for the Admin / User Management module.
 *
 *   GET  /api/admin/users          — list all users
 *   GET  /api/admin/users/:id      — get single user
 */
class Admin extends MY_API_Controller {

    // Mirrors the dummy data in the PHP Admin controller.
    // Replace with model calls once a real DB table exists.
    private $users = [
        ['id' => 1, 'name' => 'Alice Johnson',  'email' => 'alice@example.com',  'department' => 'Engineering',  'role' => 'Lead Developer',    'status' => 'Active',   'joined' => '2023-03-12'],
        ['id' => 2, 'name' => 'Bob Martinez',   'email' => 'bob@example.com',    'department' => 'Marketing',    'role' => 'Marketing Manager', 'status' => 'Active',   'joined' => '2022-07-19'],
        ['id' => 3, 'name' => 'Carol White',    'email' => 'carol@example.com',  'department' => 'Finance',      'role' => 'Accountant',        'status' => 'Inactive', 'joined' => '2021-11-05'],
        ['id' => 4, 'name' => 'David Lee',      'email' => 'david@example.com',  'department' => 'Engineering',  'role' => 'Backend Developer', 'status' => 'Active',   'joined' => '2023-08-22'],
        ['id' => 5, 'name' => 'Eva Brown',      'email' => 'eva@example.com',    'department' => 'HR',           'role' => 'HR Specialist',     'status' => 'Active',   'joined' => '2022-01-30'],
        ['id' => 6, 'name' => 'Frank Wilson',   'email' => 'frank@example.com',  'department' => 'Sales',        'role' => 'Sales Executive',   'status' => 'Active',   'joined' => '2020-06-14'],
        ['id' => 7, 'name' => 'Grace Kim',      'email' => 'grace@example.com',  'department' => 'Design',       'role' => 'UX Designer',       'status' => 'Inactive', 'joined' => '2023-01-09'],
        ['id' => 8, 'name' => 'Henry Zhang',    'email' => 'henry@example.com',  'department' => 'Engineering',  'role' => 'DevOps Engineer',   'status' => 'Active',   'joined' => '2021-04-17'],
    ];

    // ----------------------------------------------------------------

    /**
     * GET /api/admin/users
     */
    public function users()
    {
        $this->_require_auth();

        $this->_json([
            'success' => true,
            'data'    => $this->users,
            'total'   => count($this->users),
        ]);
    }

    // ----------------------------------------------------------------

    /**
     * GET /api/admin/users/:id
     */
    public function user($id)
    {
        $this->_require_auth();

        $id   = (int) $id;
        $user = null;

        foreach ($this->users as $u) {
            if ($u['id'] === $id) {
                $user = $u;
                break;
            }
        }

        if ( ! $user) {
            $this->_json(['success' => false, 'message' => 'User not found'], 404);
        }

        $this->_json(['success' => true, 'data' => $user]);
    }
}
