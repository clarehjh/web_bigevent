
//每次调用get或post或ajax的时候会先调用这个函数
$.ajaxPrefilter(function (options) {
    // Modify options, control originalOptions, store jqXHR, etc 
    // console.log(options.url);
    //拼接请求根路径
    options.url = 'http://api-breakingnews-web.itheima.net' + options.url
});