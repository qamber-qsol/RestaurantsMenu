

var dropdown = document.getElementsByClassName("dropdown-btn");
var i;

for (i = 0; i < dropdown.length; i++) {
  dropdown[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var dropdownContent = this.nextElementSibling;
    if (dropdownContent.style.display === "block") {
      dropdownContent.style.display = "none";
    } else {
      dropdownContent.style.display = "block";
    }
  });
}

$('[data-id="model"]').on('click', function(){
    let rObj = $(this).closest("tr");
    let myid = rObj.find("td:nth-child(1)").text();
    
    console.log(myid);
    let baseUrl = new URL(window.location.href);
    baseUrl = `${baseUrl.protocol}//${baseUrl.hostname}:${baseUrl.port}`;
    axios({
        method: 'POST',
        url: baseUrl + '/post_data',
        data: {
            myid:myid  
        }
    }).then(res => {
        
        var data = res.data;
        console.log(data)
        var thisModel = $(this).data('target');
        $('#my-textarea').val(data);
        $('#my-textarea').attr('sid', myid);
        $(thisModel).show();
        $(thisModel).find('[data-close="model"]').click(function(){ 
        $(thisModel).hide();
                });
        $(window).click(function(event){
        if('#'+event.target.id == thisModel){
            $(thisModel).hide();
        }});


    }).catch(err =>{
        alert("ERROR");
        console.log(err);
    })
  });



// $(document).on('submit','#fb_post_form', function(e){
//     e.preventDefault();

//     let pages_id=$('#fb_pages').val();
//     let page_content=$('#fb_post_form textarea').val();

//     if (!pages_id || !page_content) {
//         alert("Please fill in all the fields ");
//     }
//     else {
//         console.log(pages_id);
//     console.log(page_content);
//     let baseUrl = new URL(window.location.href);
//     baseUrl = `${baseUrl.protocol}//${baseUrl.hostname}:${baseUrl.port}`;
//     axios({
//         method: 'POST',
//         url: baseUrl + '/facebook/fb_post',
//         data: {
//             pages_id:pages_id,
//             page_content:page_content,  
//         }
//     }).then(res => {
//         res = JSON.parse(JSON.stringify(res));
//         alert("Post Successfully!");
//         $('#fb_pages').val('');
//         $('#fb_post_form textarea').val('');
//     }).catch(err =>{
//         alert("ERROR");
//         console.log(err);
//     })
//     }
    
// })

function fb_submitForm() {

    let pages_id=$('#fb_pages').val();
    let page_content=$('#fb_post_form textarea').val();

    console.log(pages_id);
    console.log(page_content);
   

    if (!pages_id || !page_content) {
        alert("Please fill in all the fields ");
    }
    else {
        console.log(pages_id);
    console.log(page_content);
    let baseUrl = new URL(window.location.href);
    baseUrl = `${baseUrl.protocol}//${baseUrl.hostname}:${baseUrl.port}`;
    axios({
        method: 'POST',
        url: baseUrl + '/facebook/fb_post',
        data: {
            pages_id:pages_id,
            page_content:page_content,  
        }
    }).then(res => {
        res = JSON.parse(JSON.stringify(res));
        alert("Post Successfully!");
        $('#fb_pages').val('');
        $('#fb_post_form textarea').val('');
    }).catch(err =>{
        alert("ERROR");
        console.log(err);
    })
    }


}
function fb_generate() {
    let profilename = []
    let mydata = []

    let profile_ids=$('#fb_pages').val();
    let profile_title=$('input#mytitle').val();

    $('.selectpicker#fb_pages :selected').each(function(i, selected_text) {
        profilename.push($(selected_text).text())
    })
    console.log(profile_ids)
    console.log(profilename)
    console.log(profile_title)

    let baseUrl = new URL(window.location.href);
    baseUrl = `${baseUrl.protocol}//${baseUrl.hostname}:${baseUrl.port}`;
    axios({
        method: 'POST',
        url: baseUrl + '/content_creation',
        data: {
            profile_ids:profile_ids,
            profilename:profilename,
            profile_title:profile_title
        }
    }).then(res => {
        var content = res.data;
        console.log(content)
        for(let i=0;i<profile_ids.length; i++) {
            mydata.push([profile_ids[i], profilename[i], content[i]])}
        console.log(mydata);
        generateElements_fb(mydata)
        var unhideButton = document.getElementById("postall");
        unhideButton.style.display = "block";
        alert("Sucessfull");

    }).catch(err =>{
        alert("ERROR");
        console.log(err);
    })
    
}


