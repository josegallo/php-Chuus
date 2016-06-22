CREATE TABLE IF NOT EXISTS `pairs_of_questions` (
  `id` int(11) NOT NULL,
  `question_1` varchar(350) NOT NULL,
  `votes_1` int(10) NOT NULL DEFAULT '1',
  `question_2` varchar(350) NOT NULL,
  `votes_2` int(10) NOT NULL DEFAULT '1'
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `pairs_of_questions`
--

INSERT INTO `pairs_of_questions` (`id`, `question_1`, `votes_1`, `question_2`, `votes_2`) VALUES
(1, 'Vivir siempre en verano', 67, 'Vivir siempre en invierno', 8),
(2, 'Tener 10 hijos completamente obedientes', 41, 'Tener 1 hijo completamente desobediente', 25),
(3, 'Siempre que escuchas musica escuchar  solo las 10 canciones que mas te gustan', 36, 'No escuchar nunca ninguna cancion', 27),
(4, 'Tener las piernas superlargas', 54, 'Tener los brazos superlargos', 28),
(5, 'Morirte de cogelacion', 58, 'Morirte de afixia', 27),
(6, 'Ir una vez al mes al cine', 34, 'Ver todas las pelis que quieras y cuando quieras en tu ordenador', 40),
(7, 'Ser muy sano y feo', 75, 'Ser muy guapo y enfermo', 47),
(8, 'Que tu persona querida no vaya a la carcel y tu ser pobre', 9, 'Tu seas rico y que tu persona querida vaya a la carcel', 3),
(9, 'Votimar arcoiris', 4, 'Cagar arcoiris', 56),
(10, 'Ser negro', 210, 'Ser Blanco', 10),
(11, 'Morir Matando', 4, 'Morir Amando', 417),
(12, 'Vestir siempre de negro', 1, 'No poder vestir nunca de negro', 3),
(13, ' Comer hamburguesa ', 2, ' Comer Pizza ', 6);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `proposed_questions`
--

CREATE TABLE IF NOT EXISTS `proposed_questions` (
  `id` int(11) NOT NULL,
  `question_p_1` varchar(250) NOT NULL,
  `question_p_2` varchar(250) NOT NULL,
  `status` set('Pendent','Acepted','Deleted') NOT NULL DEFAULT 'Pendent',
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `proposed_questions`
--

INSERT INTO `proposed_questions` (`id`, `question_p_1`, `question_p_2`, `status`, `user_id`) VALUES
(5, 'hola', 'hola', 'Pendent', 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL,
  `Name` varchar(250) NOT NULL,
  `email` varchar(250) NOT NULL,
  `password` varchar(250) NOT NULL,
  `admin` set('True','False') CHARACTER SET utf8mb4 NOT NULL DEFAULT 'False',
  `hash` varchar(250) CHARACTER SET utf8mb4 NOT NULL,
  `active` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `Name`, `email`, `password`, `admin`, `hash`, `active`) VALUES
(1, 'Jose', 'josegallo@gmail.com', 'Jose1234', 'True', '', 0),
(2, 'Jimena', 'josegallo2@gmail.com', 'Jose1234', 'False', '', 0),
(3, 'Adela', 'josegallo3@gmail.com', 'Jose1234', 'False', '', 0),
(4, 'Felipe', 'josegallo4@gmail.com', 'Jose1234', 'False', '', 0),
(10, 'Macarena', 'josegallo4@gmail.com', 'Jose1234', 'False', '605ff764c617d3cd28dbbdd72be8f9a2', 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user_questions`
--

CREATE TABLE IF NOT EXISTS `user_questions` (
  `user_id` int(11) NOT NULL,
  `pair_of_questions_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `user_questions`
--

INSERT INTO `user_questions` (`user_id`, `pair_of_questions_id`) VALUES
(1, 1),
(1, 2),
(1, 3),
(1, 4),
(1, 5),
(2, 6),
(3, 7),
(2, 8),
(2, 9),
(4, 10),
(4, 11),
(1, 12),
(3, 13);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `pairs_of_questions`
--
ALTER TABLE `pairs_of_questions`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `proposed_questions`
--
ALTER TABLE `proposed_questions`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `pairs_of_questions`
--
ALTER TABLE `pairs_of_questions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=14;
--
-- AUTO_INCREMENT de la tabla `proposed_questions`
--
ALTER TABLE `proposed_questions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=11;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
