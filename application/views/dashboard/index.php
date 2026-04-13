<?php defined('BASEPATH') OR exit('No direct script access allowed'); ?>

<!-- ── Summary Cards ──────────────────────────────────────────────────── -->
<div class="row g-3 mb-4">
    <div class="col-sm-6 col-xl-3">
        <div class="card border-0 shadow-sm h-100">
            <div class="card-body d-flex align-items-center gap-3">
                <div class="rounded-3 p-3" style="background:#eff6ff">
                    <i class="bi bi-people-fill fs-4 text-primary"></i>
                </div>
                <div>
                    <div class="text-muted small">Total Users</div>
                    <div class="fs-4 fw-bold">24</div>
                </div>
            </div>
        </div>
    </div>
    <div class="col-sm-6 col-xl-3">
        <div class="card border-0 shadow-sm h-100">
            <div class="card-body d-flex align-items-center gap-3">
                <div class="rounded-3 p-3" style="background:#f0fdf4">
                    <i class="bi bi-file-earmark-bar-graph-fill fs-4 text-success"></i>
                </div>
                <div>
                    <div class="text-muted small">Reports</div>
                    <div class="fs-4 fw-bold">12</div>
                </div>
            </div>
        </div>
    </div>
    <div class="col-sm-6 col-xl-3">
        <div class="card border-0 shadow-sm h-100">
            <div class="card-body d-flex align-items-center gap-3">
                <div class="rounded-3 p-3" style="background:#fffbeb">
                    <i class="bi bi-lightning-charge-fill fs-4 text-warning"></i>
                </div>
                <div>
                    <div class="text-muted small">Active Items</div>
                    <div class="fs-4 fw-bold">8</div>
                </div>
            </div>
        </div>
    </div>
    <div class="col-sm-6 col-xl-3">
        <div class="card border-0 shadow-sm h-100">
            <div class="card-body d-flex align-items-center gap-3">
                <div class="rounded-3 p-3" style="background:#fdf4ff">
                    <i class="bi bi-graph-up-arrow fs-4" style="color:#a855f7"></i>
                </div>
                <div>
                    <div class="text-muted small">Growth</div>
                    <div class="fs-4 fw-bold">+18%</div>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- ── Chart + Activity ───────────────────────────────────────────────── -->
<div class="row g-3">
    <!-- Bar Chart -->
    <div class="col-lg-7">
        <div class="card border-0 shadow-sm">
            <div class="card-header bg-white border-0 pt-3 pb-0 px-4">
                <h6 class="fw-semibold mb-0">Monthly Activity <span class="text-muted fw-normal">(2024)</span></h6>
            </div>
            <div class="card-body px-4 pb-4">
                <canvas id="activityChart" height="220"></canvas>
            </div>
        </div>
    </div>

    <!-- Recent Activity Table -->
    <div class="col-lg-5">
        <div class="card border-0 shadow-sm">
            <div class="card-header bg-white border-0 pt-3 pb-0 px-4">
                <h6 class="fw-semibold mb-0">Recent Activity</h6>
            </div>
            <div class="card-body p-0">
                <div class="table-responsive">
                    <table class="table table-hover align-middle mb-0 small">
                        <thead class="table-light">
                            <tr>
                                <th class="ps-4">User</th>
                                <th>Action</th>
                                <th class="pe-4">Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td class="ps-4">Alice J.</td>
                                <td><span class="badge text-bg-success">Login</span></td>
                                <td class="pe-4 text-muted">2 min ago</td>
                            </tr>
                            <tr>
                                <td class="ps-4">Bob M.</td>
                                <td><span class="badge text-bg-primary">Report</span></td>
                                <td class="pe-4 text-muted">15 min ago</td>
                            </tr>
                            <tr>
                                <td class="ps-4">Carol W.</td>
                                <td><span class="badge text-bg-warning text-dark">Update</span></td>
                                <td class="pe-4 text-muted">1 hr ago</td>
                            </tr>
                            <tr>
                                <td class="ps-4">David L.</td>
                                <td><span class="badge text-bg-info text-dark">Export</span></td>
                                <td class="pe-4 text-muted">3 hr ago</td>
                            </tr>
                            <tr>
                                <td class="ps-4">Eva B.</td>
                                <td><span class="badge text-bg-secondary">Logout</span></td>
                                <td class="pe-4 text-muted">5 hr ago</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>

<script>
(function () {
    const labels = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    const data   = [42, 58, 51, 73, 66, 88, 95, 79, 110, 98, 115, 130];

    new Chart(document.getElementById('activityChart'), {
        type: 'bar',
        data: {
            labels,
            datasets: [{
                label: 'Activity',
                data,
                backgroundColor: 'rgba(59,130,246,.75)',
                borderRadius: 6,
                borderSkipped: false,
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: { legend: { display: false } },
            scales: {
                y: { beginAtZero: true, grid: { color: 'rgba(0,0,0,.05)' } },
                x: { grid: { display: false } }
            }
        }
    });
})();
</script>
