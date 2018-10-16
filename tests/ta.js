let o={a:1,b:555};
let m=new Map();
for (let k in o){
  m.set(k,o[k]);
}
console.log(m)
