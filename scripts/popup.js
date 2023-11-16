const ENDPOINT = "http://127.0.0.1:8000/recognize";

document.getElementById('chooseImageButton').addEventListener('click', function (event) {
    event.preventDefault();
    document.getElementById('imageInput').click();
  });
  
  document.getElementById('imageInput').addEventListener('change', async function () {
    const imageFile = this.files[0];
    console.log(imageFile)
   
    document.getElementById('preloader').style.display = 'block';
    await processImage(imageFile);

  });

  document.addEventListener('DOMContentLoaded', function () {
    const copyButton = document.getElementById('copyButton');
    copyButton.addEventListener('click', copyText);
  
    function copyText(event) {
      if (event.target === copyButton) {
        const resultTextbox = document.getElementById('result');
        resultTextbox.select();
        resultTextbox.setSelectionRange(0, 99999); 
        navigator.clipboard.writeText(resultTextbox.value)
          
          .catch((err) => {
            console.error('Unable to copy text: ', err);
          });

        window.getSelection().removeAllRanges();
      }
    }
  });

  async function processImage(imageFile) {
    const apiEndpoint = ENDPOINT; 
    const formData = new FormData();
    formData.append('image', imageFile);
    const requestOptions = {
        method: 'POST',
        body: formData,
        redirect: 'follow',
      };
      
  
    try {
      const response = await fetch(apiEndpoint, requestOptions);
      console.log(response)
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const result = await response.text();
      const parsedResult = extractText(result); 
      document.getElementById('result').value = parsedResult;
    } catch (error) {
      console.log('error', error);
   
    }
    document.getElementById('preloader').style.display = 'none';
  }

  function extractText(jsonString) {
    try {
      const parsedObject = JSON.parse(jsonString);
      if (parsedObject && parsedObject.text) {
        return parsedObject.text.trim(); 
      } else {
        return null; 
      }
    } catch (error) {
      console.error('Error parsing JSON:', error);
      return null; 
    }
  }
  
  function copyText() {
    const resultTextbox = document.getElementById('result');
  
    resultTextbox.select();
    resultTextbox.setSelectionRange(0, 99999); 
  
  
    navigator.clipboard.writeText(resultTextbox.value)
      .then(() => {
   
        
      })
      .catch((err) => {
        console.error('Unable to copy text: ', err);
      });
  
 
    window.getSelection().removeAllRanges();
  }
 

