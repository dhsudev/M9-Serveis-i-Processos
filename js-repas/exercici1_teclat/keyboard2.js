// Displays 9 buttons in a row (or grid deppending on the window size)
// and displays when the button is clicked


for (let i = 1; i <= 20; i++) {
    // Create button
    let button = document.createElement('button')
    // Set propieties
    button.textContent = i;
    button.id = 'numberButton' + i;
    // Set style
    button.classList.add('myButton', 'numberButton');
    let color = null;
    if(i % 2 == 0) color = 'purple'
    if(i % 3 == 0) color = 'pink'
    if(color)
        button.style = 'background-color: ' + color + ';';
    // Add onClick event
    button.addEventListener('click', () => {
        console.log('Number button ' + i + ' clicked!');
        let infoText = document.getElementById('lastButtonClickedText')			
        infoText.textContent = i;
    });
    // Add to DOM
    box.appendChild(button);
}