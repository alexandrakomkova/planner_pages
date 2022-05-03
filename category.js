cat_url = "http://localhost:3000/categories"
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
function delete_cat() {
    alert($(this).id);
    // let genre_id = document.getElementById('genre_id').value.toString();
    // delete_instance(cat_url+"/"+id);
}

// function update_cat(){
//     let json_genre = {
//         "genre": document.getElementById('genre_name').value.toString()
//     }
//     let genre_id = document.getElementById('genre_id').value.toString();
//     put(form_instance_url(cat_url, genre_id),json_genre);
// }

