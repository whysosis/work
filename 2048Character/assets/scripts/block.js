//import colors from 'color';
var colors = [];
var words = [];
cc.Class({
    extends: cc.Component,
    properties: {
        numberLabel:cc.Label
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },
    word_string(number){
        switch(number) {
            case 0 : words = "";colors= cc.color(198,184,172,255); break;
            case 2 : words = "木";colors= cc.color(235,224,213,255); break;
            case 3 : words = "火";colors= cc.color(235,224,213,255); break;
            case 5 : words = "氵";colors= cc.color(235,224,213,255); break;

            case 11 : words = "木";colors= cc.color(200,255,207,255); break;
            case 13 : words = "寸";colors= cc.color(200,255,207,255); break;
            case 17 : words = "干";colors= cc.color(200,255,207,255); break;
            case 19 : words = "可";colors= cc.color(200,255,207,255); break;

            case 22 : words = "林";colors= cc.color(234,192,71,255); break;
            case 26 : words = "村";colors= cc.color(234,192,71,255); break;
            case 34 : words = "杆";colors= cc.color(234,192,71,255); break;
            case 38 : words = "柯";colors= cc.color(234,192,71,255); break;
            case 51 : words = "㶥";colors= cc.color(234,192,71,255); break;
            case 55 : words = "沐";colors= cc.color(234,192,71,255); break;
            case 85 : words = "汗";colors= cc.color(234,192,71,255); break;
            case 95 : words = "河";colors= cc.color(234,192,71,255); break;
            
        }
    },

    setNumber(number){
        if(number == 0) {
            this.numberLabel.node.opacity = 0;  //透明度设置为0，相当于隐藏
        }
        this.word_string(number);
        this.numberLabel.string = words;
        this.node.color = colors;
        //确保number在colors里
    }
    // update (dt) {},
});
