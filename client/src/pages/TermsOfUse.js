import React from "react";

import logo from "../img/logo.svg";

const TermsOfUse = () => {
  const container = document.getElementById("container");
  container.style.height = "100vh";

  document.title = "Termos de Uso | LotoAI";

  return (
    <div id={"terms-of-use"}>
      <img src={logo} alt={"logo"} />
      <h1>TERMOS DE USO DA LOTOAI</h1>
      <div>
        <p>Por favor, leia atentamente os seguintes Termos de Uso antes de acessar ou usar o software, aplicativo e serviços oferecidos pela LotoAI. Ao acessar ou usar o LotoAI, você concorda em cumprir estes Termos de Uso. Se você não concordar com esses termos, não use o LotoAI.</p>

        <h3>1. Introdução</h3>

        <p>O LotoAI é um software desenvolvido para auxiliar os usuários na geração de números e apostas para a loteria Lotofácil, por meio de algoritmos e validações. É importante ressaltar que o LotoAI não é um site de apostas nem um site de jogos de azar. Não estamos associados à Caixa Econômica Federal ou a qualquer órgão responsável pela Lotofácil.</p>

        <h3>2. Uso Responsável</h3>

        <p>O LotoAI é destinado ao entretenimento e à assistência na escolha de números da Lotofácil. Os resultados gerados pelo sistema não garantem vitória nos sorteios da Lotofácil, pois os resultados da loteria são inteiramente aleatórios. Portanto, recomendamos que você jogue de forma responsável e não dependa exclusivamente dos números gerados pelo LotoAI para tomar decisões de apostas.</p>

        <h3>3. Disponibilidade do Serviço</h3>

        <p>O LotoAI faz o possível para manter o serviço disponível de forma contínua e confiável. No entanto, não podemos garantir que o serviço estará livre de interrupções ou erros. Reservamo-nos o direito de suspender, interromper ou modificar o serviço a qualquer momento, por qualquer motivo, sem aviso prévio.</p>

        <h3>4. Registro e Conta de Usuário</h3>

        <p>Você pode ser solicitado a se registrar e criar uma conta de usuário para acessar recursos específicos do LotoAI. Você é responsável por manter suas informações de conta seguras e atualizadas. Não compartilhe sua senha com terceiros. Você é o único responsável por qualquer atividade em sua conta.</p>

        <h3>5. Privacidade e Dados</h3>

        <p>A coleta e o uso de informações pessoais estão sujeitos à nossa Política de Privacidade. Ao usar o LotoAI, você concorda com a coleta e o uso de suas informações conforme descrito em nossa Política de Privacidade.</p>

        <h3>6. Propriedade Intelectual</h3>

        <p>Todo o conteúdo disponível no LotoAI, incluindo texto, gráficos, logotipos, imagens, vídeos e software, é de propriedade exclusiva da LotoAI ou de nossos licenciadores e está protegido por leis de direitos autorais e outras leis de propriedade intelectual. Você concorda em não copiar, reproduzir, modificar, distribuir ou criar obras derivadas com base no conteúdo do LotoAI sem autorização prévia por escrito.</p>

        <h3>7. Limitação de Responsabilidade</h3>

        <p>Você concorda que o uso do LotoAI é por sua conta e risco. Não seremos responsáveis por quaisquer perdas ou danos decorrentes do uso ou da incapacidade de usar o serviço, incluindo, mas não se limitando a, perda de dados, perda de lucros ou qualquer dano indireto, incidental, especial, consequente ou punitivo.</p>

        <h3>8. Alterações nos Termos de Uso</h3>

        <p>Reservamo-nos o direito de modificar estes Termos de Uso a qualquer momento, e tais alterações entrarão em vigor imediatamente após a publicação. É sua responsabilidade verificar periodicamente os Termos de Uso para estar ciente de quaisquer alterações. O uso continuado do LotoAI após a publicação das alterações constituirá sua aceitação dessas alterações.</p>

        <h3>9. Encerramento de Conta</h3>

        <p>Podemos encerrar ou suspender sua conta e seu acesso ao LotoAI a nosso critério, sem aviso prévio, por violação destes Termos de Uso ou por qualquer outra razão.</p>

        <h3>10. Contato</h3>

        <p>Se você tiver alguma dúvida ou preocupação sobre estes Termos de Uso, entre em contato conosco em [Inserir endereço de contato].</p>

        <p>Obrigado por usar o LotoAI. Divirta-se e jogue com responsabilidade!</p>
      </div>
    </div>
  );
};

export default TermsOfUse;
