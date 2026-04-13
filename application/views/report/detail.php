<?php defined('BASEPATH') OR exit('No direct script access allowed'); ?>

<div class="mb-3">
    <a href="<?= base_url('report') ?>" class="btn btn-sm btn-outline-secondary">
        <i class="bi bi-arrow-left"></i> Back to Reports
    </a>
</div>

<div class="row g-3">
    <!-- Status card -->
    <div class="col-md-4">
        <div class="card border-0 shadow-sm">
            <div class="card-body py-4 text-center">
                <div class="mx-auto mb-3 rounded-3 d-flex align-items-center justify-content-center"
                     style="width:64px;height:64px;background:#f0fdf4;font-size:1.7rem;">
                    <i class="bi bi-file-earmark-bar-graph-fill text-success"></i>
                </div>
                <h6 class="fw-bold mb-1"><?= htmlspecialchars($item['title']) ?></h6>
                <p class="text-muted small mb-2"><?= htmlspecialchars($item['category']) ?></p>
                <?php if ($item['status'] === 'Published'): ?>
                    <span class="badge text-bg-success">Published</span>
                <?php else: ?>
                    <span class="badge text-bg-warning text-dark">Draft</span>
                <?php endif; ?>
            </div>
        </div>
    </div>

    <!-- Details card -->
    <div class="col-md-8">
        <div class="card border-0 shadow-sm">
            <div class="card-header bg-white border-0 pt-3 px-4">
                <h6 class="fw-semibold mb-0">Report Details</h6>
            </div>
            <div class="card-body px-4 pb-4">
                <dl class="row mb-0">
                    <dt class="col-sm-4 text-muted small fw-normal">Report ID</dt>
                    <dd class="col-sm-8">#<?= $item['id'] ?></dd>

                    <dt class="col-sm-4 text-muted small fw-normal">Title</dt>
                    <dd class="col-sm-8"><?= htmlspecialchars($item['title']) ?></dd>

                    <dt class="col-sm-4 text-muted small fw-normal">Category</dt>
                    <dd class="col-sm-8"><?= htmlspecialchars($item['category']) ?></dd>

                    <dt class="col-sm-4 text-muted small fw-normal">Author</dt>
                    <dd class="col-sm-8"><?= htmlspecialchars($item['author']) ?></dd>

                    <dt class="col-sm-4 text-muted small fw-normal">Status</dt>
                    <dd class="col-sm-8">
                        <?php if ($item['status'] === 'Published'): ?>
                            <span class="badge text-bg-success">Published</span>
                        <?php else: ?>
                            <span class="badge text-bg-warning text-dark">Draft</span>
                        <?php endif; ?>
                    </dd>

                    <dt class="col-sm-4 text-muted small fw-normal">Created</dt>
                    <dd class="col-sm-8"><?= $item['created'] ?></dd>

                    <dt class="col-sm-4 text-muted small fw-normal pt-2">Summary</dt>
                    <dd class="col-sm-8 pt-2"><?= htmlspecialchars($item['summary']) ?></dd>
                </dl>
            </div>
        </div>
    </div>
</div>
