<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Admin extends CI_Controller
{
    // Dummy dataset — no database required
    private $items = [
        ['id' => 1,  'name' => 'Alice Johnson',  'email' => 'alice@example.com',   'department' => 'Engineering',  'role' => 'Lead Developer',    'status' => 'Active',   'joined' => '2023-03-12'],
        ['id' => 2,  'name' => 'Bob Martinez',    'email' => 'bob@example.com',     'department' => 'Design',       'role' => 'UX Designer',       'status' => 'Active',   'joined' => '2023-05-08'],
        ['id' => 3,  'name' => 'Carol White',     'email' => 'carol@example.com',   'department' => 'Marketing',    'role' => 'Marketing Manager', 'status' => 'Inactive', 'joined' => '2022-11-20'],
        ['id' => 4,  'name' => 'David Lee',       'email' => 'david@example.com',   'department' => 'Engineering',  'role' => 'Backend Developer', 'status' => 'Active',   'joined' => '2024-01-15'],
        ['id' => 5,  'name' => 'Eva Brown',       'email' => 'eva@example.com',     'department' => 'HR',           'role' => 'HR Specialist',     'status' => 'Active',   'joined' => '2023-08-30'],
        ['id' => 6,  'name' => 'Frank Wilson',    'email' => 'frank@example.com',   'department' => 'Finance',      'role' => 'Financial Analyst', 'status' => 'Active',   'joined' => '2023-02-14'],
        ['id' => 7,  'name' => 'Grace Kim',       'email' => 'grace@example.com',   'department' => 'Engineering',  'role' => 'Frontend Developer','status' => 'Active',   'joined' => '2024-03-01'],
        ['id' => 8,  'name' => 'Henry Zhang',     'email' => 'henry@example.com',   'department' => 'Operations',   'role' => 'Ops Manager',       'status' => 'Inactive', 'joined' => '2022-07-19'],
    ];

    public function __construct()
    {
        parent::__construct();
        $this->load->library('Auth_check');
    }

    public function index()
    {
        $data['page_title'] = 'Admin — User List';
        $data['active']     = 'admin';
        $data['items']      = $this->items;

        $this->load->view('layout/header', $data);
        $this->load->view('admin/index', $data);
        $this->load->view('layout/footer', $data);
    }

    public function detail($id)
    {
        $item = NULL;
        foreach ($this->items as $i) {
            if ((int) $i['id'] === (int) $id) {
                $item = $i;
                break;
            }
        }

        if ($item === NULL) {
            show_404();
            return;
        }

        $data['page_title'] = 'Admin — ' . htmlspecialchars($item['name']);
        $data['active']     = 'admin';
        $data['item']       = $item;

        $this->load->view('layout/header', $data);
        $this->load->view('admin/detail', $data);
        $this->load->view('layout/footer', $data);
    }
}
