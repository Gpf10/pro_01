$(function() {
    load()
    $("input").on("keydown", function(e) {
        if (e.keyCode == 13 && $(this).val()) {
            //读取本地原来的数据
            var local = getDate();
            //追加数组
            local.push({ title: $(this).val(), done: false });
            saveDate(local);
            //渲染到页面当中
            load();
            $(this).val("");
        }
    });
    $("ol,ul").on("click", "a", function() {
        var data = getDate();
        var index = $(this).attr("id");
        data.splice(index, 1);
        saveDate(data);
        load();

    });
    $("ol,ul").on("click", "input", function() {
        var data = getDate();
        var index = $(this).siblings("a").attr("id");
        data[index].done = $(this).prop("checked");
        saveDate(data);
        load();
    });

    function getDate() {
        var data = localStorage.getItem("todolist");
        if (data !== null) {
            return JSON.parse(data);
        } else {
            return [];
        }
    };

    function saveDate(data) {
        localStorage.setItem("todolist", JSON.stringify(data));
    };

    function load() {
        $("ol ,ul").empty();
        var toDocount = 0;
        var done = 0;
        var data = getDate();
        $.each(data, function(i, ele) {
            if (ele.done) {
                done++
                $("ul").prepend("<li><input type='checkbox' checked><p>" + ele.title + "</p><a href='javascript:;' id=" + i + "></a></li>")
            } else {
                toDocount++
                $("ol").prepend("<li><input type='checkbox'><p>" + ele.title + "</p><a href='javascript:;' id=" + i + "></a></li>")

            }
        })
        $(".yes").text(done);
        $(".no").text(toDocount);
    };
})