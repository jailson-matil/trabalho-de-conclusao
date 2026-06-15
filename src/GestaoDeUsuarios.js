const usuarios =
    [
        {
            id: 1,
            nome: 'Valentina de Paula',
            email: 'valentina.paula@bol.com.br',
            senha: 'V@l&nt1n@',
            expirado: false
        },
        {
            id: 2,
            nome: 'Jacob Madsen',
            email: 'jacob.madsen@yahoo.com.br',
            senha: 'J@coBM@',
            expirado: true
        },
    ]


export function realizarLogin(email, senha) {
    for (let i = 0; i < usuarios.length; i++) {

        if (email == usuarios[i].email && senha == usuarios[i].senha) {
            if (usuarios[i].expirado == true) {
                return 'Renove suas credenciais';
            }
            return 'Login realizado com sucesso';
        }
        if (email == usuarios[i].email && senha != usuarios[i].senha) {
            return 'Senha incorreta para o usuário informado';
        }
    }
    return 'Usuário não encontrado'
}

