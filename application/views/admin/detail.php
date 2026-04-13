<?php defined('BASEPATH') OR exit('No direct script access allowed'); ?>

<div class="mb-3">
    <a href="<?= base_url('admin') ?>" class="btn btn-sm btn-outline-secondary">
        <i class="bi bi-arrow-left"></i> Back to List
    </a>
</div>

<div class="row g-3">
    <!-- Profile card -->
    <div class="col-md-4">
        <div class="card border-0 shadow-sm text-center">
            <div class="card-body py-4">
                <div class="mx-auto mb-3 rounded-circle d-flex align-items-center justify-content-center"
                     style="width:72px;height:72px;background:#eff6ff;font-size:1.8rem;color:#3b82f6;font-weight:700;">
                    <?= strtoupper(substr($item['name'], 0, 1)) ?>
                </div>
                <h5 class="fw-bold mb-0"><?= htmlspecialchars($item['name']) ?></h5>
                <p class="text-muted small mb-2"><?= htmlspecialchars($item['role']) ?></p>
                <?php if ($item['status'] === 'Active'): ?>
                    <span class="badge text-bg-success">Active</span>
                <?php else: ?>
                    <span class="badge text-bg-secondary">Inactive</span>
                <?php endif; ?>
            </div>
        </div>
    </div>

    <!-- Details card -->
    <div class="col-md-8">
        <div class="card border-0 shadow-sm">
            <div class="card-header bg-white border-0 pt-3 px-4">
                <h6 class="fw-semibold mb-0">User Details</h6>
            </div>
            <div class="card-body px-4 pb-4">
                <dl class="row mb-0">
                    <dt class="col-sm-4 text-muted small fw-normal">User ID</dt>
                    <dd class="col-sm-8">#<?= $item['id'] ?></dd>

                    <dt class="col-sm-4 text-muted small fw-normal">Full Name</dt>
                    <dd class="col-sm-8"><?= htmlspecialchars($item['name']) ?></dd>

                    <dt class="col-sm-4 text-muted small fw-normal">Email</dt>
                    <dd class="col-sm-8"><?= htmlspecialchars($item['email']) ?></dd>

                    <dt class="col-sm-4 text-muted small fw-normal">Department</dt>
                    <dd class="col-sm-8"><?= htmlspecialchars($item['department']) ?></dd>

                    <dt class="col-sm-4 text-muted small fw-normal">Role</dt>
                    <dd class="col-sm-8"><?= htmlspecialchars($item['role']) ?></dd>

                    <dt class="col-sm-4 text-muted small fw-normal">Status</dt>
                    <dd class="col-sm-8">
                        <?php if ($item['status'] === 'Active'): ?>
                            <span class="badge text-bg-success">Active</span>
                        <?php else: ?>
                            <span class="badge text-bg-secondary">Inactive</span>
                        <?php endif; ?>
                    </dd>

                    <dt class="col-sm-4 text-muted small fw-normal">Joined</dt>
                    <dd class="col-sm-8"><?= $item['joined'] ?></dd>
                </dl>
            </div>
        </div>
    </div>
</div>
