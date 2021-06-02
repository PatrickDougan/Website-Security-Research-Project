CREATE DATABASE IF NOT EXISTS `wsrp` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `wsrp`;

CREATE TABLE IF NOT EXISTS `accounts` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(100) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

INSERT INTO `accounts` (`id`, `username`, `password`, `email`) VALUES (1, 'test', 'test', 'test@test.com');
INSERT INTO `accounts` (`id`, `username`, `password`, `email`) VALUES (2, 'root', 'password12345', 'badpassword@root.com');
INSERT INTO `accounts` (`id`, `username`, `password`, `email`) VALUES (3, 'user', 'user', 'user@gmail.com');
INSERT INTO `accounts` (`id`, `username`, `password`, `email`) VALUES (4, 'admin', '@Hd&^Gh!JuDx', 'goodpassword@gmail.com');
INSERT INTO `accounts` (`id`, `username`, `password`, `email`) VALUES (5, 'user12', 'user12', 'user12@gmail.com');
INSERT INTO `accounts` (`id`, `username`, `password`, `email`) VALUES (6, 'user13', 'user13', 'user13@gmail.com');
INSERT INTO `accounts` (`id`, `username`, `password`, `email`) VALUES (7, 'user22', 'user22', 'user22@gmail.com');
INSERT INTO `accounts` (`id`, `username`, `password`, `email`) VALUES (8, 'user33', 'user33', 'user33@gmail.com');
INSERT INTO `accounts` (`id`, `username`, `password`, `email`) VALUES (9, 'user44', 'user44', 'user44@gmail.com');
INSERT INTO `accounts` (`id`, `username`, `password`, `email`) VALUES (10, 'userOSU', 'userOSU', 'userOSU@oregonstate.edu');
INSERT INTO `accounts` (`id`, `username`, `password`, `email`) VALUES (11, 'test123', 'test123', 'test123@email.com');
INSERT INTO `accounts` (`id`, `username`, `password`, `email`) VALUES (12, 'user55', 'user55', 'user55@gmail.com');
INSERT INTO `accounts` (`id`, `username`, `password`, `email`) VALUES (13, 'user66', 'user66', 'user66@gmail.com');
INSERT INTO `accounts` (`id`, `username`, `password`, `email`) VALUES (14, 'user77', 'user77', 'user77@gmail.com');
INSERT INTO `accounts` (`id`, `username`, `password`, `email`) VALUES (15, 'user88', 'user88', 'user88@gmail.com');
INSERT INTO `accounts` (`id`, `username`, `password`, `email`) VALUES (16, 'user99', 'user99', 'user99@gmail.com');
INSERT INTO `accounts` (`id`, `username`, `password`, `email`) VALUES (17, 'user00', 'user00', 'user00@gmail.com');
INSERT INTO `accounts` (`id`, `username`, `password`, `email`) VALUES (18, 'user11', 'user11', 'user11@gmail.com');
INSERT INTO `accounts` (`id`, `username`, `password`, `email`) VALUES (19, 'user12345', 'user12345', 'user12345@gmail.com');
INSERT INTO `accounts` (`id`, `username`, `password`, `email`) VALUES (20, 'nightscopeCS', 'capstone', 'hardinre@oregonstate.edu');


ALTER TABLE `accounts` ADD PRIMARY KEY (`id`);
ALTER TABLE `accounts` MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=2;