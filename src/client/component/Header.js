import React, { PropTypes, Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Immutable from 'immutable'

import { actions as HeaderAction } from '../redux-modules/Header'

@connect(state => ({ Header: state.Header }),
   dispatch => bindActionCreators(HeaderAction, dispatch))

export default class Header extends Component {
  static propTypes = {
    fetchUser: PropTypes.func.isRequired,
    Header: PropTypes.object,
  }

  render() {
    const { Header, fetchUser, fetchUserCancel } = this.props
    const asyncMessage = Header.get('message', Immutable.Map())
    const isFetching  = Header.get('isFetching')
    return (
      <div>
        <button onClick={() => fetchUser('wang')}>fetch user</button>
        <button onClick={fetchUserCancel}>cancel</button>
        <p>
          { isFetching ? '...loading' : '' }
        </p>
        <p>
            {asyncMessage.login && JSON.stringify(asyncMessage) || ''}
        </p>
      </div>
    )
  }
}
