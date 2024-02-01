row_count = 0;
$('#add_designation').on('click', function(e) {
    let desi = document.getElementById("add_text").value;
    console.log(desi)
    let baseUrl = new URL(window.location.href);
    baseUrl = `${baseUrl.protocol}//${baseUrl.hostname}:${baseUrl.port}`;
    console.log(baseUrl);
    if (desi) {
        let val = desi.toLowerCase();
        axios({
            method: 'post',
            url: baseUrl + '/admin/add_designation',
            data: {
                designation: val
            }
        }).then(res => {
            data = res.data;
            console.log(data)
            if (data['success']) {
                alert(data['success']);
                $('.selectpicker').append($('<option>', {
                    value: data['designation_id'],
                    text: val
                })).selectpicker('val', val).selectpicker('refresh');
                location.reload(true);
            } else if(data['error']) {
                alert(data['error']);
            }

        }).catch(err =>{
            alert("ERROR");
            console.log(err);
        })
    }         
});

$('#add_project').on('click', function(e) {
    let proj = document.getElementById("add_text").value;
    // console.log(proj)
    let baseUrl = new URL(window.location.href);
    baseUrl = `${baseUrl.protocol}//${baseUrl.hostname}:${baseUrl.port}`;
    console.log(baseUrl);
    if (proj) {
        let val = proj.toLowerCase();
        axios({
            method: 'post',
            url: baseUrl + '/admin/add_project',
            data: {
                project: val
            }
        }).then(res => {
            data = res.data;
            if (data['msg']) {
                alert(data['msg']);
                $('.selectpicker').append($('<option>', {
                    value: val,
                    text: val
                })).selectpicker('val', val).selectpicker('refresh');
                location.reload(true);

            } 

        }).catch(err =>{
            alert("ERROR");
            console.log(err);
        })
    }         
});


$('#user-table #submit').on('click', function(e){
    e.preventDefault();
    let uReg = /^[A-Za-z][A-Za-z0-9_]{7,29}$/;
    let username = document.getElementById('new_user').value;

    if (!uReg.test(username)){
        alert("user name not valid");
    }

    let data = $('#add_user_form').serializeArray();
    let baseUrl = new URL(window.location.href);
    baseUrl = `${baseUrl.protocol}//${baseUrl.hostname}:${baseUrl.port}`;
    axios({
        method: 'POST',
        url: baseUrl + '/admin/add_user',
        data: data
    }).then(res => {

        res = JSON.parse(JSON.stringify(res));
        if (res['data']['msg']) {
            alert(res['data']['msg']);
        }
        // window.location.reload();
    }).catch(err =>{
        alert("ERROR");
        console.log(err);
    })
})

$(document).on('submit','#add_work_form', function(e){
    e.preventDefault();

    let data = $('#add_work_form').serializeArray();
    console.log(data);
    // return;
    let baseUrl = new URL(window.location.href);
    baseUrl = `${baseUrl.protocol}//${baseUrl.hostname}:${baseUrl.port}`;
    axios({
        method: 'POST',
        url: baseUrl + '/admin/add_work',
        data: data
    }).then(res => {

        res = JSON.parse(JSON.stringify(res));
        alert("Successful !");

    }).catch(err =>{
        alert("ERROR");
        console.log(err);
    })
})



$(document).on('submit','#assign_role_form', function(e){
    e.preventDefault();

    let users_id = $('#user_select :selected').text();
    let designations_id=$('#multi_design').val();
    let roles=$('input[name=roles]:checked').val();
    console.log(users_id);
    console.log(designations_id);
    console.log(roles);
    let baseUrl = new URL(window.location.href);
    baseUrl = `${baseUrl.protocol}//${baseUrl.hostname}:${baseUrl.port}`;
    axios({
        method: 'POST',
        url: baseUrl + '/admin/assign_role',
        data: {
            users_id:users_id,
            designations_id:designations_id,
            roles:roles
        }
    }).then(res => {
        res = JSON.parse(JSON.stringify(res));
        alert("Data Added Successfully!");
    }).catch(err =>{
        alert("ERROR");
        console.log(err);
    })
})


