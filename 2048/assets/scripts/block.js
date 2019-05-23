import colors from 'color';

cc.Class({
    extends: cc.Component,

    properties: {
        numberLabel:cc.Label
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    setNumber(number){
        if(number == 0) {
            this.numberLabel.node.opacity = 0;  //透明度设置为0，相当于隐藏
        }
        this.numberLabel.string = number;
        if(number in colors){
            this.node.color = colors[number];
        } //确保number在colors里

    }
    // update (dt) {},
});
