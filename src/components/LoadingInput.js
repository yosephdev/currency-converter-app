import React from 'react'
import '../css/InputDialog.css'
import FontAwesome from '../utils//getFontIcon'

function LoadingList(props) {
  return (
    <div className='converter'>
      <div className='py-5 container-fluid'>
        <div className='py-5 row'>
          <div className='py-5 col-12 text-center'>
            <h2>
              Loading . . .{' '}
              <span>
                <FontAwesome
                  icon={['fas', 'spinner']}
                  size='2x'
                  color='rgb(22, 161, 131)'
                />
              </span>
            </h2>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoadingList
