const ROWS = 5;
const NUMBERS = [2,3,5,11,13,17,19];
const MIN_VEC = 50;

const RESULTS = [22,26,34,38,51,55,85,95]
cc.Class({
    extends: cc.Component,

    properties: {
        blockPre:cc.Prefab,
        size:0,//格子的大小
        gab:20,//格子的间隔
        bg:cc.Node //根节点，用来维护其他节点
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        this.drawBlock();
        this.init();//初始化
        this.addEventHandler();
    },

    //背景块绘制
    drawBlock() {
        this.size = (cc.winSize.width - (ROWS + 1) * this.gab) / ROWS; //计算每个格子的大小
        let x = this.gab + this.size/2;  //x和y仅在当前代码块有效
        let y = 1.2 * this.size;
        this.positions = []; //存储每个格子的位置，之后就不用再计算一遍格子的位置

        for (let i=0;i<ROWS;i++){
            this.positions.push([0,0,0,0,0]);
            for (let j=0;j<ROWS;j++) {
                let block = cc.instantiate(this.blockPre); //实例化
                block.width = this.size;
                block.height = this.size;
                this.bg.addChild(block);
                block.setPosition(cc.v2(x,y));
                this.positions[i][j]=cc.v2(x,y);
                x += this.gab + this.size;
                block.getComponent('block').setNumber(0); //获得block.js上的组件，0表示背景格
            }
            y += this.gab + this.size;
            x = this.gab + this.size/2; //x回到原来的位置
        }
    },

    //初始化：清除背景块
    init() {
        
        //清除现有节点，避免内存泄漏
        if(this.blocks) {
            for (let i=0; i<this.blocks.length; i++) {
                for (let j=0; j<this.blocks[i].length; j++) {
                    //当这里没有格子（null），就不用清空
                    if(this.blocks[i][j] != null) {
                        this.blocks[i][j].destroy(); //清空
                    }
                }
            }
        }
        this.blocks = [];
        this.data = []; //每个block的数字

        for (let i=0; i<ROWS; i++) {
            this.blocks.push([null,null,null,null,null]);
            this.data.push([0,0,0,0,0]);
        }
        //提供三个初始块
        this.addBlock();
        this.addBlock();
        this.addBlock();

    },

    //找空闲的块，返回空闲位置
    getEmpty() {
        let empty = [];
        for (let i=0; i<this.blocks.length; i++) {
            for(let j=0; j<this.blocks[i].length; j++) {
                if(this.blocks[i][j] == null) {
                    empty.push({x: i,y: j});
                }
            }
        }
        return empty; //存储空闲块的对应一维值
    },

    addBlock() {
        let empty = this.getEmpty();
        if (empty.length == 0) return false; //创建失败，此时没有空余块
        let emptyPos = empty[Math.floor(Math.random() * empty.length)];
        let x = emptyPos.x;
        let y = emptyPos.y;
        let position = this.positions[x][y];//获取随机的格子坐标

        //创建新格子
        let block = cc.instantiate(this.blockPre); //实例化
        block.width = this.size;
        block.height = this.size;
        this.bg.addChild(block);
        block.setPosition(position);

        let randnum = NUMBERS[Math.floor(Math.random() * NUMBERS.length)]
        block.getComponent('block').setNumber(randnum); 
        this.blocks[x][y] = block;
        this.data[x][y] = randnum;

        return true;
    },

    //对bg进行监听 touchstart、touchend
    addEventHandler() {
        this.bg.on('touchstart', function(event){   //箭头语法等同于funtion(event)，保证内外层的this一致
            this.startPos = event.getLocation();
        }.bind(this));
        
        this.bg.on('touchend', (event)=>{   //箭头语法等同于funtion(event)，保证内外层的this一致
            this.touchEnd(event);
        });

        this.bg.on('touchcancel', (event)=>{   //滑到屏幕外的情况也要触发toucheEnd函数
            this.touchEnd(event);  
        });
    },

    //读取松手处的坐标
    touchEnd(event) {
        this.endPos = event.getLocation();
            let vec = this.endPos.sub(this.startPos);

            //避免只是不小心误触的情况
            if(vec.mag() > MIN_VEC) {
                if(Math.abs(vec.x) > Math.abs(vec.y)) {//水平方向大于垂直方向当做水平移动
                    if(vec.x > 0) {
                        this.getComponent('destination').moveRight();
                    } else {
                        this.getComponent('destination').moveLeft();
                    }
                }else {  //垂直方向
                    if(vec.y > 0) {
                        this.getComponent('destination').moveUp();
                    } else {
                        this.getComponent('destination').moveDown();
                    }
                }
            }
    },
});
