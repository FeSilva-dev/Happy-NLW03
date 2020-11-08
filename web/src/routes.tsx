import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Landing from './pages/landing'
import OrphanagesMap from './pages/orphanagesMap'
import Orphanage from './pages/Orphanage'
import CreateOrphanage from './pages/CreateOrphanage'

const Routes = () => {
    return(
        <BrowserRouter>
            <Switch>
                <Route component={Landing} exact path="/" /> 
                <Route component={OrphanagesMap} path="/app" />
                <Route path="/orphanages/:id" component={Orphanage} />
                <Route path="/create" component={CreateOrphanage} />
            </Switch>
        </BrowserRouter>
    )
}

export default Routes