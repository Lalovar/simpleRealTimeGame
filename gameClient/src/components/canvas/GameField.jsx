import React from 'react';
import setScenario from './Colision';
import paintRect from './Painter';
import {Fields} from './Fields';

export default class GameField extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            gameSettings : {
                width: 768,
                height: 432,
                blockSize : 48
            },
            currentPlayer : {
                x : 0,
                y : 120,
                w : 48,
                h : 48,
                color : 'red',
                canMove: true
            },
            lastState : null,
            players : [],
            keys : {
                37:false,
                38:false,
                39:false,
                40:false
            }
        };
    }
    
    componentDidMount() {
        const context = this.refs.canvas.getContext('2d');
        this.renderData(context);
    }
    
    renderData = (context) => {
        const keys = this.state.keys;
        document.addEventListener("keydown", function (e) {
            keys[e.keyCode] = true;
        });
        document.addEventListener("keyup", function (e) {
            keys[e.keyCode] = false;
        });
        this.setState({keys});
        
        this.clear(context);
        this.handleKeysEvent();
        this.controlCollision(context);
        this.drawObjects(context);
        requestAnimationFrame(()=>{this.renderData(context)});
    }
    
    clear = (context) => {
        const {width, height} = this.state.gameSettings;
        context.clearRect(0, 0, width, height);
    }
    
    drawObjects = (context) => {
        const {x, y, color, w ,h} = this.state.currentPlayer;
        paintRect(context, x, y, color, w, h);
    }
    
    handleKeysEvent = (event) => {
        let {currentPlayer} = this.state;
        const keys = this.state.keys;
        let speed = 1;
        if(currentPlayer.canMove){
            if (keys[16]){
                speed = 3;
            }  
            if (keys[37]) {
                currentPlayer.x -= speed;
            }
            if (keys[39]) {
                currentPlayer.x += speed;
            }
            if (keys[40]) {
                currentPlayer.y += speed;
            }
            if (keys[38]) {
                currentPlayer.y -= speed;
            }
            this.setState({currentPlayer});    
        }
        
    }
    
    controlCollision = (context) => {
        let currentPlayer = this.state.currentPlayer;
        //draw scenario and set collisions.
        currentPlayer = setScenario(
            context,
            this.state.gameSettings,
            currentPlayer,
            Fields.beta1
        );
        
        if(this.state.currentPlayer.x <= (this.state.gameSettings.width - this.state.gameSettings.width) ){
            currentPlayer.x = 1;
        }
        if(this.state.currentPlayer.x >= (this.state.gameSettings.width-this.state.gameSettings.blockSize) ){
            currentPlayer.x = this.state.gameSettings.width-this.state.gameSettings.blockSize;
        }
        if(this.state.currentPlayer.y <= (this.state.gameSettings.height - this.state.gameSettings.height) ){
            currentPlayer.y = 1;
        }
        if(this.state.currentPlayer.y >= (this.state.gameSettings.height-this.state.gameSettings.blockSize) ){
            currentPlayer.y = this.state.gameSettings.height-this.state.gameSettings.blockSize;
        }
        this.setState({currentPlayer});
    }
    
    handleFullScreen = () => {
        const canvas = this.refs.canvas;
        if(canvas.webkitRequestFullScreen) {
            canvas.webkitRequestFullScreen();
        }else {
            canvas.mozRequestFullScreen();
        }            
    }
    
  render() {
      const {width, height} = this.state.gameSettings;
    return (
        <div>
            <canvas ref="canvas" width={width} height={height} style={{border:'1px solid #000000'}} />
            <br />
            <button onClick={this.handleFullScreen}>Full screen</button>
            <p>Use the 🡄 🡆 🡅 🡇 to move</p>
            <p>Use <b><i>shift</i></b> to move faster</p>
        </div>
    );
  }
}