$(document).ready(function() {
    $("#facebookPostLink").click(function(event) {
        event.preventDefault();
        var baseURL = window.location.origin;
        window.location.href = baseURL + "/facebook/fb_post";
            });
});

$(document).ready(function() {
    $("#fb_sch").click(function(event) {
        event.preventDefault();
        var baseURL = window.location.origin;
        window.location.href = baseURL + "/facebook/fb_sch";
            });
});

$(document).ready(function() {
    $("#instagramPostLink").click(function(event) {
      
        event.preventDefault();
        var baseURL = window.location.origin;
        window.location.href = baseURL + "/instagram/ig_post";
    });
});

$(document).ready(function() {
    $("#ig_sch").click(function(event) {
        event.preventDefault();
        var baseURL = window.location.origin;
        window.location.href = baseURL + "/instagram/ig_sch";
            });
});

$(document).ready(function() {
    $("#linkedinPostLink").click(function(event) {
     
        event.preventDefault();
        var baseURL = window.location.origin;
        window.location.href = baseURL + "/linkedin/ld_post";
    });
});

$(document).ready(function() {
    $("#lkd_sch").click(function(event) {
        event.preventDefault();
        var baseURL = window.location.origin;
        window.location.href = baseURL + "/linkedin/lkd_sch";
            });
});

$(document).ready(function() {
    $("#twitterPostLink").click(function(event) {
     
        event.preventDefault();
        var baseURL = window.location.origin;
        window.location.href = baseURL + "/twitter/tw_post";
    });
});

$(document).ready(function() {
    $("#tw_sch").click(function(event) {
        event.preventDefault();
        var baseURL = window.location.origin;
        window.location.href = baseURL + "/twitter/tw_sch";
            });
});


$(document).on('submit','#ig_post_form', function(e){
    e.preventDefault();

    let pages_id=$('#ig_pages').val();
    let page_content=$('#ig_post_form textarea').val();
    let img_url=$('input#img_url').val();

    if (!pages_id || !img_url || !page_content ) {
        alert("Please fill in all the fields ");
      }
    else{
        console.log(pages_id);
    console.log(page_content);
    console.log(img_url)
    showLoader();
    let baseUrl = new URL(window.location.href);
    baseUrl = `${baseUrl.protocol}//${baseUrl.hostname}:${baseUrl.port}`;
    axios({
        method: 'POST',
        url: baseUrl + '/instagram/ig_post',
        data: {
            pages_id:pages_id,
            page_content:page_content,
            img_url:img_url  
        }
    }).then(res => {
        res = JSON.parse(JSON.stringify(res));
        alert("Post Successfully!");
    }).catch(err =>{
        alert("ERROR");
        console.log(err);
    }).finally(() => {
        hideLoader();s
    });
    }
    
})

// function tw_submitForm() {
//     let profile_id = $('#tw_profiles').val();
//     let profile_content = $('#tw_post_form textarea').val();

//     if (!profile_id || !profile_content) {
//         alert("Please fill in all the fields");
//     } else {
//         console.log(profile_id);
//         console.log(profile_content);
//         let baseUrl = new URL(window.location.href);
//         baseUrl = `${baseUrl.protocol}//${baseUrl.hostname}:${baseUrl.port}`;

//         // Show loading indicator while the request is being processed
//         let loadingElement = document.getElementById('loading');
//         loadingElement.style.display = 'block';

