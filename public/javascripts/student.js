$.get("http://localhost:7888/student", function(data, status){
    for(var i = 0; i < data.length; i++){
        $("#student").append(
            $("<tr>"+
                "<td>"+data[i]['id']+"</td>"+
                "<td>"+data[i]['name']+"</td>"+
                "<td>"+data[i]['registration']+"</td>"+
                "<td>"+data[i]['classId'].code+"</td>"+
                "<td class='actions'>"+
                "<a style='margin-right: 5px;' class='editStudent' href='' data-toggle='modal', data-target='#modalStudent', data-id='"+data[i]['id']+"' data-registration='"+data[i]['registration']+"' data-name='"+data[i]['name']+"' data-class='"+data[i]['classId'].id+"'>Editar /"+
                "<a style='margin-right: 5px;' class='delStudent' href='' data-toggle='modal', data-target='#modalStudent', data-id='"+data[i]['id']+"' data-registration='"+data[i]['registration']+"' data-name='"+data[i]['name']+"' data-class='"+data[i]['classId'].id+"' data-del='1'>Excluir"+
                "</a>"+
                "</td>"+
            "</tr>")
        );
    }
    $(".editStudent").click(function(){
        $("#alunoLabel").text("Editar Aluno");
        $("#idDel").val("");
        $("#idStudent").val($(this).attr("data-id"));
        $("#nameStudent").val($(this).attr("data-name"));
        $("#registrationStudent").val($(this).attr("data-registration"));

        $("#classStudent").val($(this).attr("data-class")).trigger("change");

        $("#nameStudent").removeAttr('disabled');
        $("#registrationStudent").removeAttr('disabled');
        $("#classStudent").removeAttr('disabled');
    });

    $(".delStudent").click(function(){
        $("#alunoLabel").text("Deletar Aluno");
        $("#idDel").val($(this).attr("data-del"));
        $("#idStudent").val($(this).attr("data-id"));
        $("#nameStudent").val($(this).attr("data-name"));
        $("#registrationStudent").val($(this).attr("data-registration"));
        $("#nameStudent").attr('disabled','disabled');
        $("#registrationStudent").attr('disabled','disabled');
        $("#classStudent").attr('disabled','disabled');
    });
});
$("#sendStudent").click(function(){
    var idDel = $("#idDel").val();
    var id = $("#idStudent").val();
    var name = $("#nameStudent").val();
    var registration = parseInt($("#registrationStudent").val());
    var classId = parseInt($("#classStudent").val());
    if(!idDel){
        if(id){
            $.ajax({
                method: "PUT",
                url: "http://localhost:7888/student/"+id,
                headers: {
                    "Content-Type": "application/json"
                },
                data: JSON.stringify({
                    name: name,
                    registration: registration,
                    classId: classId
                }),
                success: function(data) {
                    window.location.replace("http://localhost:3000");
                }
            });
        } else {
            $.ajax({
                method: "POST",
                url: "http://localhost:7888/student",
                headers: {
                    "Content-Type": "application/json"
                },
                data: JSON.stringify({
                    name: name,
                    registration: registration,
                    classId: classId

                }),
                success: function(data) {
                    window.location.replace("http://localhost:3000");
                }
            });
        }
    } else {
        $.ajax({
            method: "DELETE",
            url: "http://localhost:7888/student/"+id,
            success: function(data) {
                window.location.replace("http://localhost:3000");
            }
        });
    }
});

$("#modalStudentO").click(function(){
    $("#alunoLabel").text("Cadastrar Aluno");
    $("#idDel").val("");
    $("#idStudent").val("");
    $("#nameStudent").val("");
    $("#registrationStudent").val("");

    $("#classStudent").val("").trigger("change");

    $("#nameStudent").removeAttr('disabled');
    $("#registrationStudent").removeAttr('disabled');
    $("#classStudent").removeAttr('disabled');
});