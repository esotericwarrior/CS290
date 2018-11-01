




-- get all playable characters for the champ wiki page
Select champName from champ

-- get the attack and defense stats per champ
Select atk, def, champName from champ

-- search for a champ on the wiki page
Select champName, atk, def from champ where champName = [champ_name_from_wiki_search]

-- search for your stats based on your team
Select * from playerTeam pt
	INNER JOIN team t
	ON t.teamID = pt.teamID
	
-- Pull all stats for user for the games they won
select * from playerTeam pt
	INNER JOIN team t
	on t.teamID = pt.teamID
	INNER JOIN game g
	on g.winningTeamID = t.teamID

-- show the champs the various players play
Select c.champName as "Champion Name", p.userID as "User Name" from champ c 
	INNER JOIN playerTeam pt ON pt.champPlayID = c.champID
	INNER JOIN player p ON p.playerID = pt.playerID
order by pt.playerTeamID desc

-- to create a new player
INSERT into player(userID,server,email) VALUES ([userIDInput], [serverInput], [emailInput])

-- change a player's name
UPDATE player SET userID=[userIDInput] where userID=[old_ID_user_replaces]

-- to delete a player's account: this is a stored procedure which first deletes tables using
-- foreign keys before removing row from it's primary table
CALL deletePlayer([userIDInput])

