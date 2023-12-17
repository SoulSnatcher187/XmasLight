document.addEventListener('DOMContentLoaded', function () {
    let intervalId;
    let intensityInterval;

    let isOnLast = false;
  
    const lights = Array.from({ length: 7 }, (_, index) => document.getElementById(`light${index + 1}`));
  
    function startLights() {
        let currentLightIndex = 0;
      
        intensityInterval = setInterval(() => {
          lights[currentLightIndex].style.backgroundColor = '#fff'; // Brighten the current light
      
          if (currentLightIndex > 0) {
            lights[currentLightIndex - 1].style.backgroundColor = '#920b0b'; // Reset the previous light
          } else {
            lights[lights.length - 1].style.backgroundColor = '#920b0b';
            isOnLast = true
          }
      
          currentLightIndex = (currentLightIndex + 1) % lights.length;
        }, parseInt(document.getElementById('interval').value));
      
        intervalId = setInterval(() => {
          clearInterval(intensityInterval);
        }, parseInt(document.getElementById('interval').value) * lights.length);
      }

      function alertWhenOnLast(){
        const alrMessage = document.getElementsByClassName("alrtmessage")
        if(isOnLast){
            alrMessage.text = "Refresh the page to start over!"
        }
      }
  
    function stopLights() {
      clearInterval(intervalId);
      clearInterval(intensityInterval);
    }
  
    function clearInputField() {
      const intervalInput = document.getElementById('interval');
      intervalInput.value = ''; // Clear the input field
      intervalInput.type = 'text'; // Change input type to text
    }

    
  
  
    document.getElementById('startStopBtn').addEventListener('click', function () {
      if (intervalId) {
        stopLights();
      } else {
        startLights()
        alertWhenOnLast();
      }
    });
  
    document.getElementById('interval').addEventListener('input', function () {
      // Update interval if the user changes the input
      stopLights();
      startLights();
    });
  
    document.getElementById('clearBtn').addEventListener('click', clearInputField);
  
  });
  