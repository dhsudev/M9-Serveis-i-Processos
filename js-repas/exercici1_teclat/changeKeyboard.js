let keyboardContainer = document.getElementById('keyboardContainer');
let buttonContainer = document.getElementById('changeKeyboardContainer');
let box = document.getElementById('keyboardContainer');


let titles = [
    'Exercise 1 - Numeric keyboard', 
    'Exercise 1 - Numeric keyboard with colors', 
    'Exercise 1 - Alphanum keyboard'
]

for (let i = 1; i <= 3; i++) {
    let button = document.createElement('button');
    button.textContent = i;
    button.id = 'button' + i;
    button.classList.add('myButton', 'pageButton');
    button.addEventListener('click', () => {
        console.log('Page button ' + i + ' clicked!');
        let script = document.createElement('script');
        script.src = 'keyboard' + i + '.js';
        const parent = document.getElementById('keyboardContainer');
        while (parent.firstChild) {
            parent.removeChild(parent.firstChild);
        }
        parent.appendChild(script)

    });
    buttonContainer.appendChild(button);
}