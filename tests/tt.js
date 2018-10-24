let re1={
  method:'get',
  body:{
    name:'wan'
  }
};
let re2={
  body:{
    name:'da',
    age:55
  }
};
console.log(Object.assign({},re1,{body:{}}))
