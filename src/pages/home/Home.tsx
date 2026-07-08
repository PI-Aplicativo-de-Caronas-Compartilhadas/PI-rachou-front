import { Link } from "react-router-dom";
import passageira from "../../assets/passageira-home.jpg";
import logo from "../../assets/logo.png";

function Home() {
  return (
    <div
      className="
        flex flex-col lg:flex-row
        justify-between
        items-center
        gap-20
        px-6 lg:px-12
        py-16
        min-h-[85vh]
        bg-gradient-to-br
        from-[oklch(14.20%_0.051_277.68)]
        via-[oklch(16.46%_0.069_275.71)]
        to-[oklch(23.84%_0.118_272.92)]
        text-white
      "
    >
      {/* Coluna esquerda */}
      <div className="mb-6">
        <img
          src={logo}
          alt="Logo Rachou"
          className="w-44 lg:w-52 object-contain"
        />

        <h1 className="text-4xl md:text-5xl font-extrabold leading-tight text-[oklch(64.35%_0.151_281.28)]">
          Compartilhe trajetos,
          <br />
          divida custos.
        </h1>

        <p className="text-[oklch(88.10%_0.048_285.37)] text-base md:text-lg leading-relaxed max-w-lg">
          O <strong>Rachou</strong> conecta motoristas e passageiros para
          viagens mais econômicas, inteligentes e colaborativas.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mt-2">
          <Link
            to="/viagens"
            className="
              bg-[oklch(43.60%_0.246_270.06)]
              hover:bg-[oklch(37.30%_0.205_270.68)]
              text-white
              font-semibold
              px-6
              py-3
              rounded-xl
              transition-all
              duration-300
              shadow-lg
              text-center
            "
          >
            Ver Caronas
          </Link>

          <Link
            to="/sobre"
            className="
              border
              border-[oklch(43.60%_0.246_270.06)]
              text-[oklch(88.10%_0.048_285.37)]
              hover:bg-[oklch(23.84%_0.118_272.92)]
              font-semibold
              px-6
              py-3
              rounded-xl
              transition-all
              duration-300
              text-center
            "
          >
            Sobre Nós
          </Link>
        </div>
      </div>

      {/* Coluna direita */}
      <div className="flex justify-center lg:w-1/2">
        <img
          src={passageira}
          alt="Motorista sorrindo"
          className="
            w-full
            max-w-xl
            h-[520px]
            object-cover
            rounded-3xl
            shadow-2xl
          "
        />
      </div>
    </div>
  );
}

export default Home;
