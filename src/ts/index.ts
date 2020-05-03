import copy from 'copy-to-clipboard'

import '../styles/fonts.styl'
import '../styles/styles.styl'

import { getTime, time } from './time'
import './tooltip'

time?.addEventListener('click', () => {
  copy(getTime())
})
