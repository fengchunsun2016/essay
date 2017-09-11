/**
 * @file channel/pages/_error.js
 * @author Mantak <mantak.cn@gmail.com>
 * Date: 2017-08-05
 * Last Modified Date: 2017-08-05
 * Last Modified By: Mantak <mantak.cn@gmail.com>
 */
import React from 'react'
import Link from 'next/link'

class Error extends React.Component {
  static propTypes() {
    return {
      errorCode: React.PropTypes.number.isRequired,
      url: React.PropTypes.string.isRequired
    }
  }
  static getInitialProps ({ res, jsonPageRes }) {
    const errorCode = res ? res.statusCode : (jsonPageRes ? jsonPageRes.status : null)
    return { errorCode }
  }
  render () {
    let response;
    const { errorCode } = this.props;
    switch (errorCode) {
      case 404:
        response = (
          <div>
            <h1>Page Not Found</h1>
            <p>The page <strong>{ this.props.url.pathname }</strong> does not exist.</p>
            <p><Link href="/"><a>Home</a></Link></p>
          </div>
        )
        break
      case 500:
        response = (
          <div>
            <h1>500错误</h1>
            <p>An internal server error occurred.</p>
          </div>
        )
        break
      default:
        response = (
          <div>
            <h1>HTTP { this.props.errorCode } Error</h1>
            <p>
              An <strong>HTTP { this.props.errorCode }</strong> error occurred while
              trying to access <strong>{ this.props.url.pathname }</strong>
            </p>
          </div>
        )
    }
    return response;
  }
}
export default Error;
