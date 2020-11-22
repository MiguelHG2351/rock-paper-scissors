'use strict'

const $modal = document.getElementById('modal');
const $overlay = document.getElementById('overlay');
const $toggle = document.getElementById('toggle');
const $closeModal = document.getElementById('close-modal');
const $figure = document.querySelectorAll('[data-figure]');
const $gameInteractive = document.getElementById('game-interactive');
const $round = document.getElementById('round');

$toggle.addEventListener('click', () => {
    $overlay.classList.toggle('active');
    $modal.classList.toggle('active');
});

$closeModal.addEventListener('click', () => {
    $overlay.classList.remove('active');
    $modal.classList.remove('active');
});

class Game {
    constructor() {
        this.nodeList = $figure;
        this.optionsElement = {
            rock: 'rock',
            paper: 'paper',
            scissors: 'scissors',
            spock: 'spock',
            lizard: 'lizard'
        }
    }
    
    run() {
        this.nodeList.forEach((element) => {
            element.addEventListener('click', (e) => {
                this.processHTML(e.currentTarget)
                $gameInteractive.classList.add('hidden')
                $round.classList.remove('hidden')
            })
        });
    }

    processHTML(element) {
        this.renderTemplate(element.outerHTML)
        // for(let i =0; i!=5; i = Math.random()*6) {
        //     console.log('XD')
        // }
    }
    
    renderTemplate(html) {
        console.log(html)
        console.log(this.optionsElement.rock)
    }

}

const initGame = new Game().run();
