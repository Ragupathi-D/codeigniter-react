<?php defined('BASEPATH') OR exit('No direct script access allowed'); ?>

<div class="card border-0 shadow-sm">
    <div class="card-header bg-white border-0 pt-3 px-4 d-flex align-items-center justify-content-between">
        <h6 class="fw-semibold mb-0">Report List</h6>
        <span class="badge text-bg-primary"><?= count($items) ?> reports</span>
    </div>
    <div class="card-body p-0">
        <div class="table-responsive">
            <table class="table table-hover align-middle mb-0">
                <thead class="table-light">
                    <tr>
                        <th class="ps-4">#</th>
                        <th>Title</th>
                        <th>Category</th>
                        <th>Author</th>
                        <th>Status</th>
                        <th>Created</th>
                        <th class="pe-4 text-center">Action</th>
                    </tr>
                </thead>
                <tbody>
                    <?php foreach ($items as $item): ?>
                    <tr>
                        <td class="ps-4 text-muted"><?= $item['id'] ?></td>
                        <td class="fw-semibold"><?= htmlspecialchars($item['title']) ?></td>
                        <td>
                            <span class="badge text-bg-light text-dark border">
                                <?= htmlspecialchars($item['category']) ?>
                            </span>
                        </td>
                        <td class="text-muted small"><?= htmlspecialchars($item['author']) ?></td>
                        <td>
                            <?php if ($item['status'] === 'Published'): ?>
                                <span class="badge text-bg-success">Published</span>
                            <?php else: ?>
                                <span class="badge text-bg-warning text-dark">Draft</span>
                            <?php endif; ?>
                        </td>
                        <td class="text-muted small"><?= $item['created'] ?></td>
                        <td class="pe-4 text-center">
                            <a href="<?= base_url('report/detail/'.$item['id']) ?>"
                               class="btn btn-sm btn-outline-primary">
                                <i class="bi bi-eye"></i> View
                            </a>
                        </td>
                    </tr>
                    <?php endforeach; ?>
                </tbody>
            </table>
        </div>
    </div>
</div>
