<?php
defined('BASEPATH') OR exit('No direct script access allowed');

require_once APPPATH . 'core/MY_API_Controller.php';

/**
 * api/Report
 *
 * JSON API for the Report module.
 *
 *   GET  /api/report/list          — list all reports
 *   GET  /api/report/detail/:id    — get single report
 */
class Report extends MY_API_Controller {

    // Mirrors the dummy data in the PHP Report controller.
    private $reports = [
        [
            'id'       => 1,
            'title'    => 'Q1 Revenue Summary',
            'category' => 'Finance',
            'author'   => 'Frank Wilson',
            'status'   => 'Published',
            'created'  => '2024-01-31',
            'summary'  => 'Quarterly revenue breakdown showing a 12% increase compared to Q4 2023. Key growth areas include SaaS subscriptions and enterprise contracts.',
        ],
        [
            'id'       => 2,
            'title'    => 'User Acquisition Report',
            'category' => 'Marketing',
            'author'   => 'Bob Martinez',
            'status'   => 'Published',
            'created'  => '2024-02-15',
            'summary'  => 'Analysis of new user sign-ups across all channels. Organic search accounts for 45% of new acquisitions, up from 38% last quarter.',
        ],
        [
            'id'       => 3,
            'title'    => 'Infrastructure Audit 2024',
            'category' => 'Technical',
            'author'   => 'Henry Zhang',
            'status'   => 'Draft',
            'created'  => '2024-03-02',
            'summary'  => 'Comprehensive review of server infrastructure, cloud costs, and uptime metrics. Recommendations for scaling included.',
        ],
        [
            'id'       => 4,
            'title'    => 'Sprint Velocity Trends',
            'category' => 'Engineering',
            'author'   => 'Alice Johnson',
            'status'   => 'Published',
            'created'  => '2024-02-28',
            'summary'  => 'Six-month sprint velocity analysis showing steady improvement in delivery throughput across two engineering teams.',
        ],
        [
            'id'       => 5,
            'title'    => 'Employee Satisfaction Survey',
            'category' => 'HR',
            'author'   => 'Eva Brown',
            'status'   => 'Draft',
            'created'  => '2024-03-10',
            'summary'  => 'Annual employee satisfaction survey results. Overall score: 7.8/10. Key areas for improvement: remote work tooling and career growth clarity.',
        ],
        [
            'id'       => 6,
            'title'    => 'Product Roadmap Review',
            'category' => 'Management',
            'author'   => 'Carol White',
            'status'   => 'Published',
            'created'  => '2024-03-05',
            'summary'  => 'Bi-annual product roadmap review covering completed milestones, upcoming features, and strategic pivots for H2 2024.',
        ],
        [
            'id'       => 7,
            'title'    => 'Security Compliance Report',
            'category' => 'Technical',
            'author'   => 'David Lee',
            'status'   => 'Published',
            'created'  => '2024-03-18',
            'summary'  => 'SOC 2 Type II audit findings and remediation status. 3 medium-severity findings resolved; 1 low-severity finding in progress.',
        ],
    ];

    // ----------------------------------------------------------------

    /**
     * GET /api/report/list
     */
    public function list()
    {
        $this->_require_auth();

        $this->_json([
            'success' => true,
            'data'    => $this->reports,
            'total'   => count($this->reports),
        ]);
    }

    // ----------------------------------------------------------------

    /**
     * GET /api/report/detail/:id
     */
    public function detail($id)
    {
        $this->_require_auth();

        $id     = (int) $id;
        $report = null;

        foreach ($this->reports as $r) {
            if ($r['id'] === $id) {
                $report = $r;
                break;
            }
        }

        if ( ! $report) {
            $this->_json(['success' => false, 'message' => 'Report not found'], 404);
        }

        $this->_json(['success' => true, 'data' => $report]);
    }
}
