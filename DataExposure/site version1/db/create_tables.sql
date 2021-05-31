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

