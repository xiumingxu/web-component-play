const _ = require('lodash');

const PubProto = ()=>{
    let sublist = {
    };
    return {
        subscribe(channel, subscriber){
            if (!sublist[channel]){
                sublist[channel] = [];
            }
            if (sublist[channel].includes(subscriber)){
                return;

            }else{
                sublist[channel].push(subscriber);
            }
        },
        notify(channel){/* 不写 function 就是成员变量了*/
            if(sublist[channel])
                for (const subscriber of sublist[channel]){
                    subscriber();
             }
        }
    }


}


const publisher = PubProto();

const registerChannel = _.curry(publisher.subscribe);
const registerChannel1 = registerChannel("1");

const registerChannel2 = registerChannel("2");

const sub1 =  ()=>{console.log("hihi")}
const sub2 =  ()=>{console.log("hihi2")}


registerChannel2(sub2);
registerChannel1(sub1);

// publisher.subscribe("1",sub1)
// publisher.subscribe("1",sub1)
// publisher.subscribe("1",sub2);


publisher.notify("1");
publisher.notify("2");
// publisher.notify("2");




