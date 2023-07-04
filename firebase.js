const firebaseConfig = {
    apiKey: "AIzaSyBwVQJyt8wz3V8zPT-O8fgUir5Tkdit4gw",
    authDomain: "vedanta-hackathon.firebaseapp.com",
    projectId: "vedanta-hackathon",
    storageBucket: "vedanta-hackathon.appspot.com",
    messagingSenderId: "556986316360",
    appId: "1:556986316360:web:5c147db057c8435a278a7d",
  };

  firebase.initializeApp(firebaseConfig);

  var fileText = document.querySelector(".fileText");
  var uploadPercentage = document.querySelector(".uploadPercentage");
  var progress = document.querySelector(".progress");
  var fileItem;
  var fileName;
   function getFile(e){
       fileItem = e.target.files[0];
       fileName = fileItem.name;
       fileText.innerHTML = fileName;
   }

   function uploadImage(){
    var fileInput = document.getElementById('fileInp');
    var file = fileInput.files[0];
    let storageRef = firebase.storage().ref("Details/"+ fileName);
    let uploadTask = storageRef.put(fileItem);
    document.getElementById('progressContainer').style.display = 'block';

    uploadTask.on('state_changed', function(snapshot) {
      // Track upload progress
      var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

      document.getElementById('uploadProgress').value = progress;
      document.querySelector('.progress-label').textContent = Math.round(progress) + '%';
  }, function(error) {
      // Handle upload error
      console.log('Upload error:', error);
  }, function() {
      // Upload completed successfully
      document.getElementById('uploadProgress').value = 100;
      document.querySelector('.progress-label').textContent = 'Upload Completed';

      console.log('Upload completed');
                      // Get the download URL for the uploaded file
                      storageRef.getDownloadURL()
                      .then(function(url) {
                          console.log('Download URL:', url);
                          document.getElementById('downloadUrlContainer').style.display = 'block';
                          document.getElementById('downloadUrlInput').value = url;
                      })
                      .catch(function(error) {
                          console.log('Error getting download URL:', error);
                      });
  });
     
   
  }
  function copyDownloadUrl() {
    var downloadUrlInput = document.getElementById('downloadUrlInput');
    downloadUrlInput.select();
    downloadUrlInput.setSelectionRange(0, 99999);
    document.execCommand('copy');
    alert('Download URL copied!');
}