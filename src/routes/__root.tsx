import * as React from 'react'
import { Outlet, createRootRoute } from '@tanstack/react-router'
import { Navi } from '../components/navi'
import { Footer } from '../components/footer'

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  return (
    <React.Fragment>
        <Navi />
      <Outlet />
      <Footer />
    </React.Fragment>
  )
}