//         axios({
//             method: 'POST',
//             url: baseUrl + '/twitter/tw_post',
//             data: {
//                 profile_id: profile_id,
//                 profile_content: profile_content,
//             }
//         }).then(res => {
//             res = JSON.parse(JSON.stringify(res));
//             alert("Tweet Successfully!");
//         }).catch(err => {
//             alert("ERROR");
//             console.log(err);
//         }).finally(() => {
//             // Hide loading indicator after the request is completed
//             loadingElement.style.display = 'none';
//         });
//     }
// }

function showLoader() {
    let loadingElement = document.getElementById('jumping-dots-loader');
    loadingElement.style.display = 'block';
}

function hideLoader() {
    let loadingElement = document.getElementById('jumping-dots-loader');
    loadingElement.style.display = 'none';
}

function displayImage() {
    const img_url = document.getElementById('img_url').value;
    const imageTag = document.getElementById('imageTag');
    
    // Set the 'src' attribute of the image tag to the entered URL
    imageTag.src = img_url;

    // Show the image container if a URL is provided
    if (img_url) {
        document.getElementById('imageContainer').style.display = 'block';
    } else {
        document.getElementById('imageContainer').style.display = 'none';
    }
}

function tw_submitForm(){

    let profile_id=$('#tw_profiles').val();
    let profile_content=$('#tw_post_form textarea').val();

    if (!profile_id || !profile_content) {
        alert("Please fill in all the fields ");
      }

    else{
        console.log(profile_id);
        console.log(profile_content);
        let baseUrl = new URL(window.location.href);
        baseUrl = `${baseUrl.protocol}//${baseUrl.hostname}:${baseUrl.port}`;
        axios({
            method: 'POST',
            url: baseUrl + '/twitter/tw_post',
            data: {
                profile_id:profile_id,
                profile_content:profile_content,  
            }
        }).then(res => {
            res = JSON.parse(JSON.stringify(res));
            alert("Tweet Successfully!");
        }).catch(err =>{
            alert("ERROR");
            console.log(err);
        })

    }
}

function tw_generate() {
    let profilename = []
    let mydata = []
    let profile_ids=$('#tw_profiles').val()
    let profile_title=$('input#mytitle').val();
    $('.selectpicker#tw_profiles :selected').each(function(i, selected_text) {
        profilename.push($(selected_text).text())
    })
    console.log(profile_ids)
    console.log(profilename)
    console.log(profile_title)

    let baseUrl = new URL(window.location.href);
    baseUrl = `${baseUrl.protocol}//${baseUrl.hostname}:${baseUrl.port}`;
    axios({
        method: 'POST',
        url: baseUrl + '/content_creation',
        data: {
            profile_ids:profile_ids,
            profilename:profilename,
            profile_title:profile_title
        }
    }).then(res => {
        var content = res.data;
        console.log(content)
        for(let i=0;i<profile_ids.length; i++) {
            mydata.push([profile_ids[i], profilename[i], content[i]])}
        console.log(mydata);
        generateElements_tw(mydata)
        // var unhideButton = document.getElementById("postall");
        // const messageTextarea = document.getElementById("message");
        // var label = document.querySelector('label[for="message"]');
        // label.style.display = "none";
        // messageTextarea.style.display = "none";
        // unhideButton.style.display = "block";
        alert("Sucessfull");

    }).catch(err =>{
        alert("ERROR");
        console.log(err);
    })
    
}


