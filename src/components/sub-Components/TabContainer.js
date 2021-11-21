import React from 'react'
import '../../css/TabContainer.css'
import FontAwesomeIcon from '../../utils/getFontIcon'
import $ from 'jquery'

export default function TabContainer(props) {
  const { toggleTab } = props

  const setActiveTab = (dom) => {
    console.log($(dom).closest('.btn'))

    $('.tab-select').each((i, el) => {
      console.log(el, dom)
      console.log(el === dom.currentTarget)
      if (el === dom.currentTarget) {
        el.classList.add('active')
        el.classList.remove('inactive')
        toggleTab(el.textContent)
      } else {
        el.classList.add('inactive')
        el.classList.remove('active')
      }
    })
  }

  return (
    <React.Fragment>
      <div className='container-fluid tab-container'>
        <div className='row'>
          <div
            onClick={setActiveTab}
            className='tab-select col-1 active btn btn-primary'
          >
            <FontAwesomeIcon icon={['fas', 'table']} size='1x' />
            <br />
            <span className='d-none d-md-inline-flex'>CHART</span>
          </div>
          <div
            onClick={setActiveTab}
            className='tab-select col-1 inactive btn btn-primary'
          >
            <FontAwesomeIcon icon={['fas', 'chart-line']} size='1x' />
            <br />
            <span className='d-none d-md-inline-flex'>GRAPH</span>
          </div>
          <div className='col-10 inactive'></div>
        </div>
      </div>
    </React.Fragment>
  )
}
