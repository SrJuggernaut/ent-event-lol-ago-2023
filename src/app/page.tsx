import Button from '@/components/ui/Button'
import IconButton from '@/components/ui/IconButton'
import Tooltip from '@/components/ui/Tooltip'
import Typography from '@/components/ui/Typography'
import { faDiscord, faFacebook, faInstagram, faTwitch, faTwitter } from '@fortawesome/free-brands-svg-icons'
import { faUsers } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { css } from '@styled/css'
import NextImage from 'next/image'
import { type FC } from 'react'

const oranizadores = [
  {
    image: '/images/JimRsNg.jpeg',
    nombre: 'Jim RSNG',
    descripcion: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.',
    socialNetworks: [
      { label: 'Twitch', url: 'https://www.twitch.tv/', icon: faTwitch },
      { label: 'Twitter', url: 'https://twitter.com/', icon: faTwitter },
      { label: 'Instagram', url: 'https://www.instagram.com/', icon: faInstagram }
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

const Home: FC = () => {
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
          <Button variant="solid" color="primary" size="small">
            Ver reglas
          </Button>
        </div>
        <div>
          <Typography variant="h2" align="center">
            Premios
          </Typography>
          <Button variant="solid" color="primary" size="small">
            Ver premios
          </Button>
        </div>
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
                <Tooltip key={`organizador-${orgIndex + 1}-social-network-${index + 1}`} content={socialNetwork.label} position='top' >
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
                  </IconButton>
                </Tooltip>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default Home
