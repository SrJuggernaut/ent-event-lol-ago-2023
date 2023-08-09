import Typography from '@/components/ui/Typography'
import { faFacebook, faTwitter } from '@fortawesome/free-brands-svg-icons'
import { faChevronRight, faEnvelope, faHeart } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { css } from '@styled/css'
import { Container } from '@styled/jsx'
import { token } from '@styled/tokens'
import { type FC } from 'react'

const Footer: FC = () => {
  return (
    <footer
      className={css({
        backgroundColor: 'surface',
        paddingBlock: 'large',
        marginTop: 'medium'
      })}
    >
      <Container
        className={css({
          display: 'grid',
          gridTemplateColumns: { base: '1fr', mdToXxl: '1fr 1fr 1fr' }
        })}
      >
        <div>
          <Typography variant="h3" component="div" color="primary" align="center">
            Acerca de
          </Typography>
          <ul className="fa-ul">
            <li><FontAwesomeIcon icon={faChevronRight} listItem /><a href="https://entgamers.pro/about">EntGamers</a></li>
            <li><FontAwesomeIcon icon={faChevronRight} listItem /><a href="https://entgamers.pro/clanes">Clanes</a></li>
          </ul>
        </div>
        <div>
          <Typography variant="h3" component="div" color="primary" align="center">
            Contacto
          </Typography>
          <ul className="fa-ul">
            <li><FontAwesomeIcon icon={faFacebook} listItem /><a href="https://www.facebook.com/EntGamers/">Facebook</a></li>
            <li><FontAwesomeIcon icon={faTwitter} listItem /><a href="https://twitter.com/EntGamers">Twitter</a></li>
            <li><FontAwesomeIcon icon={faEnvelope} listItem /><a href="mailto:contacto@entgamers.pro">Email</a></li>
          </ul>
        </div>
        <div></div>
      </Container>
      <Container
        style={{ marginTop: token('spacing.medium') }}
      >
        <Typography variant="body2" component="div" align="center">
          Creado por <a href="https://srjuggernaut.dev">SrJuggernaut</a> con <Typography variant="body2" component="span" color="danger" ><FontAwesomeIcon icon={faHeart} /></Typography> para la comunidad de <a href="https://entgamers.pro">EntGamers</a>
        </Typography>
      </Container>
    </footer>
  )
}

export default Footer