$('#month-year-sel-table #submit').on('click', function(e) {
    e.preventDefault();

    let data = $('#month_year_form').serializeArray();
    let baseUrl = new URL(window.location.href);
    baseUrl = `${baseUrl.protocol}//${baseUrl.hostname}:${baseUrl.port}`;
    axios({
        method: 'POST',
        url: baseUrl + '/hours_page',
        data: data

    }).then(res => {

        res = JSON.parse(JSON.stringify(res));
        if (res['data']) {
            let tDate = new Date().getDate();
            // console.log(tDate)
            // console.log(res['data']);
            let work = res['data']['work'];
            let days = res['data']['days'];
            content = []
            content.push("<table class='hour_entry_table table table-bordered'>");
            for (const [key, value] of Object.entries(res['data']['days'])) {
                console.log(key, value);
                content.push(`
                <tr>
                    <td width="10%" class="${tDate==key ? 'active' : ''}"  style="text-align: center;">
                        <span class="date">${key}</span>
                        <span class="day">${value}</span>
                    </td>
                    <td width="30%">
                        <div class="div_work">
                            <select class="form-control selectpicker work" name="work">`);
                            for (let x of work){ 
                                content.push(`<option value=${x[0]}>${x[1]}</option>`);
                            }
                        content.push(`
                            </select>
                        </div>
                        <div class="div_add_button${row_count}">
                            <button type="button" class="add_inp_button" onClick="add_inp_work(this)" id="add_inp_button${row_count}"></button>
                            <span id="input_tag_span${row_count}" class="inp-tags"><input id="id_job" type="text" class="form-control addWork" placeholder="Add Work" data-project-id="${data[0]['value']}" /></span>
                        </div>
                    </td>
                    <td width="50%">
                        <textarea placeholder="Write Your Comment" data-project-id="${data[0]['value']}" class="form-control work"></textarea>
                    </td>
                    <td width="10%">
                        <input type="text" class="form-control hou  rs" placeholder="Hours" />
                    </td>
                    <td> <input type="file" name="attachment" id="attachment"></td>
                    <td><input type="submit" value="Submit" class="workinghour_submit" onClick="submit_hrs(this)"></td>
                </tr>`);
                row_count++;
            }
            dates_data = content.join("");
            $('.time-entries').html(dates_data);
            $('.selectpicker').selectpicker('refresh');
            $(`.inp-tags`).hide();
        }
    }).catch(err =>{
        alert("ERROR");
        console.log(err);
    })
})

