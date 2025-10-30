// Teacher tribute messages - displayed above video carousel
export const TEACHER_TRIBUTE_MESSAGES = {
  dalmazo: {
    title: "Professor Dalmazo",
    message: `O que dizer do professor que mais entende do mundo cripto?
Só temos a agradecer pelas parcerias e pelos ensinamentos em sistemas distribuídos e tópicos.

Foi incrível conhecer esse lado pouco explorado da computação — aplicações com blockchain e o universo cripto. A forma como nossa relação se desenvolveu nas aulas nos deixa muito felizes: sempre em um ambiente de troca leve e cheio de boas discussões.

Nossos sinceros agradecimentos ❤️

Aceita ser homenageado de ECOMP?

* No dia 21/11 iremos fazer as nossas fotos no Camping do Senandes, você está convidado! Pode chegar a partir das 17h.
`
  },
  cleo: {
    title: "Professor Cleo",
    message: `O que dizer do professor que mais nos ajuda com as burocracias do C3?
Só temos a agradecer pela parceria de sempre, pela agilidade e por solucionar tudo que precisamos de forma tão proativa.

Além de excelente professor, te consideramos um grande amigo. Por isso, é com muita alegria que queremos te convidar para representar nossa turma como Patrono!

Nossos sinceros agradecimentos ❤️

Aceita ser o patrono de ECOMP?

* No dia 21/11 iremos fazer as nossas fotos no Camping do Senandes, você está convidado! Pode chegar a partir das 17h.
`
  },
  pedro: {
    title: "Professor Pedro",
    message: `O professor mais amigo dos alunos! Nunca esquecemos da frase:
“Eu não vou fazer com vocês o que eu não gostava que faziam comigo quando eu era aluno.”

Essa empatia foi fundamental para as aulas de Sistemas Operacionais e Redes. E que ano incrível foi aquele… desenvolver um gerenciador de processos, um sistema de arquivos, pesquisas de mudanças na infraestrutura da Internet com o RIPE Atlas — tudo guardado com muito carinho.

Só temos a agradecer pela parceria e pela amizade que construímos.

Além de excelente professor, te consideramos um grande amigo. Por isso, é com muita alegria que queremos te convidar para representar nossa turma como Paraninfo!

Nossos sinceros agradecimentos ❤️

Aceita esse convite da turma de ECOMP?

* No dia 21/11 iremos fazer as nossas fotos no Camping do Senandes, você está convidado! Pode chegar a partir das 17h.
`
  },
  bicho: {
    title: "Professor Bicho",
    message: `O professor mais tranquilo do C3… mas que soube “tirar nosso couro” quando precisou 😂

Queremos agradecer por todos os ensinamentos e pelo espaço que sempre tivemos para trocar conhecimento — de ti para nós e de nós para ti. Foi um sentimento real de que aprendemos juntos.

Tivemos grandes projetos ao longo do caminho — o jogo com a Unity, os algoritmos de simulação de multidões… e em cada um deles aprendemos demais!

Só temos a agradecer pela parceria e pela amizade que construímos.
Nossos sinceros agradecimentos ❤️

Aceita ser homenageado de ECOMP??

* No dia 21/11 iremos fazer as nossas fotos no Camping do Senandes, você está convidado! Pode chegar a partir das 17h.
`
  },
  vitor: {
    title: "Professor Vitor",
    message: `Vitor, tu és um dos maiores gênios que já conhecemos.
Nas aulas de Circuitos Elétricos e de Tópicos ficou evidente o quanto tu és empolgado com a matéria — e, principalmente, em transmitir esse entusiasmo para nós. Esperamos que tu sinta nossa gratidão.

Queremos agradecer por todos os ensinamentos e pelo espaço que sempre tivemos para trocar conhecimento. A aula de Tópicos em Controle foi um espetáculo, e o projeto final foi uma experiência incrível!

Só temos a agradecer pela parceria e pela amizade que construímos.
Nossos sinceros agradecimentos ❤️

Aceita ser homenageado de ECOMP??

* No dia 21/11 iremos fazer as nossas fotos no Camping do Senandes, você está convidado! Pode chegar a partir das 17h.
`
  },
  berri: {
    title: "Professor Berri",
    message: `Berri, queremos agradecer por todo o empenho e trocas que tivemos nas disciplinas de Linguagens de programação e em tópicos.

Foram momentos muito bons, nos divertimos muito ao teu lado, mesmo com os mosquitos do C3 nas aulas que iam até as 18:50 😂

Só temos a agradecer pela parceria e pela amizade que construímos.
Nossos sinceros agradecimentos ❤️

Aceita ser homenageado de ECOMP??

* No dia 21/11 iremos fazer as nossas fotos no Camping do Senandes, você está convidado! Pode chegar a partir das 17h.
`
  },
  andré: {
    title: "Professor André",
    message: `André, tu foste o único professor que tocou violão em sala!

Foram momentos muito bons que tivemos na disciplina de PDS. 
Com um clima sempre leve, nos divertimos muito ao teu lado.
Projetar um sistema de companhias aéreas não foi nada fácil 😂 ,mas certamente trouxe muito aprendizado.

Só temos a agradecer pela parceria e pela amizade que construímos.
Nossos sinceros agradecimentos ❤️

Aceita ser homenageado de ECOMP??

* No dia 21/11 iremos fazer as nossas fotos no Camping do Senandes, você está convidado! Pode chegar a partir das 17h.
`
  },
  schvittz: {
    title: "Professor Schvittz",
    message: `Schivittz, queremos te agradecemos por ser o professor que trouxe a disciplina de Hardware para a turma.
Mexer com componentes de circuito foi algo desafiador, mas a tua parceiria e empenho deixaram o processo muito mais tranquilo, e aprendemos demais contigo.

Nunca iremos esquecer dos contadores que fizemos, nem dos trabalhos com FPGA... Do nervosismo de não funcionar o circuito, de escapar um jumper 🥶

Só temos a agradecer pela parceria e pela amizade que construímos.
Nossos sinceros agradecimentos ❤️

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