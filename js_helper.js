function add_script(src) {
    var script = document.createElement('script');
    script.src = src;
    script.async=true;
    document.body.appendChild(script);
}

add_script('category.js');
add_script('task.js');


set_name_in_header();
function error_alert(error){
    alert(" Can't do because: " + error.toString());
}

function set_name_in_header(){
    document.getElementById("hello_account").innerText+=getCookie("user_email").toString();
}

function check_data_type(data, result_block) {

    if(Array.isArray(data)){
        draw_table(data, result_block)
    }
    else{
        const arr = [data]
        draw_table(arr, result_block)
    }
}

function draw_table(data, result_block) {
    remove_data_from_table(result_block);
    for (var i = 0; i < data.length; i++) {
        choose_table(data[i], result_block)
    }
}

function remove_data_from_table(result_block) {
    $(form_table_id(result_block) + " tbody").remove();
}

function form_table_id(result_block) {
    return "#"+result_block;
}

function choose_table(data, result_block) {
    switch (result_block) {
        case "result_task":
            draw_row_task(data,form_table_id(result_block));
            break;
        case "result_cat":
            draw_row_cat(data,form_table_id(result_block));
            break;
        default:
            break;
    }
}

function draw_row_cat(rowData, result_block) {
    var row = $("<tr />")
    $(result_block).append(row);
    row.append($("<td>" + rowData.title + "</td>"));
    row.append($("<button id='delete_cat' onClick='delete_cat();'>delete</button>"));
    //row.append($("<button id='delete_cat' onClick='delete_cat();'>delete</button>"));

    row.append($("<td>" + rowData.id + "</td>"));

}

function draw_row_task(rowData, result_block) {

    var row = $("<tr />")
    $(result_block).append(row);
    //row.append($("<td><select type=\"text\" selected value=\"" + get_cat(rowData.category_id) + "\"></select></td>"));
    row.append($("<td><select type='text' id='cat_select_"+rowData.category_id+"' >"+get_cat(rowData.category_id)+"</select></td>"));
    row.append($("<td>" + format_date(rowData.time_start)+ "</td>"));
    row.append($("<td>" + format_date(rowData.time_finish) + "</td>"));
}

function format_date(myDate) {
    return new Date(myDate).toLocaleTimeString('en',
    { timeStyle: 'short', hour12: false, timeZone: 'UTC' });
}

function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

function setCookie(name,value,days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/; samesite=lax; secure";
}

function logout(){
    $.ajax({
        type: 'delete',
        cache: false,
        url: "http://localhost:3000/logout",
        dataType: 'json',
        error: function (request, error) {
            error_alert(error)
        },
        success: function (response) {
            if(response.status === 200 && response['logged_out']){
                // setCookie("user_id", getCookie('user_id').toString(), -1)
                // setCookie("user_email",  getCookie('user_email').toString(), -1)
                window.location.href = "index.html";
            }
        }

    });
}