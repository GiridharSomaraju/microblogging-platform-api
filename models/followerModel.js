const pool = require("../config/db")

// follow user model

const followUser = async(follower_user_id,userId) => {
    const query = `
    INSERT INTO 
        followertable(follower_user_id,following_user_id)
        VALUES($1,$2)`;
    return await pool.query(query, [follower_user_id, userId]);
}

// unfollow user model 

const getFollowUser = async(follower_user_id,userId) => {
     const query = `
     SELECT
        * 
     FROM 
        followertable 
    WHERE 
        follower_user_id = $1 
    AND 
        following_user_id = $2;`;
    return await pool.query(query, [follower_user_id, userId]);
}

const unfollowUser = async(follower_user_id,userId) => {
    const query = `
    DELETE FROM 
        followertable 
    WHERE 
        follower_user_id = $1 
    AND 
        following_user_id = $2`;

    return  await pool.query(query, [follower_user_id, userId]);
}

// following users models

const getFollowingUsers = async(follower_user_id) => {
    const query = `
    SELECT 
        u.user_id,
        u.name 
    FROM 
        followertable f 
    INNER JOIN 
        usertable u 
    ON 
        f.following_user_id = u.user_id
    WHERE 
        follower_user_id = $1`;
    return await pool.query(query, [follower_user_id]);
}

// followed users models

const getFollowedUsers = async(follower_user_id) => {
    const query = `
    SELECT 
        u.user_id,
        u.name 
    FROM 
        followertable f 
    INNER JOIN 
        usertable u 
    ON 
        f.follower_user_id = u.user_id
    WHERE 
        following_user_id = $1`;
    
    return await pool.query(query, [follower_user_id]);
}



module.exports = {followUser,getFollowUser,unfollowUser,getFollowingUsers,getFollowedUsers}