function lkd_submitForm() {

    let profile_ids=$('#lkd_option').val();
    var profile_name=$('#lkd_option').text();
    let profile_content=$('#lkd_post_form textarea').val();
    console.log(profile_ids);
    console.log(profile_name)
    console.log(profile_content);

    if (!profile_ids || !profile_content) {
        alert("Please fill in all the fields ");
      }
    else{

  
    let baseUrl = new URL(window.location.href);
    baseUrl = `${baseUrl.protocol}//${baseUrl.hostname}:${baseUrl.port}`;
    axios({
        method: 'POST',
        url: baseUrl + '/linkedin/ld_post',
        data: {
            profile_ids:profile_ids,
            profile_content:profile_content,  
        }
    }).then(res => {
        res = JSON.parse(JSON.stringify(res));
        alert("Post Successfully!");
    }).catch(err =>{
        alert("ERROR");
        console.log(err);
    })
    }
    
}
function lkd_generate() {
    let profilename = []
    let mydata = []
    let profile_ids=$('#lkd_option').val();
    let profile_title=$('input#mytitle').val();
    $('.selectpicker#lkd_option :selected').each(function(i, selected_text) {
        profilename.push($(selected_text).text())
    })
    console.log(profile_ids)
    console.log(profilename)
    console.log(profile_title)

    let baseUrl = new URL(window.location.href);
    baseUrl = `${baseUrl.protocol}//${baseUrl.hostname}:${baseUrl.port}`;
    axios({
        method: 'POST',
        url: baseUrl + '/content_creation',
        data: {
            profile_ids:profile_ids,
            profilename:profilename,
            profile_title:profile_title
        }
    }).then(res => {
        var content = res.data;
        console.log(content)
        for(let i=0;i<profile_ids.length; i++) {
            mydata.push([profile_ids[i], profilename[i], content[i]])}
        console.log(mydata);
        generateCollapseElements(mydata)
        var unhideButton = document.getElementById("postall");
        const messageTextarea = document.getElementById("message");
        var label = document.querySelector('label[for="message"]');
        label.style.display = "none";
        messageTextarea.style.display = "none";
        unhideButton.style.display = "block";
        alert("Sucessfull");

    }).catch(err =>{
        alert("ERROR");
        console.log(err);
    })
    
}
function generateElements_fb(data) {
    console.log(data)
    $("#collapseContainer").empty();
    for (let i = 0; i < data.length; i++) {
        const collapseId = `collapse${i}`;
        const headingId = `heading${i}`;
        const contentId = `content${i}`;
        let profile_name=data[i][1]
        let message=data[i][2]

      
        const collapseElement = `
            <div class="card">
                <div class="card-header" id="${headingId}">
                    <h2 class="mb-0">
                        <button class="btn btn-link" type="button" data-toggle="collapse" data-target="#${contentId}" aria-expanded="true" aria-controls="${contentId}">
                        ${profile_name}
                        </button>
                    </h2>
                </div>
            
                <div id="${contentId}" class="collapse" aria-labelledby="${headingId}" data-parent="#collapseContainer">
                    <div class="card-body">
                    <section class="mypost">
                    <form action="#">
                      <div class="mycontent">
                        <img src="/static/images/user2.png">
                        <div class="details">
                          <p>${profile_name}</p>
                        </div>
                      </div>
                      
                      <textarea  id="output-text" class="myfbview" placeholder="What's on your mind, CodeWithNepal?" spellcheck="false">${message}</textarea>
                      
                    </form>
                    <div class="fbutton">
                      
                      <div class="sub"><img src="/static/images/like.png">Like</div>
                      <div class="sub"><img src="/static/images/comment.png">Comment</div>
                      <div class="sub"><img src="/static/images/share.png">Share</div>
                    </div>
                  </section>   
                    
                    
                </div>
                </div>
            </div>
        `;
        $("#collapseContainer").append(collapseElement);
    }
}
function generateElements_tw(data) {
    console.log(data)
    $("#collapseContainer").empty();
    for (let i = 0; i < data.length; i++) {
        const collapseId = `collapse${i}`;
        const headingId = `heading${i}`;
        const contentId = `content${i}`;
        let profile_name=data[i][1]
        let message=data[i][2]

      
        const collapseElement = `
            <div class="card">
                <div class="card-header" id="${headingId}">
                    <h2 class="mb-0">
                        <button class="btn btn-link" type="button" data-toggle="collapse" data-target="#${contentId}" aria-expanded="true" aria-controls="${contentId}">
                        ${profile_name}
                        </button>
                    </h2>
                </div>
            
                <div id="${contentId}" class="collapse" aria-labelledby="${headingId}" data-parent="#collapseContainer">
                    <div class="card-body">
                    <section class="mypost">
          <form action="#">
            <div class="mycontent">
              <img src="/static/images/tw_logo.png">
              <div class="details">
                <p>${profile_name}</p>
                <p2>Twitter</p2>
              </div>
            </div>
            
            <div id="output-text" class="myfbview" placeholder="What's on your mind, CodeWithNepal?" spellcheck="false" readonly >${message}</div>    
          </form>
          <div class="fbutton">
            
            <div class="sub"><img src="/static/images/tw_comment.png"></div>
            <div class="sub"><img src="/static/images/tw_share.png"></div>
            <div class="sub"><img src="/static/images/tw_like.png"></div>
            <div class="sub"><img src="/static/images/tw_upload.png"></div>
          </div>
        </section>
                    
                    
                </div>
                </div>
            </div>
        `;
        $("#collapseContainer").append(collapseElement);
    }
}
function generateCollapseElements(data) {
    console.log(data)
    $("#collapseContainer").empty();
    for (let i = 0; i < data.length; i++) {
        const collapseId = `collapse${i}`;
        const headingId = `heading${i}`;
        const contentId = `content${i}`;
        let profile_name=data[i][1]
        let message=data[i][2]


        const collapseElement = `
            <div class="card">
                <div class="card-header" id="${headingId}">
                    <h2 class="mb-0">
                        <button class="btn btn-link" type="button" data-toggle="collapse" data-target="#${contentId}" aria-expanded="true" aria-controls="${contentId}">
                        ${profile_name}
                        </button>
                    </h2>
                </div>
            
                <div id="${contentId}" class="collapse" aria-labelledby="${headingId}" data-parent="#collapseContainer">
                    <div class="card-body">
        
                        <section class="mypost">
                        <form action="#">
                        <div class="mycontent">
                        <img src="/static/images/lkd_logo.png">
                        <div class="details">
                            <p>${profile_name}</p>
                            <p2>LinkedIn</p2>
                            </div>
                </div>
                
                <textarea  id="output-text" class="myfbview" placeholder="What's on your mind, CodeWithNepal?" spellcheck="false" readonly >${message}</textarea>
                
              </form>
              <div class="fbutton">
                
              <div class="sub"><img src="/static/images/lkd_like.png">Like</div>
              <div class="sub"><img src="/static/images/ld_comment.png">Comment</div>
              <div class="sub"><img src="/static/images/ld_share.png">Share</div>
              <div class="sub"><img src="/static/images/ld_upload.png">Send</div>
            </div>
            </section>    
                    
                    
                </div>
                </div>
            </div>
        `;
        $("#collapseContainer").append(collapseElement);
    }
}



