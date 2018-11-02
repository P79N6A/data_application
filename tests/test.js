
function getPromise({delay,call}){
  if (! call) {throw new Error('haha')}
  return new Promise(((resolve,reject) => {
    setTimeout(()=>{
      resolve('55665')
    },delay);
  }));
}
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
  })
