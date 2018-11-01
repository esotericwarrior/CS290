--
-- Authors: John Casillas and Tristan Santiago
-- Project Step 2 Draft Version: ERD, Schema & DDQ
--
-- This is the creation of a simple League of Legends
-- database. It tracks several players and teams and
-- their stats.



--
-- Table structure for table 'player'
--

DROP TABLE IF EXISTS `player`;

CREATE TABLE `player` (
`playerID` int(11) not null auto_increment,
`userID` varchar(255) not null,
`server` varchar(20) not null,
`email` varchar(255) not null,
primary key (`playerID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table 'player'
--

LOCK TABLES `player` WRITE;
-- insert here
INSERT INTO `player` VALUES 
	(1, 'CaSaltBae', 'NA', 'casillaj@oregonstate.edu')
	,(2, 'Tsoteric', 'SK', 'tristan@yeet.com')
	,(3, 'Hector', 'NA', 'randomEmail@blah.com')
	,(4, 'Blah', 'SK', 'tristan1@yeet.com')
	,(5, 'DudeGuy', 'SK', 'tristan2@yeet.com')
	,(6, 'myMan', 'SK', 'tristan3@yeet.com')
	,(7, 'Guydude', 'SA', 'tristan4@yeet.com')
	,(8, 'manSicle', 'SK', 'tristan5@yeet.com')
	,(9, 'lolATlol', 'NA', 'tristan6@yeet.com')
	,(10, 'GGEZ', 'NA', 'tristan7@yeet.com')
	,(11, 'CMONMAN', 'SK', 'tristan8@yeet.com');
UNLOCK TABLES;



--
-- Table structure for table 'team'
--
DROP TABLE IF EXISTS `team`;

CREATE TABLE `team` (
`teamID` int(11) not null auto_increment,
`teamColor` int(1) NOT NULL DEFAULT '0',
primary key (`teamID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table 'team'
--

LOCK TABLES `team` WRITE;
-- insert here
INSERT INTO `team` VALUES 
(1,1)
,(2,0)
,(3,1)
,(4,0)
,(5,1)
,(6,0)
,(7,1)
,(8,0)
,(9,1);

UNLOCK TABLES;


--
-- Table structure for table 'champ'
--
DROP TABLE IF EXISTS `champ`;

CREATE TABLE `champ` (
`champID` int(11) not null auto_increment,
`champName` varchar(255) not null,
`atk` int(11) not null,
`def` int(11) not null,
primary key (`champID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table 'champ'
--

LOCK TABLES `champ` WRITE;
-- insert here
INSERT INTO `champ` VALUES 
(1,'Garen',100,100)
,(2,'Braum',50,200)
,(3,'Teemo',150,75)
,(4,'Talon',150,50)
,(5,'Zed',175,55)
,(6,'GangPlank',125,75)
,(7,'Morgana',100,100);

UNLOCK TABLES;

--
-- Table structure for table 'playerTeam'
--
DROP TABLE IF EXISTS `playerTeam`;

CREATE TABLE `playerTeam` (
`playerTeamID` int(11) not null auto_increment,
`playerID` int(11) NOT NULL DEFAULT '0',
`teamColorID` int(1) NOT NULL DEFAULT '0',
`playerKills` int(11) not null,
`playerDeaths` int(11) not null,
`teamKills` int(11) not null,
`teamDeaths` int(11) not null,
`barons` int(11) not null,
`champBanID` int(11) NOT NULL DEFAULT '0',
`champPlayID` int(11) NOT NULL DEFAULT '0',
primary key (`playerTeamID`),
-- https://dba.stackexchange.com/questions/15530/what-does-ibfk-stand-for-in-mysql
CONSTRAINT `playerTeam_ibfk_1` FOREIGN KEY (`playerID`) REFERENCES `player` (`playerID`),
CONSTRAINT `playerTeam_ibfk_2` FOREIGN KEY (`teamColorID`) REFERENCES `team` (`teamColor`),
CONSTRAINT `playerTeam_ibfk_3` FOREIGN KEY (`champBanID`) REFERENCES `champ` (`champID`),
CONSTRAINT `playerTeam_ibfk_4` FOREIGN KEY (`champPlayID`) REFERENCES `champ` (`champID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table 'playerTeam'
--

LOCK TABLES `playerTeam` WRITE;
-- insert here
INSERT INTO `playerTeam` VALUES 
(1,1,1,4,0,12,4,1,2,4)
,(2,3,1,5,1,12,4,1,1,5)
,(3,6,1,3,3,12,4,1,4,1)
,(4,7,1,7,2,12,4,1,2,4)
,(5,2,3,8,1,16,3,3,4,1)
,(6,4,3,4,4,16,3,3,2,1)
,(7,9,3,5,1,16,3,3,1,2);

UNLOCK TABLES;


--
-- Table structure for table 'game'
--
DROP TABLE IF EXISTS `game`;


CREATE TABLE `game` (
`gameID` int(11) not null auto_increment,
`team1ID` int(11) NOT NULL DEFAULT '0',
`team2ID` int(11) NOT NULL DEFAULT '0',
`winningTeamID` int(11) NOT NULL DEFAULT '0',
primary key (`gameID`),
CONSTRAINT `game_ibfk_1` FOREIGN KEY (`team1ID`) REFERENCES `team` (`teamID`),
CONSTRAINT `game_ibfk_2` FOREIGN KEY (`team2ID`) REFERENCES `team` (`teamID`),
CONSTRAINT `game_ibfk_3` FOREIGN KEY (`winningTeamID`) REFERENCES `team` (`teamID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table 'game'
--

LOCK TABLES `game` WRITE;
-- insert here
INSERT INTO `game` VALUES 
(1,1,2,2)
,(2,3,4,4)
,(3,3,2,3)
,(4,6,7,7)
,(5,2,6,2)
,(6,3,4,4);

UNLOCK TABLES;

