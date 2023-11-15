function processImage() {
    var fileInput = document.getElementById('imageInput');
    var resultTextbox = document.getElementById('result');
    
    var file = fileInput.files[0];
    if (!file) {
      resultTextbox.value = 'Please select an image.';
      return;
    }
    
    var formData = new FormData();
    formData.append('file', file);
    
    fetch('http://your-python-api-url/process_image', {
      method: 'POST',
      body: formData,
    })
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          resultTextbox.value = 'Error: ' + data.error;
        } else {
          resultTextbox.value = data.text;
        }
      })
      .catch(error => {
        resultTextbox.value = 'Error: ' + error.message;
      });
  }
  
  function copyToClipboard() {
    var resultTextbox = document.getElementById('result');
    
    resultTextbox.select();
    document.execCommand('copy');
  }
  