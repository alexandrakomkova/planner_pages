task_url = "http://localhost:3000/tasks"
cat_url = "http://localhost:3000/categories"
add_values_to_select('task_cat');
get_all_tasks();

function add_task(){
    let json_task = {
        "user_id" : getCookie("user_id").toString(),
        "category_id": document.getElementById('task_cat').value.toString(),
        "time_start": document.getElementById('time_start').value.toString(),
        "time_finish": document.getElementById('time_finish').value.toString(),
    }
    post(task_url, json_task);
    get_all_tasks();
}

function get_all_tasks(){
    get(task_url+"_user/"+getCookie('user_id').toString(), 'result_task')
}

function add_values_to_select(select_id){
    $.ajax({
        type: 'get',
        cache: false,
        url: cat_url+"_user/"+getCookie("user_id").toString(),
        dataType: 'json',
        error: function (request, error) {
            error_alert(error)
        },
        success: function (data) {
            for(var i=0; i < data.length; i++)
            {
                var select = document.getElementById(select_id);
                select.options[select.options.length] = new Option(data[i]['title'], data[i]['id']);
            }

        }
    });

}

function delete_task(id) {

    delete_instance(task_url+"/"+id);
    get_all_tasks();
}