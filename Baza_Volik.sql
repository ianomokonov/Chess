-- phpMyAdmin SQL Dump
-- version 4.9.1
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1
-- Время создания: Дек 25 2019 г., 03:59
-- Версия сервера: 10.4.8-MariaDB
-- Версия PHP: 7.3.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `games`
--

-- --------------------------------------------------------

--
-- Структура таблицы `bingocardcells`
--

CREATE TABLE `bingocardcells` (
  `CardId` int(10) NOT NULL,
  `Position` int(10) NOT NULL,
  `Value` int(10) DEFAULT NULL,
  `Closed` bit(1) DEFAULT b'0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Структура таблицы `bingocards`
--

CREATE TABLE `bingocards` (
  `Id` int(10) NOT NULL,
  `GameId` int(10) NOT NULL,
  `PlayerId` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Структура таблицы `figures`
--

CREATE TABLE `figures` (
  `Id` int(10) NOT NULL,
  `Type` varchar(255) NOT NULL,
  `Color` varchar(255) DEFAULT NULL,
  `Img` varchar(255) NOT NULL,
  `x` int(10) DEFAULT NULL,
  `y` int(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `figures`
--

INSERT INTO `figures` (`Id`, `Type`, `Color`, `Img`, `x`, `y`) VALUES
(1, 'rook', 'black', '../../assets/figures/bR.png', 0, 0),
(2, 'rook', 'black', '../../assets/figures/bR.png', 7, 0),
(3, 'knight', 'black', '../../assets/figures/bN.png', 1, 0),
(4, 'knight', 'black', '../../assets/figures/bN.png', 6, 0),
(5, 'bishop', 'black', '../../assets/figures/bB.png', 2, 0),
(6, 'bishop', 'black', '../../assets/figures/bB.png', 5, 0),
(7, 'king', 'black', '../../assets/figures/bK.png', 4, 0),
(8, 'queen', 'black', '../../assets/figures/bQ.png', 3, 0),
(9, 'rook', 'white', '../../assets/figures/wR.png', 0, 7),
(10, 'rook', 'white', '../../assets/figures/wR.png', 7, 7),
(11, 'knight', 'white', '../../assets/figures/wN.png', 1, 7),
(12, 'knight', 'white', '../../assets/figures/wN.png', 6, 7),
(13, 'bishop', 'white', '../../assets/figures/wB.png', 2, 7),
(14, 'bishop', 'white', '../../assets/figures/wB.png', 5, 7),
(15, 'king', 'white', '../../assets/figures/wK.png', 4, 7),
(16, 'queen', 'white', '../../assets/figures/wQ.png', 3, 7),
(17, 'pawn', 'black', '../../assets/figures/bP.png', 0, 1),
(18, 'pawn', 'black', '../../assets/figures/bP.png', 1, 1),
(19, 'pawn', 'black', '../../assets/figures/bP.png', 2, 1),
(20, 'pawn', 'black', '../../assets/figures/bP.png', 3, 1),
(21, 'pawn', 'black', '../../assets/figures/bP.png', 4, 1),
(22, 'pawn', 'black', '../../assets/figures/bP.png', 5, 1),
(23, 'pawn', 'black', '../../assets/figures/bP.png', 6, 1),
(24, 'pawn', 'black', '../../assets/figures/bP.png', 7, 1),
(25, 'pawn', 'white', '../../assets/figures/wP.png', 0, 6),
(26, 'pawn', 'white', '../../assets/figures/wP.png', 1, 6),
(27, 'pawn', 'white', '../../assets/figures/wP.png', 2, 6),
(28, 'pawn', 'white', '../../assets/figures/wP.png', 3, 6),
(29, 'pawn', 'white', '../../assets/figures/wP.png', 4, 6),
(30, 'pawn', 'white', '../../assets/figures/wP.png', 5, 6),
(31, 'pawn', 'white', '../../assets/figures/wP.png', 6, 6),
(32, 'pawn', 'white', '../../assets/figures/wP.png', 7, 6);

-- --------------------------------------------------------

--
-- Структура таблицы `games`
--

CREATE TABLE `games` (
  `Id` int(10) NOT NULL,
  `Type` varchar(255) NOT NULL,
  `FirstPlayerId` int(10) NOT NULL,
  `SecondPlayerId` int(10) DEFAULT NULL,
  `Color` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `games`
--

INSERT INTO `games` (`Id`, `Type`, `FirstPlayerId`, `SecondPlayerId`, `Color`) VALUES
(32, 'bingo', 9, NULL, NULL),
(33, 'bingo', 9, NULL, NULL);

-- --------------------------------------------------------

--
-- Структура таблицы `steps`
--

CREATE TABLE `steps` (
  `Id` int(10) NOT NULL,
  `GameId` int(10) NOT NULL,
  `PlayerId` int(10) NOT NULL,
  `x` int(10) NOT NULL,
  `y` int(10) NOT NULL,
  `FigureId` int(10) DEFAULT NULL,
  `Number` int(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Структура таблицы `users`
--

CREATE TABLE `users` (
  `Id` int(10) NOT NULL,
  `Name` varchar(255) NOT NULL,
  `Login` varchar(255) NOT NULL,
  `Password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `users`
--

INSERT INTO `users` (`Id`, `Name`, `Login`, `Password`) VALUES
(9, 'Ivan', 'i.a.volik@gmail.com', '1234'),
(11, 'Alex', 'volik9925@yandex.ru', '1234');

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `bingocardcells`
--
ALTER TABLE `bingocardcells`
  ADD PRIMARY KEY (`CardId`,`Position`);

--
-- Индексы таблицы `bingocards`
--
ALTER TABLE `bingocards`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `bp_fk` (`PlayerId`),
  ADD KEY `b_fk` (`GameId`);

--
-- Индексы таблицы `figures`
--
ALTER TABLE `figures`
  ADD PRIMARY KEY (`Id`);

--
-- Индексы таблицы `games`
--
ALTER TABLE `games`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `g1_fk` (`FirstPlayerId`),
  ADD KEY `g2_fk` (`SecondPlayerId`);

--
-- Индексы таблицы `steps`
--
ALTER TABLE `steps`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `sg_fk` (`GameId`),
  ADD KEY `sp_fk` (`PlayerId`);

--
-- Индексы таблицы `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`Id`),
  ADD UNIQUE KEY `Login` (`Login`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `bingocards`
--
ALTER TABLE `bingocards`
  MODIFY `Id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1177;

--
-- AUTO_INCREMENT для таблицы `figures`
--
ALTER TABLE `figures`
  MODIFY `Id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT для таблицы `games`
--
ALTER TABLE `games`
  MODIFY `Id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT для таблицы `steps`
--
ALTER TABLE `steps`
  MODIFY `Id` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `users`
--
ALTER TABLE `users`
  MODIFY `Id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- Ограничения внешнего ключа сохраненных таблиц
--

--
-- Ограничения внешнего ключа таблицы `bingocardcells`
--
ALTER TABLE `bingocardcells`
  ADD CONSTRAINT `dc_fk` FOREIGN KEY (`CardId`) REFERENCES `bingocards` (`Id`) ON DELETE CASCADE;

--
-- Ограничения внешнего ключа таблицы `bingocards`
--
ALTER TABLE `bingocards`
  ADD CONSTRAINT `b_fk` FOREIGN KEY (`GameId`) REFERENCES `games` (`Id`) ON DELETE CASCADE,
  ADD CONSTRAINT `bp_fk` FOREIGN KEY (`PlayerId`) REFERENCES `users` (`Id`) ON DELETE CASCADE;

--
-- Ограничения внешнего ключа таблицы `games`
--
ALTER TABLE `games`
  ADD CONSTRAINT `g1_fk` FOREIGN KEY (`FirstPlayerId`) REFERENCES `users` (`Id`) ON DELETE CASCADE,
  ADD CONSTRAINT `g2_fk` FOREIGN KEY (`SecondPlayerId`) REFERENCES `users` (`Id`) ON DELETE CASCADE;

--
-- Ограничения внешнего ключа таблицы `steps`
--
ALTER TABLE `steps`
  ADD CONSTRAINT `sg_fk` FOREIGN KEY (`GameId`) REFERENCES `games` (`Id`) ON DELETE CASCADE,
  ADD CONSTRAINT `sp_fk` FOREIGN KEY (`PlayerId`) REFERENCES `users` (`Id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
