
INSERT INTO bands (name,director_fname,director_lname) VALUES ("Beginning","Dwight","Vance");
INSERT INTO bands (name,director_fname,director_lname) VALUES ("Intermediate","Frank","Kenney");
INSERT INTO bands (name,director_fname,director_lname) VALUES ("Advanced","Kristine","Janes");

INSERT INTO students (lname, fname, grade, bid) VALUES ("Smith", "Bobby", 6, (select id from bands where name="Advanced"));
INSERT INTO students (lname, fname, grade, bid) VALUES ("Jones", "Billy", 5, (select id from bands where name="Beginning"));
INSERT INTO students (lname, fname, grade, bid) VALUES ("Zip", "Frank", 7, 3=(select id from bands where name="Advanced"));
INSERT INTO students (lname, fname, grade, bid) VALUES ("Jameson", "Henry", 6, (select id from bands where name="Intermediate"));
INSERT INTO students (lname, fname, grade, bid) VALUES ("Conway", "Sly", 6, (select id from bands where name="Intermediate"));
INSERT INTO students (lname, fname, grade, bid) VALUES ("Green", "John", 7, (select id from bands where name="Advanced"));
INSERT INTO students (lname, fname, grade, bid) VALUES ("Green", "Hank", 5, (select id from bands where name="Beginning"));
INSERT INTO students (lname, fname, grade, bid) VALUES ("Haran", "Brady", 8, (select id from bands where name="Advanced"));
INSERT INTO students (lname, fname, grade, bid) VALUES ("Clark", "Josh", 5, (select id from bands where name="Beginning"));
INSERT INTO students (lname, fname, grade, bid) VALUES ("Bryant", "Chuck", 8, (select id from bands where name="Intermediate"));
INSERT INTO students (lname, fname, grade, bid) VALUES ("Dubner", "Steve", 7, (select id from bands where name="Advanced"));
INSERT INTO students (lname, fname, grade, bid) VALUES ("Hardwick", "Chris", 7, (select id from bands where name="Advanced"));
INSERT INTO students (lname, fname, grade, bid) VALUES ("Koenig", "Sarah", 5, (select id from bands where name="Beginning"));
INSERT INTO students (lname, fname, grade, bid) VALUES ("Smith", "Robert", 8, (select id from bands where name="Advanced"));
INSERT INTO students (lname, fname, grade, bid) VALUES ("Jiang", "Jessica", 6, (select id from bands where name="Intermediate"));
INSERT INTO students (lname, fname, grade, bid) VALUES ("Johnson", "Joshua", 7, (select id from bands where name="Intermediate"));
INSERT INTO students (lname, fname, grade, bid) VALUES ("Gross", "Terry", 8, (select id from bands where name="Advanced"));

INSERT INTO instruments (type,  manufacturer, serial_num, needs_repair) VALUES ("Saxophone", "Selmer", "A87266JI", "0");
INSERT INTO instruments (type,  manufacturer, serial_num, needs_repair,last_repair_date) VALUES ("Tuba", "Conn", "2F29473KK", "1",DATE('1998-12-26'));
INSERT INTO instruments (type,  manufacturer, serial_num, needs_repair) VALUES ("Euphonium", "Jupiter", "9762FFG23987", "1");
INSERT INTO instruments (type,  manufacturer, serial_num, needs_repair,last_repair_date) VALUES ("Trombone", "Egger", "7263930-AJR-8", "0",DATE('2003-07-18'));
INSERT INTO instruments (type,  manufacturer, serial_num, needs_repair,last_repair_date) VALUES ("Trombone", "Courtois", "27365-AZA-7", "0",DATE('2000-02-21'));
INSERT INTO instruments (type,  manufacturer, serial_num, needs_repair,last_repair_date) VALUES ("Flute", "Jupiter", "8236565-J2", "1",DATE('1998-04-01'));
INSERT INTO instruments (type,  manufacturer, serial_num, needs_repair,last_repair_date) VALUES ("Piccolo", "Keefe", "8TUZ-1836A", "0",DATE('1997-12-13'));

