let bullets = []

document.addEventListener('keydown', function(event){
  console.log('add a bullet')
  bullets.push({
    position: 0
  })
  console.log('we now have', bullets)
  playSound()
})

String.prototype.replaceAt = function(index, replacement) {
  return this.substr(0, index) + replacement+ this.substr(index + replacement.length);
}

const shooter = '(You)>'
const boss = '<(Boss)'
let bossHealth = 20

// length: 50
let string = '__________________________________________________'

const initBulletPosition = 0
let currentBulletPosition = 0
function update() {
  string = '__________________________________________________'

  // currentBulletPosition += 1
  bullets.forEach( (bullet, index) => {
    bullet.position += 1
    if(bullet.position == 51) {
      console.log('hit once!')
      bullets.splice(index, 1)
      bossHealth -= 1
    } else {
      string = string.replaceAt(bullet.position, '-')
    }
  })
  draw()
}

function draw() {
  console.log(string.length)
  window.history.pushState('somepage', 'Title', `${shooter}${string}<(Boss:${bossHealth})`);
}

let x_save = 0

function loop(timestamp) {
  var progress = (timestamp - lastRender)

  x_save += progress
  if( x_save >= 50) {
    x_save = x_save-50;
    update()
  }

  lastRender = timestamp
  window.requestAnimationFrame(loop)
}
draw()
var lastRender = 0
window.requestAnimationFrame(loop)

function playSound() {
  const audio = document.querySelector('#shoot');
  audio.currentTime = 0;
  audio.play();
}
