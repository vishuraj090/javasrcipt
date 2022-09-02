const keys = document.querySelectorAll('.key');
//console.log(keys);



function playsound(e){
    const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
    console.log(audio);
    const key = document.querySelector(`.key[data-key="${e.keyCode}"]`);
    console.log(key);
    if(!audio) return
    audio.currentTime = 0;
    audio.play();

    key.classList.add('playing');
}

function removeTransition(e){
    if(e.propertyName !== 'transform') return;
    this.classList.remove('playing');
}

keys.forEach(key => {key.addEventListener('transitionend', removeTransition)})


window.addEventListener('keydown', playsound);