// $(document).on('submit','#lkd_post_form', function(e){
//     e.preventDefault();

//     let profile_ids=$('#lkd_option').val();
//     let profile_content=$('#lkd_post_form textarea').val();

//     if (!profile_ids || !profile_content) {
//         alert("Please fill in all the fields ");
//       }
//     else{

//     console.log(profile_ids);
//     console.log(profile_content);
//     let baseUrl = new URL(window.location.href);
//     baseUrl = `${baseUrl.protocol}//${baseUrl.hostname}:${baseUrl.port}`;
//     axios({
//         method: 'POST',
//         url: baseUrl + '/linkedin/ld_post',
//         data: {
//             profile_ids:profile_ids,
//             profile_content:profile_content,  
//         }
//     }).then(res => {
//         res = JSON.parse(JSON.stringify(res));
//         alert("Post Successfully!");
//     }).catch(err =>{
//         alert("ERROR");
//         console.log(err);
//     })
//     }
    
// })




$(document).on('submit','#fb_sch_form', function(e){
    e.preventDefault();

    let pages_id=$('#fb_pages').val();
    let page_name=$('#fb_pages :selected').text();
    let page_content=$('#fb_sch_form textarea').val();
    let mytitle=$('input#mytitle').val();
    let mydate=$('#mydate').val();

    console.log(pages_id)
    console.log(page_name)

    if (!pages_id || !page_name || !page_content || !mytitle || !mydate) {
        alert("Please fill in all the fields ");
      }
    
    else{
    let baseUrl = new URL(window.location.href);
    baseUrl = `${baseUrl.protocol}//${baseUrl.hostname}:${baseUrl.port}`;
    axios({
        method: 'POST',
        url: baseUrl + '/facebook/fb_sch',
        data: {
            pages_id:pages_id,
            page_content:page_content,
            mydate:mydate,
            page_name:page_name,
            mytitle:mytitle
        }
    }).then(res => {
        var post_id = res.data;
        console.log(post_id)
        alert("Sucessfuly Schedule");
        // content_creation(post_id,page_name,mytitle)

    }).catch(err =>{
        alert("ERROR");
        console.log(err);
    })
    }
    
})
// async function content_creation(post_id,page_name,title){
//     console.log("I m in async function")
//     let baseUrl = new URL(window.location.href);
//     baseUrl = `${baseUrl.protocol}//${baseUrl.hostname}:${baseUrl.port}`;
//     axios({
//         method: 'POST',  
//         url: baseUrl + '/content_creation',
//         data: {
//             post_id:post_id,
//             page_name:page_name,
//             title:title,  
//         }
//     }).then(res => {
//         res = JSON.parse(JSON.stringify(res));
//         alert("Content Pushed");
//     }).catch(err =>{
//         alert("ERROR Of SYNC");
//         console.log(err);
//     })



