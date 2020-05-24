var $start = document.querySelector('#start')
var $game = document.querySelector('#game')
var $time = document.querySelector('#time')
var $timeHeader = document.querySelector('#time-header')
var $resultHeader = document.querySelector('#result-header')
var $result = document.querySelector('#result')
var $getTime = document.querySelector('#game-time')
var colorArray = ['red', 'green', 'blue', 'purple', 'yellow', 'orange']

var score = 0
var isGameStarted = false

$start.addEventListener('click', startGame)
$game.addEventListener('click', handleBoxClick)
$getTime.addEventListener('click', setGameTime)

function show ($el) {
  $el.classList.remove('hide')
}

function hide($el) {
  $el.classList.add('hide')
}

function startGame() {
  score = 0
  hide($start)
  $game.style.backgroundColor = '#fff'

  isGameStarted = true
  setGameTime()
  $getTime.setAttribute('disabled', 'true')

  var interval = setInterval(function() {
    var time = parseFloat($time.textContent)

    if(time <= 0) {
      clearInterval(interval)
      endGame()
    } else {
      $time.textContent = (time - 0.1).toFixed(1)
    }
  }, 100)

  renderBox()
}

function setGameTime() {
  var time = +$getTime.value
  $time.textContent = time.toFixed(1)
  show($timeHeader)
  hide($resultHeader)
}

function setGameResult() {
  $result.textContent = score.toString()
}

function endGame() {
  isGameStarted = false
  setGameResult()
  $getTime.removeAttribute('disabled')

  hide($timeHeader)
  show($resultHeader)

  $game.style.backgroundColor = '#ccc'
  $start.classList.remove('hide')
  $game.innerHTML = ''
}

function renderBox() {
  $game.innerHTML = ''

  var box = document.createElement('div')
  var boxSize = getRandom(30, 100)
  var gameSize =  $game.getBoundingClientRect()
  var maxTop = gameSize.height - boxSize
  var maxLeft = gameSize.width - boxSize

  box.style.width = box.style.height = boxSize + 'px'
  box.style.borderRadius = '50%'
  box.style.backgroundColor = colorArray[getRandom(0, colorArray.length)]
  box.style.position = 'absolute'
  box.style.top = getRandom(0, maxTop) + 'px'
  box.style.left = getRandom(0, maxLeft) + 'px'
  box.style.cursor = 'pointer'

  box.setAttribute('data-box', 'true')

  $game.insertAdjacentElement('afterbegin', box)
}

function handleBoxClick(event) {
  if (!isGameStarted) {
    return
  }

  if (event.target.dataset.box) {
    score++
    renderBox()
  }
}

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min) + min)
}
