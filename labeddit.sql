-- Active: 1679278094983@@127.0.0.1@3306
CREATE TABLE users (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    nick_name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role TEXT DEFAULT "NORMAL" NOT NULL,
    created_at TEXT DEFAULT (DATETIME()) NOT NULL
);

CREATE TABLE posts (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    creator_id TEXT NOT NULL,
    content TEXT NOT NULL,
    likes INTEGER DEFAULT(0) NOT NULL,
    dislikes INTEGER DEFAULT(0) NOT NULL,
    replies INTEGER DEFAULT(0) NOT NULL,
    created_at TEXT DEFAULT (DATETIME()) NOT NULL,
    updated_at TEXT NOT NULL,
    FOREIGN KEY (creator_id) REFERENCES users(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE likes_dislikes_post (
    user_id TEXT NOT NULL,
    post_id TEXT NOT NULL,
    like INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (post_id) REFERENCES posts(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE comments (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    creator_id TEXT NOT NULL,
    post_id TEXT NOT NULL,
    content TEXT NOT NULL,
    likes INTEGER DEFAULT(0) NOT NULL,
    dislikes INTEGER DEFAULT(0) NOT NULL,
    created_at TEXT DEFAULT (DATETIME()) NOT NULL,
    updated_at TEXT NOT NULL,
    FOREIGN KEY (creator_id) REFERENCES users(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
    FOREIGN KEY (post_id) REFERENCES posts(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE likes_dislikes_post_comment (
    user_id TEXT NOT NULL,
    comment_id TEXT NOT NULL,
    like INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (comment_id) REFERENCES comments(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

INSERT INTO users (id, nick_name, email, password, created_at, role)
VALUES
('2d6d7b88-abd8-4eb1-aeb8-eb4edea0582f','Pedro Maia', 'pedro@email.com', '$2a$12$Knb5/DVOgs1moyWjiePsL.Gd8hlbhBkYyV2swJaVZ4l/37Hjdzsfm',"2023-02-17T10:28:00.000Z" ,"ADMIN"),
('c42dc6a9-0a33-4d03-8699-891e342ba27d','Carlos Ferreira', 'carleto@email.com', '$2a$12$Sl7gxbNGMId8GzoO2o2Gku0iH0Azh5cNkLVh/MbwQFnCrVgBoCciq',"2023-02-17T10:28:00.000Z","NORMAL"),
('183d483a-bada-4e8f-8177-251d5c08d819','Bruno Meyer', 'brunin@email', '$2a$12$Oqv1TM.HwXnPC5va7e3FauD6xVZwo/N8uM1UARyt75daHg0bFbBY2',"2023-02-17T10:28:00.000Z" ,"NORMAL"),
('4174210c-b99a-405a-afdf-d64c310d94dc','Zé gotinha', 'gotinha@email', '$2a$12$K1ghWqsG/1JMpFEg/c3Z6O0oklJaOw2qWQyRsaoytz5LimUHLkCnO',"2023-02-17T10:28:00.000Z", "NORMAL");


INSERT INTO posts (id, creator_id, content, likes, dislikes, replies, created_at, updated_at)
VALUES
	("a4daeeef-54a3-4b59-9e10-ff0bb35379d6", '2d6d7b88-abd8-4eb1-aeb8-eb4edea0582f', "Backend é melhor que frontend!", 0, 0, 1, "2023-02-17T10:28:00.000Z", "2023-02-17T10:28:00.000Z"),
	("5a313904-2b14-43d2-8d70-6e7113e5c111", 'c42dc6a9-0a33-4d03-8699-891e342ba27d', "FrontEnd dá brilho ao trabalho do backend", 0, 1, 1, "2023-02-17T10:28:00.000Z", "2023-02-17T10:28:00.000Z"),
	("ac2ec464-b7f2-44ac-8e60-328619a5b7b2", '183d483a-bada-4e8f-8177-251d5c08d819', "Preciso aprender Python", 3, 1, 1, "2023-02-17T10:28:00.000Z", "2023-02-17T10:28:00.000Z"),
    ("8dd355d8-87b5-4def-a97a-f10b68d71eba", '4174210c-b99a-405a-afdf-d64c310d94dc', "Amo ser FullStack!", 1, 0, 1, "2023-02-17T10:28:00.000Z", "2023-02-17T10:28:00.000Z");

INSERT INTO likes_dislikes_post (user_id, post_id, like)
VALUES
('2d6d7b88-abd8-4eb1-aeb8-eb4edea0582f', "5a313904-2b14-43d2-8d70-6e7113e5c111", 0),
('c42dc6a9-0a33-4d03-8699-891e342ba27d', "a4daeeef-54a3-4b59-9e10-ff0bb35379d6",0),
('2d6d7b88-abd8-4eb1-aeb8-eb4edea0582f', "ac2ec464-b7f2-44ac-8e60-328619a5b7b2",1),
('183d483a-bada-4e8f-8177-251d5c08d819', "8dd355d8-87b5-4def-a97a-f10b68d71eba",1),
('4174210c-b99a-405a-afdf-d64c310d94dc', "ac2ec464-b7f2-44ac-8e60-328619a5b7b2",1),
('c42dc6a9-0a33-4d03-8699-891e342ba27d', "8dd355d8-87b5-4def-a97a-f10b68d71eba",1);

INSERT INTO comments (id, creator_id, post_id, content, likes, dislikes, created_at, updated_at)
VALUES
	("6b6858a1-7cb9-4e61-b6e2-ccbefb6582c3", '2d6d7b88-abd8-4eb1-aeb8-eb4edea0582f', "5a313904-2b14-43d2-8d70-6e7113e5c111", "Legal.", 1, 0, "2023-02-17T10:28:00.000Z", "2023-02-17T10:28:00.000Z"),
	("0168c64f-9629-4a3a-bea8-3eaa83568f63", 'c42dc6a9-0a33-4d03-8699-891e342ba27d', "a4daeeef-54a3-4b59-9e10-ff0bb35379d6", "Bacana.", 1, 0, "2023-02-17T10:28:00.000Z", "2023-02-17T10:28:00.000Z"),
	("98192da1-d013-4073-8732-18bc60992fb2", '183d483a-bada-4e8f-8177-251d5c08d819', "8dd355d8-87b5-4def-a97a-f10b68d71eba", "Nada a ver.", 1, 0, "2023-02-17T10:28:00.000Z", "2023-02-17T10:28:00.000Z"),
	("6f9bda0d-547f-495b-8512-efc8dfadf9b5", '4174210c-b99a-405a-afdf-d64c310d94dc', "ac2ec464-b7f2-44ac-8e60-328619a5b7b2", "Verdade.", 1, 0, "2023-02-17T10:28:00.000Z", "2023-02-17T10:28:00.000Z");

INSERT INTO likes_dislikes_post_comment (user_id, comment_id, like)
VALUES
('2d6d7b88-abd8-4eb1-aeb8-eb4edea0582f', "6b6858a1-7cb9-4e61-b6e2-ccbefb6582c3", 1),
('c42dc6a9-0a33-4d03-8699-891e342ba27d', "0168c64f-9629-4a3a-bea8-3eaa83568f63",1),
('2d6d7b88-abd8-4eb1-aeb8-eb4edea0582f', "98192da1-d013-4073-8732-18bc60992fb2",1),
('183d483a-bada-4e8f-8177-251d5c08d819', "6f9bda0d-547f-495b-8512-efc8dfadf9b5",1);


SELECT * FROM users;

SELECT * FROM posts;

SELECT * FROM comments;

SELECT * FROM likes_dislikes_post;

SELECT * FROM likes_dislikes_post_comment;

DROP TABLE users;
DROP TABLE posts;
DROP TABLE likes_dislikes_post;

DROP TABLE likes_dislikes_post_comment;

UPDATE posts
SET creator_id = "c42dc6a9-0a33-4d03-8699-891e342ba27d"
WHERE id = "5a313904-2b14-43d2-8d70-6e7113e5c111";

SELECT * FROM posts
INNER JOIN comments
ON posts.id = comments.post_id;