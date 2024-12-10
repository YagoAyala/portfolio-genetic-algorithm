import React, { useEffect, useMemo, useRef, useState } from "react";

import { useForm } from "react-hook-form";
import { useNavigate, useLocation } from "react-router-dom";

import { AiOutlineArrowUp } from "react-icons/ai";
import { LiaExternalLinkAltSolid } from "react-icons/lia";

import { checkout } from "../utils/checkout";
import { errorNotify } from "../hooks/SystemToasts";

import Loading from "../components/Loading";

import logo from "../img/logo.svg";
import icon1 from "../img/icon1.svg";
import banner2 from "../img/banner2.svg";

import "../styles/seo.css";

const SeoPage = () => {
  const [loading, setLoading] = useState(false);
  const [checkoutUrl, setCheckoutUrl] = useState("");
  const [isScrollTopVisible, setIsScrollTopVisible] = useState(false);
  const [randomNumbers, setRandomNumbers] = useState("1 3 4 6 7 9 10 11 14 16 17 18 20 23 25");

  const { register, handleSubmit } = useForm();

  const notifyExecuted = useRef();
  const location = useLocation();
  const navigate = useNavigate();

  document.title = "Bem-vindo ao LotoAI";

  useEffect(() => {
    const params = new URLSearchParams(location.search);

    const uid = params.get("uid");
    const paymentStatus = params.get("status");

    if (!notifyExecuted.current && uid && paymentStatus !== "approved" && paymentStatus !== "pending") {
      notifyExecuted.current = true;
      errorNotify("Falha no processo de pagamento!");
    }

    navigate(location.pathname);

    // eslint-disable-next-line
  }, [location.search]);

  useEffect(() => {
    const container = document.getElementById("container");
    container.addEventListener("scroll", handleScroll);

    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    setInterval(() => {
      let text = "";
      const list = new Set();

      while (list.size !== 15) {
        const number = Math.floor(Math.random() * 25) + 1;
        list.add(number);
      }

      const numbers = [...list];
      numbers.sort((a, b) => a - b);

      for (const item of numbers) {
        text += item + " ";
      }

      setRandomNumbers(text);
    }, 4600);
  }, []);

  const bannerRender = useMemo(() => (
    <section className={"banner"}>
      <span className={"bet"}>
        <p>{randomNumbers}</p>
      </span>
    </section>
  ), [randomNumbers]);

  const onSubmit = (data) => {
    if (verifyFields(data)) {
      handleCheckout(data);
    }
  };

  const handleCheckout = async (data) => {
    onChangeLoading(true);

    const response = await checkout(data);

    if (response?.url) {
      setCheckoutUrl(response.url);
    }

    onChangeLoading(false);
  };

  const openCheckoutUrl = (e) => {
    e.preventDefault();
    window.location.href = checkoutUrl;
  };

  const verifyFields = (data) => {
    if (!data?.username || !data?.email || !data?.password || !data?.birth) {
      errorNotify("Todos os campos devem ser preenchidos!");
      return false;
    }

    if (data?.username?.length < 6) {
      errorNotify("O username precisa ter pelo menos 6 caracteres.");
      return false;
    }

    if (data?.password?.length < 8) {
      errorNotify("A senha precisa ter pelo menos 8 caracteres.");
      return false;
    }

    const currentYear = new Date().getFullYear();
    const year = data?.birth?.split("-")?.[0];

    if (year > currentYear) {
      errorNotify("Data de nascimento inválida.");
      return false;
    }

    const rgx = /\S+@\S+\.\S+/;

    if (!rgx.test(data?.email)) {
      errorNotify("Insira um e-mail válido!");
      return false;
    }

    return true;
  };

  const openTab = (route, local) => {
    if (local) {
      window.location.pathname = route;
    } else {
      window.open(route);
    }
  };

  const scrollToTop = () => {
    const container = document.getElementById("container");
    container.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleScroll = () => {
    const container = document.getElementById("container");
    setIsScrollTopVisible(container.scrollTop > 400 ? true : false);
  };

  const onChangeLoading = (value) => {
    document.body.style.overflow = value ? "hidden" : "";
    setLoading(value);
  };

  return (
    <div id={"seo-page"}>
      {loading &&
        <Loading />
      }

      <div className={"content"}>
        <div className={"screen"}>
          <header>
            <img src={logo} alt={"logo"} />
            <nav>
              <ul>
                <li>
                  <a href="#product">Produto</a>
                </li>
                <li>
                  <a href="#purchase">Comprar</a>
                </li>
                <li>
                  <p onClick={() => openTab("/app")}>
                    Acessar sistema <LiaExternalLinkAltSolid />
                  </p>
                </li>
              </ul>
            </nav>
          </header>

          <section className={"short-presentation"}>
            <h1>
              <em>Bem-vindo ao LotoAI</em>
              <span>Sua Chave para Apostas Inteligentes</span>
            </h1>
          </section>

          {bannerRender}
        </div>

        <section id={"product"} className={"description"}>
          <p>
            O LotoAI oferece uma abordagem inovadora para gerar apostas de
            Lotofácil usando inteligência artificial. Nosso software exclusivo
            combina algoritmos avançados com validações precisas para ajudá-lo a
            tomar decisões informadas ao escolher os números da sua aposta.
            <br />
            <br />
            Ao utilizar o LotoAI, você estará aproveitando décadas de expertise
            em análise de dados e modelagem estatística para aumentar suas
            chances de sucesso. Você terá acesso a uma ferramenta poderosa que
            pode melhorar suas estratégias de apostas na Lotofácil.
          </p>
          <img src={icon1} alt={"Imagem"} />
        </section>

        <hr />

        <section className={"description"}>
          <h2>Recursos do LotoAI</h2>
          <ul>
            <li>Algoritmos avançados de IA para geração de apostas;</li>
            <li>Validações rigorosas para aumentar suas chances;</li>
            <li>Dashboard para analisar as apostas sorteadas;</li>
            <li>Simples e intuitivo de usar;</li>
            <li>Preço acessível e pagamento único;</li>
          </ul>
        </section>

        <section id={"banner"}>
          <img src={banner2} alt={"Banner"} />
        </section>

        <hr />

        <section className={"description"}>
          <h2>Importante</h2>
          <p>
            O LotoAI não é um site de apostas nem um cassino online. Não fazemos
            promessas de vitória garantida usando nossos números gerados. Nossos
            algoritmos oferecem uma abordagem científica para ajudá-lo a tomar
            decisões, mas os resultados dos sorteios da Lotofácil são
            imprevisíveis.
          </p>
          <br />
          <p>
            O sistema está em constante evolução, entretanto, ao adquirir a licença você terá
            direito de todos os recursos novos que ainda serão implementados.
          </p>
        </section>

        <section id={"purchase"} className={"description"}>
          <h2>Experimente o LotoAI hoje!</h2>
          <p>
            Este é o momento perfeito para dar um passo à frente em suas apostas
            de Lotofácil. Adquira sua licença do LotoAI por apenas{" "}
            <strong>R$ 19,90</strong> e comece a apostar com mais confiança.
          </p>
        </section>

        <section className={"description"}>
          <form onSubmit={handleSubmit(onSubmit)}>
            {
              checkoutUrl ?
                <h1 className={"title"}>Quase lá! Continue com o pagamento.</h1>
                : <h1 className={"title"}>Crie uma conta, é rápido e fácil :)</h1>
            }

            {
              !checkoutUrl ?
                <div className={"data"}>
                  <span>
                    <label>Nome de usuário</label>
                    <input
                      type={"text"}
                      maxLength={20}
                      name={"username"}
                      className={"field"}
                      {...register("username")}
                    />
                  </span>
                  <span>
                    <label>Data de Nascimento</label>
                    <input
                      type={"date"}
                      name={"birth"}
                      className={"field"}
                      {...register("birth")}
                    />
                  </span>
                  <span>
                    <label>E-mail</label>
                    <input
                      type={"email"}
                      name={"email"}
                      className={"field"}
                      {...register("email")}
                    />
                  </span>
                  <span>
                    <label>Criar senha</label>
                    <input
                      type={"password"}
                      name={"password"}
                      className={"field"}
                      {...register("password")}
                    />
                  </span>
                </div>
                :
                <p>Clique no botão abaixo para prosseguir</p>
            }

            <div className={"button-area"}>
              {
                checkoutUrl ?
                  <button type={"button"} onClick={(e) => openCheckoutUrl(e)}>Pagamento <LiaExternalLinkAltSolid /></button>
                  : <button type={"submit"}>Pagamento <LiaExternalLinkAltSolid /></button>
              }

              <p className={"login-back"} onClick={() => openTab("/app", true)}>Já tem uma conta?</p>
            </div>
          </form>
        </section>

        <footer>
          <p
            className={"link"}
            onClick={() => openTab("/politica-de-privacidade")}
          >
            Política de Privacidade
          </p>
          <p className={"link"} onClick={() => openTab("/termos-de-uso")}>
            Termos de Uso
          </p>
          <p>lotoai.suporte@gmail.com</p>
          <p>
            &copy; {new Date().getFullYear()} LotoAI - TKP Studios
          </p>
        </footer>

        <div
          onClick={scrollToTop}
          className={`scroll-to-top-button ${isScrollTopVisible ? "visible" : ""}`}
        >
          <AiOutlineArrowUp />
        </div>
      </div>
    </div>
  );
};

export default SeoPage;
