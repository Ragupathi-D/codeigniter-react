<?php
defined('BASEPATH') OR exit('No direct script access allowed');
$CI     =& get_instance();
$u_name = htmlspecialchars($CI->session->userdata('name') ?? 'User');
$u_role = htmlspecialchars($CI->session->userdata('role') ?? '');
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?= isset($page_title) ? htmlspecialchars($page_title) . ' — ' : '' ?>CI Demo</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
    <style>
        :root {
            --sidebar-width: 230px;
            --topbar-height: 56px;
            --sidebar-bg: #1e2a3a;
            --sidebar-hover: #29384f;
            --sidebar-active: #3b82f6;
            --topbar-bg: #ffffff;
        }

        body { background: #f4f6f9; }

        /* ── Sidebar ──────────────────────────────────── */
        #sidebar {
            position: fixed;
            top: 0; left: 0; bottom: 0;
            width: var(--sidebar-width);
            background: var(--sidebar-bg);
            display: flex;
            flex-direction: column;
            z-index: 1040;
            overflow-y: auto;
        }
        .sidebar-brand {
            height: var(--topbar-height);
            display: flex;
            align-items: center;
            padding: 0 1.25rem;
            font-size: 1.15rem;
            font-weight: 700;
            color: #fff;
            letter-spacing: .5px;
            border-bottom: 1px solid rgba(255,255,255,.08);
            text-decoration: none;
        }
        .sidebar-brand i { color: var(--sidebar-active); margin-right: .55rem; font-size: 1.3rem; }
        .sidebar-nav { padding: .75rem 0; flex: 1; }
        .sidebar-nav .nav-link {
            color: rgba(255,255,255,.65);
            padding: .6rem 1.25rem;
            border-radius: 0;
            font-size: .88rem;
            display: flex;
            align-items: center;
            gap: .6rem;
            transition: background .15s, color .15s;
        }
        .sidebar-nav .nav-link i { font-size: 1rem; width: 1.2rem; text-align: center; }
        .sidebar-nav .nav-link:hover  { background: var(--sidebar-hover); color: #fff; }
        .sidebar-nav .nav-link.active { background: var(--sidebar-active); color: #fff; }
        .sidebar-section {
            padding: .55rem 1.25rem .2rem;
            font-size: .7rem;
            text-transform: uppercase;
            letter-spacing: .08em;
            color: rgba(255,255,255,.35);
        }

        /* ── Topbar ───────────────────────────────────── */
        #topbar {
            position: fixed;
            top: 0;
            left: var(--sidebar-width);
            right: 0;
            height: var(--topbar-height);
            background: var(--topbar-bg);
            border-bottom: 1px solid #e5e7eb;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 1.5rem;
            z-index: 1030;
            box-shadow: 0 1px 3px rgba(0,0,0,.06);
        }
        .topbar-title { font-weight: 600; font-size: .95rem; color: #374151; }
        .topbar-user  { display: flex; align-items: center; gap: .75rem; }
        .user-badge {
            width: 34px; height: 34px;
            background: var(--sidebar-active);
            color: #fff;
            border-radius: 50%;
            display: flex; align-items: center; justify-content: center;
            font-weight: 700; font-size: .8rem;
        }
        .user-info   { line-height: 1.2; }
        .user-info .name   { font-size: .85rem; font-weight: 600; color: #111827; }
        .user-info .role   { font-size: .72rem; color: #6b7280; text-transform: capitalize; }

        /* ── Main content ─────────────────────────────── */
        #main-wrapper {
            margin-left: var(--sidebar-width);
            padding-top: var(--topbar-height);
            min-height: 100vh;
            display: flex;
            flex-direction: column;
        }
        #page-content { flex: 1; padding: 1.75rem; }
    </style>
</head>
<body>

<!-- ════════════════════════════════ SIDEBAR ═══════════════════════════════ -->
<nav id="sidebar">
    <a href="<?= base_url('dashboard') ?>" class="sidebar-brand">
        <i class="bi bi-grid-3x3-gap-fill"></i>CI Demo
    </a>

    <div class="sidebar-nav">
        <div class="sidebar-section">Main</div>
        <a href="<?= base_url('dashboard') ?>"
           class="nav-link <?= (isset($active) && $active === 'dashboard') ? 'active' : '' ?>">
            <i class="bi bi-speedometer2"></i> Dashboard
        </a>

        <div class="sidebar-section mt-2">Modules</div>
        <a href="<?= base_url('admin') ?>"
           class="nav-link <?= (isset($active) && $active === 'admin') ? 'active' : '' ?>">
            <i class="bi bi-people-fill"></i> Admin
        </a>
        <a href="<?= base_url('report') ?>"
           class="nav-link <?= (isset($active) && $active === 'report') ? 'active' : '' ?>">
            <i class="bi bi-file-earmark-bar-graph-fill"></i> Reports
        </a>
    </div>
</nav>

<!-- ════════════════════════════════ TOPBAR ════════════════════════════════ -->
<div id="topbar">
    <span class="topbar-title"><?= isset($page_title) ? htmlspecialchars($page_title) : 'CI Demo' ?></span>
    <div class="topbar-user">
        <div class="user-badge"><?= strtoupper(substr($u_name, 0, 1)) ?></div>
        <div class="user-info">
            <div class="name"><?= $u_name ?></div>
            <div class="role"><?= $u_role ?></div>
        </div>
        <a href="<?= base_url('auth/logout') ?>" class="btn btn-sm btn-outline-danger ms-2">
            <i class="bi bi-box-arrow-right"></i> Logout
        </a>
    </div>
</div>

<!-- ════════════════════════════════ CONTENT ═══════════════════════════════ -->
<div id="main-wrapper">
    <div id="page-content">
