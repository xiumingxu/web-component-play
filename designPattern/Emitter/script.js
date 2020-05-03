class EventEmitter {
    constructor () {
        this._events = {};
    }
    //观察者版本
    // 不用 [] 而是直接一个歇息传递的
    // on (channel, subscriber) {
    //     if (!this.list[channel]) {
    //         this.list[channel] = [];
    //     }
    //     this.list[channel].push(subscriber);
    // }

    // emit (channel, message) {
    //     if (!this.list[channel]) return;
    //     this.list[channel].forEach(s => {
    //         s(message);
    //     });
    // }
    on (type, listener) {
        this._events[type] = listener;
    }

    emit (type, ...args) {
        if (this._events[type]) {
            this._events[type].call(this, ...args);
        }
    }
}

const emitter = new EventEmitter();
emitter.on('log', param => {
    console.log(param);
});
emitter.emit('log', 'Event Fire');