// }
$(document).on('submit','#ig_sch_form', function(e){
    e.preventDefault();

    let pages_id=$('#ig_pages').val();
    let page_name=$('#ig_pages :selected').text();
    let page_content=$('#ig_sch_form textarea').val();
    let imgurl=$('input#img_url').val();
    let mytitle=$('input#mytitle').val();
    let mydate=$('#mydate').val();

    if (!pages_id || !page_name || !page_content || !mytitle || !mydate || !imgurl) {
        alert("Please fill in all the fields ");
      }

    else {
        console.log(mydate);
    let baseUrl = new URL(window.location.href);
    baseUrl = `${baseUrl.protocol}//${baseUrl.hostname}:${baseUrl.port}`;
    axios({
        method: 'POST',
        url: baseUrl + '/instagram/ig_sch',
        data: {
            pages_id:pages_id,
            page_content:page_content,
            mydate:mydate,
            imgurl:imgurl,
            page_name:page_name,
            mytitle:mytitle
        }
    }).then(res => {
        res = JSON.parse(JSON.stringify(res));
        alert("Successful !");
    }).catch(err =>{
        alert("ERROR");
        console.log(err);
    })

    }
})

$(document).on('submit','#lkd_sch_form', function(e){
    e.preventDefault();

    let pages_id=$('#lkd_pages').val();
    let page_name=$('#lkd_pages :selected').text();
    let page_content=$('#lkd_sch_form textarea').val();
    let mytitle=$('input#mytitle').val();
    let mydate=$('#mydate').val();

    if (!pages_id || !page_name || !page_content || !mytitle || !mydate) {
        alert("Please fill in all the fields ");
      }

   else{
    let baseUrl = new URL(window.location.href);
    baseUrl = `${baseUrl.protocol}//${baseUrl.hostname}:${baseUrl.port}`;
    axios({
        method: 'POST',
        url: baseUrl + '/linkedin/lkd_sch',
        data: {
            pages_id:pages_id,
            page_content:page_content,
            mydate:mydate,
            page_name:page_name,
            mytitle:mytitle
        }
    }).then(res => {
        res = JSON.parse(JSON.stringify(res));
        alert("Successful !");
    }).catch(err =>{
        alert("ERROR");
        console.log(err);
    })

   }
})



