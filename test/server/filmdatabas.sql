DROP TABLE IF EXISTS films;
CREATE TABLE IF NOT EXISTS films(
    id      INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT
   ,title VARCHAR(30) NOT NULL
   ,year VARCHAR(4) NOT NULL
   ,director VARCHAR(30) NOT NULL
   ,genre VARCHAR(30) NOT NULL
);
INSERT INTO films(id,title,year,director,genre) VALUES 
(1,'Sagan om ringen: Härskarringen', 2001, 'Peter Jackson', 'Äventyr');
INSERT INTO films(id,title,year,director,genre) VALUES 
(2,'Mad Max: Fury Road', 2015, 'George Miller', 'Dystopisk sci-fi');
INSERT INTO films(id,title,year,director,genre) VALUES 
(3,'För en handfull dollar', 1964, 'Sergio Leone', 'Spaghetti western');
INSERT INTO films(id,title,year,director,genre) VALUES 
(4,'Modern Times', 1936, 'Charles Chaplin', 'Komedi');
INSERT INTO films(id,title,year,director,genre) VALUES 
(5,'Pulp Fiction', 1994, 'Quentin Tarantino', 'Gangster');
INSERT INTO films(id,title,year,director,genre) VALUES 
(6,'Gudfadern', 1972, 'Francis Ford Coppola', 'Gangster');
INSERT INTO films(id,title,year,director,genre) VALUES 
(7,'Jurassic Park', 1993, 'Steven Spielberg', 'Äventyr');
INSERT INTO films(id,title,year,director,genre) VALUES 
(8,'Lejonkungen', 1994, 'Roger Allers, Rob Minkoff', 'Animation');
INSERT INTO films(id,title,year,director,genre) VALUES 
(9,'Smile 2', 2024, 'Parker Finn', 'Skräck');
INSERT INTO films(id,title,year,director,genre) VALUES 
(10,'Min granne Totoro', 1988, 'Hayao Miyazaki', 'Anime');

SELECT * FROM films;

