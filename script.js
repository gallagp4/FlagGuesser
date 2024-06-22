
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

let correctAnswer = 0;
let currentScore = 0;

document.addEventListener('DOMContentLoaded', function() {
    const buttons = [
        document.getElementById('Option0'),
        document.getElementById('Option1'),
        document.getElementById('Option2'),
        document.getElementById('Option3')
    ];
    fetch('Flags/flags.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const button = document.getElementById('NextCountryButton');
                button.addEventListener('click', () => {

                    if (data.length > 0) {

                        const usedIndices = new Set();
                        buttons.forEach(button =>
                            {
                                //this.style.backgroundColor = #028391;
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

                        correctAnswer = Math.floor(Math.random()* 4);
                        if(correctAnswer === 0)
                            {
                                document.getElementById("TheFlag").src = data[document.getElementById('Option0').value].URL;
                            }
                        else if (correctAnswer === 1)
                            {
                                document.getElementById("TheFlag").src = data[document.getElementById('Option1').value].URL;
                            }
                        else if (correctAnswer === 2)
                            {
                                document.getElementById("TheFlag").src = data[document.getElementById('Option2').value].URL;
                            }
                        else if (correctAnswer === 3)
                            {
                                document.getElementById("TheFlag").src = data[document.getElementById('Option3').value].URL;
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

function handleButtonClick(buttonID)
{
    
    if(Number(buttonID.slice(-1))===Number(correctAnswer))
        {
            currentScore += 1;
            document.getElementById("title").innerHTML = "Score: " + currentScore;
            document.getElementById(buttonID).style.backgroundColor = "green";
        }
    else
        {
            currentScore = 0;
            document.getElementById("title").innerHTML = "Score: " + currentScore;
        }
}

