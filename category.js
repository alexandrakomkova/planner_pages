domain = "http://dayplanner-3.herokuapp.com"
cat_url = domain+"/categories"
get_all_cats();
function add_cat(){
    let json_cat = {
        "user_id" : getCookie("user_id").toString(),
        "title": document.getElementById('cat_title').value.toString()
    }
    post(cat_url, json_cat)
    get_all_cats();
}

function get_all_cats(){
    get(cat_url+"_user/"+getCookie('user_id').toString(), 'result_cat')
}

function get_cat(id){
    add_values_to_select(`cat_select_${id}`);
    $.ajax({
        type: 'get',
        cache: false,
        url: cat_url+"/"+id,
        dataType: 'json',
        async: true,
        error: function (request, error) {
            error_alert(error)
        },
        success: function (data) {
            document.getElementById(`cat_select_${id}`).value = data['id'];
        }

    });
}
function delete_cat(id) {
    delete_instance(cat_url+"/"+id);
    get_all_cats();
}


function update_cat(id){
    let json_cat = {
        "user_id" : getCookie("user_id").toString(),
        "title": document.getElementById(`cat_title_${id}`).value.toString()
    }
    put(cat_url+"/"+id, json_cat);
    get_all_cats();
}

function set_name_in_header(){
    document.getElementById("hello_account").innerText+=getCookie("user_email").toString();
}
set_name_in_header();