import '../../css/InputDropDown.css'
import React from 'react'
import CurrencySelection from './CurrencySelection'
import FontAwesomeIcon from '../../utils/getFontIcon'

export default function InputDropDown(props) {
  const { currencyListKeys, id, value, handler, currencySelector } = props

  return (
    <React.Fragment>
      {/* <div id={id} class="input-append btn-group"> */}
      {/* DONE: need change handler for input class */}
      {/* DONE: need to implement a state variable for these inputs to track changes */}
      {/* DONE: to and from have same value */}
      <input
        onChange={handler}
        class='span2 input-append btn-group'
        id={`${id}-appendedInputButton`}
        size='16'
        type='text'
        value={value}
      />
      <span
        id={`${id}-dropper`}
        class='btn btn-dark-outline dropdown-toggle'
        data-toggle='dropdown'
      >
        <FontAwesomeIcon
          icon={['fas', 'caret-down']}
          size='2x'
          color='rgb(22, 161, 131)'
        />
      </span>
      {/* DONE: need to position this menu with CSS to be below input */}
      {/* DONE: Needs styling to match page */}
      {/* DONE: Needs to be size limited with a scroll bar */}
      {/* FIXED: needs to propagate changes to rest of page */}
      {/* DONE: search filter */}
      <ul class={`dropdown-menu`}>
        <div class={`drop-container`}>
          <CurrencySelection
            currencySelector={currencySelector}
            currencyListKeys={currencyListKeys}
          />
        </div>
      </ul>
      {/* </div> */}
    </React.Fragment>
  )
}
