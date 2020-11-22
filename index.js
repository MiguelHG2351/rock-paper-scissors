'use strict'

const $modal = document.getElementById('modal');
const $overlay = document.getElementById('overlay');
const $toggle = document.getElementById('toggle');
const $closeModal = document.getElementById('close-modal');
const $figure = document.querySelectorAll('[data-figure]');
const $gameInteractive = document.getElementById('game-interactive');
const $round = document.getElementById('round');
const $userSelect = document.getElementById('user-select')
const $botSelect = document.getElementById('bot-select')
const $results = document.getElementById('results')
const $returnGame = document.getElementById('return-game')
const $score = document.getElementById('score')

$toggle.addEventListener('click', () => {
    $overlay.classList.toggle('active');
    $modal.classList.toggle('active');
});

function removeModalAndOverlay(){
    $overlay.classList.remove('active');
    $modal.classList.remove('active');
}

$closeModal.addEventListener('click', removeModalAndOverlay);

$overlay.addEventListener('click', removeModalAndOverlay)

$returnGame.addEventListener('click', () => {
    $gameInteractive.classList.remove('hidden')
    $round.classList.add('hidden')
})

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
        this.status = {
            win: 'You Win',
            lose: 'You Lose',
            draw: 'You Draw'
        }

    }
    
    run() {
        this.nodeList.forEach((element) => {
            element.addEventListener('click', (e) => {
                $score.textContent = Number(localStorage.getItem('score')) || 0
                this.renderTemplate(e.currentTarget)
                $gameInteractive.classList.add('hidden')
                $round.classList.remove('hidden')
            })
        });
    }

    randomNumber(min, max) {
        return Math.floor(Math.random() * (max - min)) + min; // Número de la figura a comparar
    }

    renderTemplate(currentSelect) {
        const html = currentSelect.outerHTML
        const selectUser = document.createElement('div')
        selectUser.classList.add('container-select-user')
        // const datasetUser = html.dataset['figure']

        selectUser.innerHTML = html
        const userFigure = selectUser.children[0].dataset["figure"]
        delete selectUser.children[0].dataset["figure"] // Borramos el dataset
        
        const selectBot = document.createElement('div')
        const randomNumber = this.randomNumber(0, 5)
        
        selectBot.innerHTML = $figure[randomNumber].outerHTML
        const botFigure = selectBot.children[0].dataset["figure"]
        delete selectBot.children[0].dataset["figure"] // Borramos el dataset
        
        if($userSelect.children.length >= 2) $userSelect.children[1].remove()
        
        if($botSelect.children.length >= 2) $botSelect.children[1].remove()
        
        // $userSelect.appendChild(selectUser)
        // $botSelect.appendChild(selectBot)
        
        let i = 0
        let interval = setInterval(() => {
            // $botSelect.children.length >= 2 ? $botSelect.replaceChild($figure[i], $botSelect.children[1]) : $botSelect.appendChild(selectBot)
            // $botSelect.children.length >= 2 ? $botSelect.children[1].replaceWith($figure[i]) : $botSelect.appendChild(selectBot)
            $botSelect.children.length >= 2 ? $botSelect.children[1].replaceWith($figure[i].cloneNode(true)) : $botSelect.appendChild(selectBot)
            
            console.log(i)
            if(i == 4) {
                $botSelect.replaceChild(selectBot, $botSelect.children[1])
                // $botSelect.appendChild(selectBot)
                clearInterval(interval)
            }
            i++
        }, 130)

        $userSelect.appendChild(selectUser)

        if(userFigure === this.optionsElement.rock) {
            if(botFigure === this.optionsElement.scissors || botFigure === this.optionsElement.lizard) {
                selectUser.children[0].classList.add('active')
                $results.classList.add('active')
                $results.children[0].textContent = this.status.win
                localStorage.setItem('score', this.score+1)

            }

            if(botFigure === this.optionsElement.paper || botFigure === this.optionsElement.spock) {
                selectBot.children[0].classList.add('active')
                $results.classList.add('active')
                $results.children[0].textContent = this.status.lose

            }
            
            if(botFigure === this.optionsElement.rock) {
                $results.classList.add('active')
                $results.children[0].textContent = this.status.draw

            }
            
        }
        
        if(userFigure === this.optionsElement.paper) {
            if(botFigure === this.optionsElement.spock || botFigure === this.optionsElement.rock) {
                selectUser.children[0].classList.add('active')
                $results.classList.add('active')
                $results.children[0].textContent = this.status.win

            }

            if(botFigure === this.optionsElement.scissors || botFigure === this.optionsElement.lizard) {
                selectBot.children[0].classList.add('active')
                $results.classList.add('active')
                $results.children[0].textContent = this.status.lose

            }
            
            if(botFigure === this.optionsElement.paper) {
                $results.classList.add('active')
                $results.children[0].textContent = this.status.draw

            }
            
        }
        
        if(userFigure === this.optionsElement.scissors) {
            if(botFigure === this.optionsElement.paper || botFigure === this.optionsElement.lizard) {
                selectUser.children[0].classList.add('active')
                $results.classList.add('active')
                $results.children[0].textContent = this.status.win

            }

            if(botFigure === this.optionsElement.spock || botFigure === this.optionsElement.rock) {
                selectBot.children[0].classList.add('active')
                $results.classList.add('active')
                $results.children[0].textContent = this.status.lose
            }

            if(botFigure === this.optionsElement.scissors) {
                $results.classList.add('active')
                $results.children[0].textContent = this.status.draw
            }

        }

        if(userFigure === this.optionsElement.lizard) {
            if(botFigure === this.optionsElement.paper || botFigure === this.optionsElement.spock) {
                selectUser.children[0].classList.add('active')
                $results.classList.add('active')
                $results.children[0].textContent = this.status.win

            }

            if(botFigure === this.optionsElement.scissors || botFigure === this.optionsElement.rock) {
                selectBot.children[0].classList.add('active')
                $results.classList.add('active')
                $results.children[0].textContent = this.status.lose
            }

            if(botFigure === this.optionsElement.lizard) {
                $results.classList.add('active')
                $results.children[0].textContent = this.status.draw
            }

        }

        if(userFigure === this.optionsElement.spock) {
            if(botFigure === this.optionsElement.scissors || botFigure === this.optionsElement.rock) {
                selectUser.children[0].classList.add('active')
                $results.classList.add('active')
                $results.children[0].textContent = this.status.win

            }

            if(botFigure === this.optionsElement.lizard || botFigure === this.optionsElement.paper) {
                selectBot.children[0].classList.add('active')
                $results.classList.add('active')
                $results.children[0].textContent = this.status.lose
            }

            if(botFigure === this.optionsElement.spock) {
                $results.classList.add('active')
                $results.children[0].textContent = this.status.draw
            }

        }

    }

}

const initGame = new Game().run();
