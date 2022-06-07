const screens = document.querySelectorAll('.screen')
const choose_enemy_btns = document.querySelectorAll('.choose-enemy-btn')
const start_btn = document.getElementById('start-btn')
const game_container = document.getElementById('game-container')
const timeEl = document.getElementById('time')
const scoreEl = document.getElementById('score')
const message = document.getElementById('message')
let seconds = 0
let score = 0 
let selected_enemy = {}

start_btn.addEventListener('click', () => screens[0].classList.add('up'))

choose_enemy_btns.forEach(btn => {
    btn.addEventListener('click', () => {
        const img = btn.querySelector('img')
        const src = img.getAttribute('src')
        const alt = img.getAttribute('alt')
        selected_enemy = { src, alt }
        screens[1].classList.add('up')
        setTimeout(createEnemy,1000)
        startGame()
    })
})

function startGame(){
    setInterval(increaseTime,1000)
}

function increaseTime(){
    let m = Math.floor(seconds / 60 )
    let s = seconds % 60
    m = m < 10 ? `0${m}` :m
    s = s < 10 ? `0${s}` :s
    timeEl.innerHTML = `Time: ${m}:${s}`
    seconds++
}

function createEnemy(){
    const enemy = document.createElement('div')
    enemy.classList.add('enemy')
    const { x, y } = getRandomLocation()
    enemy.style.top =`${y}px`
    enemy.style.left =`${x}px`
    enemy.innerHTML = `<img src= "${selected_enemy.src}" alt ="${selected_enemy.alt}" style = "transform: rotate(${Math.random()*360}deg)" />`

    enemy.addEventListener('click', catchEnemy)

    game_container.appendChild(enemy)
}

function getRandomLocation() {
    const width = window.innerWidth
    const height = window.innerHeight
    const x = Math.random() * (width - 200)+ 100
    const y = Math.random() * (height - 200)+ 100
    return { x, y }
}

function catchEnemy() {
    increaseScore()
    this.classList.add('caught')
    setTimeout(() =>this.remove(), 2000)
    addEnemies()
}

function addEnemies() {
    setTimeout(createEnemy,1000)
    setTimeout(createEnemy,1200)
    setTimeout(createEnemy,1500)
    
}

function increaseScore(){
    score++
    if(score > 10){
        message.classList.add('visible')
    }
    scoreEl.innerHTML = `Score: ${score}`
}