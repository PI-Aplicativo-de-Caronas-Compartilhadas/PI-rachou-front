import ListaModalidade from "../../components/modalidade/listamodalidade/ListaModalidade";

export function Modalidades() {
    return (
        <div className="flex flex-col justify-center">
            <header>
                <h1 className="text-ultrasonic-blue-100 text-[2rem] mx-12 my-6 font-semibold">
                    Modalidades
                </h1>
            </header>

            <div className="flex justify-center w-full max-h-screen">
                <ListaModalidade />
            </div>
            

        </div>
        
    )
};