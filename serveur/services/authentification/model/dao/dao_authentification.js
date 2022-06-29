const dao = require('./dao_factory')

const authentificationUser = async (username, password)=>{
    const session = dao.driver.session(dao.getDBName())
    // const result = await session.run(`CREATE (user:User {name: "${username}", password: "${password}"}) RETURN user`)
    const result = await session.run(`MATCH (user:User) WHERE user.uname="${username}" AND user.upass="${password}" RETURN user LIMIT 1`)
    return result.records.map(i => i.get('user').properties)
}

const registerUser = async (username, userphone, usermail, usertype, userpassw, utoken)=>{
    const session = dao.driver.session(dao.getDBName())
    const result = await session.run(`CREATE (user:User {uname: "${username}", umail: "${usermail}", uphone: "${userphone}", utype: "${usertype}", upass: "${userpassw}", utoken: "${utoken}"}) RETURN user`)
    // const result = await session.run(`MATCH (user:User) WHERE user.name=${username} AND user.password=${password} RETURN user`)
    return result.records.map(i => i.get('user').properties)
}

const updateUserInfosByToken = async (username, userphone, usermail, usertype, oldname, token)=>{
    const session = dao.driver.session(dao.getDBName())
    const result = await session.run(`MATCH (user:User {uname: "${oldname}", utoken: "${token}"}) SET user.uname="${username}", user.umail="${usermail}", user.uphone="${userphone}", user.utype="${usertype}" RETURN user`)
    return result.records.map(i => i.get('user').properties)
}

const updateUserToken = async (username, userpassw, utoken)=>{
    const session = dao.driver.session(dao.getDBName())
    const result = await session.run(`MATCH (user:User {uname: "${username}", upass: "${userpassw}"}) SET user.utoken="${utoken}" RETURN user`)
    return result.records.map(i => i.get('user').properties)
}

const fetchUserInfosByToken = async (username, utoken)=>{
    const session = dao.driver.session(dao.getDBName())
    const result = await session.run(`MATCH (user:User {uname: "${username}", utoken: "${utoken}"}) RETURN user`)
    return result.records.map(i => i.get('user').properties)
}

// const fetchAllUserInfos = async () => {
//     const session = dao.driver.session(dao.getDBName())
//     const result = await session.run(``)
//     session.close()
//     return result.records.map(i => i.get('n').properties)
// }

module.exports = {
    authentificationUser, 
    registerUser,
    updateUserInfosByToken,
    updateUserToken,
    fetchUserInfosByToken
};
