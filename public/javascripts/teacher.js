$.get("http://localhost:7888/teacher", function(data, status){
    for(var i = 0; i < data.length; i++){
        $("#teacher").append(
            $("<tr>"+
                "<td>"+data[i]['id']+"</td>"+
                "<td>"+data[i]['name']+"</td>"+
                "<td>"+data[i]['titration']+"</td>"+
                "<td class='actions'>"+
                "<a style='margin-right: 5px;' class='editTeacher' href='' data-toggle='modal', data-target='#modalTeacher', data-id='"+data[i]['id']+"' data-titration='"+data[i]['titration']+"' data-name='"+data[i]['name']+"'>Editar /"+
                "<a style='margin-right: 5px;' class='delTeacher' href='' data-toggle='modal', data-target='#modalTeacher', data-id='"+data[i]['id']+"' data-titration='"+data[i]['titration']+"' data-name='"+data[i]['name']+"' data-del='1'>Excluir"+
                "</a>"+
                "</td>"+
            "</tr>")
        );
    }
    $(".editTeacher").click(function(){
        $("#exampleModalLabel").text("Editar Professor");
        $("#idDel").val("");
        $("#idTeacher").val($(this).attr("data-id"));
        $("#nameTeacher").val($(this).attr("data-name"));
        $("#titrationTeacher").val($(this).attr("data-titration"));
        $("#nameTeacher").removeAttr('disabled');
        $("#titrationTeacher").removeAttr('disabled');
    });

    $(".delTeacher").click(function(){
        $("#exampleModalLabel").text("Deletar Professor");
        $("#idDel").val($(this).attr("data-del"));
        $("#idTeacher").val($(this).attr("data-id"));
        $("#nameTeacher").val($(this).attr("data-name"));
        $("#titrationTeacher").val($(this).attr("data-titration"));
        $("#nameTeacher").attr('disabled','disabled');
        $("#titrationTeacher").attr('disabled','disabled');
    });
});
$("#sendTeacher").click(function(){
    var idDel = $("#idDel").val();
    var id = $("#idTeacher").val();
    var name = $("#nameTeacher").val();
    var titration = $("#titrationTeacher").val();
    if(!name || !titration){
        alert('Campos com * é obrigatorio!');
        return false;
    }
    if(!idDel){
        if(id){
            $.ajax({
                method: "PUT",
                url: "http://localhost:7888/teacher/"+id,
                headers: {
                    "Content-Type": "application/json"
                },
                data: JSON.stringify({
                    name: name,
                    titration: titration
                }),
                success: function(data) {
                    window.location.replace("http://localhost:3000");
                }
            });
        } else {
            $.ajax({
                method: "POST",
                url: "http://localhost:7888/teacher",
                headers: {
                    "Content-Type": "application/json"
                },
                data: JSON.stringify({
                    name: name,
                    titration: titration
                }),
                success: function(data) {
                    window.location.replace("http://localhost:3000");
                }
            });
        }
    } else {
        $.ajax({
            method: "DELETE",
            url: "http://localhost:7888/teacher/"+id,
            success: function(data) {
                window.location.replace("http://localhost:3000");
            }
        });
    }
});


$("#modalTeacherO").click(function(){
    $("#exampleModalLabel").text("Cadastrar Professor");
    $("#idDel").val("");
    $("#idTeacher").val("");
    $("#nameTeacher").val("");
    $("#titrationTeacher").val("");

    $("#nameTeacher").removeAttr('disabled');
    $("#titrationTeacher").removeAttr('disabled');
});