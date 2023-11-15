const ENDPOINT = "http://127.0.0.1:8000";

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
  
  document.getElementById('copyButton').addEventListener('click', copyToClipboard);
  async function processImage(imageFile) {
    const apiEndpoint = 'ENDPOINT'; 
    const formData = new FormData();
    formData.append('img', imageFile, imageFile.name);
    const requestOptions = {
      method: 'POST', 
      body: formData,
      redirect: 'follow',
    };
  
    try {
      const response = await fetch(apiEndpoint, requestOptions);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const result = await response.text();
      console.log(result); 
      document.getElementById('result').value = result;
    } catch (error) {
      console.log('error', error);
   
    }
  }
  

  