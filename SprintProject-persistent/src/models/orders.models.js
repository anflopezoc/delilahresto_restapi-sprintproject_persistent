const { request } = require("express");

const {AllProducts} = require('./products.models');
const { allUsers } = require("./users.models");

const orders = [
    {   
        id:0,
        name: "Doña Delilah",
        username: "delilah@gmail.com",
        order: [],
        orderCost: 0,
        adress: "Calle 200sur#90f-33",
        tel :3144499986,
        pay: 'Efectivo',
        state: 'Pendiente'
    }
];


const allOrders = () => {
    return orders;
}

const newOrder = (Order) => {
    return orders.push(Order)
}

const userUpdate = (id,name, username,order,orderCost,adress,tel,pago,state) => {
  return  {   
        id:id,
        name:name,
        username: username,
        order: order,
        orederCost: orderCost,
        adress: adress,
        tel: tel,
        pay: pago,
        state: state
    }
}
const newUserModel = (email,adress,tel) => {
    const user = allUsers().find( u => u.email == email);
    return orders.push( {   
          id:orders.length,
          username: email,
          name: user.name,
          order: [],
          orederCost: 0,
          adress: adress,
          tel: tel,
          pay: 'Efectivo',
          state: 'Pendiente'
      })
  };
  

const orderCostUpdate = (filter) => {
    const Prices = filter.order.map(u => u.price * u.q);
    let totalOrder = 0;
    for (let i of Prices) totalOrder+=i;
    filter.orderCost = totalOrder
    return filter
}

const filterPP = (id, user) => {
    const product = AllProducts().find(u => u.id == id);
    const filter = orders.find(u => u.username == user);
    return product, filter
}

const pays = [{id:1,method:'efectivo'},{id:2,method:'transferencia'},{id:3,method:'tarjeta'}]

const allPay = () => {
    return pays;
}

const newPay = (pay) => {
    const newpay =  {
        "id": pays[pays.length-1].id+1,
        "method": pay
    };
    return pays.push(newpay);
}

const changePay = (id,pay) => {
    const payFind = pays.find(u=> u.id == id);
    payFind.mode = pay;
    return pays
}

const deletePay = (id) => {
    const payFind = pays.find(u=> u.id == id);
    pays.splice(pays.lastIndexOf(payFind),1);
    return pays;
}

const states = [{id:1,mode:'Pendiente'},{id:2,mode:'Confirmado'},{id:3,mode:'Preparación'},{id:4,mode:'Enviado'},{id:5,mode:'Entregado'}];

const allStates  = () => {
    return states
};

const changeState = (id,state) => {
    const stateFind = states.find( u=> u.id == id);
    stateFind.mode = state;
    return stateFind
};

const deleteState = (id) => {
    const stateFind = states.find(u => u.id == id);
    states.splice(states.lastIndexOf(stateFind),1);
    return states
};



module.exports = {allOrders, newOrder, userUpdate,newUserModel, orderCostUpdate, filterPP, allPay, newPay, changePay, deletePay, allStates, changeState, deleteState}



