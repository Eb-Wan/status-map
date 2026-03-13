-- phpMyAdmin SQL Dump
-- version 5.1.1deb5ubuntu1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Feb 17, 2026 at 02:20 PM
-- Server version: 10.6.23-MariaDB-0ubuntu0.22.04.1
-- PHP Version: 8.1.2-1ubuntu2.23

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `auth_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(10) UNSIGNED NOT NULL,
  `username` varchar(64) NOT NULL UNIQUE,
  `email` varchar(191) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `role` enum('USER','ADMIN','MODERATOR') NOT NULL DEFAULT 'USER',
  `pos` POINT NOT NULL,
  `mood` VARCHAR(32) NOT NULL DEFAULT 'NEUTRAL',
  `status` VARCHAR(256) NOT NULL DEFAULT '',
  `is_verified` tinyint(1) NOT NULL DEFAULT 0,
  `verify_token` varchar(36) DEFAULT NULL,
  `reset_token` varchar(36) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  SPATIAL INDEX(`pos`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password_hash`, `role`, `pos`, `is_verified`, `verify_token`, `reset_token`, `created_at`, `updated_at`) VALUES
(12, 'tihoh', 'tihoh60038@aixind.com', '$argon2id$v=19$m=65536,t=3,p=4$BbYcVJGrnF7fgHRyGpZ3BQ$cS2sB01UQurx+zNwujJeTCusm/qWGvuAIYBZA8aFrjc', 'USER', POINT(0, 0), 1, NULL, NULL, '2026-02-03 09:58:48', '2026-02-03 16:44:05'),
(13, 'leo', 'leo@moi.cheh', '$argon2id$v=19$m=65536,t=3,p=4$eX9eU45mSUUwYxy7XIuRTg$g0eVkt1Vgxpz7rSc9lDiPtqWYaknhdA6xgaXSo5wsG0', 'USER', POINT(0, 0), 0, 'ce979afb-7858-4a50-9001-406861ba5f34', NULL, '2026-02-17 13:18:51', '2026-02-17 13:18:51'),
(14, 'vofilok313', 'vofilok313@amiralty.com', '$argon2id$v=19$m=65536,t=3,p=4$01KdE+Cneoy0M1fEqHn3PQ$2d2dclkNGLjMk+fqI/qfTDp0Vv6dZcIt25aifSmL9wY', 'USER', POINT(0, 0), 0, 'ba0126a4-6ca4-481a-869f-daaae49cfdad', NULL, '2026-02-17 13:19:30', '2026-02-17 13:19:30');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `idx_email` (`email`),
  ADD KEY `idx_verify_token` (`verify_token`),
  ADD KEY `idx_reset_token` (`reset_token`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
