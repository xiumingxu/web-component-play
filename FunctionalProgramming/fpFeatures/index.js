const orders = [
    {price: 1, id: 1},
    {price: 2, id: 2},
    {price: 3, id: 3},
]

const sumUp = (total, order)=> total + order.price;
const totalAmount = orders.reduce(sumUp, 0);

console.log(totalAmount);