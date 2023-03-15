-- Active: 1676042007474@@127.0.0.1@3306
CREATE TABLE users (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role TEXT NOT NULL,
    created_at TEXT DEFAULT (DATETIME()) NOT NULL
);

INSERT INTO users (id, name, email, password, role) 
VALUES
('U001','Pedro Maia', 'pedro@email.com', 'Estudante1*', "ADMIN"),
('U002','Carlos Ferreira', 'carleto@email.com', 'estUdante2%', "NORMAL"),
('U003','Bruno Meyer', 'brunin@email', 'estudANte3&', "NORMAL");

SELECT * FROM users;

DELETE FROM users
WHERE name = "João Paulo";

DROP TABLE users;

CREATE TABLE posts (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    creator_id TEXT NOT NULL,
    content TEXT NOT NULL,
    likes INTEGER DEFAULT(0) NOT NULL,
    dislikes INTEGER DEFAULT(0) NOT NULL,
    created_at TEXT DEFAULT (DATETIME()) NOT NULL,
    updated_at TEXT NOT NULL,
    FOREIGN KEY (creator_id) REFERENCES users (id) ON DELETE CASCADE ON UPDATE CASCADE
);

INSERT INTO posts (id, creator_id, content, likes, dislikes, created_at, updated_at)
VALUES
	("P001", "U001", "Backend é melhor que frontend!", 2, 1, "2023-02-17T10:28:00.000Z", "2023-02-17T10:28:00.000Z"),
	("P002", "U002", "FrontEnd dá brilho ao trabalho do backend", 1, 2, "2023-02-17T10:28:00.000Z", "2023-02-17T10:28:00.000Z"),
	("P003", "U003", "Preciso aprender Python", 1, 1, "2023-02-17T10:28:00.000Z", "2023-02-17T10:28:00.000Z");

SELECT * FROM posts;

DROP TABLE posts;

CREATE TABLE likes_dislikes (
user_id TEXT NOT NULL,
post_id TEXT NOT NULL,
like INTEGER NOT NULL,
FOREIGN KEY (user_id) REFERENCES users (id)  ON DELETE CASCADE ON UPDATE CASCADE,
FOREIGN KEY (post_id) REFERENCES posts (id)  ON DELETE CASCADE ON UPDATE CASCADE
);

INSERT INTO likes_dislikes (user_id, post_id, like)
VALUES
	("U001", "P002", 1),
    ("U001", "P003", 1),
    ("U002", "P001", 1),
	("U002", "P003", 0),
	("U003", "P002", 1),
	("U003", "P001", 0);

UPDATE posts
SET likes = 1
WHERE id = "P001";

UPDATE posts
SET likes = 2
WHERE id = "P002";

UPDATE posts
SET likes = 1
WHERE id = "P003";

SELECT * FROM posts;

SELECT * FROM likes_dislikes;

DROP TABLE likes_dislikes;

    SELECT
    posts.id,
    posts.creator_id,
    posts.content,
    posts.likes,
    posts.dislikes,
    posts.created_at,
    posts.updated_at,
    users.name AS creator_name
    FROM posts
    JOIN users
    ON posts.creator_id = users.id;

    SELECT * FROM posts;

    DELETE FROM posts
    WHERE content = "Front e Back se complementam!";