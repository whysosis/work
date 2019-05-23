const ROWS =5;
const RESULTS = [22,26,34,38,51,55,85,95];
cc.Class({
    extends: cc.Component,

    properties: {
        hasMoved:false,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },
    moveLeft() {
        cc.log('move left');
        //callback完成之后报告
        this.hasMoved = false;
        let move =(x,y,callback) =>{
            if (y == 0 || this.getComponent('gamebuilder').data[x][y] == 0) {
                callback && callback(); //结束迭代
                return ;
            } else if(this.getComponent('gamebuilder').data[x][y-1]==0) {
                //移动
                let block = this.getComponent('gamebuilder').blocks[x][y];
                let position = this.getComponent('gamebuilder').positions[x][y-1];
                this.getComponent('gamebuilder').blocks[x][y-1] = block;
                this.getComponent('gamebuilder').data[x][y-1] = this.getComponent('gamebuilder').data[x][y];
                this.getComponent('gamebuilder').data[x][y] = 0;
                this.getComponent('gamebuilder').blocks[x][y] = null;
                this.getComponent('move').doMove(block,position,()=>{
                    move(x,y-1,callback);
                });
                this.hasMoved = true;
            }else if(RESULTS.indexOf(this.getComponent('gamebuilder').data[x][y-1] * this.getComponent('gamebuilder').data[x][y])>-1) {
                //合并
                let block = this.getComponent('gamebuilder').blocks[x][y];
                let position = this.getComponent('gamebuilder').positions[x][y-1];
                this.getComponent('gamebuilder').data[x][y-1] = this.getComponent('gamebuilder').data[x][y-1] * this.getComponent('gamebuilder').data[x][y];
                this.getComponent('gamebuilder').data[x][y] = 0;
                this.getComponent('gamebuilder').blocks[x][y] = null;
                this.getComponent('gamebuilder').blocks[x][y-1].getComponent('block').setNumber(this.getComponent('gamebuilder').data[x][y-1]);
                this.getComponent('move').doMove(block,position,()=>{
                    block.destroy(); //结束迭代
                    callback && callback();
                    return ;
                });
                this.hasMoved = true;
            }else {  //与相邻格子不相同，结束迭代
                callback && callback();
                return;
            }
        };

        let toMove = []; //存储可能要移动的格子的坐标
        for (let i=0;i<ROWS;i++) {
            for(let j=0;j<ROWS;j++) {
                if(this.getComponent('gamebuilder').data[i][j] != 0) {
                    toMove.push({x:i,y:j});  //这个格子里有数字，做好准备
                }
            }
        }

        let counter = 0; //用来count有多少格子完成任务
        for (let i=0;i<toMove.length;i++) {
            move(toMove[i].x,toMove[i].y,()=>{
                counter ++;
                if(counter == toMove.length) {
                    this.getComponent('move').afterMove(this.hasMoved);
                }
            });
        }
    },

    moveRight() {
        cc.log('move right');
        this.hasMoved = false;
        let move =(x,y,callback) =>{
            if (y == ROWS -1 || this.getComponent('gamebuilder').data[x][y] == 0) {
                callback && callback(); //结束迭代
                return ;
            } else if(this.getComponent('gamebuilder').data[x][y+1]==0) {
                //移动
                let block = this.getComponent('gamebuilder').blocks[x][y];
                let position = this.getComponent('gamebuilder').positions[x][y+1];
                this.getComponent('gamebuilder').blocks[x][y+1] = block;
                this.getComponent('gamebuilder').data[x][y+1] = this.getComponent('gamebuilder').data[x][y];
                this.getComponent('gamebuilder').data[x][y] = 0;
                this.getComponent('gamebuilder').blocks[x][y] = null;
                this.getComponent('move').doMove(block,position,()=>{
                    move(x,y+1,callback);
                });
                this.hasMoved = true;
            }else if(RESULTS.indexOf(this.getComponent('gamebuilder').data[x][y+1] * this.getComponent('gamebuilder').data[x][y])>-1) {
                //合并
                let block = this.getComponent('gamebuilder').blocks[x][y];
                let position = this.getComponent('gamebuilder').positions[x][y+1];
                this.getComponent('gamebuilder').data[x][y+1] = this.getComponent('gamebuilder').data[x][y+1] * this.getComponent('gamebuilder').data[x][y];
                this.getComponent('gamebuilder').data[x][y] = 0;
                this.getComponent('gamebuilder').blocks[x][y] = null;
                this.getComponent('gamebuilder').blocks[x][y+1].getComponent('block').setNumber(this.getComponent('gamebuilder').data[x][y+1]);
                this.getComponent('move').doMove(block,position,()=>{
                    block.destroy(); //结束迭代
                    callback && callback();
                    return ;
                });
                this.hasMoved = true;
            }else {  //与相邻格子不相同，结束迭代
                callback && callback();
                return;
            }
        };

        let toMove = []; //存储可能要移动的格子的坐标
        for (let i=0;i<ROWS;i++) {
            for(let j=ROWS-1;j>=0;j--) {
                if(this.getComponent('gamebuilder').data[i][j] != 0) {
                    toMove.push({x:i,y:j});  //这个格子里有数字，做好准备
                }
            }
        }

        let counter = 0; //用来count有多少格子完成任务
        for (let i=0;i<toMove.length;i++) {
            move(toMove[i].x,toMove[i].y,()=>{
                counter ++;
                if(counter == toMove.length) {
                    this.getComponent('move').afterMove(this.hasMoved);
                }
            });
        }
    },

    moveUp() {
        cc.log('move up');
        this.hasMoved = false;
        let move =(x,y,callback) =>{
            if (x == ROWS -1 || this.getComponent('gamebuilder').data[x][y] == 0) {
                callback && callback(); //结束迭代
                return ;
            } else if(this.getComponent('gamebuilder').data[x+1][y]==0) {
                //移动
                let block = this.getComponent('gamebuilder').blocks[x][y];
                let position = this.getComponent('gamebuilder').positions[x+1][y];
                this.getComponent('gamebuilder').blocks[x+1][y] = block;
                this.getComponent('gamebuilder').data[x+1][y] = this.getComponent('gamebuilder').data[x][y];
                this.getComponent('gamebuilder').data[x][y] = 0;
                this.getComponent('gamebuilder').blocks[x][y] = null;
                this.getComponent('move').doMove(block,position,()=>{
                    move(x+1,y,callback);
                });
                this.hasMoved = true;
            }else if(RESULTS.indexOf(this.getComponent('gamebuilder').data[x+1][y] * this.getComponent('gamebuilder').data[x][y])>-1) {
                cc.log(this.getComponent('gamebuilder').data[x+1][1] * this.getComponent('gamebuilder').data[x][y]);
                cc.log("hebig");
                //合并
                let block = this.getComponent('gamebuilder').blocks[x][y];
                let position = this.getComponent('gamebuilder').positions[x+1][y];
                this.getComponent('gamebuilder').data[x+1][y] = this.getComponent('gamebuilder').data[x+1][y] * this.getComponent('gamebuilder').data[x][y];
                this.getComponent('gamebuilder').data[x][y] = 0;
                this.getComponent('gamebuilder').blocks[x][y] = null;
                this.getComponent('gamebuilder').blocks[x+1][y].getComponent('block').setNumber(this.getComponent('gamebuilder').data[x+1][y]);
                this.getComponent('move').doMove(block,position,()=>{
                    block.destroy(); //结束迭代
                    callback && callback();
                    return ;
                });
                this.hasMoved = true;
            }else {  //与相邻格子不相同，结束迭代
                callback && callback();
                return;
            }
        };

        let toMove = []; //存储可能要移动的格子的坐标
        for (let i=ROWS-1;i>=0;i--) {
            for(let j=0;j<ROWS;j++) {
                if(this.getComponent('gamebuilder').data[i][j] != 0) {
                    toMove.push({x:i,y:j});  //这个格子里有数字，做好准备
                }
            }
        }

        let counter = 0; //用来count有多少格子完成任务
        for (let i=0;i<toMove.length;i++) {
            move(toMove[i].x,toMove[i].y,()=>{
                counter ++;
                if(counter == toMove.length) {
                    this.getComponent('move').afterMove(this.hasMoved);
                }
            });
        }
    },

    moveDown() {
        cc.log('move down');
        this.hasMoved = false;
        let move =(x,y,callback) =>{
            if (x == 0 || this.getComponent('gamebuilder').data[x][y] == 0) {
                callback && callback(); //结束迭代
                return ;
            } else if(this.getComponent('gamebuilder').data[x-1][y]==0) {
                //移动
                let block = this.getComponent('gamebuilder').blocks[x][y];
                let position = this.getComponent('gamebuilder').positions[x-1][y];
                this.getComponent('gamebuilder').blocks[x-1][y] = block;
                this.getComponent('gamebuilder').data[x-1][y] = this.getComponent('gamebuilder').data[x][y];
                this.getComponent('gamebuilder').data[x][y] = 0;
                this.getComponent('gamebuilder').blocks[x][y] = null;
                this.getComponent('move').doMove(block,position,()=>{
                    move(x-1,y,callback);
                });
                this.hasMoved = true;
            }else if(RESULTS.indexOf(this.getComponent('gamebuilder').data[x-1][y] * this.getComponent('gamebuilder').data[x][y])>-1) {
                //合并
                let block = this.getComponent('gamebuilder').blocks[x][y];
                let position = this.getComponent('gamebuilder').positions[x-1][y];
                this.getComponent('gamebuilder').data[x-1][y] = this.getComponent('gamebuilder').data[x-1][y] * this.getComponent('gamebuilder').data[x][y];
                this.getComponent('gamebuilder').data[x][y] = 0;
                this.getComponent('gamebuilder').blocks[x][y] = null;
                this.getComponent('gamebuilder').blocks[x-1][y].getComponent('block').setNumber(this.getComponent('gamebuilder').data[x-1][y]);
                this.getComponent('move').doMove(block,position,()=>{
                    block.destroy(); //结束迭代
                    callback && callback();
                    return ;
                });
                this.hasMoved = true;
            }else {  //与相邻格子不相同，结束迭代
                callback && callback();
                return;
            }
        };

        let toMove = []; //存储可能要移动的格子的坐标
        for (let i=0;i<ROWS;i++) {
            for(let j=0;j<ROWS;j++) {
                if(this.getComponent('gamebuilder').data[i][j] != 0) {
                    toMove.push({x:i,y:j});  //这个格子里有数字，做好准备
                }
            }
        }

        let counter = 0; //用来count有多少格子完成任务
        for (let i=0;i<toMove.length;i++) {
            move(toMove[i].x,toMove[i].y,()=>{
                counter ++;
                if(counter == toMove.length) {
                    this.getComponent('move').afterMove(this.hasMoved);
                }
            });
        }
    },
    // update (dt) {},
});