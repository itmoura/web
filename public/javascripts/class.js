$.get("http://localhost:7888/class", function(data, status){
    var dataA = (new Date).getTime();
    for(var i = 0; i < data.length; i++){
        var dataO = Date.parse(data[i]['dateOppening']);
        var dataE = Date.parse(data[i]['dateEnding']);
        var resp = "Não";
        if(dataA >= dataO && dataA < dataE)
            resp = "Sim"
        $("#class").append(
            $("<tr>"+
                "<td>"+data[i]['id']+"</td>"+
                "<td>"+data[i]['code']+"</td>"+
                "<td>"+data[i]['room']+"</td>"+
                "<td>"+data[i]['teacherId'].name+"</td>"+
                "<td class='date'>"+data[i]['dateOppening']+"</td>"+
                "<td class='date'>"+data[i]['dateEnding']+"</td>"+
                "<td>"+resp+"</td>"+
                "<td class='actions'>"+
                "<a style='margin-right: 5px;' class='editClass' href='' data-toggle='modal', data-target='#modalClass', data-teacher='"+data[i]['teacherId'].id+"' data-id='"+data[i]['id']+"' data-code='"+data[i]['code']+"' data-room='"+data[i]['room']+"' data-dateOppening='"+data[i]['dateOppening']+"' data-dateEnding='"+data[i]['dateEnding']+"'>Editar /"+
                "<a style='margin-right: 5px;' class='delClass' href='' data-toggle='modal', data-target='#modalClass', data-teacher='"+data[i]['teacherId'].id+"' data-id='"+data[i]['id']+"' data-code='"+data[i]['code']+"' data-room='"+data[i]['room']+"' data-dateOppening='"+data[i]['dateOppening']+"' data-dateEnding='"+data[i]['dateEnding']+"' data-del='1'>Excluir"+
                "</a>"+
                "</td>"+
            "</tr>")
        );
    }
    $('.date').mask('0000-00-00');
    $(".editClass").click(function(){
        $("#classLabel").text("Editar Turma");
        $("#idDel").val("");
        $("#idClass").val($(this).attr("data-id"));
        $("#codeClass").val($(this).attr("data-code"));
        $("#roomClass").val($(this).attr("data-room"));
        $("#dateOppeningClass").val($(this).attr("data-dateOppening"));
        $("#dateEndingClass").val($(this).attr("data-dateEnding"));
        $("#teacherID").val($(this).attr("data-teacher"));

        $("#teacherID").val($(this).attr("data-teacher")).trigger("change");

        $("#codeClass").removeAttr('disabled');
        $("#roomClass").removeAttr('disabled');
        $("#dateOppeningClass").removeAttr('disabled');
        $("#dateEndingClass").removeAttr('disabled');
        $("#teacherID").removeAttr('disabled');
    });

    $(".delClass").click(function(){
        $("#classLabel").text("Deletar Turma");
        $("#idDel").val($(this).attr("data-del"));
        $("#idClass").val($(this).attr("data-id"));
        $("#codeClass").val($(this).attr("data-code"));
        $("#roomClass").val($(this).attr("data-room"));
        $("#dateOppeningClass").val($(this).attr("data-dateOppening"));
        $("#dateEndingClass").val($(this).attr("data-dateEnding"));

        $("#teacherID").val($(this).attr("data-teacher")).trigger("change");

        $("#codeClass").attr('disabled','disabled');
        $("#roomClass").attr('disabled','disabled');
        $("#dateOppeningClass").attr('disabled','disabled');
        $("#dateEndingClass").attr('disabled','disabled');
        $("#teacherID").attr('disabled','disabled');
    });
});
$("#sendClass").click(function(){
    var idDel = $("#idDel").val();
    var id = $("#idClass").val();
    var teacherId = parseInt($("#teacherID").val());
    var code = $("#codeClass").val();
    var room = $("#roomClass").val();
    var dateOppening = $("#dateOppeningClass").val();
    var dateEnding = $("#dateEndingClass").val();
    if(!idDel){
        if(id){
            $.ajax({
                method: "PUT",
                url: "http://localhost:7888/class/"+id,
                headers: {
                    "Content-Type": "application/json"
                },
                data: JSON.stringify({
                    code: code,
                    room: room,
                    dateOppening: dateOppening,
                    dateEnding: dateEnding,
                    teacherId: teacherId
                }),
                success: function(data) {
                    window.location.replace("http://localhost:3000");
                }
            });
        } else {
            $.ajax({
                method: "POST",
                url: "http://localhost:7888/class",
                headers: {
                    "Content-Type": "application/json"
                },
                data: JSON.stringify({
                    code: code,
                    room: room,
                    dateOppening: dateOppening,
                    dateEnding: dateEnding,
                    teacherId: teacherId
                }),
                success: function(data) {
                    window.location.replace("http://localhost:3000");
                }
            });
        }
    } else {
        $.ajax({
            method: "DELETE",
            url: "http://localhost:7888/class/"+id,
            success: function(data) {
                window.location.replace("http://localhost:3000");
            }
        });
    }
});


$("#modalClassO").click(function(){

    $("#classLabel").text("Cadastrar Turma");
    $("#idDel").val("");
    $("#idClass").val("");
    $("#codeClass").val("");
    $("#roomClass").val("");
    $("#dateOppeningClass").val("");
    $("#dateEndingClass").val("");
    $("#teacherID").val("");

    $("#teacherID").val("").trigger("change");

    $("#codeClass").removeAttr('disabled');
    $("#roomClass").removeAttr('disabled');
    $("#dateOppeningClass").removeAttr('disabled');
    $("#dateEndingClass").removeAttr('disabled');
    $("#teacherID").removeAttr('disabled');
});