$(document).on('submit','#admin_month_year_form', function(e){
    e.preventDefault();

    let data = $('#admin_month_year_form').serializeArray();
    console.log(data);
    let baseUrl = new URL(window.location.href);
    baseUrl = `${baseUrl.protocol}//${baseUrl.hostname}:${baseUrl.port}`;
    axios({
        method: 'POST',
        url: baseUrl + '/admin/add_hours_page',
        data: data

    }).then(res => {
        

        res = JSON.parse(JSON.stringify(res));
        if (res['data']) {
            let tDate = new Date().getDate();
            let work = res['data']['work'];
            let days = res['data']['days'];
            content = []
            content.push("<table class='hour_entry_table table table-bordered'>");
            for (const [key, value] of Object.entries(res['data']['days'])) {
                console.log(key, value);
                content.push(`
                <tr>
                    <td width="10%" class="${tDate==key ? 'active' : ''}"  style="text-align: center;">
                        <span class="date">${key}</span>
                        <span class="day">${value}</span>
                    </td>
                    <td width="30%">
                        <div class="div_work">
                            <select class="form-control selectpicker work" name="work">`);
                            for (let x of work){ 
                                content.push(`<option value=${x[0]}>${x[1]}</option>`);
                            }
                        content.push(`
                            </select>
                        </div>
                        <div class="div_add_button${row_count}">
                            <button type="button" class="add_inp_button" onClick="add_inp_work(this)" id="add_inp_button${row_count}"></button>
                            <span id="input_tag_span${row_count}" class="inp-tags"><input id="id_job" type="text" class="form-control addWork" placeholder="Add Work" data-project-id="${data[0]['value']}" /></span>
                        </div>
                    </td>
                    <td width="50%">
                        <textarea placeholder="Write Your Comment" data-project-id="${data[0]['value']}" class="form-control work"></textarea>
                    </td>
                    <td width="10%">
                        <input type="text" class="form-control hou  rs" placeholder="Hours" />
                    </td>
                    <td> <input type="file" name="attachment" id="attachment"></td>
                    <td><input type="submit" value="Submit" class="workinghour_submit" onClick="submit_hrs(this)"></td>
                </tr>`);
                row_count++;
            }
            dates_data = content.join("");
            $('.time-entries').html(dates_data);
            $('.selectpicker').selectpicker('refresh');
            $(`.inp-tags`).hide();
        }
    }).catch(err =>{
        alert("ERROR");
        console.log(err);
    })
})


$('#project_report-sel-table #project_repert_submit').on('click', function(e) {
    e.preventDefault()
    
    let data = $('#project_report_form').serializeArray();
    var to_date = $('#project_date_to').val();
    var from_date = $('#project_date_from').val();
    var projectname=$('#project_selector option:selected').text();

    console.log(projectname);
    let baseUrl = new URL(window.location.href);
    baseUrl = `${baseUrl.protocol}//${baseUrl.hostname}:${baseUrl.port}`;
    axios({
        method: 'POST',
        url: baseUrl + '/view_project_report',
        data: {
            data:data,
            projectname:projectname,
            to_date:to_date,
            from_date:from_date
        }
    }).then(function(response) {
        var data = response.data;
        var sum = 0,sumValue=0;
        let lastRow = $('<tr>');
        var tableBody = $('#table-data tbody');   
        tableBody.empty();

        for (var i = 0; i < data.length; i++) {
            let row = $('<tr>');
            for (var j = 0; j < 5; j++) {
                row.append($('<td>').text(data[i][j]));
            }
              
            sum = data[i][4]+sum;
            row.append($(`<td><button><a href="${data[i][5]}" target="_blank">Download File</a></button></td>`));
            
            $('#table-data tbody').append(row);

        }
        lastRow.append($('<td colspan=4 style="font-weight:bold">').text("Total Hours"));
        lastRow.append($('<td style="font-weight:bold">').text(sum));
        $('#table-data tbody').append(lastRow);
        $('.project_report_div').show();
    }).catch(err =>{
        alert("ERROR");
        console.log(err);
    })
})

// function download_file(obj){
//     var fileUrl = $('#download').attr('download_url');
//     console.log("Code Kaam klrha h ",fileUrl);
    
//     var currentUrl ='F:\Qamber Ali        Work Space\bd_report'
//     var concatenatedUrl = currentUrl + fileUrl;
//     window.location.href = concatenatedUrl;
//     console.log("Code  B Kaam klrha h ",concatenatedUrl);
    
// };


