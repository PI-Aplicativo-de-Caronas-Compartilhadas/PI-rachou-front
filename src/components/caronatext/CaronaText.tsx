import { motion } from "framer-motion";
import { FaCarSide } from "react-icons/fa";

export function CaronaText() {
  return (
    // Container pai com largura máxima e altura definida
    <div className="relative overflow-hidden max-w-lg w-full h-8 flex items-center [mask-image:_linear-gradient(to_right,_transparent_0,_black_10px,_black_calc(100%-10px),_transparent_100%)]">
      <motion.div
        className="absolute w-full flex items-center gap-2 whitespace-nowrap"
        animate={{
          // Começa 100% invisível à esquerda (-100%) e vai até 100% invisível à direita (100%)
          x: ["-100%", "100%"],
        }}
        transition={{
          duration: 10,       // AJUSTE DE VELOCIDADE: quanto maior o número, mais lento ela atravessa a tela
          repeat: Infinity,  // Loop infinito
          ease: "linear",    // Velocidade constante do início ao fim
        }}
      >
        <FaCarSide className="text-ultrasonic-blue-400 text-2xl flex-shrink-0" />
        <span className="text-ultrasonic-blue-100 text-base md:text-lg lg:text-xl font-medium">
          Eai, bora rachar essa carona?
        </span>
      </motion.div>
    </div>
  );
}