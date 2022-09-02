const inputs = document.querySelectorAll(".main input");
// console.log(inputs);

function a(){
    const suffix = this.dataset.sizing || '';
    
    document.documentElement.style.setProperty(`--${this.name}`, this.value + suffix)
}
inputs.forEach(input => input.addEventListener('change', a));
inputs.forEach(input => input.addEventListener('mousemove', a));