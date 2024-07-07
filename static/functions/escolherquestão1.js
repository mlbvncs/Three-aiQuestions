//Liberando assunto ao escolher matéria
function liberaAssunto(){
    var matéria = document.querySelector('#select1').value

    if(matéria === "Matemática"){
        document.querySelector('#select2').innerHTML = `
            <option selected data-default>Selecione</option>
            <option value="Grandezasproporcionais">Grandezas Proporcionais</option>
            <option value="Probabilidade">Probabilidade</option>
        `
    }else if(matéria === "Física"){
        document.querySelector('#select2').innerHTML = `
            <option selected data-default>Selecione</option>
            <option value="Energia">Energia</option>
            <option value="Ondulatória">Ondulatória</option>
        `
    }else{
        document.querySelector('#select2').innerHTML = `
            <option selected data-default>Selecione</option>
        `
    }
}
//Enviando o formulário (apresentando erro caso seja necessário, com isso apagando as questões escolhidas antes, caso seja o caso)
form1.addEventListener('submit', (event) => {
    event.preventDefault();
    var labelmatéria = document.querySelector('#label1')
    var matéria = document.querySelector('#select1')

    var labelassunto =  document.querySelector('#label2')
    var assunto = document.querySelector('#select2')

    if(matéria.value === "Selecione"){
        labelmatéria.setAttribute('style', 'color: red;')
        matéria.setAttribute('style', 'border-color: red; color: red;')

        contmatéria = false
    }else{
        labelmatéria.setAttribute('style', 'color: black;')
        matéria.setAttribute('style', 'border-color: black; color: black;')

        contmatéria = true
    }
    //
    if(assunto.value === "Selecione"){
        labelassunto.setAttribute('style', 'color: red;')
        assunto.setAttribute('style', 'border-color: red; color: red;')

        contassunto = false
    }else{
        labelassunto.setAttribute('style', 'color: black;')
        assunto.setAttribute('style', 'border-color: black; color: black;')

        contassunto = true
    }

    if(contmatéria === true && contassunto === true){
        buscarQuestões(matéria.value, assunto.value)
    }else{
        document.querySelector('#div1').innerHTML = ""
    }
})
//Buscando as questões na API e mostrando-as na tela
function buscarQuestões(matéria, assunto){
    axios.get('https://threeaiapiquestoes-131fd4052cb8.herokuapp.com/' + matéria + '/' + assunto)
    .then(function (response) {
        console.log(response)
        var questões = response.data
        var mostrarquestões = ''

        for(var i=0; i<questões.length; i++){
            mostrarquestões += `
              <div class="mt-4 div5">
                <h2>${questões[i].Fonte}</h2>
                <p>${questões[i].Enunciado}</p>
              </div>
              <button class="btn btn-outline-dark rounded-4 mt-3 button2" onClick="questão('${matéria}', '${assunto}', '${questões[i].ID}')">Ver questão</button>
            `
        }
        document.querySelector('#div1').innerHTML = mostrarquestões
    })
    .catch(function (error) {
        console.log(error)
    })
    .finally(function () {
    })
}
//Enviando os dados da questão escolhida (para "/escolherquestão", com método "POST") por meio de um formulário
function questão(matéria, assunto, ID){
    axios.get('https://threeaiapiquestoes-131fd4052cb8.herokuapp.com/' + matéria + '/' + assunto + '/' + ID)
    .then(function (response) {
        console.log(response)
        var questão = response.data
        console.log(questão)

        document.querySelector('#form2').innerHTML = `
          <input name="fonte" value="${questão["Fonte"]}">
          <input name="enunciado" value="${questão["Enunciado"]}">
          <input name="alternativas" value="${questão["Alternativas"]}">
          <input name="resposta" value="${questão["Resposta"]}">
        `

        form2.submit()
    })
    .catch(function (error) {
        console.log(error)
    })
    .finally(function () {
    })
}