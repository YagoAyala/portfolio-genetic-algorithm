import React from "react";

import logo from "../img/logo.svg";

const PrivacyPolicy = () => {
  const container = document.getElementById("container");
  container.style.height = "100vh";

  document.title = "Política de Privacidade | LotoAI";

  return (
    <div id={"privacy-policy"}>
      <img src={logo} alt={"logo"} />
      <h1>POLÍTICA DE PRIVACIDADE</h1>
      <div>
        <h3>1. Introdução</h3>

        <p>A Política de Privacidade do LotoAI descreve como coletamos, usamos e protegemos as informações pessoais que você fornece ao usar nosso software e serviços. Valorizamos e respeitamos a privacidade de nossos usuários, e esta política tem como objetivo explicar como tratamos suas informações.</p>

        <h3>2. Coleta de Informações</h3>

        <p>O LotoAI solicita algumas informações pessoais, como nome completo, telefone, endereço de e-mail e data de nascimento, quando você cria uma conta em nosso sistema. Essas informações são usadas para identificar sua conta e personalizar sua experiência.</p>

        <h3>3. Uso das Informações</h3>

        <p>As informações pessoais coletadas são utilizadas apenas para os seguintes fins:</p>

        <ul>
          <li>Identificação e autenticação de sua conta;</li>
          <li>Personalização de sua experiência com o LotoAI;</li>
          <li>Envio de comunicações relevantes relacionadas ao seu uso do sistema;</li>
          <li>Melhoria e desenvolvimento contínuo do LotoAI;</li>
        </ul>

        <h3>4. Compartilhamento de Informações</h3>

        <p>O LotoAI não compartilha suas informações pessoais com terceiros sem seu consentimento. Seus dados são tratados com confidencialidade e segurança.</p>

        <h3>5. Segurança das Informações</h3>

        <p>Tomamos medidas de segurança para proteger suas informações pessoais contra acesso não autorizado, uso indevido ou divulgação. Utilizamos protocolos de criptografia e outras práticas de segurança para manter a integridade de seus dados.</p>

        <h3>6. Cookies</h3>

        <p>O LotoAI pode usar cookies para melhorar sua experiência de uso. Você pode controlar o uso de cookies em seu navegador.</p>

        <h3>7. Contato</h3>

        <p>Se você tiver alguma dúvida ou preocupação sobre nossa Política de Privacidade, entre em contato conosco em lotoai.suporte@gmail.com.</p>

        <br/><br/>

        <p>Agradecemos por confiar no LotoAI. Estamos comprometidos em proteger sua privacidade.</p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
