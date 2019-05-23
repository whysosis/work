const ROWS = 4;
const MOVE_DURATION = 0.1; //移动的时长
cc.Class({
    extends: cc.Component,
    
    properties: {
        scorelabel:cc.Label,
        score:0,
        game_over:cc.Node,
    },
    
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    //更新分数
    updateScore(number) {
        //cc.log(this.getComponent('gamebuilder').size);
        this.score = number;
        this.scorelabel.string = '分数：' + number;
    },

    gameOver() {
        cc.log('game over');
        this.game_over.active = true;
    },

    //失败检查
    checkFail() {
        cc.log(ROWS);
        for (let i=0;i<ROWS;i++) {
            for(let j=0;j<ROWS;j++) {
                let n=this.getComponent('gamebuilder').data[i][j];
                if(n==0) return false;
                if(j>0 && this.getComponent('gamebuilder').data[i][j-1]==n) return false;
                if(j<ROWS-1 && this.getComponent('gamebuilder').data[i][j+1]==n) return false;
                if(i>0 && this.getComponent('gamebuilder').data[i-1][j]==n) return false;
                if(i<ROWS-1 && this.getComponent('gamebuilder').data[i+1][j]==n) return false;

            }
        }
        return true;
    },

    afterMove(hasMoved){
        //每次有移动或者合并，就补一块随机块
        if(hasMoved) {
            this.updateScore(this.score+1);
            this.getComponent('gamebuilder').addBlock();
        }

        if (this.checkFail()) {
            this.gameOver();
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
