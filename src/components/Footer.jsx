import React from 'react'

const footerEstilo={
  width: '100%',
  height: '2rem',
  textAlign: 'center',
  bottom: '0',
  // position: 'fixed',
}

function Footer() {
  return (
    <div className='bar' style={footerEstilo}>
      Footer
    </div>
  )
}

export default Footer
