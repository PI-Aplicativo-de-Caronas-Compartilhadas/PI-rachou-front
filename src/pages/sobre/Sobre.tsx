import {
    FaCarSide,
    FaUsers,
    FaLeaf,
    FaRoute,
    FaHandshake,
} from "react-icons/fa";

function Sobre() {
    return (
        <div className="min-h-screen bg-[radial-gradient(circle_at_center,_var(--color-ultrasonic-blue-800),_var(--color-ultrasonic-blue-950))] py-16 px-6">

            <div className="max-w-7xl mx-auto">

                <div className="bg-ultrasonic-blue-200/10 backdrop-blur-xl border border-ultrasonic-blue-400/40 rounded-3xl p-10 md:p-16 shadow-2xl mb-16">

                    <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6">
                        Sobre o
                        <span className="text-ultrasonic-blue-300"> Rachou</span>
                    </h1>

                    <p className="text-ultrasonic-blue-100 text-lg leading-8 max-w-4xl">
                        O <strong>Rachou</strong> é uma plataforma de caronas compartilhadas
                        criada para conectar motoristas e passageiros que realizam trajetos
                        semelhantes.

                        Nossa missão é tornar os deslocamentos mais econômicos,
                        sustentáveis e colaborativos, incentivando o compartilhamento de
                        viagens e reduzindo custos para todos.
                    </p>
                </div>

                <section className="mb-20">

                    <h2 className="text-3xl font-bold text-center text-white mb-12">
                        Como funciona?
                    </h2>

                    <div className="grid md:grid-cols-3 gap-8">

                        <div className="bg-ultrasonic-blue-200/10 backdrop-blur-lg rounded-2xl p-8 border border-ultrasonic-blue-400/30">

                            <FaCarSide className="text-5xl text-ultrasonic-blue-300 mb-6" />

                            <h3 className="text-white text-xl font-bold mb-4">
                                Motoristas
                            </h3>

                            <p className="text-ultrasonic-blue-100">
                                Cadastre sua viagem e disponibilize vagas para passageiros
                                interessados em compartilhar o mesmo trajeto.
                            </p>

                        </div>

                        <div className="bg-ultrasonic-blue-200/10 backdrop-blur-lg rounded-2xl p-8 border border-ultrasonic-blue-400/30">

                            <FaUsers className="text-5xl text-ultrasonic-blue-300 mb-6" />

                            <h3 className="text-white text-xl font-bold mb-4">
                                Passageiros
                            </h3>

                            <p className="text-ultrasonic-blue-100">
                                Busque viagens disponíveis, encontre o melhor trajeto e divida
                                os custos da viagem com praticidade.
                            </p>

                        </div>

                        <div className="bg-ultrasonic-blue-200/10 backdrop-blur-lg rounded-2xl p-8 border border-ultrasonic-blue-400/30">

                            <FaHandshake className="text-5xl text-ultrasonic-blue-300 mb-6" />

                            <h3 className="text-white text-xl font-bold mb-4">
                                Compartilhe
                            </h3>

                            <p className="text-ultrasonic-blue-100">
                                Economize combustível, reduza gastos e viaje acompanhado,
                                promovendo uma mobilidade mais inteligente.
                            </p>

                        </div>

                    </div>

                </section>

                <section className="grid md:grid-cols-3 gap-8 mb-20">

                    <div className="bg-ultrasonic-blue-200/10 backdrop-blur-lg rounded-2xl p-8 border border-ultrasonic-blue-400/30">

                        <h3 className="text-2xl text-white font-bold mb-4">
                            Missão
                        </h3>

                        <p className="text-ultrasonic-blue-100">
                            Conectar pessoas através da mobilidade compartilhada,
                            proporcionando economia, praticidade e sustentabilidade.
                        </p>

                    </div>

                    <div className="bg-ultrasonic-blue-200/10 backdrop-blur-lg rounded-2xl p-8 border border-ultrasonic-blue-400/30">

                        <h3 className="text-2xl text-white font-bold mb-4">
                            Visão
                        </h3>

                        <p className="text-ultrasonic-blue-100">
                            Tornar-se referência em soluções inteligentes para mobilidade
                            colaborativa, incentivando o compartilhamento de viagens.
                        </p>

                    </div>

                    <div className="bg-ultrasonic-blue-200/10 backdrop-blur-lg rounded-2xl p-8 border border-ultrasonic-blue-400/30">

                        <h3 className="text-2xl text-white font-bold mb-4">
                            Valores
                        </h3>

                        <p className="text-ultrasonic-blue-100">
                            Segurança, colaboração, respeito, sustentabilidade e inovação
                            fazem parte da essência do Rachou.
                        </p>

                    </div>

                </section>

                <section className="mb-20">

                    <h2 className="text-3xl text-center font-bold text-white mb-12">
                        Por que compartilhar caronas?
                    </h2>

                    <div className="grid md:grid-cols-2 gap-8">

                        <div className="flex gap-5 bg-ultrasonic-blue-200/10 rounded-2xl p-8 border border-ultrasonic-blue-400/30">

                            <FaLeaf className="text-4xl text-green-400" />

                            <div>

                                <h3 className="text-xl text-white font-semibold mb-2">
                                    Sustentabilidade
                                </h3>

                                <p className="text-ultrasonic-blue-100">
                                    Menos veículos circulando significa menos emissão de gases
                                    poluentes e um trânsito mais eficiente.
                                </p>

                            </div>

                        </div>

                        <div className="flex gap-5 bg-ultrasonic-blue-200/10 rounded-2xl p-8 border border-ultrasonic-blue-400/30">

                            <FaRoute className="text-4xl text-ultrasonic-blue-300" />

                            <div>

                                <h3 className="text-xl text-white font-semibold mb-2">
                                    Economia
                                </h3>

                                <p className="text-ultrasonic-blue-100">
                                    Compartilhe despesas como combustível e pedágios, tornando
                                    cada viagem mais acessível para todos.
                                </p>

                            </div>

                        </div>

                    </div>

                </section>

                <div className="text-center bg-ultrasonic-blue-500 rounded-3xl py-14 px-8">

                    <h2 className="text-4xl font-bold text-white mb-5">
                        Vamos dividir o caminho?
                    </h2>

                    <p className="text-ultrasonic-blue-100 text-lg max-w-3xl mx-auto">
                        Faça parte do Rachou e descubra uma forma mais econômica,
                        sustentável e inteligente de viajar.
                    </p>

                </div>

            </div>

        </div>
    );
}

export default Sobre;