import Typography from '@/components/ui/Typography'
import { ensureStorage } from '@/services/backend/storage'
import { ensureSummonerInfoCollection } from '@/services/backend/summonerInfo'
import { ensureTasksCollection } from '@/services/backend/tasks'
import { faDiscord, faFacebook, faInstagram, faTiktok, faTwitch, faTwitter, faYoutube, type IconDefinition } from '@fortawesome/free-brands-svg-icons'
import { faTrophy, faUsers } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { css } from '@styled/css'
import { button, iconButton } from '@styled/recipes'
import { type Metadata } from 'next'
import NextImage from 'next/image'
import NextLink from 'next/link'
import { type FC } from 'react'
import CallToAction from './CallToAction'

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NODE_ENV === 'development' ? 'https://previewleagueofrancios.entgamers.pro' : 'https://leagueofrancios.entgamers.pro'),
  title: 'League Of Rancios - EntGamers',
  description: 'League Of Rancios es un evento de League Of Legends traído a ti por EntGamers & Jim RSNG'
}

interface organizer {
  image: string
  nombre: string
  descripcion: string
  socialNetworks: Array<{ label: string, url: string, icon: IconDefinition }>
}

const oranizadores: organizer[] = [
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
  },
  {
    image: '/images/LolMX.png',
    nombre: 'Lol México',
    descripcion: 'Lol México es el grupo mas grande de EntGamers en Facebook, con mas de 13,000 miembros, es el grupo de League Of Legends mas grande de México.',
    socialNetworks: [
      { label: 'Discord', url: 'http://discord.gg/SYnKcU5', icon: faDiscord },
      { label: 'Facebook', url: 'https://www.facebook.com/groups/comunidadlolmexico', icon: faFacebook }
    ]
  }
]

const ensureAll = async (): Promise<void> => {
  await ensureSummonerInfoCollection()
  await ensureTasksCollection()
  await ensureStorage()
}

const Home: FC = async () => {
  await ensureAll()
  return (
    <>
      <div
        className={css({
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: 'calc(75vh - 64px)',
          width: '100%',
          backgroundImage: 'url(/images/MysteriousForest.jpg)',
          backgroundSize: 'cover',
          backgroundPositionX: 'center',
          backgroundPositionY: 'bottom',
          backgroundRepeat: 'no-repeat'

        })}
      >
        <div>
          <Typography variant="h1" align="center" >League Of Rancios</Typography>
          <Typography variant="subtitle1" align="center" >
            Completa misiones, haz puntos y gana premios
          </Typography>
          <CallToAction />
        </div>
      </div>
      <div
        className={css({
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          minHeight: '50vh',
          gap: 'medium'
        })}
      >
        <Typography variant="h2">
          Descripción del evento
        </Typography>
        <Typography variant="body1">
          En esta alucinante competición, tendrás la oportunidad de demostrar tus habilidades y destreza en el mundo de League of Legends mientras ganas puntos en cada paso del camino. ¡Y no te preocupes! Tendremos actividades para todos los niveles de jugadores, desde las tareas más sencillas para obtener algunos puntitos, hasta los desafíos épicos y raros que te otorgarán una lluvia de puntos.
        </Typography>
        <Typography variant="body1">
          Tras <NextLink href="/register">Registrarte</NextLink> en el evento deberás <NextLink href="/profile">configurar tu Summoner Name</NextLink>, para que podamos verificar que eres tú quien está jugando y así poder otorgarte los puntos correspondientes. Una vez que hayas hecho esto, podrás comenzar a completar las misiones y desafíos que te proponemos y enviar las pruebas de que los has completado.
        </Typography>
        <Typography variant="body1">
          Puedes ver las misiones y desafíos disponibles en la sección <NextLink href="/tareas">Tareas</NextLink> y revisar tu posición en la <NextLink href="/puntuacion">tabla de Puntuaciones</NextLink>.
        </Typography>
        <Typography variant="body1">
          El evento se llevará a cabo del 16 de Agosto al 23 de Agosto del 2023, y los ganadores serán anunciados durante la semana siguiente.
        </Typography>
      </div>
      <div
        className={css({
          display: 'grid',
          gridTemplateColumns: { base: '1fr', mdToXxl: '1fr 1fr' },
          gridGap: 'medium',
          padding: 'medium',
          backgroundColor: 'surface',
          borderRadius: 'small',
          marginTop: 'medium',
          marginBlock: 'medium',
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
          <div
            className={css({
              display: 'flex',
              justifyContent: 'space-evenly',
              marginTop: 'medium',
              width: '100%'
            })}
          >
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
            <NextLink
              href="/tareas"
              className={button({
                variant: 'solid',
                color: 'primary',
                size: 'medium'
              })}
            >
              Ver Tareas
            </NextLink>
          </div>
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
            <li><FontAwesomeIcon icon={faTrophy} fixedWidth /><strong>1er Lugar:</strong>&nbsp;Skin de 1850 RP o 10 cofres Hextech + llaves<Typography color="info" component="span">*</Typography></li>
            <li><FontAwesomeIcon icon={faTrophy} fixedWidth /><strong>2do Lugar:</strong>&nbsp;Skin de 1350 RP o 7 cofres hextech + llaves<Typography color="info" component="span">*</Typography></li>
            <li><FontAwesomeIcon icon={faTrophy} fixedWidth /><strong>3er Lugar:</strong>&nbsp;Skin de 975 RP o 5 cofres hextech + llaves<Typography color="info" component="span">*</Typography></li>
            <li><FontAwesomeIcon icon={faTrophy} fixedWidth /><strong>4o Lugar:</strong>&nbsp;Caja de skin sorpresa</li>
            <li><FontAwesomeIcon icon={faTrophy} fixedWidth /><strong>5o Lugar:</strong>&nbsp;Caja de skin sorpresa</li>
          </ul>
          <Typography variant="caption" color="info" className={css({ marginTop: 'medium' })}>
            * A elección del ganador
          </Typography>
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
                marginTop: 'small',
                flexWrap: 'wrap'
              })}
            >
              {organizador.socialNetworks.map((socialNetwork, index) => (
                <a
                  key={`organizador-${orgIndex + 1}-social-network-${index + 1}`}
                  className={iconButton({ color: 'info' })}
                  href={socialNetwork.url}
                  target='_blank'
                  rel='noopener noreferrer'
                  aria-label={socialNetwork.label}
                >
                  <FontAwesomeIcon icon={socialNetwork.icon} size='lg' fixedWidth />
                  <Typography variant='srOnly'>
                    {socialNetwork.label}
                  </Typography>
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default Home
