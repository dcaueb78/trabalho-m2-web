var divError;
var divCriada = 0;

function valida() {
    
    //Remove Janela de erro anterior
    if(divCriada==1){
        var erro = document.getElementById("error");
        var div = document.getElementById("divError");
        erro.removeChild(div);
    }

    var criar_error = false;
    // Criação da DIV de error
    divError = criar_janela_erro();

    // Validação nome  
    var nome_validado = valida_nome(document.getElementById("nome").value);

    // Validação sobrenome
    var sobrenome_validado = valida_sobrenome(document.getElementById("sobrenome").value);

    // Validação das datas
    var data_validada = valida_datas(document.getElementById("dataini").value, document.getElementById("datafim").value);

    // Validação do email
    var email_validado = valida_email(document.getElementById("email"));

    // Validação do website
    var website_validado = valida_website(document.getElementById("website").value);

    // Validação atividades
    var valida_atividades = valida_atividade(document.formulario.atividade);

    // Validação da região
    var valida_regioes = valida_regiao(document.formulario.regiao);

    //Implementa a div de error caso necessite.
    desenhar_erro(criar_error);

    //Para verificar se a div já existe;
    divCriada = 1;

    // Retorno da função
    return nome_validado && sobrenome_validado && data_validada && email_validado && website_validado && valida_atividades && valida_regioes;

    
};
function criar_janela_erro(){
    var divError = document.createElement("div");
    divError.className = ("alert alert-danger text-center shadow");
    divError.id = ("divError");
    return divError;
}
function desenhar_erro(){
    if(criar_error===true){
        var div = document.getElementById("error");
        div.appendChild(divError);
        criar_error=false;
        return;
    }else{
        return;
    }
}
function valida_nome(nome) {
    nome_validado = true;
    if (nome.length < 3) {
        nome_validado = false;
        document.getElementById("span-nome").innerHTML = "*";
        //alert("O nome precisa ter mais de 3 caracteres");
        divError.innerHTML = "O nome precisa ter mais de 3 caracteres. <br>";
        criar_error = true;
    };
    return nome_validado;
};
function valida_sobrenome(sobrenome) {
    sobrenome_validado = true;
    if (sobrenome.length < 1) {
        sobrenome_validado = false;
        document.getElementById("span-sobrenome").innerHTML = "*";
        //alert("O campo sobrenome precisa ser preenchido");
        divError.innerHTML += "O campo sobrenome precisa ser preenchido. <br>";
        criar_error = true;
    };
    return sobrenome_validado;
};
function valida_datas (inicial, final) {
    if (inicial == ""){
        document.getElementById("span-data-inicial").innerHTML = "*";
        //alert("Deve-se colocar uma data inicial");
        divError.innerHTML += "Deve-se colocar uma data inicial. <br>";
        criar_error = true;
        if (final != "") {
            return false
        }
    }

    if (final == ""){
        document.getElementById("span-data-final").innerHTML = "*";
        //alert("Deve-se colocar uma data final");
        divError.innerHTML += "Deve-se colocar uma data final. <br>";
        criar_error = true;
        return false;
    }

    inicial = new Date(inicial);
    final = new Date(final);
    data_validada = true;
    if (inicial > final) {
        data_validada = false;
        document.getElementById("span-data-inicial").innerHTML = "*";
        document.getElementById("span-data-final").innerHTML = "*";
        //alert("A data inicial deve ser anterior a data final");
        divError.innerHTML += "A data inicial deve ser anterior a data final. <br>";
        criar_error = true;
    }
    return data_validada;
};
function valida_email(email) {
    usuario = email.value.substring(0, email.value.indexOf("@"));
    dominio = email.value.substring(email.value.indexOf("@")+1, email.value.length);
    email_validado = true;

    if ((usuario.length >=2) && 
        (dominio.length >= 2) &&
        (usuario.search("@")==-1) &&
        (dominio.search("@")==-1) &&
        (usuario.search(" ")==-1) &&
        (dominio.search(" ")==-1) &&
        (dominio.search(".")!=-1) &&
        (dominio.indexOf(".")>=2) &&
        (dominio.lastIndexOf(".") < dominio.length -1)) {
            return email_validado;
        }
        else {
            email_validado = false
            document.getElementById("span-email").innerHTML = "*";
            //alert("email inválido");
            divError.innerHTML += "Digite um E-mail Válido. <br>";
            criar_error = true;
            return email_validado;
        }    
};
function valida_website(site) {
    www = site.substring(0, site.indexOf("."));
    resto = site.substring(site.lastIndexOf(".", site.length));
    site_validado = true;
    if ((www == "www" || www == "http://www") &&
        (resto.length == 3 || resto.length == 4))
        {
    
    }else{
        site_validado = false;
        document.getElementById("span-website").innerHTML = "*";
        //alert("website inválido");
        
    }
    return site_validado;
}
function valida_atividade(campo) {
    qtd = campo.length;
    cont = 0;
    checkbox_validado = true;
    for (var i = 0; i < qtd; i++) {
        if (campo[i].checked){
            cont += 1;
        }
    }
    if (cont == 0) {
        document.getElementById("span-checkbox").innerHTML = "*";
        //alert("Deve-se selecionar ao menos 1 atividade pretendida");
        divError.innerHTML += "Deve-se selecionar ao menos 1 atividade pretendida. <br>";
        criar_error = true;
        return false;
    }
    if (cont > 3) {
        document.getElementById("span-checkbox").innerHTML = "*";
        //alert("Deve-se colocar no máximo 3 atividades pretendidas");
        divError.innerHTML += "Deve-se colocar no máximo 3 atividades pretendidas. <br>";
        criar_error = true;
        
        return false;
    }
    return checkbox_validado;
}
function valida_regiao(campo) {
    qtd = campo.length;
    cont = 0;
    radio_validado = true;
    for (var i = 0; i < qtd; i++) {
        if (campo[i].checked){
            cont += 1;
        }
    }
    if (cont == 0) {
        document.getElementById("span-radio").innerHTML = "*";
        //alert("Deve-se selecionar a sua região");
        divError.innerHTML += "Deve-se selecionar a sua região. <br>";
        criar_error = true;
        return false;
    }

    return radio_validado;
}
function desativa_checkbox() {
    checkbox = document.formulario.atividade;
    qtd = checkbox.length;

    for (var i = 0; i < qtd; i++) {
        if ((checkbox[i].value == "programador") || (checkbox[i].value == "dba")){
            checkbox[i].disabled = true;
        }
    }
}
function reset_checkbox() {
    checkbox = document.formulario.atividade;
    qtd = checkbox.length;

    for (var i = 0; i < qtd; i++) {        
        checkbox[i].disabled = false;
    }
}
function show_help(){
    var help = document.createElement("div");
    var div_container = document.getElementById("error");
    help.className = "alert alert-primary text-center shadow"
    help.id = "help";
    help.innerHTML = "Preencha todos os dados para se cadastrar,<br>Apenas WebSite não é obrigatório.<br>Eae Professor;<br>"
    div_container.appendChild(help);
    return;
}