import { UsuarioEnRanking } from "futbol-in-core/types"
import { Trophy, Medal, Award, TrendingUp } from "lucide-react"
import Image from "next/image"

interface RankingProps {
  ranking: UsuarioEnRanking[]
}


export function Ranking({ ranking }: RankingProps) {
  
  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 0:
        return <Trophy className="w-6 h-6 text-yellow-500" />
      case 1:
        return <Medal className="w-6 h-6 text-gray-400" />
      case 2:
        return <Award className="w-6 h-6 text-amber-700" />
      default:
        return <span className="text-lg font-bold text-muted-foreground">#{rank+1}</span>
    }
  }

  const topFive = ranking.slice(0, 5)

  return (
    <section id="ranking" className="py-24 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 bg-linear-to-b from-background via-accent/5 to-background" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-6">
            <TrendingUp className="w-4 h-4 text-accent" />
            <span className="text-sm font-medium text-accent">Ranking en Vivo</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-balance">
            Top Contribuidores{" "}
          </h2>
          <p className="text-xl text-muted-foreground text-pretty">
            Los usuarios que más futbolines han añadido a la comunidad
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="space-y-2 md:space-y-4">
            {topFive.map((user) => (
              <div
                key={user.id}
                className={`group relative p-3 md:p-6 rounded-2xl border transition-all duration-300 hover:shadow-lg ${
                  user.posicion === 0
                    ? "bg-linear-to-r from-accent/10 to-transparent border-accent/50 hover:border-accent"
                    : "bg-card border-border hover:border-accent/30"
                }`}
              >
                <div className="flex items-center gap-3 md:gap-6">
                  {/* Rank */}
                  <div className="shrink-0 md:w-12 flex items-center justify-center">{getRankIcon(user.posicion)}</div>

                  {/* Avatar */}
                  <div className="size-12 md:size-16">
                    <Image src={"/default_user.svg"} alt={user.usuario} width={100} height={100}/>
                  </div>

                  {/* User Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xl font-semibold mb-1">{user.usuario}</h3>
                    {/* <p className="text-sm text-muted-foreground">{user.city}</p> */}
                  </div>

                  {/* Stats */}
                  <div className="text-right">
                    <div className="text-3xl font-bold text-accent">{user.spotsCreados}</div>
                    <p className="text-sm text-muted-foreground">futbolines</p>
                  </div>
                </div>

                {/* Hover Effect */}
                {user.posicion === 0 && (
                  <div className="absolute inset-0 rounded-2xl bg-linear-to-r from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                )}
              </div>
            ))}
          </div>

          {/* View Full Ranking Button */}
          <div className="text-center mt-12">
            <button className="px-8 py-4 rounded-xl bg-card border border-border hover:border-accent/50 hover:bg-accent/5 transition-all font-medium">
              Ver Ranking Completo
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
