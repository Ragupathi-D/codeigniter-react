<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Report extends CI_Controller
{
    // Dummy dataset — no database required
    private $items = [
        ['id' => 1,  'title' => 'Q1 Revenue Summary',        'category' => 'Finance',    'author' => 'Frank Wilson',  'status' => 'Published', 'created' => '2024-01-31', 'summary' => 'Quarterly revenue breakdown showing a 12% YoY growth driven by new enterprise contracts.'],
        ['id' => 2,  'title' => 'User Acquisition Report',   'category' => 'Marketing',  'author' => 'Carol White',   'status' => 'Published', 'created' => '2024-02-15', 'summary' => 'Analysis of user acquisition channels for January–February, with paid search as the top performer.'],
        ['id' => 3,  'title' => 'Infrastructure Audit 2024', 'category' => 'Operations', 'author' => 'Henry Zhang',   'status' => 'Draft',     'created' => '2024-03-05', 'summary' => 'Full audit of cloud infrastructure costs and optimization recommendations for Q2.'],
        ['id' => 4,  'title' => 'Sprint Velocity Trends',    'category' => 'Engineering','author' => 'Alice Johnson',  'status' => 'Published', 'created' => '2024-03-20', 'summary' => 'Team velocity metrics across 10 sprints; average velocity up 8% after adopting new estimation framework.'],
        ['id' => 5,  'title' => 'Employee Satisfaction Survey','category' => 'HR',        'author' => 'Eva Brown',     'status' => 'Published', 'created' => '2024-04-01', 'summary' => 'Results of the annual satisfaction survey (n=150). Overall score 4.2/5, up from 3.9 last year.'],
        ['id' => 6,  'title' => 'Product Roadmap Review',    'category' => 'Product',    'author' => 'Grace Kim',     'status' => 'Draft',     'created' => '2024-04-10', 'summary' => 'Mid-year review of product roadmap milestones; 7 of 12 items completed on schedule.'],
        ['id' => 7,  'title' => 'Security Compliance Report','category' => 'Operations', 'author' => 'David Lee',     'status' => 'Published', 'created' => '2024-04-22', 'summary' => 'Annual SOC 2 readiness assessment; two critical gaps identified and remediation plan submitted.'],
    ];

    public function __construct()
    {
        parent::__construct();
        $this->load->library('Auth_check');
    }

    public function index()
    {
        $data['page_title'] = 'Reports';
        $data['active']     = 'report';
        $data['items']      = $this->items;

        $this->load->view('layout/header', $data);
        $this->load->view('report/index', $data);
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

        $data['page_title'] = 'Report — ' . htmlspecialchars($item['title']);
        $data['active']     = 'report';
        $data['item']       = $item;

        $this->load->view('layout/header', $data);
        $this->load->view('report/detail', $data);
        $this->load->view('layout/footer', $data);
    }
}