$('#user_report-sel-table #user_repert_submit').on('click', function(e) {
    e.preventDefault()
    
    let data = $('#user_report_form').serializeArray();
    var to_date = $('#user_date_to').val();
    var from_date = $('#user_date_from').val();
    var u_name=$('#user_select option:selected').text();

    console.log(data);
    let baseUrl = new URL(window.location.href);
    baseUrl = `${baseUrl.protocol}//${baseUrl.hostname}:${baseUrl.port}`;
    axios({
        method: 'POST',
        url: baseUrl + '/view_user_report',
        data: {
            data:data,
            u_name:u_name,
            to_date:to_date,
            from_date:from_date
        }

    }).then(function(response) {
        var data = response.data;
        var sum = 0,sumValue=0;
        let lastRow = $('<tr>');
        var tableBody = $('#table-data tbody');   
        tableBody.empty();

        for (var i = 0; i < data.length; i++) {
            let row = $('<tr>');
            for (var j = 0; j < 5; j++) {
                row.append($('<td>').text(data[i][j]));
            }
            sum = data[i][4]+sum;
            row.append($(`<td><button><a href="${data[i][5]}" target="_blank">Download File</a></button></td>`));
            $('#table-data tbody').append(row);

        } 
        lastRow.append($('<td colspan=4 style="font-weight:bold">').text("Total Hours"));
        lastRow.append($('<td style="font-weight:bold">').text(sum));
        $('#table-data tbody').append(lastRow);
        $('.user_report_div').show();
    }).catch(err =>{
        alert("ERROR");
        console.log(err);
    })
})


$(document).ready(function() {
    $('.dropdown-item').click(function(e) {
      e.preventDefault();
      var itemText = $(this).text();
      console.log(itemText);
    });
  });
  

$('#designation_report-sel-table #designation_repert_submit').on('click', function(e) {
    e.preventDefault()
    
    let data = $('#designation_report_form').serializeArray();
    var to_date = $('#designation_date_to').val();
    var from_date = $('#designation_date_from').val();
    var designation_name=$('#designation_selector option:selected').text();

    console.log(designation_name);
    let baseUrl = new URL(window.location.href);
    baseUrl = `${baseUrl.protocol}//${baseUrl.hostname}:${baseUrl.port}`;
    axios({
        method: 'POST',
        url: baseUrl + '/view_designation_report',
        data: {
            data:data,
            designation_name:designation_name,
            to_date:to_date,
            from_date:from_date
        }

    }).then(function(response) {
        var data = response.data;
        var sum = 0,sumValue=0;
        let lastRow = $('<tr>');
        var tableBody = $('#table-data tbody');   
        tableBody.empty();

        for (var i = 0; i < data.length; i++) {
            let row = $('<tr>');
            for (var j = 0; j < 5; j++) {
                row.append($('<td>').text(data[i][j]));
            }
            sum = data[i][4]+sum;
            row.append($(`<td><button><a href="${data[i][5]}" target="_blank">Download File</a></button></td>`));
            $('#table-data tbody').append(row);

        } 
        lastRow.append($('<td colspan=4 style="font-weight:bold">').text("Total Hours"));
        lastRow.append($('<td style="font-weight:bold">').text(sum));
        $('#table-data tbody').append(lastRow);
        $('.designation_report_div').show();
    }).catch(err =>{
        alert("ERROR");
        console.log(err);
    })
})



$(document).on('keyup', '.inp-tags.active input', function(e) {
    let baseUrl = new URL(window.location.href);
    baseUrl = `${baseUrl.protocol}//${baseUrl.hostname}:${baseUrl.port}`;

    if (e.keyCode == 13) {
        obj = $(this)
        data = $(this).val();
        project_id = $(this).attr('data-project-id');
        // return;
        console.log(data, project_id);
        axios({
            method: 'POST',
            url: baseUrl + '/add_work',
            data: {
                data: data, 
                project_id: project_id
            }
        }).then(res => {
            console.log(res.data.data);
            // return;
            $('.work.selectpicker').append($('<option>', {
                value: res.data.data[0],
                text: res.data.data[1]
            })).selectpicker('refresh');
            obj.val('');
        })
    }
})

