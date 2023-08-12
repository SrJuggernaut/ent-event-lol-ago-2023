import IconButton from '@/components/ui/IconButton'
import Typography from '@/components/ui/Typography'
import { ensureSummonerInfoCollection } from '@/services/backend/summonerInfo'
import { faDiscord, faFacebook, faInstagram, faTiktok, faTwitch, faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons'
import { faTrophy, faUsers } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { css } from '@styled/css'
import { button } from '@styled/recipes'
import { type Metadata } from 'next'
import NextImage from 'next/image'
import NextLink from 'next/link'
import { type FC } from 'react'

export const metadata: Metadata = {
  title: 'League Of Rancios - EntGamers',
  description: 'League Of Rancios es un evento de League Of Legends traído a ti por EntGamers & Jim RSNG'
}

const oranizadores = [
  {
    image: '/images/JimRsNg.png',
    nombre: 'Jim RSNG',
    descripcion: 'Fui jugador Profesional de Starcraft 2 durante 12 años y ahora me dedico a entretener y dar YA NO DAR Cringe con diferentes juegos y LOL :D Llevo 12 años haciendo stream desde que twitch era antes JustinTV.',
    socialNetworks: [
      { label: 'Twitch', url: 'https://www.twitch.tv/jimrsng', icon: faTwitch },
      { label: 'Youtube', url: 'https://www.youtube.com/c/JimRisingTV', icon: faYoutube },
      { label: 'Facebook', url: 'https://www.facebook.com/JimRiSiNgSC2 ', icon: faFacebook },
      { label: 'Twitter', url: 'https://twitter.com/JimRisingSC', icon: faTwitter },
      { label: 'Instagram', url: 'https://instagram.com/jimrising12', icon: faInstagram },
      { label: 'TikTok', url: 'https://www.tiktok.com/@jimrising', icon: faTiktok },
      { label: 'Discord', url: 'https://discord.gg/jimrising', icon: faDiscord }
    ]
  },
  {
    image: '/images/EntGamers.png',
    nombre: 'Ent Gamers',
    descripcion: 'EntGamers es una comunidad de jugadores y para jugadores, surge del deseo de tener un espacio seguro, físico o virtual, para encontrar y conocer gente con los mismos gustos.',
    socialNetworks: [
      { label: 'Facebook', url: 'https://www.facebook.com/EntGamers/', icon: faFacebook },
      { label: 'Discord', url: 'http://discord.gg/SYnKcU5', icon: faDiscord },
      { label: 'Grupo Lol México', url: 'https://www.facebook.com/groups/comunidadlolmexico', icon: faUsers }
    ]
  }
]

const ensureAll = async (): Promise<void> => {
  console.log('Ensuring summoner info collection')
  await ensureSummonerInfoCollection()
}

const Home: FC = async () => {
  await ensureAll()
  return (
    <>
      <Typography variant="h1" align="center" >
        League Of Rancios
      </Typography>
      <Typography variant="body1">
        ¡Bienvenidos al increíble Torneo LeagueOfRancios! ¡Prepárense para la emoción, la diversión y la acción dentro del juego más popular de todos!
      </Typography>
      <Typography variant="body1">
        En esta alucinante competición, tendrás la oportunidad de demostrar tus habilidades y destreza en el mundo de League of Legends mientras ganas puntos en cada paso del camino. ¡Y no te preocupes! Tendremos actividades para todos los niveles de jugadores, desde las tareas más sencillas para obtener algunos puntitos, hasta los desafíos épicos y raros que te otorgarán una lluvia de puntos.
      </Typography>
      <Typography variant="body1">
        ¿Eres un orgulloso guerrero con un rango clasificatorio? ¡Genial! Recibirás tus merecidos puntos por eso. ¿Buscas emociones y adrenalina? ¡Los Pentakills te esperan con una recompensa extraordinaria de puntos que te dejará boquiabierto!
      </Typography>
      <Typography variant="body1">
        Pero eso no es todo, habrá misiones secretas escondidas en el campo de batalla. ¡Descubre y completa estas hazañas ocultas para obtener puntos extra y sorprende a todos tus oponentes!
      </Typography>
      <Typography variant="body1">
        ¿Estás listo para desatar tus habilidades y alcanzar la cima de la tabla de posiciones? No importa si eres novato o veterano, ¡todos tienen la oportunidad de ganar! Conviértete en una leyenda, forja alianzas con tus compañeros y muestra al mundo de qué estás hecho.
      </Typography>
      <Typography variant="body1">
        Así que, ¿qué esperas? Únete a la diversión, únete al torneo de puntos en League of Legends y prepárate para vivir la aventura más emocionante que este juego te  haya ofrecido jamás. ¡Que comience la batalla por la gloria y los puntos! ¡Buena suerte, invocadores!
      </Typography>
      <div
        className={css({
          display: 'grid',
          gridTemplateColumns: { base: '1fr', mdToXxl: '1fr 1fr' },
          gridGap: 'medium',
          padding: 'medium',
          backgroundColor: 'surface',
          borderRadius: 'small',
          marginTop: 'medium',
          marginBottom: 'medium',
          '& > div': {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            aspectRatio: '3/1'
          }
        })}
      >
        <div>
          <Typography variant="h2" align="center">
            Reglas y normas
          </Typography>
          <NextLink
            href="/reglamento"
            className={button({
              variant: 'solid',
              color: 'primary',
              size: 'medium'
            })}
          >
            Ver reglas
          </NextLink>
        </div>
        <div>
          <Typography variant="h2" align="center">
            Premios
          </Typography>
          <ul
            className={css({
              listStyle: 'none',
              padding: 0,
              margin: 0,
              '& > li': {
                display: 'flex',
                alignItems: 'center',
                '& > svg': {
                  marginRight: 'small'
                }
              }
            })}
          >
            <li><FontAwesomeIcon icon={faTrophy} fixedWidth /><strong>1er Lugar:</strong> Skin de 1850 RP o 10 cofres Hextech + llaves<Typography color="info" component="span">*</Typography></li>
            <li><FontAwesomeIcon icon={faTrophy} fixedWidth /><strong>2do Lugar:</strong> Skin de 1350 RP o 7 cofres hextech + llaves<Typography color="info" component="span">*</Typography></li>
            <li><FontAwesomeIcon icon={faTrophy} fixedWidth /><strong>3er Lugar:</strong> Skin de 975 RP o 5 cofres hextech + llaves<Typography color="info" component="span">*</Typography></li>
            <li><FontAwesomeIcon icon={faTrophy} fixedWidth /><strong>4o Lugar:</strong> Caja de skin sorpresa</li>
            <li><FontAwesomeIcon icon={faTrophy} fixedWidth /><strong>5o Lugar:</strong> Caja de skin sorpresa</li>
          </ul>
          <Typography variant="caption" color="info" className={css({ marginTop: 'medium' })}>
            * A elección del ganador
          </Typography>
        </div>
      </div>
      <div
        className={css({
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 'medium',
          marginBottom: 'medium',
          minHeight: '30vh'
        })}
      >
        <Typography variant="h2" align="center" component="div">
          Inscripciones abiertas
        </Typography>
        <Typography variant="body1" align="center">
          El evento se llevará a cabo del <Typography component="strong" color="info" weight="bold">16 de Agosto al 23 de Agosto</Typography>.
        </Typography>
        <NextLink
          className={
            button({
              variant: 'solid',
              color: 'info',
              size: 'medium'
            })
          }
          href="/register"
        >
          Click para registrarte
        </NextLink>
      </div>
      <Typography variant="h2" align="center">
        Organizadores
      </Typography>
      <div
        className={css({
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          alignItems: 'stretch',
          flexWrap: 'wrap',
          gap: 'medium',
          padding: 'medium',
          backgroundColor: 'surface',
          borderRadius: 'small',
          marginTop: 'medium',
          marginBottom: 'medium',
          '& > div': {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            width: '100%',
            maxWidth: '300px',
            borderWidth: '1px',
            borderStyle: 'solid',
            borderColor: 'primary',
            borderRadius: 'small',
            padding: 'small'
          }
        })}
      >
        {oranizadores.map((organizador, orgIndex) => (
          <div key={`organizador-${orgIndex + 1}`}>
            <div
              className={css({
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                alignItems: 'center'
              })}
            >
              <div
                className={css({
                  borderRadius: 'round',
                  overflow: 'hidden'
                })}
              >
                <NextImage src={organizador.image} alt={organizador.nombre} width={200} height={200} />
              </div>
              <Typography variant="h3" align="center">
                {organizador.nombre}
              </Typography>
              <Typography variant="body1" align="center">
                {organizador.descripcion}
              </Typography>
            </div>
            <div
              className={css({
                display: 'flex',
                justifyContent: 'space-evenly',
                alignItems: 'center',
                marginTop: 'small'
              })}
            >
              {organizador.socialNetworks.map((socialNetwork, index) => (
                <IconButton
                  key={`organizador-${orgIndex + 1}-social-network-${index + 1}`}
                  component='a'
                  href={socialNetwork.url}
                  target='_blank'
                  rel='noopener noreferrer'
                  aria-label={socialNetwork.label}
                  color='info'
                >
                  <FontAwesomeIcon icon={socialNetwork.icon} size='lg' fixedWidth />
                  <Typography variant='srOnly'>
                    {socialNetwork.label}
                  </Typography>
                </IconButton>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default Home
