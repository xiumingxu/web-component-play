readFile(filename,(err, content)=>{
    parseXML(content, (err, xml)=>{

    })
})

then(callback).catch(callback).finally();
readFile(filename){
    return new Promise(resolve, reject){
        
    }
}
//只是连式结构
Promise.resolve(1) //把入参改成结束的方法
new Promise(resolve=>resolve(1));

Promise.reject(error)
new Promise((resolve, reject)=> reject(error))

Promise.all('abc')
Promise.race('abc')

//await/async 是真的不需要 callback 的方式 await 现在是必须 async,  也有全局支持的支持星狂
// 限制
async function readXML(filename){
    const content = await readFile(filename);
    ...
}