
function getPromise({delay,call}){
  if (delay>5000) {throw new Error('haha')}
  return new Promise(((resolve,reject) => {
    setTimeout(resolve(call),delay);
  }));
}
/*
let Ps=Promise.race([getPromise({delay:1000,call:true}),getPromise({delay:3000, call:true})])

Ps.then(
  (e)=>{
  console.log('success',e)
     throw new Error('aaa')
  },
  (e)=>{
  console.log('fail', e)
}).then((v)=>{
    console.log('success',v)
  },
  (e)=>{
    console.log('fail', e)
  })*/
async function timeout(de, call) {
  if (de>5000){throw new Error('too long')}
  return await setTimeout(call, de)
}

let Psa=getPromise({delay:5000, call:()=>console.log('done')})
  Psa.then(v=>console.log(v.toString()))
.catch(e=>console.log('err',e))
