const screens = document.querySelectorAll('.screen')
const chooseCarBtn = document.querySelectorAll('.choose-car-btn')
const starBtn = document.querySelector('#star-btn')
const timeEl = document.getElementById('time')
const scoreEl = document.getElementById('score')
const messageEl = document.getElementById('message')
const gameContainer = document.querySelector('.game-container')


let seconds = 0
let score = 0
let selectedDriver = {}

starBtn.addEventListener('click', () => screens[0].classList.add('up'))

chooseCarBtn.forEach(btn => {
    btn.addEventListener('click', () =>{
        const img = btn.querySelector('img')
        const src = img.getAttribute('src')
        selectedDriver = {src}

        screens[1].classList.add('up')

        setTimeout(createDriver, 1000)
        startGame()
    })
})

function startGame(){
    setInterval(increaseTime, 1000)
}

function increaseTime(){
    let m = Math.floor(seconds / 60)
    // Module % 60 es el resto despues de dividir por ese numero 
    let s = seconds % 60 
    m = m < 10 ? `0{m}` : m
    s = s < 10 ? `0{s}` : s

    timeEl.innerHTML = `Time: ${m}:${s}`

    seconds++
}

function createDriver(){
    const car = document.createElement('div')
    car.classList.add('car')
    const { x, y} = getRandomLocation()
    car.style.top = `${y}px`
    car.style.left = `${x}px`
    car.innerHTML = `<img src="${selectedDriver.src}" style="transform: rotate(${Math.random() * 360}deg)"/>`
    
    gameContainer.appendChild(car)

    car.addEventListener('click', catchCar)


}


function getRandomLocation() {
    const width = window.innerWidth
    const height = window.innerHeight

    const x = Math.random() * (width - 200) + 100
    const y = Math.random() * (height - 200) + 100

    return { x, y}
}

function catchCar() {
    increaseScore()

    this.classList.add('caught')
    setTimeout(() => this.remove(), 2000)
    addCars()
}


function addCars(){
    setTimeout(createDriver, 1000)
    setTimeout(createDriver, 1500)
}


function increaseScore(){
    score++
    if(score > 9){
        messageEl.classList.add('visible')
    }

    scoreEl.innerHTML = `Score: ${score}`
}























