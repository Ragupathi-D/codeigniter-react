<?php defined('BASEPATH') OR exit('No direct script access allowed'); ?>

    </div><!-- /#page-content -->

    <!-- ══ Footer ══════════════════════════════════════════════════════════ -->
    <footer class="border-top bg-white py-3 px-4 mt-auto">
        <small class="text-muted">
            &copy; <?= date('Y') ?> CI Demo &mdash; Built with CodeIgniter 3 &amp; Bootstrap 5
        </small>
    </footer>

</div><!-- /#main-wrapper -->

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.3/dist/chart.umd.min.js"></script>
<?php if (isset($extra_js)): ?>
    <?= $extra_js ?>
<?php endif; ?>
</body>
</html>
