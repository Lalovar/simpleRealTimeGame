import React from 'react';
import setScenario from './Colision';
import paintRect from './Painter';
import {Fields} from './Fields';
import loadResources from './../GetResources';
import character1x32 from './../../assets/character1x32.png';
import character2x32 from './../../assets/character2x32.png';

export default class GameField extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            gameSettings : {
                width: 512,
                height: 288,
                blockSize : 32,
            },
            currentPlayer : {
                x : 0,
                y : 120,
                w : 32,
                h : 32,
                color : 'red',
                image : loadResources(character1x32),
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
        const newPlayer = {
            x : 450,
            y : 120,
            w : 32,
            h : 32,
            image : loadResources(character2x32),
        };
        let players = [];
        players.push(newPlayer);
        this.setState({players});
        this.renderData(context);
    }
    
    renderData = (context) => {
        let keys = this.state.keys;
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
        const {x, y, color, w ,h, image} = this.state.currentPlayer;
        paintRect(context, x, y, color, w, h, image);
        for(let i = 0; i < this.state.players.length; i++){
            const {x, y, color, w ,h, image} = this.state.players[i];
            paintRect(context, x, y, color, w, h, image);
        }
    }
    
    handleKeysEvent = (event) => {
        let {currentPlayer} = this.state;
        const keys = this.state.keys;
        let speed = 1;
        if(currentPlayer.canMove){
            if (keys[32]){
                speed = 3;
            }  
            if (keys[37] || keys[65]) {
                currentPlayer.x -= speed;
            }
            if (keys[39]|| keys[68]) {
                currentPlayer.x += speed;
            }
            if (keys[40] || keys[83]) {
                currentPlayer.y += speed;
            }
            if (keys[38] || keys[87] ){
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
                <p>Use the 🡄 🡆 🡅 🡇 or <b>WASD</b> to move</p>
                <p>Use <b><i><code>space</code></i></b> to move faster</p>
            </div>
        );
    }
}