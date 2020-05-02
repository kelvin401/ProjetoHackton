import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import DefaultLayout from '../pages/_layouts/default'
import AuthLayout from '../pages/_layouts/auth'

export default function RouteWrapper ({
  component: Component,
  isPrivate,
  ...rest
}) {
  const signed = useSelector(state => state.signIn.signed)

  if (signed && !isPrivate) {
    return <Redirect to="/profile" />
  }
  if (!signed && isPrivate) {
    return <Redirect to="/" />
  }

  const Layout = signed ? DefaultLayout : AuthLayout

  return (
    <Route {...rest} render={ props =>
      <Layout>
        <Component {...props} />
      </Layout>} />
  )
}

RouteWrapper.propTypes = {
  isPrivate: PropTypes.bool,
  component: PropTypes.oneOfType([PropTypes.element, PropTypes.func]).isRequired
}

RouteWrapper.defaultProps = {
  isPrivate: false
}