$(document).on('submit','#tw_sch_form', function(e){
    e.preventDefault();

    let pages_id=$('#tw_pages').val();
    let page_name=$('#tw_pages :selected').text();
    let page_content=$('#tw_sch_form textarea').val();
    let mytitle=$('input#mytitle').val();
    let mydate=$('#mydate').val();
    if (!pages_id || !page_name || !page_content || !mytitle || !mydate) {
        alert("Please fill in all the fields ");
      }
    else {
        console.log(pages_id);
    console.log(page_name);
    console.log(mytitle);
    console.log(mydate);
    let baseUrl = new URL(window.location.href);
    baseUrl = `${baseUrl.protocol}//${baseUrl.hostname}:${baseUrl.port}`;
    axios({
        method: 'POST',
        url: baseUrl + '/twitter/tw_sch',
        data: {
            pages_id:pages_id,
            page_content:page_content,
            mydate:mydate,
            page_name:page_name,
            mytitle:mytitle
        }
    }).then(res => {
        res = JSON.parse(JSON.stringify(res));
        alert("Successful !");
    }).catch(err =>{
        alert("ERROR");
        console.log(err);
    })
    }
    
})

function logout() {
    let baseUrl = new URL(window.location.href);
    baseUrl = `${baseUrl.protocol}//${baseUrl.hostname}:${baseUrl.port}`;
    console.log("Im At Logout");
    window.location.replace(baseUrl+"/logout");
}



// $('[data-id="model"]').on('click', function(){
//     var thisModel = $(this).data('target');
//     $(thisModel).show();
//     $(thisModel).find('[data-close="model"]').click(function(){ 
//       $(thisModel).hide();
//     });
//     $(window).click(function(event){
//       if('#'+event.target.id == thisModel){
//         $(thisModel).hide();
//       }
//     });
//   });
// function delete_task(obj) {
//     let rObj = $(obj).closest("tr");
//     let myid=rObj.find("td:nth-child(1)").text();

//     let baseUrl = new URL(window.location.href);
//     baseUrl = `${baseUrl.protocol}//${baseUrl.hostname}:${baseUrl.port}`;

//     axios({
//         method: 'POST',
//         url: baseUrl + '/view_post',
//         data: {
//             myid:myid   
//                 }
        
//     }).then(res => {

//         res = JSON.parse(JSON.stringify(res));
//         alert("Successfully Removed!");
//         location.reload(true);

//     }).catch(err =>{
//         alert("ERROR");
//         console.log(err);
//     })

// }

function delete_task(obj) {
    let confirmation = confirm("Are you sure you want to delete scheduled post?");
  
    if (confirmation) {
        let rObj = $(obj).closest("tr");
        let myid = rObj.find("td:nth-child(1)").text();
    
        let baseUrl = new URL(window.location.href);
        baseUrl = `${baseUrl.protocol}//${baseUrl.hostname}:${baseUrl.port}`;
    
        axios({
            method: 'POST',
            url: baseUrl + '/view_post',
            data: {
                myid: myid
            }
        }).then(res => {
            res = JSON.parse(JSON.stringify(res));
            alert("Successfully Removed!");
            location.reload(true);
        }).catch(err => {
            alert("ERROR");
            console.log(err);
        });
    } else {
        location.reload(true);
    }
}


function update_content(obj) {
    
    var textareaElement = $(obj).siblings('textarea')[0]
    var my_data=$(obj).siblings('textarea')[0].value;
    console.log(my_data); 
    var smyid = $(textareaElement).attr('sid');    
    console.log(smyid);
    let baseUrl = new URL(window.location.href);
    baseUrl = `${baseUrl.protocol}//${baseUrl.hostname}:${baseUrl.port}`;
    
        axios({
            method: 'POST',
            url: baseUrl + '/update_post',
            data: {
                my_data:my_data,
                smyid: smyid
            }
        }).then(res => {
            res = JSON.parse(JSON.stringify(res));
            alert("Successfully Updated");
            location.reload(true);
        }).catch(err => {
            alert("ERROR");
            console.log(err);
        });
    

}