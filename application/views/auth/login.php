<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login — CI Demo</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
    <style>
        body {
            min-height: 100vh;
            background: linear-gradient(135deg, #1e2a3a 0%, #2d4061 50%, #1a3a5c 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 1rem;
        }
        .login-card {
            width: 100%;
            max-width: 400px;
            border: none;
            border-radius: 1rem;
            box-shadow: 0 20px 60px rgba(0,0,0,.35);
            overflow: hidden;
        }
        .login-header {
            background: linear-gradient(135deg, #3b82f6, #1d4ed8);
            padding: 2rem 1.75rem 1.5rem;
            color: #fff;
            text-align: center;
        }
        .login-header .brand-icon {
            width: 56px; height: 56px;
            background: rgba(255,255,255,.15);
            border-radius: .75rem;
            display: inline-flex; align-items: center; justify-content: center;
            font-size: 1.6rem;
            margin-bottom: .75rem;
        }
        .login-header h4 { font-weight: 700; margin-bottom: .15rem; }
        .login-header p  { font-size: .82rem; opacity: .8; margin: 0; }
        .login-body { padding: 1.75rem; background: #fff; }

        .form-control:focus {
            border-color: #3b82f6;
            box-shadow: 0 0 0 .2rem rgba(59,130,246,.2);
        }
        .input-group-text { background: #f8fafc; border-right: none; color: #6b7280; }
        .form-control { border-left: none; }
        .btn-login {
            background: linear-gradient(135deg, #3b82f6, #1d4ed8);
            border: none;
            font-weight: 600;
            letter-spacing: .3px;
        }
        .btn-login:hover { background: linear-gradient(135deg, #2563eb, #1e40af); }
        .hint-box {
            background: #eff6ff;
            border: 1px solid #bfdbfe;
            border-radius: .5rem;
            padding: .6rem .85rem;
            font-size: .78rem;
            color: #1d4ed8;
            margin-top: .75rem;
        }
    </style>
</head>
<body>

<div class="card login-card">
    <div class="login-header">
        <div class="brand-icon">
            <i class="bi bi-grid-3x3-gap-fill"></i>
        </div>
        <h4>CI Demo App</h4>
        <p>Sign in to your account</p>
    </div>

    <div class="login-body">
        <?php if (!empty($error)): ?>
            <div class="alert alert-danger d-flex align-items-center py-2 mb-3" role="alert">
                <i class="bi bi-exclamation-triangle-fill me-2"></i>
                <small><?= htmlspecialchars($error) ?></small>
            </div>
        <?php endif; ?>

        <?= form_open('auth/login', ['class' => '']) ?>

            <div class="mb-3">
                <label class="form-label fw-semibold small text-secondary">Username</label>
                <div class="input-group">
                    <span class="input-group-text"><i class="bi bi-person-fill"></i></span>
                    <input type="text" name="username" class="form-control"
                           placeholder="Enter username" required
                           value="<?= set_value('username') ?>">
                </div>
            </div>

            <div class="mb-4">
                <label class="form-label fw-semibold small text-secondary">Password</label>
                <div class="input-group">
                    <span class="input-group-text"><i class="bi bi-lock-fill"></i></span>
                    <input type="password" name="password" class="form-control"
                           placeholder="Enter password" required>
                </div>
            </div>

            <button type="submit" class="btn btn-primary btn-login w-100 py-2">
                <i class="bi bi-box-arrow-in-right me-1"></i> Sign In
            </button>

        <?= form_close() ?>

        <div class="hint-box">
            <i class="bi bi-info-circle me-1"></i>
            Default credentials: <strong>admin</strong> / <strong>admin123</strong>
        </div>
    </div>
</div>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
