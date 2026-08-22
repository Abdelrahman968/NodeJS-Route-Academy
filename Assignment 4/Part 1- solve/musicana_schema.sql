CREATE DATABASE musicana;

USE musicana;

CREATE TABLE  Musician (
    MusicianID INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(100) NOT NULL,
    Street VARCHAR(150),
    City VARCHAR(100),
    Phone VARCHAR(20)
);

CREATE TABLE Instrument (
    InstrumentName VARCHAR(100) PRIMARY KEY,
    MusicalKey     VARCHAR(10)
);

CREATE TABLE Album (
    AlbumID       INT AUTO_INCREMENT PRIMARY KEY,
    Title         VARCHAR(150) NOT NULL UNIQUE,
    CopyrightDate DATE,
    ProducerID    INT NOT NULL,
    FOREIGN KEY (ProducerID) REFERENCES Musician(MusicianID)
);

CREATE TABLE Song (
    SongTitle VARCHAR(150) PRIMARY KEY,
    Author    VARCHAR(100),
    AlbumID   INT,
    FOREIGN KEY (AlbumID) REFERENCES Album(AlbumID)
);


# Musician plays Instrument (M:N)
CREATE TABLE Plays (
    MusicianID     INT NOT NULL,
    InstrumentName VARCHAR(100) NOT NULL,
    PRIMARY KEY (MusicianID, InstrumentName),
    FOREIGN KEY (MusicianID) REFERENCES Musician(MusicianID),
    FOREIGN KEY (InstrumentName) REFERENCES Instrument(InstrumentName)
);

# Musician performs Song (M:N)
CREATE TABLE Performs (
    MusicianID INT NOT NULL,
    SongTitle  VARCHAR(150) NOT NULL,
    PRIMARY KEY (MusicianID, SongTitle),
    FOREIGN KEY (MusicianID) REFERENCES Musician(MusicianID),
    FOREIGN KEY (SongTitle) REFERENCES Song(SongTitle)
);


SELECT 
    TABLE_NAME, 
    COLUMN_NAME, 
    CONSTRAINT_NAME,
    REFERENCED_TABLE_NAME, 
    REFERENCED_COLUMN_NAME
FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE
WHERE REFERENCED_TABLE_NAME IS NOT NULL 
  AND TABLE_SCHEMA = 'musicana';