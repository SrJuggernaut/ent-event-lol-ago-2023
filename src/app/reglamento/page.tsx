import Typography from '@/components/ui/Typography'
import { faTrophy } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { css } from '@styled/css'
import { type Metadata } from 'next'
import { type FC } from 'react'

export const metadata: Metadata = {
  title: 'Reglamento League Of Rancios - EntGamers',
  description: 'El reglamento del torneo League Of Rancios traido a ti por EntGamers & Jim RSNG'
}

const page: FC = () => {
  return (
    <>
      <Typography variant="h1" align="center">Reglamento</Typography>
      <ol
        className={css({
          listStyle: 'decimal',
          paddingLeft: '1.5rem',
          '& li': {
            marginBottom: '1rem',
            '& strong': {
              display: 'block',
              marginBottom: '0.5rem'
            }
          }
        })}

      >
        <li><strong>Registro Obligatorio:</strong> Todos los participantes deben registrarse en la plataforma web oficial del torneo antes de comenzar la competición. Sin registro, no se considerarán válidas las actividades realizadas para obtener puntos.</li>
        <li><strong>Validación de Pruebas:</strong> Cada prueba enviada por los participantes para demostrar el cumplimiento de una misión debe ser clara, legible y verificable. Las pruebas deben mostrar claramente el logro de los hitos requeridos. El equipo de staff se reserva el derecho de rechazar pruebas poco claras o cuestionables.</li>
        <li><strong>Fair Play y Comportamiento:</strong> Se espera que todos los participantes mantengan un comportamiento deportivo y respetuoso tanto dentro del juego como en la plataforma web del torneo. El uso de comportamientos tóxicos, trampas o cualquier forma de ventaja injusta resultará en descalificación y posibles sanciones.</li>
        <li><strong>Verificación Manual:</strong> La verificación de las pruebas se realizará manualmente por el equipo de staff para garantizar la equidad del torneo. Los resultados pueden tomar tiempo en ser actualizados en la plataforma web, pero se hará un esfuerzo para hacerlo de manera regular.</li>
        <li><strong>Pruebas Falsas o Engañosas</strong>El envío de pruebas falsas o manipuladas resultará en descalificación inmediata del torneo y posibles exclusiones de futuras competiciones.</li>
        <li><strong>Uso de Cuentas Personales:</strong> Cada participante debe utilizar su propia cuenta personal de League of Legends para participar en el torneo. El uso de cuentas compartidas o prestadas no está permitido y puede conducir a la descalificación.</li>
        <li><strong>Resolución de Conflictos:</strong> Cualquier conflicto o disputa relacionada con el torneo será resuelto por el equipo de staff y su decisión será definitiva.</li>
        <li><strong>Colaboración Prohibida:</strong> No está permitido colaborar con otros jugadores para manipular o inflar los resultados de las misiones. Cada participante debe completar las actividades por sí mismo.</li>
        <li><strong>Cumplimiento de las Reglas del Juego:</strong> Además de las reglas específicas del torneo, los participantes deben cumplir con las reglas estándar del juego de League of Legends establecidas por Riot Games.</li>
        <li><strong>Modificaciones de las Reglas:</strong> El equipo de staff se reserva el derecho de realizar modificaciones o ajustes en las reglas en caso de situaciones imprevistas o para garantizar el buen funcionamiento del torneo.</li>
      </ol>
      <Typography variant="h2">Premios</Typography>
      <ul
        className={css({
          listStyle: 'none',
          padding: 0,
          margin: 0,
          '& > li': {
            display: 'flex',
            alignItems: 'center',
            '& svg': {
              marginRight: 'small'
            }
          }
        })}
      >
        <li><strong><FontAwesomeIcon icon={faTrophy} fixedWidth />1er Lugar:</strong>&nbsp;Skin de 1850 RP o 10 cofres Hextech + llaves<Typography color="info" component="span">*</Typography></li>
        <li><strong><FontAwesomeIcon icon={faTrophy} fixedWidth />2do Lugar:</strong>&nbsp;Skin de 1350 RP o 7 cofres hextech + llaves<Typography color="info" component="span">*</Typography></li>
        <li><strong><FontAwesomeIcon icon={faTrophy} fixedWidth />3er Lugar:</strong>&nbsp;Skin de 975 RP o 5 cofres hextech + llaves<Typography color="info" component="span">*</Typography></li>
        <li><strong><FontAwesomeIcon icon={faTrophy} fixedWidth />4o Lugar:</strong>&nbsp;Caja de skin sorpresa</li>
        <li><strong><FontAwesomeIcon icon={faTrophy} fixedWidth />5o Lugar:</strong>&nbsp;Caja de skin sorpresa</li>
      </ul>
      <br />
      <Typography variant="caption" color="info" className={css({ marginTop: 'medium' })}>
        * A elección del ganador
      </Typography>
    </>
  )
}

export default page
