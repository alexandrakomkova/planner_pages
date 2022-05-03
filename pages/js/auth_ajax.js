function login(){
    let json_user = {
         "user": {
             "email": document.getElementById('email').value.toString(),
             "password": document.getElementById('password').value.toString()
         }
    }

    post_auth("http://localhost:3000/sessions#logged_in", json_user);
}

function registration(){
    let json_user = {
        "user": {
            "email": document.getElementById('email').value.toString(),
            "password": document.getElementById('password').value.toString(),
            "password_confirmation": document.getElementById('password').value.toString()
        }
    }

    post_auth("http://localhost:3000/registrations", json_user);
}

function post_auth(url, json_data) {
    $.ajax({
        type: 'post',
        data: json_data,
        cache: false,
        url: url,
        dataType: 'json',
        error: function (request, error) {
            error_alert(error)
        },
        success: function (response) {
            if(response.status === 401){
                alert("Wrong email or password.. :(");
            }
            else{
                console.log(response['user']['id']);
                setCookie("user_id", response['user']['id'], 1)
                setCookie("user_email", response['user']['email'], 1)
                if(getCookie('user_id').toString()) {
                    window.location.href = "http://localhost:63342/planner_api/pages/html/index.html?_ijt=bip9fc3fqi8mi7habl14phb6c6&_ij_reload=RELOAD_ON_SAVE";
                }else{
                    window.location.href = "http://localhost:63342/planner_api/pages/html/auth.html?_ijt=4p97735jdrvbrc5n6t7hkjd6li&_ij_reload=RELOAD_ON_SAVE";
                }
            }
        }
    });
}


