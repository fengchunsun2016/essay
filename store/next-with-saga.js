import React, {Component} from 'react'
import {END} from 'redux-saga'

function withReduxAndSaga(BaseComponent) {
  class WrappedComponent extends Component {
    static async getInitialProps(ctx) {
      const {isServer, store} = ctx
      let props
      if (BaseComponent.getInitialProps) {
        props = await BaseComponent.getInitialProps(ctx)
      }
      if (isServer) {
        store.dispatch(END)
        await store.sagaTasks.done
      }
      return props
    }
    render() {
      return <BaseComponent {...this.props} />
    }
  }
  return WrappedComponent
}

export default withReduxAndSaga