function designation_submit() {
    let baseUrl = new URL(window.location.href);
    baseUrl = `${baseUrl.protocol}//${baseUrl.hostname}:${baseUrl.port}`;
    console.log("Here");
    console.log($("select :selected").val());
    let designation_id=($("select :selected").val());
    axios({
        method: 'POST',
        url: baseUrl + '/ask_designation',
        data: {
            designation_id: designation_id
        }
    }).then(res => {
        window.location.replace(baseUrl+"/welcome");
    })

}
// function download(){
//     let baseUrl = new URL(window.location.href);
//     baseUrl = `${baseUrl.protocol}//${baseUrl.hostname}:${baseUrl.port}`;
//     window.location.replace(baseUrl+"/download");
// }

function logout() {
    let baseUrl = new URL(window.location.href);
    baseUrl = `${baseUrl.protocol}//${baseUrl.hostname}:${baseUrl.port}`;
    console.log("Im At Logout");
    window.location.replace(baseUrl+"/logout");
}

// function admin_logout() {
//     let baseUrl = new URL(window.location.href);
//     baseUrl = `${baseUrl.protocol}//${baseUrl.hostname}:${baseUrl.port}`;
//     console.log("Im At Logout");
//     window.location.replace(baseUrl+"/admin/logout");
// }
function google_login() {
    let baseUrl = new URL(window.location.href);
    baseUrl = `${baseUrl.protocol}//${baseUrl.hostname}:${baseUrl.port}`;
    console.log("Im At Google");
    window.location.replace(baseUrl+"/google_signin");
}

// $(document).ready(function() {
//     $('#workinghour_submit').click(function() {
//       var inputValue= $('#month_year_form').serializeArray();
//       let baseUrl = new URL(window.location.href);
//       baseUrl = `${baseUrl.protocol}//${baseUrl.hostname}:${baseUrl.port}`;
//       $.ajax({
//         url: baseUrl + '/save_hours',
//         method: 'POST',
//         data: {
//           value: inputValue // Send the value as a parameter to the server
//         },
//         success: function(response) {
//           console.log('Data inserted successfully');
//         },
//         error: function(error) {
//           console.error('Error inserting data:', error);
//         }
//       });
//     });
//   });
  

// function submit_hrs(obj) {
//     let rObj = $(obj).closest("tr");
//     let formData = new FormData();

//     formData.append('task_id', rObj.find("td:nth-child(2) div.div_work select :selected").val());
//     formData.append('comments',rObj.find("td:nth-child(3) textarea").val());
//     formData.append('project_id',rObj.find("td:nth-child(3) textarea").attr('data-project-id'));
//     formData.append('hours',rObj.find("td:nth-child(4) input").val());
//     formData.append('user_id',$("h3.name").attr('data-id'));
//     let day=rObj.find("td:nth-child(1) span.date").text();
//     let month=$("table.month-year-sel-table select[name='month'] :selected").val();
//     let year=$("table.month-year-sel-table select[name='year'] :selected").val();
//     formData.append("file_doc", rObj.find("td:nth-child(5) input")[0].files[0]);

//     if (day.length === 1) {
//         day= '0' + day;
//     }
//     if (month.length === 1) {
//         month = '0' + month;
//     }
//     let task_date = year + '-' + month + '-' + day;
//     formData.append("task_date", task_date);
//     console.log(formData)
    
//     let baseUrl = new URL(window.location.href);
//     baseUrl = `${baseUrl.protocol}//${baseUrl.hostname}:${baseUrl.port}`;

//     axios({
//         method: 'POST',
//         url: baseUrl + '/save_timesheet',
//         data: formData
//     }).then(res => {

//         res = JSON.parse(JSON.stringify(res));
//         alert("Data Added Successfully!");
//         $(rObj.find("td:nth-child(3) textarea")).val('');
//         $(rObj.find("td:nth-child(4) input")).val('');
        
//     }).catch(err =>{
//         alert("ERROR");
//         console.log(err);
//     })

// }


function add_inp_work(obj) {
    chObj = $(obj).parent().children('span.inp-tags');
    if(chObj.hasClass('active')){
        chObj.removeClass('active').hide();
    } else {
        chObj.addClass('active').show();
    }
}