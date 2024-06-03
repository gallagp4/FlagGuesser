
var flip = true;

function changeTitle(){
    if(flip){
        flip = false;
        document.getElementById("title").textContent = "Guess The Flag";
    } else {
        flip = true;
        document.getElementById("title").textContent = "Guess The Flags";
    }
}

document.addEventListener("DOMContentLoaded", function() {
    var el = document.getElementById("title");
    el.addEventListener("click", changeTitle, false);
});

/*
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('countRowsButton').addEventListener('click', function() {
        alert('Button clicked, starting fetch...');
        fetch('Flags/flags.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                alert('Number of rows: ' + data.length);
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
                alert('Fetch error: ' + error.message);
            });
    });
});*/

document.addEventListener('DOMContentLoaded', function() {
    const buttons = [
        document.getElementById('OptionA'),
        document.getElementById('OptionB'),
        document.getElementById('OptionC'),
        document.getElementById('OptionD')
    ];
    fetch('Flags/flags.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const button = document.getElementById('countRowsButton');
                button.addEventListener('click', () => {
                    if (data.length > 0) {

                        const usedIndices = new Set();
                        buttons.forEach(button =>
                            {
                                let randomIndex;
                                do{
                                    randomIndex = Math.floor(Math.random()* data.length);
                                } while (usedIndices.has(randomIndex));
                                usedIndices.add(randomIndex);
                                const randomEntry = data[randomIndex];
                                const firstFieldValue = randomEntry.Country; // Assuming 'field1' is the first field's key
                                button.textContent = firstFieldValue;
                                button.value = randomIndex;
                            }
                        ) 

                        let correctAnswer = Math.floor(Math.random()* 4);
                        if(correctAnswer === 0)
                            {
                                document.getElementById("TheFlag").src = data[document.getElementById('OptionA').value].URL;
                            }
                        else if (correctAnswer === 1)
                            {
                                document.getElementById("TheFlag").src = data[document.getElementById('OptionB').value].URL;
                            }
                        else if (correctAnswer === 2)
                            {
                                document.getElementById("TheFlag").src = data[document.getElementById('OptionC').value].URL;
                            }
                        else if (correctAnswer === 3)
                            {
                                document.getElementById("TheFlag").src = data[document.getElementById('OptionD').value].URL;
                            }

                        
                       
                        //document.getElementById("TheFlag").src = document.getElementById("OptionA").textContent;


                        /*const randomIndex = Math.floor(Math.random() * data.length);
                        const randomEntry = data[randomIndex];
                        const firstFieldValue = Object.values(randomEntry)[0]; // Get the value of the first field
                        alert(firstFieldValue);
                        document.getElementById("TheFlag").src = Object.values(randomEntry)[1];*/

                        
                    } else {
                        alert('No data available');
                    }
                });
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
            alert('Fetch error: ' + error.message);
        });




});

