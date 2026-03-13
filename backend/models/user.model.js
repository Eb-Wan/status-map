import { db } from "../config/db.js";

// create User
export const createUser = async (
    email,
    username,
    passwordHash,
    verifyToken
    ) => {
    const [result] = await db.query(
        "INSERT INTO users (email, username, password_hash, verify_token, pos) VALUES ( ?, ?, ?, ? , POINT(0, 0)) ",
        [email, username, passwordHash, verifyToken ],
    );

    return result.insertId;
};

// login trouver un user par son mail 

export const findUserByEmail = async (email) => {
    const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
    return rows[0];
};

export const findUserByVerifyToken = async (token) => {
    const [rows] = await db.query("SELECT * FROM users WHERE verify_token=?", [
        token
    ]);
    return rows[0];
};

export const verifyUser = async (userId) => {
    await db.query(
        "UPDATE users SET is_verified=1 , verify_token=NULL WHERE id= ?",
        [userId],
    );
};


export const findUserByResetToken=  async (token) => {
    const [rows] = await db.query('SELECT * FROM users WHERE reset_token=?', [token])
    return rows[0]
}

export const updatePassword = async (userId, passwordHash) => {
    await db.query('UPDATE users SET password_hash=?  WHERE id = ?', [passwordHash, userId])
}

export const saveResetPassword = async (userId, token ) => {
    await db.query('UPDATE users SET reset_token=? WHERE id=? ',  [token , userId])
}

export const findUsersByPos =  async (lat, long, rad) => {
    const lat_offset = rad / 111.32;
    const long_offset = rad / 110.574;

    const [rows] = await db.query(`
        SELECT
        id, username, mood, status, pos
        FROM users 
        WHERE ST_X(pos) BETWEEN (? - ?) AND (? + ?)
        AND ST_Y(pos) BETWEEN (? - ?) AND (? + ?)
        LIMIT 50;
    `, [ long, long_offset, long, long_offset, lat, lat_offset, lat, lat_offset]);
    
    return rows;
}

export const clearPos = async (userId) => {
    await db.query('UPDATE users SET pos=NULL WHERE id=? ',  [userId])
}

export const setPos = async (userId, lat, long) => {
    await db.query('UPDATE users SET pos=POINT(?, ?) WHERE id=? ',  [lat, long, userId])
}