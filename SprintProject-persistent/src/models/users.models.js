const users = [
    {   
        id:0,
        email: "delilah@gmail.com",
        name: "Doña Delilah",
        tel: 3144499986,
        adress: "Calle 200sur#90f-33",
        password: "12345",
        isAdmin: true
    },
];

const allUsers = () => {
    return users;
}

const pushUsers = (email,name, tel, adress, password) => {
    const valUser = users[users.length-1].id+1;
    const newUser = {   
            id: users.length,
            email: email,
            name: name,
            tel: tel,
            adress: adress,
            password: password,
            isAdmin: false
        }
    
    users.push(newUser);
    
    return users
};

const putUsers = (id,email,name, tel, adress, password) => {
    const filter = users.find( u => u.id == id)
    filter.email = email,
    filter.name = name;
    filter.tel = tel;
    filter.adress = adress;
    filter.password = password
    return filter
}

module.exports = {allUsers, pushUsers, putUsers}