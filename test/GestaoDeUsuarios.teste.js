import { realizarLogin } from '../src/GestaoDeUsuarios.js';
import assert from 'assert';

describe('Teste de Login', function () {
    it('Validação o login sendo realizado com sucesso', function () {
        const resultado = realizarLogin('valentina.paula@bol.com.br', 'V@l&nt1n@');
        assert.equal(resultado, 'Login realizado com sucesso');
    });

    it('Validação o login sendo realizado com credencial expirada', function () {
        const resultado = realizarLogin('jacob.madsen@yahoo.com.br', 'J@coBM@');
        assert.equal(resultado, 'Renove suas credenciais');
    });
    it('Validação o login sendo realizado com usuário não encontrado', function () {
        const resultado = realizarLogin('usuario.inexistente@delta.com', 'Z#lu#$%');
        assert.equal(resultado, 'Usuário não encontrado');
    });

    it('Validação o login sendo realizado com senha incorreta', function () {
        const resultado = realizarLogin('valentina.paula@bol.com.br', 'JacoBM@');
        assert.equal(resultado, 'Senha incorreta para o usuário informado');
    });

});