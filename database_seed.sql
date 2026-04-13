-- CodeIgniter Demo App — Database Seed
-- Run this once to create the schema and seed the default admin user.
-- Default credentials: username=admin  password=admin123

CREATE DATABASE IF NOT EXISTS `ci_demo` CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `ci_demo`;

CREATE TABLE IF NOT EXISTS `users` (
    `id`         INT(11)      NOT NULL AUTO_INCREMENT,
    `username`   VARCHAR(50)  NOT NULL,
    `password`   VARCHAR(255) NOT NULL,
    `name`       VARCHAR(100) NOT NULL,
    `role`       VARCHAR(20)  NOT NULL DEFAULT 'user',
    `created_at` TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- password: admin123
INSERT INTO `users` (`username`, `password`, `name`, `role`) VALUES
('admin', '$2y$10$it05neIW4UdC3egeO2W77OJefUXOxx4Ow661xr/GeO/s9Q1SSZgWe', 'Administrator', 'admin');
