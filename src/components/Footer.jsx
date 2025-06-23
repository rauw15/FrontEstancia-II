import React from 'react'

const footerEstilo={
  width: '100%',
  height: 'auto',
  paddingTop: '1rem',
  paddingBottom: '1rem',
  textAlign: 'center',
  bottom: '0',
  display: 'flex',
  justifyContent: 'space-around'
  // position: 'fixed',
}

function Footer() {
  return (
    <div className='bar footer-moderno'>
      <div></div>
      <div>Suchiapa <br></br>
          Carretera Tuxtla Gutierrez. - Portillo Zaragoza Km 21+500 <br></br>
          Col. Las Brisas; Suchiapa, Chiapas. CP.29150. Teléfono: 01961 61 71460 <br></br>
          Suchiapa, Chiapas.</div>
      <div></div>
    </div>
  )
}

export default Footer
