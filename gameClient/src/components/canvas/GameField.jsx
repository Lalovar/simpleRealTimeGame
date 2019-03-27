import React from 'react';
import setScenario from './Colision';
import {Fields} from './Fields';

export default class GameField extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            width: 600,
            height: 400,
            currentPlayer : {
              x : 0,
              y : 120
            },
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
        
        this.interval = setInterval(() => {
            this.renderData(context);
        }, 20);
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
    }
    
    clear = (context) => {
        const {width, height} = this.state;
        context.clearRect(0, 0, width, height);
    }
    
    drawObjects = (context) => {
        this.paintPlayer(context, 30, 30, "#FF0000");
    }
    
    paintPlayer = (context, width, height, color) => {
        context.fillStyle = color;
        const {x, y} = this.state.currentPlayer;
        return context.fillRect(x, y, width, height);
    }
    
    handleKeysEvent = (event) => {
        const {currentPlayer} = this.state;
        const keys = this.state.keys;
        let speed = 1;
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
    
    controlCollision = (context) => {
        let currentPlayer = this.state.currentPlayer;
        //draw scenario and set collisions.
        currentPlayer = setScenario(context, this.state.width, this.state.height, currentPlayer, Fields.beta1);
        
        if(this.state.currentPlayer.x <= (this.state.width - this.state.width) ){
            currentPlayer.x = 1;
        }
        if(this.state.currentPlayer.x >= (this.state.width-30) ){
            currentPlayer.x = this.state.width-30;
        }
        if(this.state.currentPlayer.y <= (this.state.height - this.state.height) ){
            currentPlayer.y = 1;
        }
        if(this.state.currentPlayer.y >= (this.state.height-30) ){
            currentPlayer.y = this.state.height-30;
        }
        this.setState({currentPlayer});
    }
    
  render() {
      const width = this.state.width;
      const height = this.state.height;
    return (
        <div>
            <canvas ref="canvas" width={width} height={height} style={{border:'1px solid #000000'}} />
            <p>Use the 🡄 🡆 🡅 🡇 to move</p>
            <p>Use <b><i>shift</i></b> to move faster</p>
        </div>
    );
  }
}