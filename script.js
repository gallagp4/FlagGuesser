
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
});