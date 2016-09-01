/**
 * Created by Junal on 2016-06-24.
 */
$.fn.serializeObject = function()
{
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};

/*
    To avoid conflict with local and remote api url
 */
if (document.location.hostname == "localhost") {
    window.apiUrl = "http://localhost:8888/api/";
    //window.apiUrl = "http://oneircloud.perfectmail.com:8888/api/";
}else {
    window.apiUrl = "http://oneircloud.perfectmail.com:8888/api/";
}