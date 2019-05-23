const ROWS = 5;
const MOVE_DURATION = 0.05; //移动的时长
const RESULTS = [22,26,34,38,51,55,85,95]
cc.Class({
    extends: cc.Component,
    
    properties: {

    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    //失败检查
    checkFail() {
        for (let i=0;i<ROWS;i++) {
            for(let j=0;j<ROWS;j++) {
                let n=this.getComponent('gamebuilder').data[i][j];
                if(n==0) return false;
                if(j>0 && (RESULTS.indexOf(this.getComponent('gamebuilder').data[i][j-1] * n)>-1)) return false;
                if(j<ROWS-1 && (RESULTS.indexOf(this.getComponent('gamebuilder').data[i][j+1] * n)>-1)) return false;
                if(i>0 && (RESULTS.indexOf(this.getComponent('gamebuilder').data[i-1][j] * n)>-1)) return false;
                if(i<ROWS-1 && (RESULTS.indexOf(this.getComponent('gamebuilder').data[i+1][j] * n)>-1)) return false;
                
            }
        }
        return true;
    },

    afterMove(hasMoved){
        //每次有移动或者合并，就补一块随机块
        if(hasMoved) {
            this.getComponent('gamebuilder').addBlock();
        }

        if (this.checkFail()) {
            this.getComponent('gamebuilder').init();
        }
    },

    //移动block到position
   doMove(block,position,callback) {
    let action = cc.moveTo(MOVE_DURATION,position);//开始动作
    let finish = cc.callFunc(() =>{  //结束动作
        callback && callback();
    });
    //sequence是顺序执行括号里的动作
    block.runAction(cc.sequence(action,finish));
    },
    

    // update (dt) {},
});