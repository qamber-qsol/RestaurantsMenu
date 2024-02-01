let urlcheck=true;
const app = {
  $delimiters: ['${', '}'],
  text: "",
  updateText(event) {
    this.text = event.target.value;
    const newText = this.text;
    
    // if (newText.includes(' ')) {
      var checkvalue=event.target.value;
      isValidURL(checkvalue);
          
    if(urlcheck==true){
      if (isValidURL(checkvalue)==null) {
        console.log("IS NOT URL");
    } else {
      var myurl=isValidURL(checkvalue);
      var url=myurl[0];
      updatePreview(url)
      console.log("IS  URL");
      urlcheck=false;
      
    }
    }
    else{
      console.log("All Good");
    }
      

    
  },
};
const vm = PetiteVue.createApp(app).mount();

function isValidURL(url) {
  let urlRegex = /(((https?:\/\/)|(www\.))[^\s]+)/g;

  return url.match(urlRegex)
}

function updatePreview(url) {
  // Clear previous data
  $(".url_preview").css("display", "block");
  $("#title").text("");
  $("#description").text("");
  $("#icon").attr("src", "").hide();

  
  // Fetch website metadata
  $.ajax({
    url: "https://api.linkpreview.net",
    data: { q: url, key: "d28ddb305881f4e662ee0781100d6f50" }, // Replace with your API key
    success: function(response) {
      
      $("#title").text(response.title);
      mytext=response.description;
      const maxLength = 80;
      var limitedString = limitString(mytext, maxLength);
      $("#description").text(limitedString);
      
      if (response.image) {
        $("#icon").attr("src", response.image).show();
      }
    },
    error: function() {
      $("#title").text("No Preview available");
    }
  });
}

function limitString(str, maxLength) {
  if (str.length > maxLength) {
      return str.substring(0, maxLength) + "...";
  }
  return str;
}


document.addEventListener('DOMContentLoaded', function() {
  const closeButton = document.querySelector('.myclose');
  const previewDiv = document.querySelector('.url_preview');

  closeButton.addEventListener('click', function() {
      previewDiv.remove();
  });
});