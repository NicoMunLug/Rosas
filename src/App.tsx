import { Heart } from 'lucide-react';
import FlowerModel from './components/FlowerModel';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-amber-50 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl space-y-2">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="h-[700px] md:h-full rounded-2xl overflow-hidden shadow-2xl bg-white/30 backdrop-blur-sm">
            <FlowerModel />
          </div>

          <div className="text-center md:text-left space-y-8 animate-fade-in">
            <div className="space-y-2">
                <h1 className="text-6xl md:text-7xl font-bold text-rose-600 tracking-tight flex items-center justify-center md:justify-start gap-2">
                  Isa
                  <Heart className="w-8 h-8 text-pink-500 animate-heartbeat fill-pink-500" style={{ animationDelay: '0.3s' }} />
                </h1>
              <div className="flex items-center justify-center md:justify-start space-x-3">
              </div>
            </div>

            <p className="text-xl text-gray-700 leading-relaxed text-justify">
              Me dijiste que te gustan las rosas rojas, así que busqué su significado y dicen que las rosas rojas simbolizan el amor, la pasión y ese interés que nace poco a poco, pero que se siente cada vez más fuerte.
              Son flores intensas, elegantes, y no pasan desapercibidas… como esas personas que llegan sin hacer ruido, pero terminan llamando toda tu atención. Y creo que eso es lo bonito, no te conozco de nada, no tenemos amigos en común
              y generalmente no suelo hablar con personas así, pero desde que te vi llamaste mi atención, y hay algo que me hace querer conocerte, siento que tenemos cosas en común, y bueno aquí esta la muestra que me interesa tanto que te hice esto, algo que jamás he hecho por nadie más ❤️.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