INSERT INTO music (title, composer, temp_bpm, difficulty, length) VALUES ("Lord of the Rings: Gandalf","Johan de Meij","98","8", "00:08:28");
INSERT INTO music (title, composer, temp_bpm, difficulty, length) VALUES ("Four Scottish Dances: Allegretto","Malcolm Arnold","96","5","00:02:42");
INSERT INTO music (title, composer, temp_bpm, difficulty, length) VALUES ("Appalachian Spring","Aaron Copland","80","7","00:26:41");
INSERT INTO music (title, composer, temp_bpm, difficulty, length) VALUES ("Symphony No. 3","James Barnes","96","6","00:21:12");
INSERT INTO music (title, composer, temp_bpm, difficulty, length) VALUES ("Irish Tune from County Derry","Percy Grainger","65","4","00:04:16");
INSERT INTO music (title, composer, temp_bpm, difficulty, length) VALUES ("The Planets","Gustav Holst","126","8","00:45:02");
INSERT INTO music (title, composer, temp_bpm, difficulty, length) VALUES ("Masquerade","Vincent Persichetti","116","5","00:12:27");
INSERT INTO music (title, composer, temp_bpm, difficulty, length) VALUES ("Toccata Marziale","Ralph Vaughan Williams","107","5","00:04:45");
INSERT INTO music (title, composer, temp_bpm, difficulty, length) VALUES ("Twinkle Twinkle, Little Star","Traditional","76","1","00:01:02");
INSERT INTO music (title, composer, temp_bpm, difficulty, length) VALUES ("Sea Shanty Variations","Timothy Loest","96","2","00:02:44");

/*
INSERT INTO practice_records (sid,date,minutes) VALUES ((select id from students WHERE fname="Bobby" AND lname="Smith"),(DATE('2017-11-25')),60);
INSERT INTO practice_records (sid,date,minutes) VALUES ((select id from students WHERE fname="Billy" AND lname="Jones"),DATE('2017-11-24'),45);
INSERT INTO practice_records (sid,date,minutes) VALUES ((select id from students WHERE fname="Frank" AND lname="Zip"),DATE('2017-11-12'),60);
INSERT INTO practice_records (sid,date,minutes) VALUES ((select id from students WHERE fname="Billy" AND lname="Jones"),DATE('2017-11-15'),30);
INSERT INTO practice_records (sid,date,minutes) VALUES ((select id from students WHERE fname="Henry" AND lname="Jameson"),DATE('2017-10-31'),120);
*/

/*
INSERT INTO student_instrument (sid,date,minutes) VALUES ((select id from students WHERE fname="Henry" AND lname="Jameson"),DATE('2017-10-31'),120);
*/
INSERT INTO student_music (sid,mid) VALUES 
  ((select id from students WHERE fname="Henry" AND lname="Jameson"),
   (select id from music WHERE title LIKE "%Symphony%"));

INSERT INTO student_music (sid,mid) VALUES 
  ((select id from students WHERE fname="Henry" AND lname="Jameson"),
   (select id from music WHERE title LIKE "%Scottish%"));

INSERT INTO student_music (sid,mid) VALUES 
  ((select id from students WHERE fname="Steve" AND lname="Dubner"),
   (select id from music WHERE title LIKE "%Gandalf%"));

INSERT INTO student_music (sid,mid) VALUES 
  ((select id from students WHERE fname="Brady" AND lname="Haran"),
   (select id from music WHERE title LIKE "%Gandalf%"));

INSERT INTO student_music (sid,mid,note) VALUES 
  ((select id from students WHERE fname="Josh" AND lname="Clark"),
   (select id from music WHERE title LIKE "%Derry%"),
    "somewhat damaged");

INSERT INTO student_music (sid,mid) VALUES 
  ((select id from students WHERE fname="Sarah" AND lname="Koenig"),
   (select id from music WHERE title LIKE "%Derry%"));


INSERT INTO band_music (bid,mid) VALUES (
 (select id from bands WHERE name="Advanced"),
 (select id from music WHERE title LIKE "%Appalachian%")
);

INSERT INTO band_music (bid,mid) VALUES (
 (select id from bands WHERE name="Advanced"),
 (select id from music WHERE title LIKE "%Gandalf%")
);

INSERT INTO band_music (bid,mid) VALUES (
 (select id from bands WHERE name="Beginning"),
 (select id from music WHERE title LIKE "%Derry%")
);

INSERT INTO band_music (bid,mid) VALUES (
 (select id from bands WHERE name="Beginning"),
 (select id from music WHERE title LIKE "%Twinkle%")
);

INSERT INTO band_music (bid,mid) VALUES (
 (select id from bands WHERE name="Intermediate"),
 (select id from music WHERE title LIKE "%Scottish%")
);

INSERT INTO band_music (bid,mid) VALUES (
 (select id from bands WHERE name="Intermediate"),
 (select id from music WHERE title LIKE "%Symphony%")
);


INSERT INTO student_instrument (sid,mid) VALUES 
  ((select id from students WHERE fname="Sarah" AND lname="Koenig"),
   (select id from instruments WHERE type LIKE "%Flute%"));

INSERT INTO student_instrument (sid,iid) VALUES 
   ((select id from students WHERE fname="Josh" AND lname="Clark"),
    (select id from instruments WHERE type LIKE "%Tuba%"));

INSERT INTO student_instrument (sid,iid) VALUES 
   ((select id from students WHERE fname="Hank" AND lname="Green"),
    (select id from instruments WHERE type LIKE "%Saxophone%"));
