// Teacher tribute messages - displayed above video carousel
export const TEACHER_TRIBUTE_MESSAGES = {
  dalmazo: {
    title: "Professor Dalmazo",
    message: `O que dizer do professor que mais entende do mundo cripto?

Foi incrível conhecer esse lado pouco explorado da computação através de alguém tão apaixonado pelo tema. Foi um prazer ter compartilhado contigo esse ambiente de troca, leve e cheio de boas discussões.

Só temos a agradecer pela parceria que construímos e por todo o conhecimento que adquirimos ao longo dessa jornada ❤️

Aceita ser homenageado de ECOMP?

* No dia 21/11 iremos fazer as nossas fotos no Camping do Senandes, você está convidado! Pode chegar a partir das 17h.
`
  },
  cleo: {
    title: "Professor Cleo",
    message: `O que dizer do professor que mais nos ajuda com as burocracias do C3?

Como coordenador e professor, tu sempre nos apoiou e solucionou tudo o que precisamos com prestatividade e carinho.

Só temos a agradecer pela parceria que construímos e por todo o conhecimento que adquirimos ao longo dessa jornada ❤️

Por isso, é com muita alegria que queremos te convidar para representar nossa turma como Patrono!

Aceita ser o patrono de ECOMP?

* No dia 21/11 iremos fazer as nossas fotos no Camping do Senandes, você está convidado! Pode chegar a partir das 17h.
`
  },
  pedro: {
    title: "Professor Pedro",
    message: `O professor mais amigo dos alunos! Nunca esquecemos da frase:
“Eu não vou fazer com vocês o que eu não gostava que faziam comigo quando eu era aluno.”

Essa empatia foi fundamental para as aulas de Sistemas Operacionais e Redes. E que ano incrível foi aquele em que tivemos a oportunidade de ter aula contigo!

Só temos a agradecer pela parceria que construímos e por todo o conhecimento que adquirimos ao longo dessa jornada ❤️

Por isso, é com muita alegria que queremos te convidar para representar nossa turma como Paraninfo!

Aceita esse convite da turma de ECOMP?

* No dia 21/11 iremos fazer as nossas fotos no Camping do Senandes, você está convidado! Pode chegar a partir das 17h.
`
  },
  bicho: {
    title: "Professor Bicho",
    message: `O professor mais tranquilo do C3… mas que soube “tirar nosso couro” quando precisou 😂

Queremos agradecer por todos os ensinamentos e pelo espaço que sempre tivemos para trocar conhecimento — de ti para nós e de nós para ti. Foi um sentimento real de que aprendemos juntos.

Tivemos grandes projetos ao longo do caminho — o jogo com a Unity, os algoritmos de simulação de multidões… e em cada um deles aprendemos demais!

Só temos a agradecer pela parceria que construímos e por todo o conhecimento que adquirimos ao longo dessa jornada ❤️

Aceita ser homenageado de ECOMP??

* No dia 21/11 iremos fazer as nossas fotos no Camping do Senandes, você está convidado! Pode chegar a partir das 17h.
`
  },
  vitor: {
    title: "Professor Vitor",
    message: `Vitor, tu és aquele tipo de professor fora da curva, que inspira com a tua inteligência e humildade.
    
É evidente o quanto tu te dedica e o quanto gosta do que ensina. Esse entusiasmo é contagiante e chega até nós. 

Só temos a agradecer pela parceria que construímos e por todo o conhecimento que adquirimos ao longo dessa jornada ❤️

Aceita ser homenageado de ECOMP??

* No dia 21/11 iremos fazer as nossas fotos no Camping do Senandes, você está convidado! Pode chegar a partir das 17h.
`
  },
  berri: {
    title: "Professor Berri",
    message: `Berri, apesar dos mosquitos do C3 nas aulas que iam até as 18:50, nos divertimos e aprendemos muito contigo 😂

Só temos a agradecer pela parceria que construímos e por todo o conhecimento que adquirimos ao longo dessa jornada ❤️

Aceita ser homenageado de ECOMP??

* No dia 21/11 iremos fazer as nossas fotos no Camping do Senandes, você está convidado! Pode chegar a partir das 17h.
`
  },
  andré: {
    title: "Professor André",
    message: `André, o tal professor que toca violão pros alunos!

Foram momentos muito bons que tivemos na disciplina de PDS. Com um clima sempre leve, nos divertimos muito ao teu lado e aprendemos muito com a tua experiência.

Só temos a agradecer pela parceria que construímos e por todo o conhecimento que adquirimos ao longo dessa jornada ❤️

Aceita ser homenageado de ECOMP??

* No dia 21/11 iremos fazer as nossas fotos no Camping do Senandes, você está convidado! Pode chegar a partir das 17h.
`
  },
  schvittz: {
    title: "Professor Schvittz",
    message: `Schivittz, guardaremos pra sempre na memória o nervosismo de não funcionar o circuito, de escapar um jumper, de as coisas não funcionarem mesmo quando elas deviam estar funcionando 🥶
    
Tivemos muitos desafios, mas a tua parceiria e empenho deixaram o processo muito mais tranquilo, e aprendemos demais contigo.

Só temos a agradecer pela parceria que construímos e por todo o conhecimento que adquirimos ao longo dessa jornada ❤️

Aceita ser nosso homenageado de ECOMP??

* No dia 21/11 iremos fazer as nossas fotos no Camping do Senandes, você está convidado! Pode chegar a partir das 17h.
`
  }
};

// Get tribute message for a teacher
export const getTributeMessage = (teacherName) => {
  const normalizedName = teacherName?.toLowerCase();
  return TEACHER_TRIBUTE_MESSAGES[normalizedName] || {
    title: `Professor ${teacherName?.charAt(0).toUpperCase() + teacherName?.slice(1)}`,
    message: "Mensagem de homenagem será adicionada em breve."
  };
};
