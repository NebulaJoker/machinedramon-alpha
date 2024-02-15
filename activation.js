async function sendValidationLink(user, tag, actlink) {

    const newUser = client.users.cache.filter((item) => item.username === user && item.discriminator === tag)

    for (const user of newUser)
        user[1].send(`Click the following link to fully activate your account.
${serverURL}/validate?activation=${actlink}`);
}