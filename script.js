async function buscaEndereco(cep) {
    document.getElementById('erro').innerHTML = '';
    try {
        var consultaCEP = await (await fetch(`https://viacep.com.br/ws/${cep}/json/`)).json()
        if (consultaCEP.erro) {
            throw Error('CEP não existe!')
        }

        document.getElementById('endereco').value = consultaCEP.logradouro;
        document.getElementById('bairro').value = consultaCEP.bairro;
        document.getElementById('cidade').value = consultaCEP.localidade;
        document.getElementById('estado').value = consultaCEP.uf;
        
        return consultaCEP;
    } catch (erro) {
        document.getElementById('erro').innerHTML = `
            <p> CEP Inválido. Tente novamente! </p>
            <p>${erro}</p>
        `;
    }
}

document.getElementById('cep').addEventListener('focusout', () => {
    buscaEndereco(cep.value);
});