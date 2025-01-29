// Displays 9 buttons in a row (or grid deppending on the window size)
// and displays when the button is clicked


for (let i = 1; i <= 9; i++) {
    // Create button
    let button = document.createElement('button')
    // Set propieties
    button.textContent = i;
    button.id = 'numberButton' + i;
    // Set style
    button.classList.add('myButton', 'numberButton');
    // Add onClick event
    button.addEventListener('click', () => {
        console.log('Number button ' + i + ' clicked!');
        let infoText = document.getElementById('lastButtonClickedText')			
        infoText.textContent = i;
    });
    // Add to DOM
    box.appendChild(button);
}